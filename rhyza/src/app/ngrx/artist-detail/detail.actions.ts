import {createAction, props} from '@ngrx/store';
import {SongModel} from '../../models/song.model';


export const getArtistDetailList = createAction('[ArtistDetail] Get Artist Detail List' )

export const getArtistDetailListSuccess = createAction('[ArtistDetail] Get Artist Detail List Success',
  props<{ artistDetailList: SongModel[] }>(),)

export const getArtistDetailListFailure = createAction('[ArtistDetail] Get Artist Detail List Failure',
  props<{ error: any }>(),)

