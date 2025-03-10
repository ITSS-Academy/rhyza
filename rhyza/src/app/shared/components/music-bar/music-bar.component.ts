import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SongModel} from '../../../models/song.model';
import {SongService} from '../../../services/song/song.service';
import {MaterialModule} from '../../material.module';
import Hls from 'hls.js';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {PlayState} from '../../../ngrx/play/play.state';
import * as PlayActions from '../../../ngrx/play/play.actions';
import * as SongActions from '../../../ngrx/song/song.actions';
import {MusicTabComponent} from '../music-tab/music-tab.component';
import {AuthState} from '../../../ngrx/auth/auth.state';
import {AuthModel} from '../../../models/auth.model';
import {SongState} from '../../../ngrx/song/song.state';
@Component({
  selector: 'app-music-bar',
  standalone: true,
  imports: [MaterialModule, MusicTabComponent],
  templateUrl: './music-bar.component.html',
  styleUrl: './music-bar.component.scss'
})
export class MusicBarComponent implements OnInit, OnDestroy {
  currentSong: SongModel | null = null;
  hlsUrl: string | null = null;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 50;
  previousVolume: number = 0.5; // Lưu lại volume trước khi tắt
  subscriptions: Subscription[] = [];
  hasUpdatedViews = false;



  songListQueue: SongModel[] = [];
  songQueue$!: Observable<SongModel[]>;

  overlayOpen = false;
  section: HTMLElement | null = null;

  auth$!: Observable<AuthModel | null>;
  authData!: AuthModel | null;

  @ViewChild('audioPlayer', { static: true })
  audioPlayer!: ElementRef<HTMLAudioElement>;
  play$!: Observable<boolean>;

  constructor(
    private songService: SongService,
    private store: Store<{ play: PlayState; auth: AuthState; song: SongState }>,
    private renderer: Renderer2
  ) {
    this.auth$ = this.store.select('auth', 'authData');
    this.play$ = this.store.select('play', 'isPlaying');
    this.songQueue$ = this.store.select('song', 'songQueue');
  }

  ngOnInit() {
    const savedSong = localStorage.getItem('currentSong');
    if (savedSong) {
      this.currentSong = JSON.parse(savedSong);
    }
    this.section = document.getElementById('next-song-section');

    this.subscriptions.push(
      this.songService.currentSong$.subscribe((song) => {
        this.currentSong = song;
        if (song) {
          this.hlsUrl = `https://fgmqtjkceqrmqzpqjtmc.supabase.co/storage/v1/object/public/songs/${song.file_path}`;
          this.setupHls();
        }
      }),

      this.auth$.subscribe((auth) => {
        if (auth?.uid && auth?.idToken) {
          this.authData = auth;
          if (this.authData?.uid && this.authData?.idToken) {
            this.store.dispatch(
              SongActions.getSongQueue({ uid: this.authData.uid, idToken: this.authData.idToken })
            );
          }
        }
      }),

      this.songQueue$.subscribe((songQueue) => {
        if (songQueue.length > 0) {
          this.songListQueue = songQueue;
        }
      }),

      this.play$.subscribe((isPlaying) => {
        this.isPlaying = isPlaying;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  setupHls(): void {
    const audio = this.audioPlayer.nativeElement;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.hlsUrl!);
      hls.attachMedia(audio);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        audio.play().then((r) => this.store.dispatch(PlayActions.play()));
      });
    } else {
      audio.src = this.hlsUrl!;
      audio.preload = 'auto';
      audio.play().then((r) => this.store.dispatch(PlayActions.play()));
    }

    audio.ontimeupdate = () => {
      this.updateProgressBar();
      this.currentTime = audio.currentTime;
      this.duration = audio.duration || 100;

      if (this.currentTime >= 10 && !this.hasUpdatedViews) {
        this.hasUpdatedViews = true;
        this.updateViews();
      }
    };

    audio.onplay = () => this.store.dispatch(PlayActions.play());
    audio.onpause = () => this.store.dispatch(PlayActions.pause());
  }

  updateViews() {
    if (this.currentSong) {
      console.log('Updating views for song:', this.currentSong.id);
      this.store.dispatch(SongActions.updateSongViews({ id: this.currentSong.id }));
    }
  }

  togglePlayPause() {
    const audio = this.audioPlayer.nativeElement;
    if (audio.paused) {
      audio.play().then((r) => this.store.dispatch(PlayActions.play()));
    } else {
      audio.pause();
      this.store.dispatch(PlayActions.pause());
    }
  }

  seekAudio(event: any) {
    const audio = this.audioPlayer.nativeElement;
    audio.currentTime = (event.target.value / this.duration) * audio.duration;
  }

  changeVolume(event: any) {
    const audio = this.audioPlayer.nativeElement;
    const volume = event.target.value / 100;
    audio.volume = volume;
    this.volume = event.target.value;

    // Cập nhật giá trị --volume-progress để hiển thị phần đã chạy của volume bar
    document.documentElement.style.setProperty('--volume-progress', `${this.volume}%`);
  }

  toggleMute() {
    const audio = this.audioPlayer.nativeElement;
    const volumeBar = document.querySelector('.volume-bar') as HTMLInputElement; // Lấy thanh volume bar

    if (audio.volume > 0) {
      this.previousVolume = audio.volume; // Lưu lại volume trước khi tắt
      audio.volume = 0;
      this.volume = 0;

      // Cập nhật giá trị của thanh volume bar về 0
      if (volumeBar) {
        volumeBar.value = '0';
      }
    } else {
      audio.volume = this.previousVolume || 0.5; // Khôi phục volume trước đó hoặc mặc định là 0.5
      this.volume = (this.previousVolume || 0.5) * 100;

      // Cập nhật giá trị của thanh volume bar về giá trị trước đó
      if (volumeBar) {
        volumeBar.value = this.volume.toString();
      }
    }

    // Cập nhật biến CSS --volume-progress
    document.documentElement.style.setProperty('--volume-progress', `${this.volume}%`);
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

  overlaySongList() {
    if (this.overlayOpen) {
      this.overlayOff();
      this.overlayOpen = false;
    } else {
      this.overlayOn();
      if (this.authData?.uid && this.authData?.idToken) {
        this.store.dispatch(
          SongActions.getSongQueue({ uid: this.authData.uid, idToken: this.authData.idToken })
        );
      }
      this.overlayOpen = true;
    }
  }

  overlayOn() {
    if (this.section) {
      this.renderer.setStyle(this.section, 'display', 'block');
    }
  }

  overlayOff() {
    if (this.section) {
      this.renderer.setStyle(this.section, 'display', 'none');
    }
  }
}

