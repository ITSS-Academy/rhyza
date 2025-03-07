import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {QueueService} from '../../services/queue/queue.service';
import * as QueueActions from '../queue/queue.actions'
import {catchError, exhaustMap, map, of} from 'rxjs';

export const createSong = createEffect(
  (actions$ = inject(Actions), queueService = inject(QueueService)) => {
    return actions$.pipe(
      ofType(QueueActions.createQueue),
      exhaustMap((action) =>
        queueService.createQueue(action.songId,action.uid, action.idToken).pipe(
          map(() => QueueActions.createQueueSuccess()),
          catchError((error) => of(QueueActions.createQueueFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const createSongWithPlaylist = createEffect(
  (actions$ = inject(Actions), queueService = inject(QueueService)) => {
    return actions$.pipe(
      ofType(QueueActions.createQueueWithPlaylist),
      exhaustMap((action) =>
        queueService.createQueueWithPlaylist(action.playlistId, action.idToken).pipe(
          map(() => QueueActions.createQueueWithPlaylistSuccess()),
          catchError((error) => of(QueueActions.createQueueWithPlaylistFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const createSongWithPlaylistRandom = createEffect(
  (actions$ = inject(Actions), queueService = inject(QueueService)) => {
    return actions$.pipe(
      ofType(QueueActions.createQueueWithPlaylistRandom),
      exhaustMap((action) =>
        queueService.createQueueWithPlaylistRandom(action.playlistId, action.idToken).pipe(
          map(() => QueueActions.createQueueWithPlaylistRandomSuccess()),
          catchError((error) => of(QueueActions.createQueueWithPlaylistRandomFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const deleteSong = createEffect(
  (actions$ = inject(Actions), queueService = inject(QueueService)) => {
    return actions$.pipe(
      ofType(QueueActions.deleteSongInQueue),
      exhaustMap((action) =>
        queueService.deleteSongInQueue(action.uid, action.songId, action.idToken).pipe(
          map(() => QueueActions.deleteSongInQueueSuccess()),
          catchError((error) => of(QueueActions.deleteSongInQueueFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);
