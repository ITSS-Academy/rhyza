import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {MaterialModule} from '../../shared/material.module';
import {MusicTabComponent} from '../../shared/components/music-tab/music-tab.component';
import {SongModel} from '../../models/song.model';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {SongState} from '../../ngrx/song/song.state';
import {CategoryState} from '../../ngrx/category/category.state';
import * as SongActions from '../../ngrx/song/song.actions';
import {Observable, Subscription} from 'rxjs';
import {CategoryModel} from '../../models/category.model';
import * as CategoryActions from '../../ngrx/category/category.action';
import {LoadingComponent} from '../../shared/components/loading/loading.component';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';



@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    MaterialModule,
    MusicTabComponent,
    LoadingComponent
  ],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

  songListCategory: SongModel[] = [];
  songListCategory$ !: Observable<SongModel[]>;
  categoryDetail$ !: Observable<CategoryModel>
  categoryDetail !: CategoryModel
  subscriptions: Subscription[] = [];
  isLoadingCategoryDetail$!: Observable<boolean>
  isLoadingSongListCategory$!: Observable<boolean>
  listSongsIdPlaylist$!: Observable<string[]>;
  listSongIdPlaylist: string[] = [];

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      song: SongState;
      category: CategoryState;
      playlist: PlaylistState

    }>
  ) {
    this.songListCategory$ = this.store.select('song', 'songCategory');
    this.categoryDetail$ = this.store.select('category', 'categoryDetail');
    this.isLoadingCategoryDetail$ = this.store.select('category', 'isLoadingDetail');
    this.isLoadingSongListCategory$ = this.store.select('song', 'isLoadingCategory');
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
          this.store.dispatch(SongActions.getSongCategory({
            categoryId: id,
          }));

          this.store.dispatch(CategoryActions.getCategoryById({
            id: id
          }))

        }
      }),

      this.listSongsIdPlaylist$.subscribe(songIdList => {
        if (songIdList.length > 0 && this.listSongIdPlaylist.length != songIdList.length) {
          this.listSongIdPlaylist = songIdList;

        }
      }),

      this.songListCategory$.subscribe((songList) => {
        if (songList.length > 0) {
          this.songListCategory = songList;
        }
      }),

      this.categoryDetail$.subscribe((categoryDetail) => {
        if (categoryDetail) {
          this.categoryDetail = categoryDetail;
        }
      })

    )

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.store.dispatch(SongActions.clearSongCategory());
    this.store.dispatch(CategoryActions.clearCategoryDetail());
  }


}
