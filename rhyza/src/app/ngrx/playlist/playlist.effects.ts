import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {catchError, exhaustMap, map, of} from 'rxjs';
import {PlaylistService} from '../../services/playlist/playlist.service';
import * as PlaylistActions from './playlist.actions'

export const createPlaylist = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.createPlaylist),
      exhaustMap((action) =>
        playlistService.createPlaylist(action.playlist, action.idToken).pipe(
          map((playlist) => PlaylistActions.createPlaylistSuccess({ playlist })),
          catchError((error) => of(PlaylistActions.createPlaylistFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);


export const getPlaylist = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.getPlaylist),
      exhaustMap((action) =>
        playlistService.getPlaylistByUid(action.uid, action.idToken).pipe(
          map((playlistList) => PlaylistActions.getPlaylistSuccess({ playlistList })),
          catchError((error) => of(PlaylistActions.getPlaylistFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);
