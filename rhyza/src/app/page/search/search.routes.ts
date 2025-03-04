import { Routes } from '@angular/router';
import { SearchComponent } from './search.component';

export const SEARCH_ROUTES: Routes = [
  {
    path: '',
    component: SearchComponent,
    children: [
      {
        path: 'search-all',
        loadComponent: () =>
          import('./components/search-all/search-all.component').then(
            (m) => m.SearchAllComponent,
          ),
      },
      {
        path: 'search-song',
        loadComponent: () =>
          import('./components/search-songs/search-songs.component').then(
            (m) => m.SearchSongsComponent,
          ),
      },
      {
        path: 'search-artists',
        loadComponent: () =>
          import('./components/search-artists/search-artists.component').then(
            (m) => m.SearchArtistsComponent,
          ),
      },
      {
        path: '',
        redirectTo: 'search-all',
        pathMatch: 'full',
      },
    ],
  },
];
