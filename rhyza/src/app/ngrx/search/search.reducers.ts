import { SearchState } from './search.state';
import { SongModel } from '../../models/song.model';
import { CategoryModel } from '../../models/category.model';
import { createReducer, on } from '@ngrx/store';
import * as SearchActions from './search.actions';
import {ArtistModel} from '../../models/artist.model';

export const initialState: SearchState = {
  search: {
    songs: <SongModel[]>[],
    artists: <ArtistModel[]>[],
    categories: <CategoryModel[]>[],
  },
  isLoading: false,
  error: null,
};

export const searchReducer = createReducer(
  initialState,

  on(SearchActions.searchAll, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(SearchActions.searchAllSuccess, (state, { search, type }) => {
    console.log(type);
    console.log(search);
    return {
      ...state,
      search: search,
      isLoading: false,
    };
  }),

  on(SearchActions.searchAllFailure, (state, { error, type }) => {
    console.log(type);
    console.log(error);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),
);
