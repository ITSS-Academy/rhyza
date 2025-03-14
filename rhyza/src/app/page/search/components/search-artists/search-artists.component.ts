import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {SearchModel} from '../../../../models/search.model';
import {Store} from '@ngrx/store';
import {SearchState} from '../../../../ngrx/search/search.state';
import {ArtistsComponent} from '../../../../shared/components/artists/artists.component';
import {MusicTabComponent} from '../../../../shared/components/music-tab/music-tab.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {AsyncPipe} from '@angular/common';
import {LoadingComponent} from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-search-artists',
  standalone: true,
  imports: [
    ArtistsComponent,
    AsyncPipe,
    LoadingComponent
  ],
  templateUrl: './search-artists.component.html',
  styleUrl: './search-artists.component.scss'
})
export class SearchArtistsComponent implements OnInit {

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
        if (search.artists.length > 0) {
          this.searchAll = search;
        }
      })
    )
  }
}
