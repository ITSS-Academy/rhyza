import {createAction, props} from '@ngrx/store';
import {PlaylistModel} from '../../models/playlist.model';

export const createPlaylist = createAction(
  '[Playlist] Create Playlist', props<{ playlist: PlaylistModel, idToken: string}>()
)

export const createPlaylistSuccess = createAction(
  '[Playlist] Create Playlist Success', props<{ playlist: PlaylistModel }>()
)

export const createPlaylistFailure = createAction(
  '[Playlist] Create Playlist Failure', props<{ error: any }>()
)


export const getPlaylist = createAction(
  '[Playlist] Get Playlist', props<{ uid: string ,idToken: string }>()
)

export const getPlaylistSuccess = createAction(
  '[Playlist] Get Playlist Success', props<{ playlistList: PlaylistModel[] }>()
)

export const getPlaylistFailure = createAction(
  '[Playlist] Get Playlist Failure', props<{ error: any }>()
)


export const addSongToPlaylist =  createAction(
  '[Playlist] Add Song To Playlist', props<{ playlistId: string, songId: string,uid: string, idToken: string }>()
)

export const addSongToPlaylistSuccess = createAction(
  '[Playlist] Add Song To Playlist Success', props<{ playlist: PlaylistModel }>()
)

export const addSongToPlaylistFailure = createAction(
  '[Playlist] Add Song To Playlist Failure', props<{ error: any }>()
)

export const removeSongFromPlaylist = createAction(
  '[Playlist] Remove Song From Playlist', props<{ playlistId: string, songId: string,uid: string, idToken: string }>()
)

export const removeSongFromPlaylistSuccess = createAction(
  '[Playlist] Remove Song From Playlist Success', props<{ playlist: PlaylistModel }>()
)

export const removeSongFromPlaylistFailure = createAction(
  '[Playlist] Remove Song From Playlist Failure', props<{ error: any }>()
)

export const deletePlaylist = createAction(
  '[Playlist] Delete Playlist', props<{ playlistId: string, uid: string, idToken: string }>()
)

export const deletePlaylistSuccess = createAction(
  '[Playlist] Delete Playlist Success'
)

export const deletePlaylistFailure = createAction(
  '[Playlist] Delete Playlist Failure', props<{ error: any }>()
)
