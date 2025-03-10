import {Component, inject, Input, OnInit} from '@angular/core';
import {SongModel} from '../../../models/song.model';
import {MaterialModule} from '../../material.module';
import {SongService} from '../../../services/song/song.service';
import * as QueueActions from '../../../ngrx/queue/queue.actions';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../ngrx/auth/auth.state';
import {AuthModel} from '../../../models/auth.model';
import {Observable, Subscription} from 'rxjs';
import {DurationToTimePipe} from '../../pipes/duration-to-time.pipe';
import {MatDialog} from '@angular/material/dialog';
import {PlaylistsAddComponent} from '../playlists-add/playlists-add.component';
import * as SongActions from '../../../ngrx/song/song.actions';
import {Router} from '@angular/router';
import * as PlaylistActions from '../../../ngrx/playlist/playlist.actions';
import {DeleteSongPlaylistComponent} from '../delete-song-playlist/delete-song-playlist.component';
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
  dialogDeleteSongFromPlaylist = inject(MatDialog);
  readonly dialog = inject(MatDialog);

  @Input() cardmusictab!: SongModel;
  @Input() isInPlaylist: boolean = false;
  @Input() insideNextSong: boolean = false; // Thêm dòng này
  @Input() playlistId: string = ''; // Thêm dòng này
  auth$!: Observable<AuthModel | null>;
  authData!: AuthModel | null;
  subscription: Subscription[] = [];
  isRecycle: boolean = false;

  constructor(
    private songService: SongService,
    private router: Router,
    private store: Store<{
      auth: AuthState
    }>,
  ) {
    this.auth$ = this.store.select('auth', 'authData');
    this.getCurrentUrl();


  }

  ngOnInit() {
    this.subscription.push(
      this.auth$.subscribe((auth) => {
        if (auth?.uid) {
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


  addToQueue(songId: string) {

    if (this.authData?.uid && songId && this.authData?.idToken) {

      this.store.dispatch(QueueActions.createQueue({
        uid: this.authData.uid,
        songId: songId,
        idToken: this.authData.idToken
      }))
      this.store.dispatch(SongActions.getSongQueue({
        uid: this.authData.uid, idToken: this.authData.idToken
      }))
    }
  }

  deleteSongToQueue(songId: string) {
    if (this.authData?.uid && songId && this.authData?.idToken) {
      this.store.dispatch(QueueActions.deleteSongInQueue({
        uid: this.authData.uid,
        songId: songId,
        idToken: this.authData.idToken
      }))
    }
  }



  openDialogDeleteSongFromDialog(song:SongModel) {
    if(this.authData?.uid){
      const dialogRef = this.dialog.open(DeleteSongPlaylistComponent, {
        data: {
          playlistId: this.playlistId,
          song: song,
          uid: this.authData.uid,
          idToken: this.authData.idToken,
        } // Truyền songId vào dialog
      });
    }

  }



  openDialog() {
    if(this.authData?.uid){
      const dialogRef = this.dialog.open(PlaylistsAddComponent, {
        data: {
          song: this.cardmusictab,
          auth: this.authData
        } // Truyền songId vào dialog
      });
    }

  }

  getCurrentUrl(){
    this.isRecycle = this.router.url.includes('playlist-detail');
  }



}
