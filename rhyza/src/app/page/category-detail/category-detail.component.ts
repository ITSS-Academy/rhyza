import {Component, OnInit} from '@angular/core';
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



@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    MaterialModule,
    MusicTabComponent
  ],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent implements OnInit{

  songListCategory: SongModel[] = [];
  songListCategory$ !: Observable<SongModel[]>;
  categoryDetail$ !: Observable<CategoryModel>
  categoryDetail !: CategoryModel
  subscriptions: Subscription[] = [];
  isLoadingCategoryDetail$!: Observable<boolean>

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      song: SongState;
      category: CategoryState;
    }>
  ) {
    this.songListCategory$ = this.store.select('song', 'songCategory');
    this.categoryDetail$ = this.store.select('category', 'categoryDetail');
    this.isLoadingCategoryDetail$ = this.store.select('category', 'isLoading');
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {

    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        const id = params['id'];
        if (id) {
          console.log('id:', id);
          this.store.dispatch(SongActions.getSongCategory({
            categoryId: id,
          }));

          this.store.dispatch(CategoryActions.getCategoryById({
            id: id
          }))

        }
      }),

      this.songListCategory$.subscribe((songList) => {
        if (songList.length > 0) {
          this.songListCategory = songList;
          console.log(songList);
        }
      }),

      this.categoryDetail$.subscribe((categoryDetail) => {
        if (categoryDetail) {
          this.categoryDetail = categoryDetail;
          console.log(categoryDetail);
        }
      })

    )

  }



}
