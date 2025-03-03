
import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {SongModel} from '../../../models/song.model';
import {SongService} from '../../../services/song/song.service';
import {Store} from '@ngrx/store';
import {PlayState} from '../../../ngrx/play/play.state';
import * as PlayActions from '../../../ngrx/play/play.actions';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-music-card',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './music-card.component.html',
  styleUrl: './music-card.component.scss'
})
export class MusicCardComponent implements OnInit {
  @Input() song!: SongModel;
  isPlaying: boolean  = false;
  subscription: Subscription[] = [];

  play$ !: Observable<boolean>;

  constructor(
    private songService: SongService,
    private store: Store<{
      play:PlayState

    }>
  )
  {

    this.play$ = this.store.select('play','isPlaying');
  }


  ngOnInit() {
    this.subscription.push(
      this.play$.subscribe((isPlaying) => {
        this.isPlaying = isPlaying;
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
    console.log(this.song);

    this.songService.setCurrentSong(this.song);

  }






}
