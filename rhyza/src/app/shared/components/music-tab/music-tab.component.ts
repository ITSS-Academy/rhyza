import {Component, Input, OnInit} from '@angular/core';
import {SongModel} from '../../../models/song.model';
import {MaterialModule} from '../../material.module';
import {SongService} from '../../../services/song/song.service';
import {IdToNamePipe} from '../../pipes/id-to-name.pipe';
import * as QueueActions from '../../../ngrx/queue/queue.actions';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../ngrx/auth/auth.state';
import {AuthModel} from '../../../models/auth.model';
import {Observable, Subscription} from 'rxjs';
import {DurationToTimePipe} from '../../pipes/duration-to-time.pipe';



@Component({
  selector: 'app-music-tab',
  standalone: true,
  imports: [
    MaterialModule,
    DurationToTimePipe,

  ],
  templateUrl: './music-tab.component.html',
  styleUrl: './music-tab.component.scss'
})
export class MusicTabComponent implements OnInit {
  @Input() cardmusictab!: SongModel;
  @Input() insideNextSong: boolean = false; // Thêm dòng này
  auth$!: Observable<AuthModel | null>;
  authData!: AuthModel | null;
  subscription: Subscription[] = [];
  constructor(  private songService: SongService,
                private store: Store<{
    auth: AuthState
                }>,

  ) {
    this.auth$ = this.store.select('auth', 'authData');


  }
  ngOnInit() {
    this.subscription.push(
      this.auth$.subscribe((auth) => {
        if(auth?.uid){
          this.authData = auth;
        }
      })
    );

    }



  playSong() {
    if (this.cardmusictab?.id) {
      localStorage.setItem('currentSong', JSON.stringify(this.cardmusictab.id));
    }
    this.songService.setCurrentSong(this.cardmusictab);

  }



  addToQueue(songId:string) {

    if(this.authData?.uid && songId && this.authData?.idToken){

      this.store.dispatch(QueueActions.createQueue({
        uid: this.authData.uid,
        songId: songId,
        idToken: this.authData.idToken
      }))
    }


  }

  deleteSongToQueue(songId: string) {
    if(this.authData?.uid && songId && this.authData?.idToken){
      this.store.dispatch(QueueActions.deleteSongInQueue({
        uid: this.authData.uid,
        songId: songId,
        idToken: this.authData.idToken
      }))
    }
  }

}
