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

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "rhyza-732bd",
        appId: "1:267476653919:web:32695aa7d1ca95cac008ea",
        storageBucket: "rhyza-732bd.firebasestorage.app",
        apiKey: "AIzaSyCvq4oNxLQwtTBSoDOIoaLFMOptTe-h6G0",
        authDomain: "rhyza-732bd.firebaseapp.com",
        messagingSenderId: "267476653919"
      })
    ),
    provideAuth(() => getAuth()),
    provideStore({
      song: songReducer,
      auth: authReducer
    }),
    provideEffects(SongEffects, AuthEffects)
  ]
};
