import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SearchState} from '../../../../ngrx/search/search.state';
import {Observable, Subscription} from 'rxjs';
import {SearchModel} from '../../../../models/search.model';

@Component({
  selector: 'app-search-all',
  standalone: true,
  imports: [],
  templateUrl: './search-all.component.html',
  styleUrl: './search-all.component.scss'
})
export class SearchAllComponent implements OnInit {


  searchAll$ !: Observable<SearchModel>;
  subscriptions : Subscription[] = [];
  searchAll: SearchModel | null = null;
  constructor(private store: Store<{
    search: SearchState
  }>) {
    this.searchAll$ = this.store.select('search','search');
  }

  ngOnInit() {
    this.subscriptions.push(
      this.searchAll$.subscribe((search) => {
        if (search.artists || search.categories || search.songs) {
          this.searchAll = search;
          console.log(this.searchAll);
        }
      })
    )
  }
}
