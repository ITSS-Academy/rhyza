import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { MatDialog } from '@angular/material/dialog';
import { CreatePlaylistComponent } from '../../shared/components/create-playlist/create-playlist.component';
import { PlaylistModel } from '../../models/playlist.model';
import { PlaylistCardComponent } from '../../shared/components/playlist-card/playlist-card.component';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthModel } from '../../models/auth.model';
import { AuthState } from '../../ngrx/auth/auth.state';
import * as PlaylistActions from '../../ngrx/playlist/playlist.actions';
import { PlaylistState } from '../../ngrx/playlist/playlist.state';
import {LoadingComponent} from '../../shared/components/loading/loading.component';
import {Router} from '@angular/router';
import {LoginComponent} from '../../shared/components/login/login.component';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [MaterialModule, PlaylistCardComponent, LoadingComponent, LoginComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  auth$!: Observable<AuthModel | null>;
  authData: AuthModel | null = null;
  playlistList$!: Observable<PlaylistModel[]>;
  playlistList: PlaylistModel[] = [];
  isLoadingPlaylist$!:Observable<boolean>

  constructor(
    private router: Router,
    private store: Store<{
      auth: AuthState;
      playlist: PlaylistState;
    }>
  ) {
    this.auth$ = this.store.select('auth', 'authData');
    this.playlistList$ = this.store.select('playlist', 'playlistList');
    this.isLoadingPlaylist$ = this.store.select('playlist','isLoading');

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
        console.log(playlist);
        if (playlist.length > 0) {
          this.playlistList = playlist;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(CreatePlaylistComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['playlist']);
    });
  }
}
