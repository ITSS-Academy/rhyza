
import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {SongModel} from '../../../models/song.model';
import {SongService} from '../../../services/song/song.service';
import {Store} from '@ngrx/store';
import {PlayState} from '../../../ngrx/play/play.state';
import * as PlayActions from '../../../ngrx/play/play.actions';
import {Observable, Subscription} from 'rxjs';
import {IdToNamePipe} from '../../pipes/id-to-name.pipe';
import * as QueueActions from '../../../ngrx/queue/queue.actions';
import {AuthModel} from '../../../models/auth.model';
import {AuthState} from '../../../ngrx/auth/auth.state';


@Component({
  selector: 'app-music-card',
  standalone: true,
  imports: [
    MaterialModule,
    IdToNamePipe
  ],
  templateUrl: './music-card.component.html',
  styleUrl: './music-card.component.scss'
})
export class MusicCardComponent implements OnInit {
  @Input() song!: SongModel;
  isPlaying: boolean  = false;
  subscription: Subscription[] = [];

  play$ !: Observable<boolean>;
  auth$ !: Observable<AuthModel| null>;
  authData!: AuthModel | null;





  constructor(
    private songService: SongService,
    private store: Store<{
      play:PlayState
      auth: AuthState

    }>
  )
  {

    this.play$ = this.store.select('play','isPlaying');
    this.auth$ = this.store.select('auth','authData');
  }


  ngOnInit() {
    this.subscription.push(
      this.play$.subscribe((isPlaying) => {
        this.isPlaying = isPlaying;
      }),

      this.auth$.subscribe((auth) => {
        if (auth?.uid) {
          this.authData = auth;

        }
      })
    )

  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.store.dispatch(PlayActions.play());
    }else {
      this.store.dispatch(PlayActions.pause());
    }
  }

  playSong() {
    if (this.song) {
      localStorage.setItem('currentSong', JSON.stringify(this.song));
    }
    this.songService.setCurrentSong(this.song);

  }









}
