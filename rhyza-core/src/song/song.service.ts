import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Song } from '../song/entities/song.entity';
import { SupabaseProvider } from '../supabase/supabase';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegStatic from 'ffmpeg-static';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Bottleneck from 'bottleneck';
import { exec } from 'child_process';

@Injectable()
export class SongService {
  constructor(private readonly supabaseProvider: SupabaseProvider) {}

  // Lấy tất cả bài hát
  async getAllSongs(): Promise<Song[]> {
    const { data: songs, error } = await this.supabaseProvider
      .getClient()
      .from('songs')
      .select('*');
    if (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return songs;
  }

  // Tạo bài hát mới
  async createSong(data: Partial<Song>): Promise<Song> {
    data.views = 0;
    const { data: song, error } = await this.supabaseProvider
      .getClient()
      .from('songs')
      .insert(data)
      .single();
    if (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return song as Song;
  }

  // Lấy bài hát theo ID
  async getSongById(id: string): Promise<Song> {
    const { data, error } = await this.supabaseProvider
      .getClient()
      .from('songs')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) {
      throw new NotFoundException(`Song with ID ${id} not found.`);
    }
    return data;
  }

  // Xóa bài hát theo ID
  async deleteSong(id: string): Promise<void> {
    const { error } = await this.supabaseProvider
      .getClient()
      .from('songs')
      .delete()
      .eq('id', id);
    if (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAudioDuration(buffer: Buffer): Promise<number> {
    return new Promise((resolve, reject) => {
      const tempFilePath = path.join(
        os.tmpdir(),
        `temp_audio_${Date.now()}.mp3`,
      );
      fs.writeFileSync(tempFilePath, buffer);

      // Kiểm tra hệ điều hành để dùng lệnh phù hợp
      const isWindows = process.platform === 'win32';
      const command = isWindows
        ? `"${ffmpegStatic}" -i "${tempFilePath}" 2>&1 | findstr "Duration"`
        : `"${ffmpegStatic}" -i "${tempFilePath}" 2>&1 | grep "Duration"`;

      exec(command, (error, stdout) => {
        fs.unlinkSync(tempFilePath); // Xóa file tạm sau khi xử lý

        if (error) {
          console.error('Lỗi khi lấy duration:', error);
          reject(new Error('Không thể lấy duration'));
          return;
        }

        // Trích xuất thời lượng từ output của FFmpeg
        const match = stdout.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
        if (match) {
          const duration =
            parseInt(match[1]) * 3600 +
            parseInt(match[2]) * 60 +
            parseFloat(match[3]);
          resolve(duration);
        } else {
          reject(new Error('Không thể đọc duration từ FFmpeg output'));
        }
      });
    });
  }

  async convertToHls(inputFile: Buffer, id: string): Promise<string> {
    const tempDir = path.join(os.tmpdir(), id);
    const tempInputPath = path.join(tempDir, `${id}-input.mp3`);
    const outputDir = path.join(tempDir, 'hls');
    const outputPlaylist = path.join(outputDir, 'output.m3u8');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
      fs.writeFileSync(tempInputPath, inputFile);

      return await new Promise((resolve, reject) => {
        ffmpeg(tempInputPath)
          .setFfmpegPath(ffmpegStatic as unknown as string)
          .audioCodec('aac')
          .outputOptions([
            '-c:a copy',
            '-vn',
            '-hls_time 4',
            '-hls_list_size 0',
            '-f hls',
            '-preset veryfast',
          ])
          .output(outputPlaylist)
          .on('start', (command) => console.log('FFmpeg command:', command))
          .on('end', () => {
            console.log(
              'HLS conversion completed. Output directory:',
              outputDir,
            );
            resolve(outputDir);
          })
          .on('error', (err) => {
            console.error('FFmpeg Error:', err.message);
            reject(
              new HttpException(
                `FFmpeg failed: ${err.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          })
          .run();
      });
    } catch (error) {
      console.error('Error during HLS conversion:', error.message);
      throw new HttpException(
        `Failed to convert to HLS: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      if (fs.existsSync(tempInputPath)) {
        fs.unlinkSync(tempInputPath);
      }
    }
  }

  // Upload HLS segments lên Supabase
  async uploadHlsToSupabase(
    bucket: string,
    id: string,
    hlsDir: string,
  ): Promise<string> {
    const files = fs.readdirSync(hlsDir);
    const limiter = new Bottleneck({
      maxConcurrent: 50, // Tăng giới hạn đồng thời
      minTime: 5, // Giảm thời gian giữa các request
    });

    const uploadPromises = files.map((file) =>
      limiter.schedule(async () => {
        const file_path = path.join(hlsDir, file);
        const uploadPath = `upload/${id}/${file}`;
        const fileBuffer = fs.readFileSync(file_path);

        if (fileBuffer.length === 0) {
          console.warn(`Skipping empty file: ${file}`);
          return;
        }

        try {
          const { error } = await this.supabaseProvider
            .getClient()
            .storage.from(bucket)
            .upload(uploadPath, fileBuffer, {
              contentType: file.endsWith('.m3u8')
                ? 'application/x-mpegURL'
                : 'audio/mpeg',
              upsert: true,
            });

          if (error) {
            throw new Error(`Failed to upload ${file}: ${error.message}`);
          }

          console.debug(`Uploaded file successfully: ${file}`);
        } catch (error) {
          console.error(error.message);
          throw error;
        }
      }),
    );

    const results = await Promise.allSettled(uploadPromises);

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`File upload failed for ${files[index]}:`, result.reason);
      }
    });

    return `upload/${id}/output.m3u8`;
  }

  // Xóa thư mục tạm
  cleanTempDirectory(tempDir: string): void {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }
  async getPublicHlsUrl(bucket: string, file_path: string): Promise<string> {
    const { data } = this.supabaseProvider
      .getClient()
      .storage.from(bucket)
      .getPublicUrl(file_path);

    if (!data || !data.publicUrl) {
      throw new HttpException(
        'Failed to generate public URL. The file might not exist or the bucket is not public.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return data.publicUrl;
  }

  uploadImageToSupabase(
    bucket: string,
    id: string,
    image: Express.Multer.File,
  ): Promise<string> {
    let timeStamp = new Date().getTime().toString();
    //put try catch
    try {
      return new Promise((resolve, reject) => {
        const file_path = `upload/${id}/${timeStamp}`;
        this.supabaseProvider
          .getClient()
          .storage.from(bucket)
          .upload(file_path, image.buffer, {
            contentType: image.mimetype,
            upsert: true,
          })
          .then(({ error }) => {
            if (error) {
              console.error('Failed to upload image:', error.message);
              reject(
                new HttpException(
                  `Failed to upload image: ${error.message}`,
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
              );
            } else {
              let iamgeUrl = this.getPublicHlsUrl('songs', file_path);
              resolve(iamgeUrl);
            }
          });
      });
    } catch (e) {
      console.log(e);
    }
  }

  //get playlist to play next song

  async getNextPlaylist(page: number, pageSize: number): Promise<Song[]> {
    // Lấy tổng số bài hát trong bảng
    const { count, error: countError } = await this.supabaseProvider
      .getClient()
      .from('songs')
      .select('id', { count: 'exact', head: true });

    if (countError) {
      console.error('Error fetching total song count:', countError.message);
      throw new HttpException(
        'Failed to fetch song count',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const totalSongs = count || 0;

    // Tính số lượng trang
    const totalPages = Math.ceil(totalSongs / pageSize);

    // Kiểm tra tính hợp lệ của page
    if (page < 1 || page > totalPages) {
      throw new HttpException(
        'Page number out of range',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Tính OFFSET ngẫu nhiên trong phạm vi phù hợp
    const randomOffset = Math.floor(
      Math.random() * (totalSongs - pageSize * (totalPages - 1)),
    );
    const offset = randomOffset + (page - 1) * pageSize;

    // Truy vấn dữ liệu với OFFSET và LIMIT
    const { data: songs, error } = await this.supabaseProvider
      .getClient()
      .from('songs')
      .select('*')
      .range(offset, offset + pageSize - 1); // Phân trang với range

    if (error) {
      console.error('Error fetching random playlist:', error.message);
      throw new HttpException(
        'Failed to fetch random playlist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return songs;
  }

  async getSongByCategoryId(id: string): Promise<Song[]> {
    const { data, error } = await this.supabaseProvider
      .getClient()
      .from('songs')
      .select('*')
      .eq('category_id', id);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return data;
  }

  async upadteSongViews(id: string): Promise<void> {
    //get song with id view +1

    let song = await this.getSongById(id);
    song.views = song.views + 1;
    const { data, error } = await this.supabaseProvider
      .getClient()
      .from('songs')
      .update({ views: song.views })
      .eq('id', id);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
