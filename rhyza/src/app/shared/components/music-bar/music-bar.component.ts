import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SongModel} from '../../../models/song.model';
import {SongService} from '../../../services/song/song.service';
import {MaterialModule} from '../../material.module';
import Hls from 'hls.js';
@Component({
  selector: 'app-music-bar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './music-bar.component.html',
  styleUrl: './music-bar.component.scss'
})
export class MusicBarComponent implements OnInit{
  currentSong: SongModel | null = null;
  hlsUrl: string | null = null;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 50;

  @ViewChild('audioPlayer', { static: true })
  audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(private songService: SongService) {}

  ngOnInit() {
    this.songService.currentSong$.subscribe((song) => {
      this.currentSong = song;
      if (song) {
        this.hlsUrl = `https://fgmqtjkceqrmqzpqjtmc.supabase.co/storage/v1/object/public/songs/${song.file_path}`;
        this.setupHls();
      }
    });
  }

  setupHls(): void {
    const audio = this.audioPlayer.nativeElement;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.hlsUrl!);
      hls.attachMedia(audio);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        audio.play();
      });
    } else {
      audio.src = this.hlsUrl!;
      audio.play();
    }

    // Cập nhật tiến trình
    audio.ontimeupdate = () => {
      this.updateProgressBar();
      this.currentTime = audio.currentTime;
      this.duration = audio.duration || 100;
    };

    // Cập nhật trạng thái play/pause
    audio.onplay = () => (this.isPlaying = true);
    audio.onpause = () => (this.isPlaying = false);
  }

  togglePlayPause() {
    const audio = this.audioPlayer.nativeElement;
    if (audio.paused) {
      audio.play();
      this.isPlaying = true;
    } else {
      audio.pause();
      this.isPlaying = false;
    }
  }

  seekAudio(event: any) {
    const audio = this.audioPlayer.nativeElement;
    audio.currentTime = (event.target.value / this.duration) * audio.duration;
  }

  changeVolume(event: any) {
    const audio = this.audioPlayer.nativeElement;
    audio.volume = event.target.value / 100;
    this.volume = event.target.value;
  }

  rewind() {
    this.audioPlayer.nativeElement.currentTime -= 10;
  }

  forward() {
    this.audioPlayer.nativeElement.currentTime += 10;
  }

  formatTime(time: number): string {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
  updateProgressBar() {
    const progress = (this.currentTime / this.duration) * 100;
    document.documentElement.style.setProperty('--progress', `${progress}%`);
  }

}
