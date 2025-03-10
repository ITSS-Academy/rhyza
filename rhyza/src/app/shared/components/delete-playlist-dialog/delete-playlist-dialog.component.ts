import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as PlaylistActions from '../../../ngrx/playlist/playlist.actions'
import {Store} from '@ngrx/store';
import {PlaylistState} from '../../../ngrx/playlist/playlist.state';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-delete-playlist-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './delete-playlist-dialog.component.html',
  styleUrl: './delete-playlist-dialog.component.scss'
})
export class DeletePlaylistDialogComponent implements OnInit, OnDestroy{
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<DeletePlaylistDialogComponent>);



  isDeletedSuccess$!: Observable<boolean>
  constructor(
    private router: Router,
    private store: Store<{
    playlist: PlaylistState
  }>) {

    this.isDeletedSuccess$ =this.store.select('playlist','isDeletedSuccess')
  }

  ngOnInit() {
    this.isDeletedSuccess$.subscribe((isDeletedSuccess) => {
      if (isDeletedSuccess) {
        this.store.dispatch(PlaylistActions.getPlaylist({
          uid: this.data.auth.uid,
          idToken: this.data.auth.idToken
        }));

        this.dialogRef.close(true);
        this.router.navigate(['playlist'])

      }
    })
  }

  ngOnDestroy() {
    this.isDeletedSuccess$.subscribe().unsubscribe();
    this.store.dispatch(PlaylistActions.clearPlaylistDetail());
  }


  deletePlaylist() {
    if (this.data.playlistDetail.id){
      this.store.dispatch(PlaylistActions.deletePlaylist({
        playlistId: this.data.playlistDetail.id,
        uid: this.data.auth.uid,
        idToken: this.data.auth.idToken
      }));

    }
  }

}
