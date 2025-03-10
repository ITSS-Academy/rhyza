import {Component, OnInit} from '@angular/core';
import {MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {ShareModule} from '../../share.module';
import {PlaylistCardComponent} from '../playlist-card/playlist-card.component';
import {Observable, Subscription} from 'rxjs';
import {AuthModel} from '../../../models/auth.model';
import {PlaylistModel} from '../../../models/playlist.model';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../ngrx/auth/auth.state';
import {PlaylistState} from '../../../ngrx/playlist/playlist.state';
import * as PlaylistActions from '../../../ngrx/playlist/playlist.actions';

@Component({
  selector: 'app-playlists-add',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    ShareModule,
    PlaylistCardComponent
  ],
  templateUrl: './playlists-add.component.html',
  styleUrl: './playlists-add.component.scss'
})
export class PlaylistsAddComponent implements OnInit {
  subscription: Subscription[] = [];
  auth$!: Observable<AuthModel | null>;
  authData: AuthModel | null = null;
  playlistList$!: Observable<PlaylistModel[]>;
  playlistList: PlaylistModel[] = [];

  constructor(
    private store: Store<{
      auth: AuthState;
      playlist: PlaylistState;
    }>
  ) {
    this.auth$ = this.store.select('auth', 'authData');
    this.playlistList$ = this.store.select('playlist', 'playlistList');
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
      })
    );
  }


}
