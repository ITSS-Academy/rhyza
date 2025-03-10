import { Routes } from '@angular/router';
import {ARTIST_DETAIL_ROUTES} from './page/artist-detail/artist-detail.routes';

export const routes: Routes = [
  {
    path: 'music',
    loadChildren: () => import('../app/page/music/music.routes').then(m => m.MUSIC_ROUTES),
  },
  {
    path: 'category',
    loadChildren: () => import('../app/page/category/category.routes').then(m => m.CATEGORY_ROUTES),
  },
  {
    path: 'category-detail/:id',
    loadChildren: () => import('../app/page/category-detail/category-detail.routes').then(m => m.CATEGORY_DETAIL_ROUTES),
  },
  {
    path: 'artist',
    loadChildren: () => import('../app/page/artist/artist.routes').then(m => m.ARTIST_ROUTES),
  },
  {
    path: 'artist-detail/:id',
    loadChildren: () => import('../app/page/artist-detail/artist-detail.routes').then(m => m.ARTIST_DETAIL_ROUTES),
  },
  {
    path: 'playlist',
    loadChildren: () => import('../app/page/playlist/playlist.routes').then(m => m.PLAYLIST_ROUTES),
  },
  {
    path:'playlist-detail/:id',
    loadChildren: () => import('../app/page/playlist-detail/playlist-detail.routes').then(m => m.PLAYLIST_DETAIL_ROUTES),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('../app/page/search/search.routes').then((m) => m.SEARCH_ROUTES),
  },
  {
    path: 'upload',
    loadChildren: () => import('../app/page/upload/upload.routes').then(m => m.UPLOAD_ROUTES),
  },
  {
    path: '',
    redirectTo: 'music',
    pathMatch: 'full',
  },
  {
    path:'**',
    redirectTo: 'music',
  }
];
