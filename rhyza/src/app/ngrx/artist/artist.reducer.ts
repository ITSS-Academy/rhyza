import {ArtistState} from './artist.state';
import {ArtistModel} from '../../models/artist.model';
import {createReducer, on} from '@ngrx/store';
import * as ArtistActions from './artist.actions';

export  const initialState: ArtistState = {
  artistDetail: <ArtistModel>{},
  artistList: <ArtistModel[]> [],
  isLoading: false,
  isLoadingDetail: false,
  error: null,
}

export const artistReducer = createReducer(
  initialState,

  on(ArtistActions.getArtistList, (state,{type}) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(ArtistActions.getArtistListSuccess, (state, {artistList, type}) => {
    console.log( type);
    return <ArtistState>{
      ...state,
      artistList: artistList,
      isLoading: false,
    };
  }),

  on(ArtistActions.getArtistListFailure, (state, {error, type}) => {
    console.log(type);
    console.log(error);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),


  //get artist by id
  on(ArtistActions.getArtistById, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isLoadingDetail: true,
    };
  }),

  on(ArtistActions.getArtistByIdSuccess, (state, {artistDetail, type}) => {
    console.log( type);
    return <ArtistState>{
      ...state,
      artistDetail: artistDetail,
      isLoadingDetail: false,
    };
  }),

  on(ArtistActions.getArtistByIdFailure, (state, {error, type}) => {
    console.log(type);
    console.log(error);
    return {
      ...state,
      error: error,
      isLoadingDetail: false,
    };
  }),

  //clear artist detail
  on(ArtistActions.clearArtistDetail, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      artistDetail: <ArtistModel>{},
    };
  }),
)
