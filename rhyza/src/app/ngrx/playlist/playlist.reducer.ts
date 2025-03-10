import { PlaylistState } from './playlist.state';
import { PlaylistModel } from '../../models/playlist.model';
import { createReducer, on } from '@ngrx/store';
import * as PlaylistActions from './playlist.actions';
import { SongModel } from '../../models/song.model';

export const initialState: PlaylistState = {
  playlistDetail: {} as PlaylistModel,
  playlistList: [] as PlaylistModel[],
  songList: [] as SongModel[],
  isLoading: false,
  isLoadingDetail: false,
  error: null
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
    playlistDetail,
    isLoadingDetail: false,
  })),

  on(PlaylistActions.getPlaylistByIdFailure, (state, { error }) => ({
    ...state,
    error,
    isLoadingDetail: false,
  })),

  // Xử lý action getSongByPlaylist
  on(PlaylistActions.getSongByPlaylist, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(PlaylistActions.getSongByPlaylistSuccess, (state, { songList }) => ({
    ...state,
    songList,
    isLoading: false,
  })),

  on(PlaylistActions.getSongByPlaylistFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  // Xử lý action clearPlaylistDetail
  on(PlaylistActions.clearPlaylistDetail, (state) => ({
    ...state,
    playlistDetail: {} as PlaylistModel,
    songList: [] as SongModel[],
  }))
);
