import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MusicTabComponent } from '../../shared/components/music-tab/music-tab.component';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe, Location } from '@angular/common';
import { SongModel } from '../../models/song.model';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SongState } from '../../ngrx/song/song.state';
import { ArtistModel } from '../../models/artist.model';
import { ArtistState } from '../../ngrx/artist/artist.state';
import * as ArtistActions from '../../ngrx/artist/artist.actions';
import * as SongActions from '../../ngrx/song/song.actions';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [
    MusicTabComponent,
    MatIcon,
    AsyncPipe,
    LoadingComponent,
  ],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.scss',
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  songListArtist: SongModel[] = [];
  songListArtist$!: Observable<SongModel[]>;
  artistDetail$!: Observable<ArtistModel>;
  artistDetail!: ArtistModel;
  subscriptions: Subscription[] = [];
  isLoadingArtistDetail$!: Observable<boolean>;
  isLoadingSongListArtist$!: Observable<boolean>;
  listSongsIdPlaylist$!: Observable<string[]>;
  listSongIdPlaylist: string[] = [];

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      song: SongState;
      artist: ArtistState;
      playlist: PlaylistState
    }>
  ) {
    this.artistDetail$ = this.store.select('artist', 'artistDetail');
    this.isLoadingArtistDetail$ = this.store.select(
      'artist',
      'isLoadingDetail'
    );
    this.songListArtist$ = this.store.select('song', 'songArtist');
    this.isLoadingSongListArtist$ = this.store.select(
      'song',
      'isLoadingArtist'
    );
    this.listSongsIdPlaylist$ = this.store.select('playlist', 'listSongsIdAllPlaylist');
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        const id = params['id'];
        if (id) {
          console.log('Artist ID:', id);

          this.store.dispatch(ArtistActions.getArtistById({ id: id }));
          this.store.dispatch(
            SongActions.getSongByArtist({
              artistId: id,
            })
          );
        }
      }),


      this.listSongsIdPlaylist$.subscribe(songIdList => {
        if (songIdList.length > 0 && this.listSongIdPlaylist.length != songIdList.length) {
          this.listSongIdPlaylist = songIdList;
          console.log('List song id:', songIdList);

        }
      }),

      this.songListArtist$.subscribe((songList) => {
        if (songList.length > 0) {
          this.songListArtist = songList;
          console.log('Song list:', songList);
        }
      }),

      this.artistDetail$.subscribe((artistDetail) => {
        if (artistDetail) {
          this.artistDetail = artistDetail;
          console.log('Artist Detail:', artistDetail);
        }
      }),


    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(ArtistActions.clearArtistDetail());
    this.store.dispatch(SongActions.clearSongByArtist());
  }
}
