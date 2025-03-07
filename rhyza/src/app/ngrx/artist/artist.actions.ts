import {createAction, props} from '@ngrx/store';
import {ArtistModel} from '../../models/artist.model';

export const getArtistList = createAction('[Artist] Get Artist List' )

export const getArtistListSuccess = createAction('[Artist] Get Artist List Success',
  props<{ artistList: ArtistModel[] }>(),)

export const getArtistListFailure = createAction('[Artist] Get Artist List Failure',
  props<{ error: any }>(),)

export const getArtistById = createAction('[Artist] Get Artist By Id',props<{ id: string }>(),)
export const getArtistByIdSuccess = createAction('[Artist] Get Artist By Id Success', props<{ artistDetail: ArtistModel }>(),)
export const getArtistByIdFailure = createAction('[Artist] Get Artist By Id Failure', props<{ error: any }>(),)


export const clearArtistDetail = createAction('[Artist] Clear Artist Detail')
