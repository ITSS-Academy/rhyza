import { SongState } from './song.state';
import { SongModel } from '../../models/song.model';
import { createReducer, on } from '@ngrx/store';
import * as SongActions from './song.actions';

export const initialSongState: SongState = {
  songDetail: <SongModel>{},
  songList: <SongModel[]>[],
  songHistory: <SongModel[]>[],
  songQueue: <SongModel[]>[],
  songCategory: <SongModel[]>[],
  songArtist: <SongModel[]>[],
  songPlaylist: <SongModel[]>[],
  isLoading: false,
  isCreating: false,
  isLoadingArtist: false,
  isLoadingCategory: false,
  isLoadingPlaylist: false,
  error: null,
};

export const songReducer = createReducer(
  initialSongState,
  on(SongActions.getSongById, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(SongActions.getSongByIdSuccess, (state, { songDetail, type }) => {
    console.log(type);
    return <SongState>{
      ...state,
      songDetail: songDetail,
      isLoading: false,
    };
  }),

  on(SongActions.getSongByIdFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),

  on(SongActions.getSongList, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(SongActions.getSongListSuccess, (state, { songList, type }) => {
    console.log(type);
    return <SongState>{
      ...state,
      songList: songList,
      isLoading: false,
    };
  }),

  on(SongActions.getSongListFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),



  on(SongActions.createSong, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreating: true,
    };
  }),

  on(SongActions.createSongSuccess, (state, { song, type }) => {
    console.log(type);
    return <SongState>{
      ...state,
      songDetail: song,
      isCreating: false,
    };
  }),

  on(SongActions.createSongFailure, (state, { error, type }) => {
    console.log(type);
    console.log(error);
    console.log(error.message);
    return {
      ...state,
      error: error,
      isCreating: false,
    };
  }),

  //update views
  on(SongActions.updateSongViews, (state, { type }) => {
    console.log(type);
    return {
      ...state,
    };
  }),

  on(SongActions.updateSongViewsSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
    };
  }),

  on(SongActions.updateSongViewsFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
    };
  }),


  //get song history

  on(SongActions.getSongHistory, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(SongActions.getSongHistorySuccess, (state, { songHistory, type }) => {
    console.log(type);
    return <SongState>{
      ...state,
      songHistory: songHistory,
      isLoading: false,
    };
  }),


  on(SongActions.getSongHistoryFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),



  //create song history

  on(SongActions.createSongHistory, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(SongActions.createSongHistorySuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
    };
  }),

  on(SongActions.createSongHistoryFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),


  //get song queue
  on(SongActions.getSongQueue, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(SongActions.getSongQueueSuccess, (state, { songQueue, type }) => {
    console.log(type);
    return {
      ...state,
      songQueue: songQueue,
      isLoading: false,
    };
  }),

  on(SongActions.getSongQueueFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),

  //get song category
  on(SongActions.getSongCategory, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoadingCategory: true,
    };
  }),

  on(SongActions.getSongCategorySuccess, (state, { songCategory, type }) => {
    console.log(type);
    return {
      ...state,
      songCategory: songCategory,
      isLoadingCategory: false,
    };
  }),

  on(SongActions.getSongCategoryFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoadingCategory: false,
    };
  }),

  on(SongActions.clearSongCategory, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      songCategory: [],
    };
  }),

  //get song artist

  on(SongActions.getSongByArtist, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoadingArtist: true,
    };
  }),

  on(SongActions.getSongByArtistSuccess, (state, { songByArtist, type }) => {
    console.log(type);
    return {
      ...state,
      songArtist: songByArtist,
      isLoadingArtist: false,
    };
  }),

  on(SongActions.getSongByArtistFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoadingArtist: false,
    };
  }),

  on(SongActions.clearSongByArtist, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      songArtist: [],
    };
  }),
  // get song by playlist
  on(SongActions.getSongsByPlaylist, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoadingPlaylist: true,
    };
  }),

  on(SongActions.getSongsByPlaylistSuccess, (state, { songPlaylist, type }) => {
    console.log(type);
    return <SongState>{
      ...state,
      songPlaylist: songPlaylist,
      isLoadingPlaylist: false,
    };
  }),

  on(SongActions.getSongsByPlaylistFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoadingPlaylist: false,
    };
  }),

  on(SongActions.clearSongPlaylist, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      songPlaylist: [],
    };
  }),

  //remove song from playlist
  on(SongActions.removeSongFromPlaylist, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoadingPlaylist: true,
    };
  }),

  on(SongActions.removeSongFromPlaylistSuccess, (state, { songPlaylist, type }) => {
    console.log(type);
    return {
      ...state,
      songPlaylist: songPlaylist,
      isLoadingPlaylist: false,
    };
  }),

  on(SongActions.removeSongFromPlaylistFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoadingPlaylist: false,
    };
  }),

);
