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

