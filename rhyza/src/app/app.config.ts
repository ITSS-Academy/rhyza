import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {songReducer} from './ngrx/song/song.reducers';
import * as SongEffects from './ngrx/song/song.effect';
import {provideHttpClient} from '@angular/common/http';
import {authReducer} from './ngrx/auth/auth.reducer';
import * as AuthEffects from './ngrx/auth/auth.effect';
import {environment} from '../environments/environment';
import {playReducer} from './ngrx/play/play.reducer';
import {categoryReducer} from './ngrx/category/category.reducer';
import * as CategoryEffects from './ngrx/category/category.effect';
import {artistReducer} from './ngrx/artist/artist.reducer';
import * as ArtistEffects from './ngrx/artist/artist.effect';
import {queueReducer} from './ngrx/queue/queue.reducers';
import  * as QueueEffects from './ngrx/queue/queue.effects'
import {playlistReducer} from './ngrx/playlist/playlist.reducer';
import  * as PlaylistEffect from './ngrx/playlist/playlist.effects'
import {searchReducer} from './ngrx/search/search.reducers';
import * as SearchEffects from './ngrx/search/search.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp(environment.firebaseConfig)
    ),
    provideAuth(() => getAuth()),
    provideStore({
      song: songReducer,
      auth: authReducer,
      play: playReducer,
      artist: artistReducer,
      category: categoryReducer,
      queue: queueReducer,
      playlist: playlistReducer,
      search: searchReducer
    }),
    provideEffects(SongEffects, AuthEffects, ArtistEffects, CategoryEffects,QueueEffects, PlaylistEffect, SearchEffects )
  ]
};
