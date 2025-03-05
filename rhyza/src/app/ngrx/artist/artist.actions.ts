import {createAction, props} from '@ngrx/store';
import {ArtistModel} from '../../models/artist.model';

export const getArtistList = createAction('[Artist] Get Artist List' )

export const getArtistListSuccess = createAction('[Artist] Get Artist List Success',
  props<{ artistList: ArtistModel[] }>(),)

export const getArtistListFailure = createAction('[Artist] Get Artist List Failure',
  props<{ error: any }>(),)
