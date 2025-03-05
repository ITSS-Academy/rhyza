import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {ArtistService}  from '../../services/artist/artist.service';
import * as ArtistActions from '../artist/artist.actions';
import {catchError, exhaustMap, map, of} from 'rxjs';

export const getListArtists = createEffect(
  (actions$ = inject(Actions), artistService = inject(ArtistService)) => {
    return actions$.pipe(
      ofType(ArtistActions.getArtistList),
      exhaustMap(() =>
        artistService.getAllArtist().pipe(
          map((artistList) => ArtistActions.getArtistListSuccess({ artistList })),
          catchError((error) => of(ArtistActions.getArtistListFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);
