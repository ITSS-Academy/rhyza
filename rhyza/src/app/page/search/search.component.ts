// src/app/page/search/search.component.ts
import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {MaterialModule} from '../../shared/material.module';
import {debounceTime, filter, Subject, Subscription} from 'rxjs';
import * as SearchActions from '../../ngrx/search/search.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    RouterOutlet,
    MaterialModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  subscription: Subscription[] = [];
  searchSubject = new Subject<string>();

  activeLink: string = '';
  constructor(private router: Router, private store: Store) {

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setActiveLink();
      })
    this.setActiveLink()
  }

  ngOnInit() {

  this.subscription.push(
    this.searchSubject.pipe(debounceTime(3000)).subscribe((query) => {
      console.log(query);
      this.store.dispatch(SearchActions.searchAll({ query }));
    }),

  )



  }

  search = [
    {
      name: 'All',
      route: 'search-all',
    },
    {
      name: 'Songs',
      route: 'search-song',
    },
    {
      name: 'Artists',
      route: 'search-artists',
    },
  ];

  setActiveLink(): void {
    if (this.router.url.includes('/search-all')) {
      this.activeLink = this.search[0].route;
      console.log(this.activeLink);
    } else if (this.router.url.includes('/search-song')) {
      this.activeLink = this.search[1].route;
    } else if (this.router.url.includes('/search-artists')) {
      this.activeLink = this.search[2].route;
    }
  }

  navigate(route: string) {
    const targetRoute = `/search/${route}`;
    if (this.activeLink !== route) {
      this.router.navigate([targetRoute]);
      this.activeLink = route;
    }
  }

  onSelectionChange(event: any, route: string) {
    if (!event.selected) {
      event.source.selected = true;
    }
    this.navigate(route);
  }

  onValueChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    this.searchSubject.next(query);
    console.log('Search query:', query);
  }

  onEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    if (keyboardEvent.key === 'Enter') {
      console.log('Enter');
      this.store.dispatch(SearchActions.searchAll({ query }));
    }
  }
}
