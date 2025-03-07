import {PlaylistState} from './playlist.state';
import {PlaylistModel} from '../../models/playlist.model';
import {createReducer, on} from '@ngrx/store';
import * as PlaylistActions from './playlist.actions';

export const initialState: PlaylistState = {
    playlistDetail: <PlaylistModel>{},
    playlistList: <PlaylistModel[]>[],
    isLoading: false,
    error: null

}


export const playlistReducer = createReducer(
  initialState,

  //create playlist
  on(PlaylistActions.createPlaylist, (state,{type}) => {
    console.log(type)
    return{
      ...state,
      isLoading: true
    }
  }),

  on(PlaylistActions.createPlaylistSuccess, (state,{playlist, type}) => {
    console.log(type)
    console.log(playlist)
    return <PlaylistState>{
      ...state,
      playlistList: [...state.playlistList, playlist],
      isLoading: false
    }
  }),


  on(PlaylistActions.createPlaylistFailure, (state,{error, type}) => {
    console.log(type)
    console.log(error)
    return{
      ...state,
      error: error,
      isLoading: false
    }
  }),


  //get playlist by uid

  on(PlaylistActions.getPlaylist, (state,{type}) => {
    console.log(type)
    return{
      ...state,
      isLoading: true
    }
  }),

  on(PlaylistActions.getPlaylistSuccess, (state,{playlistList, type}) => {
    console.log(type)
    console.log(playlistList)
    return <PlaylistState>{
      ...state,
      playlistList: playlistList,
      isLoading: false
    }
  }),

  on(PlaylistActions.getPlaylistFailure, (state,{error, type}) => {
    console.log(type)
    console.log(error)
    return{
      ...state,
      error: error,
      isLoading: false
    }
  }),
)
