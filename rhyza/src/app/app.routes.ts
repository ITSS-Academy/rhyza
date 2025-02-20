import { Routes } from '@angular/router';

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
    path: 'artist',
    loadChildren: () => import('../app/page/artist/artist.routes').then(m => m.ARTIST_ROUTES),
  },
  {
    path: 'playlist',
    loadChildren: () => import('../app/page/playlist/playlist.routes').then(m => m.PLAYLIST_ROUTES),
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
