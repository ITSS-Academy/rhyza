import {ArtistState} from './artist.state';
import {ArtistModel} from '../../models/artist.model';
import {createReducer, on} from '@ngrx/store';
import * as ArtistActions from './artist.actions';

export  const initialState: ArtistState = {
  artistDetail: <ArtistModel>{},
  artistList: <ArtistModel[]> [],
  isLoading: false,
  error: null,
}

export const artistReducer = createReducer(
  initialState,

  on(ArtistActions.getArtistList, (state,{type}) => {
    console.log("get loading");
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(ArtistActions.getArtistListSuccess, (state, {artistList, type}) => {
    console.log(artistList, type);
    return <ArtistState>{
      ...state,
      artistList: artistList,
      isLoading: false,
    };
  }),

  on(ArtistActions.getArtistListFailure, (state, {error, type}) => {
    console.log("get failure");
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  })
)
