import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SearchState} from '../../../../ngrx/search/search.state';
import {Observable, Subscription} from 'rxjs';
import {SearchModel} from '../../../../models/search.model';
import {ArtistsComponent} from '../../../../shared/components/artists/artists.component';
import {MusicTabComponent} from '../../../../shared/components/music-tab/music-tab.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {AsyncPipe} from '@angular/common';
import {LoadingComponent} from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-search-all',
  standalone: true,
  imports: [
    ArtistsComponent,
    MusicTabComponent,
    MatProgressSpinner,
    AsyncPipe,
    LoadingComponent
  ],
  templateUrl: './search-all.component.html',
  styleUrl: './search-all.component.scss'
})
export class SearchAllComponent implements OnInit {


  searchAll$ !: Observable<SearchModel>;
  subscriptions : Subscription[] = [];
  searchAll: SearchModel | null = null;
  isLoading$!: Observable<boolean>
  constructor(private store: Store<{
    search: SearchState
  }>) {
    this.searchAll$ = this.store.select('search','search');
    this.isLoading$ = this.store.select('search','isLoading');
  }

  ngOnInit() {
    this.subscriptions.push(
      this.searchAll$.subscribe((search) => {
        if (search.artists || search.categories || search.songs) {
          this.searchAll = search;
          console.log(this.searchAll);
        }
      }),
      this.isLoading$.subscribe((isLoading) => {
        console.log(isLoading);
      })
    )
  }
}
