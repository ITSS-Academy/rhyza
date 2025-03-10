import { PlaylistState } from './playlist.state';
import { PlaylistModel } from '../../models/playlist.model';
import { createReducer, on } from '@ngrx/store';
import * as PlaylistActions from './playlist.actions';
import { SongModel } from '../../models/song.model';

export const initialState: PlaylistState = {
  playlistDetail: {} as PlaylistModel,
  playlistList: [] as PlaylistModel[],
  listSongsIdAllPlaylist: [] as string[],
  isLoading: false,
  isLoadingDetail: false,
  isDeletedSuccess: false,
  isAddSongSuccess: false,
  error: null,
};

export const playlistReducer = createReducer(
  initialState,

  // Xử lý action createPlaylist
  on(PlaylistActions.createPlaylist, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(PlaylistActions.createPlaylistSuccess, (state, { playlist }) => ({
    ...state,
    playlistList: [...state.playlistList, playlist],
    isLoading: false,
  })),

  on(PlaylistActions.createPlaylistFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  // Xử lý action getPlaylist
  on(PlaylistActions.getPlaylist, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(PlaylistActions.getPlaylistSuccess, (state, { playlistList }) => ({
    ...state,
    playlistList,
    isLoading: false,
  })),

  on(PlaylistActions.getPlaylistFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  // Xử lý action getPlaylistById
  on(PlaylistActions.getPlaylistById, (state) => ({
    ...state,
    isLoadingDetail: true,
  })),

  on(PlaylistActions.getPlaylistByIdSuccess, (state, { playlistDetail }) => ({
    ...state,
    playlistDetail: playlistDetail,
    isLoadingDetail: false,
  })),

  on(PlaylistActions.getPlaylistFailure, (state, { error, type }) => {
    console.log(type);
    console.log(error);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),


  //clear state
  on(PlaylistActions.clearPlaylistDetail, (state,{type}) => {
    console.log(type);
    return {
      ...state,
      playlistDetail: {} as PlaylistModel,
      playlistList: [] as PlaylistModel[],
      isLoading: false,
      isLoadingDetail: false,
      isDetailSuccess: false,
      isAddSongSuccess: false,
      error: null,
    };
  }),

  //delete playlist

  on(PlaylistActions.deletePlaylist, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      isDeletedSuccess: false,
    };
  }),

  on(PlaylistActions.deletePlaylistSuccess, (state, { type, isDeleted }) => {
    console.log(type);
    return <PlaylistState>{
      ...state,
      isLoading: false,
      isDeletedSuccess: isDeleted

    };
  }),

  on(PlaylistActions.deletePlaylistFailure, (state, { error, type }) => {
    console.log(type);
    console.log(error);
    return {
      ...state,
      error: error,
      isLoading: false,
      isDeletedSuccess: false,
    };
  }),

  //add song to playlist

  on(PlaylistActions.addSongToPlaylist, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      isAddSongSuccess: false,
    };
  }),

  on(PlaylistActions.addSongToPlaylistSuccess, (state, { playlist, type }) => {
    console.log(type);
    console.log(playlist);
    return <PlaylistState>{
      ...state,
      playlistDetail: playlist,
      isLoading: false,
      isAddSongSuccess: true,
    };
  }),

  on(PlaylistActions.addSongToPlaylistFailure, (state, { error, type }) => {
    console.log(type);
    console.log(error);
    return {
      ...state,
      error: error,
      isLoading: false,
      isAddSongSuccess: false,
    };
  }),

  //remove song from playlist

  on(PlaylistActions.removeSongFromPlaylist, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(
    PlaylistActions.removeSongFromPlaylistSuccess,
    (state, { playlist, type }) => {
      console.log(type);
      console.log(playlist);
      return <PlaylistState>{
        ...state,
        playlistDetail: playlist,
        isLoading: false,
      };
    }
  ),

  on(
    PlaylistActions.removeSongFromPlaylistFailure,
    (state, { error, type }) => {
      console.log(type);
      console.log(error);
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    }
  ),


  // get song id list all playlist by uid
  on(PlaylistActions.getListSongIdByUid, (state, { type }) => {
    console.log(type);
    return {
      ...state,
    };
  }),

  on(PlaylistActions.getListSongIdByUidSuccess, (state, { listSongsIdAllPlaylist, type }) => {
    console.log(type);
    return <PlaylistState>{
      ...state,
      listSongsIdAllPlaylist: listSongsIdAllPlaylist.songs_Id,
    };
  }),

  on(PlaylistActions.getListSongIdByUidFailure, (state, { error, type }) => {
    console.log(type);
    console.log(error);
    return {
      ...state,
      error: error,
    };
  })

);









