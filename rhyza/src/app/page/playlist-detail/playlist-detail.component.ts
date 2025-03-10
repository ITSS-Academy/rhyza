import {Component, OnDestroy, OnInit, ViewChild, ElementRef, inject} from '@angular/core';
import { AsyncPipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PlaylistModel } from '../../models/playlist.model';
import { SongModel } from '../../models/song.model';
import { PlaylistState } from '../../ngrx/playlist/playlist.state';
import * as PlaylistActions from '../../ngrx/playlist/playlist.actions';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { MusicTabComponent } from '../../shared/components/music-tab/music-tab.component';
import * as SongActions from '../../ngrx/song/song.actions';
import {AuthState} from '../../ngrx/auth/auth.state'; // Import service để upload ảnh
import {AuthModel} from '../../models/auth.model';
import {SongState} from '../../ngrx/song/song.state';
import {MaterialModule} from '../../shared/material.module';
import {MatDialog} from '@angular/material/dialog';
import {
  DeletePlaylistDialogComponent
} from '../../shared/components/delete-playlist-dialog/delete-playlist-dialog.component';
import {LoginComponent} from '../../shared/components/login/login.component';
import * as QueueActions from '../../ngrx/queue/queue.actions';
import {SongService} from '../../services/song/song.service';
import * as PlayActions from '../../ngrx/play/play.actions';
import {PlayState} from '../../ngrx/play/play.state';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  standalone: true,
  imports: [AsyncPipe, LoadingComponent, MusicTabComponent, MaterialModule, LoginComponent],
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  songListPlaylist: SongModel[] = [];
  songListPlaylist$: Observable<SongModel[]>;
  playlistDetail$: Observable<PlaylistModel>;
  playlistDetail!: PlaylistModel;
  subscriptions: Subscription[] = [];
  isLoadingPlaylistDetail$: Observable<boolean>;
  isLoadingSongListPlaylist$: Observable<boolean>;
  auth$ !: Observable<AuthModel | null>; // Thêm auth$ để lấy thông tin auth
  authData !: AuthModel
  play$!: Observable<boolean>;
  listSongsIdPlaylist$!: Observable<string[]>;
  listSongIdPlaylist: string[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef; // Thêm ViewChild để truy cập file input

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private songService: SongService,
    private store: Store<{
      playlist: PlaylistState,
      auth: AuthState,
      song: SongState
      play: PlayState
    }>,
  ) {
    this.playlistDetail$ = this.store.select((state) => state.playlist.playlistDetail);
    this.isLoadingPlaylistDetail$ = this.store.select('playlist','isLoadingDetail');
    this.isLoadingSongListPlaylist$ = this.store.select('song', 'isLoadingPlaylist');
    this.auth$ =  this.store.select('auth','authData')
    this.songListPlaylist$ = this.store.select('song', "songPlaylist")
    this.play$ = this.store.select('play', 'isPlaying');
    this.listSongsIdPlaylist$ = this.store.select('playlist', 'listSongsIdAllPlaylist');

  }

  goBack() {
    this.location.back();
  }


  ngOnInit() {
    this.subscriptions.push(
      this.auth$.subscribe(auth => {
        if (auth?.idToken) {
          this.authData = auth;
          this.activatedRoute.params.subscribe((params) => {
            const id = params['id'];
            if (id && this.authData.idToken) {
                this.store.dispatch(PlaylistActions.getPlaylistById({ id: id, idToken: this.authData.idToken }));
              this.store.dispatch(SongActions.getSongsByPlaylist({ playlistId: id, idToken: this.authData.idToken }));
            }
          });
        }
      }),
      this.listSongsIdPlaylist$.subscribe(songIdList => {
        if (songIdList.length > 0 && this.listSongIdPlaylist.length != songIdList.length) {
          this.listSongIdPlaylist = songIdList;
          console.log('List song id:', songIdList);

        }
      }),



      this.songListPlaylist$.subscribe((songList) => {
        if (songList.length > 0) { // Kiểm tra nếu songList có dữ liệu
          this.songListPlaylist = songList;
          console.log('Song List Playlist:', this.songListPlaylist); // Log để kiểm tra dữ liệu
        }
      }),

      this.playlistDetail$.subscribe((playlistDetail) => {
        if (playlistDetail.id) { // Kiểm tra nếu playlistDetail có dữ liệu
          this.playlistDetail = playlistDetail;

          console.log('Playlist Detail:', this.playlistDetail); // Log để kiểm tra dữ liệu
        }
      })
    );
  }

  openDialog() {
    const dialogRef =this.dialog.open(DeletePlaylistDialogComponent, {
      data: {
        playlistDetail: this.playlistDetail,
        auth: this.authData
      },
    });


  }

  playListSong(){

    if(this.authData.idToken){
      this.store.dispatch(QueueActions.createQueueWithPlaylist({
        playlistId: this.playlistDetail.id,
        idToken: this.authData.idToken,
      }))

      this.songService.setCurrentSong(
        this.songListPlaylist[0]
      );

      this.store.dispatch(PlayActions.play())
    }
  }


  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PlaylistActions.clearPlaylistDetail());
  }
}
