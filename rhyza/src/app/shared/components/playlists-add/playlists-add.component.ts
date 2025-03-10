import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {ShareModule} from '../../share.module';
import {Observable, Subscription} from 'rxjs';
import {AuthModel} from '../../../models/auth.model';
import {PlaylistModel} from '../../../models/playlist.model';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../ngrx/auth/auth.state';
import {PlaylistState} from '../../../ngrx/playlist/playlist.state';
import * as PlaylistActions from '../../../ngrx/playlist/playlist.actions';
import {MaterialModule} from '../../material.module';

@Component({
  selector: 'app-playlists-add',
  standalone: true,
  imports: [
    MatDialogTitle,
    ReactiveFormsModule,
    ShareModule,
    MaterialModule
  ],
  templateUrl: './playlists-add.component.html',
  styleUrl: './playlists-add.component.scss'
})
export class PlaylistsAddComponent implements OnInit, OnDestroy {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<PlaylistsAddComponent>);

  subscription: Subscription[] = [];
  auth$!: Observable<AuthModel | null>;
  authData: AuthModel | null = null;
  playlistList$!: Observable<PlaylistModel[]>;
  playlistList: PlaylistModel[] = [];
  isAddSongToPlaylist$!: Observable<boolean>;

  constructor(
    private store: Store<{
      auth: AuthState;
      playlist: PlaylistState;
    }>
  ) {
    this.auth$ = this.store.select('auth', 'authData');
    this.playlistList$ = this.store.select('playlist', 'playlistList');
    this.isAddSongToPlaylist$ = this.store.select('playlist', 'isAddSongSuccess');
  }

  ngOnInit() {
    this.subscription.push(
      this.auth$.subscribe((authData) => {
        if (authData?.idToken && authData?.uid) {
          this.authData = authData;
          this.store.dispatch(PlaylistActions.getPlaylist({
            uid: authData.uid,
            idToken: authData.idToken
          }));
        }
      }),

      this.playlistList$.subscribe((playlist: PlaylistModel[]) => {
        if (playlist.length > 0) {
          this.playlistList = playlist;
          console.log(this.playlistList);
        }
      }),

      this.isAddSongToPlaylist$.subscribe((songId) => {
        if (songId) {
          if(this.authData?.idToken && this.authData?.uid ) {

            this.store.dispatch(PlaylistActions.getListSongIdByUid({
              idToken: this.authData?.idToken,
              uid: this.authData?.uid
            }));

            this.dialogRef.close();
          }

        }

      })
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PlaylistActions.clearPlaylistDetail());
  }

  addSongToPlaylist(playlistId: string){
    if(this.authData?.idToken && this.authData?.uid && playlistId && this.data.song.id){
      this.store.dispatch(PlaylistActions.addSongToPlaylist({
        playlistId: playlistId,
        songId: this.data.song.id,
        uid: this.authData.uid,
        idToken: this.authData.idToken
      }));

    }




  }


}
