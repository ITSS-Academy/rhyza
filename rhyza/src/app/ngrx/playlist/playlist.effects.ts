import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { PlaylistService } from '../../services/playlist/playlist.service';
import * as PlaylistActions from './playlist.actions';

export const createPlaylist$ = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.createPlaylist),
      exhaustMap((action) =>
        playlistService.createPlaylist(action.playlist, action.idToken).pipe(
          map((playlist) => PlaylistActions.createPlaylistSuccess({ playlist })),
          catchError((error) => of(PlaylistActions.createPlaylistFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const getPlaylist$ = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.getPlaylist),
      exhaustMap((action) =>
        playlistService.getPlaylistByUid(action.uid, action.idToken).pipe(
          map((playlistList) => PlaylistActions.getPlaylistSuccess({ playlistList })),
          catchError((error) => of(PlaylistActions.getPlaylistFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const getPlaylistById$ = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.getPlaylistById),
      exhaustMap((action) =>
        playlistService.getPlaylistDetail(action.id, action.idToken).pipe(
          map((playlistDetail) => PlaylistActions.getPlaylistByIdSuccess({ playlistDetail })),
          catchError((error) => of(PlaylistActions.getPlaylistByIdFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);



//add song to playlist
export const addSongToPlaylist = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.addSongToPlaylist),
      exhaustMap((action) =>
        playlistService.addSongToPlaylist(action.playlistId, action.songId, action.uid, action.idToken).pipe(
          map((playlist) => PlaylistActions.addSongToPlaylistSuccess({ playlist })),
          catchError((error) => of(PlaylistActions.addSongToPlaylistFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

//remove song from playlist

export const removeSongFromPlaylist = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.removeSongFromPlaylist),
      exhaustMap((action) =>
        playlistService.removeSongFromPlaylist(action.playlistId, action.songId, action.uid, action.idToken).pipe(
          map((playlist) => PlaylistActions.removeSongFromPlaylistSuccess({ playlist })),
          catchError((error) => of(PlaylistActions.removeSongFromPlaylistFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const deletePlaylist = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.deletePlaylist),
      exhaustMap((action) =>
        playlistService.deletePlaylistById(action.playlistId, action.uid, action.idToken).pipe(
          map((isDeleted) => PlaylistActions.deletePlaylistSuccess({isDeleted: isDeleted})),
          catchError((error) => of(PlaylistActions.deletePlaylistFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

//get all songs id of all playlist by uid
export const getAllSongsIdOfAllPlaylistByUid = createEffect(
  (actions$ = inject(Actions), playlistService = inject(PlaylistService)) => {
    return actions$.pipe(
      ofType(PlaylistActions.getListSongIdByUid),
      exhaustMap((action) =>
        playlistService.getListSongIdByUid(action.uid, action.idToken).pipe(
          map((songId) =>{
            return  PlaylistActions.getListSongIdByUidSuccess({ listSongsIdAllPlaylist: songId })
            }),
          catchError((error) => of(PlaylistActions.getListSongIdByUidFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);
