import {createReducer, on} from '@ngrx/store';
import {SongModel} from './detail.state';

;

export  const initialState DetailState = {
  artistDetail: <SongModel>{},
  artistList: <SongModel[]> [],
  isLoading: false,
  error: null,
}

export const artistReducer = createReducer(
  initialState,

  on(DetailActions.getArtistDetailList, (state,{type}) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(ArtistActions.getArtistListSuccess, (state, {artistList, type}) => {
    console.log(type);
    return <ArtistState>{
      ...state,
      artistList: artistList,
      isLoading: false,
    };
  }),

  on(ArtistActions.getArtistListFailure, (state, {error, type}) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  })
)
