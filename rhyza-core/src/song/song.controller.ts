// Updated SongsController
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  UploadedFiles,
  Request,
  Query,
  Put,
} from '@nestjs/common';
import { SongService } from './song.service';
import { Song } from './entities/song.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';

@Controller('songs')
export class SongController {
  constructor(private readonly songsService: SongService) {}

  @Get('all')
  async getAllSongs(): Promise<Song[]> {
    return this.songsService.getAllSongs();
  }

  @Get('next')
  async getNextPlaylist(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ): Promise<Song[]> {
    try {
      const pageNumber = Number(page);
      const pageSizeNumber = Number(pageSize);

      if (
        isNaN(pageNumber) ||
        isNaN(pageSizeNumber) ||
        pageNumber < 1 ||
        pageSizeNumber < 1
      ) {
        throw new HttpException(
          'Invalid page or pageSize value',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.songsService.getNextPlaylist(
        pageNumber,
        pageSizeNumber,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files', 2))
  // @UseInterceptors(FileInterceptor('file'))
  async createSong(
    @UploadedFiles() files: Express.Multer.File[],
    // @UploadedFile() file: Express.Multer.File,
    @Body()
    body: {
      title: string;
      composer: string;
      performer_ref: string;
      category_id: string;
      uuid: string;
    },
  ) {
    if (!files || files.length !== 2) {
      throw new HttpException(
        'Both music and image files are required!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const [musicFile, imageFile] = files;

    if (!musicFile.mimetype.includes('audio')) {
      throw new HttpException(
        'Invalid music file type',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!imageFile.mimetype.includes('image')) {
      throw new HttpException(
        'Invalid image file type',
        HttpStatus.BAD_REQUEST,
      );
    }

    const songId = uuidv4();

    try {
      const duration = await this.songsService.getAudioDuration(
        musicFile.buffer,
      );
      const hlsDir = await this.songsService.convertToHls(
        musicFile.buffer,
        songId,
      );
      const hlsUrl = await this.songsService.uploadHlsToSupabase(
        'songs',
        songId,
        hlsDir,
      );
      const imageUrl = await this.songsService.uploadImageToSupabase(
        'songs',
        songId,
        imageFile,
      );

      const songData: Partial<Song> = {
        id: songId,
        title: body.title,
        composer: body.composer,
        performer_ref: body.performer_ref,
        category_id: body.category_id,
        uuid: body.uuid,
        image_url: imageUrl,
        file_path: hlsUrl,
        views: 0,
        duration: duration,
      };

      const newSong = await this.songsService.createSong(songData);
      this.songsService.cleanTempDirectory(hlsDir);

      return <typeof songData>{
        id: songId,
        title: body.title,
        composer: body.composer,
        performer_ref: body.performer_ref,
        category_id: body.category_id,
        uuid: body.uuid,
        image_url: imageUrl,
        file_path: hlsUrl,
        views: 0,
        duration: duration,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update-views')
  async updateViews(@Request() req: any) {
    try {
      const { id } = req.query;
      return await this.songsService.upadteSongViews(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('category-song')
  async getCategorySong(@Request() req: any) {
    try {
      const { id } = req.query;

      return await this.songsService.getSongByCategoryId(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getSongById(@Query('id') id: string): Promise<Song> {
    try {
      return this.songsService.getSongById(id);
    } catch (error) {
      throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async deleteSong(@Param('id') id: string): Promise<void> {
    return this.songsService.deleteSong(id);
  }
  @Get(':id/hls-url')
  async getHlsUrl(@Param('id') id: string): Promise<{ hlsUrl: string }> {
    const song = await this.songsService.getSongById(id);
    if (!song || !song.file_path) {
      throw new HttpException(
        'HLS URL not found for the given ID',
        HttpStatus.NOT_FOUND,
      );
    }

    // Lấy signed URL từ Supabase hoặc trả về URL công khai
    const signedUrl = await this.songsService.getPublicHlsUrl(
      'songs',
      song.file_path,
    );
    return { hlsUrl: signedUrl };
  }
}
