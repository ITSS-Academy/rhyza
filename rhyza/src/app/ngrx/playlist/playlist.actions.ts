import { createAction, props } from '@ngrx/store';
import { PlaylistModel } from '../../models/playlist.model';
import { SongModel } from '../../models/song.model';

// Action để tạo playlist
export const createPlaylist = createAction(
  '[Playlist] Create Playlist',
  props<{ playlist: PlaylistModel; idToken: string }>()
);

export const createPlaylistSuccess = createAction(
  '[Playlist] Create Playlist Success',
  props<{ playlist: PlaylistModel }>()
);

export const createPlaylistFailure = createAction(
  '[Playlist] Create Playlist Failure',
  props<{ error: any }>()
);

// Action để lấy danh sách playlist
export const getPlaylist = createAction(
  '[Playlist] Get Playlist',
  props<{ uid: string; idToken: string }>()
);

export const getPlaylistSuccess = createAction(
  '[Playlist] Get Playlist Success',
  props<{ playlistList: PlaylistModel[] }>()
);

export const getPlaylistFailure = createAction(
  '[Playlist] Get Playlist Failure',
  props<{ error: any }>()
);

export const addSongToPlaylist = createAction(
  '[Playlist] Add Song To Playlist',
  props<{ playlistId: string; songId: string; uid: string; idToken: string }>()
);

export const addSongToPlaylistSuccess = createAction(
  '[Playlist] Add Song To Playlist Success',
  props<{ playlist: PlaylistModel }>()
);

export const addSongToPlaylistFailure = createAction(
  '[Playlist] Add Song To Playlist Failure',
  props<{ error: any }>()
);

export const removeSongFromPlaylist = createAction(
  '[Playlist] Remove Song From Playlist',
  props<{ playlistId: string; songId: string; uid: string; idToken: string }>()
);

export const removeSongFromPlaylistSuccess = createAction(
  '[Playlist] Remove Song From Playlist Success',
  props<{ playlist: PlaylistModel }>()
);

export const removeSongFromPlaylistFailure = createAction(
  '[Playlist] Remove Song From Playlist Failure',
  props<{ error: any }>()
);

export const deletePlaylist = createAction(
  '[Playlist] Delete Playlist',
  props<{ playlistId: string; uid: string; idToken: string }>()
);

export const deletePlaylistSuccess = createAction(
  '[Playlist] Delete Playlist Success', props<{isDeleted: boolean }>()
);

export const deletePlaylistFailure = createAction(
  '[Playlist] Delete Playlist Failure',
  props<{ error: any }>()
);
// Action để lấy thông tin chi tiết playlist bằng ID
export const getPlaylistById = createAction(
  '[Playlist] Get Playlist By Id',
  props<{ id: string; idToken: string }>()
);

export const getPlaylistByIdSuccess = createAction(
  '[Playlist] Get Playlist By Id Success',
  props<{ playlistDetail: PlaylistModel }>()
);

export const getPlaylistByIdFailure = createAction(
  '[Playlist] Get Playlist By Id Failure',
  props<{ error: any }>()
);

// Action để lấy danh sách bài hát theo playlist ID

// Action để xóa thông tin chi tiết playlist
export const clearPlaylistDetail = createAction(
  '[Playlist] Clear Playlist Detail'
);


//get list song id in all playlist by uid
export const getListSongIdByUid = createAction(
  '[Playlist] Get List Song Id By Uid',
  props<{ uid: string; idToken: string }>()
);

export const getListSongIdByUidSuccess = createAction(
  '[Playlist] Get List Song Id By Uid Success',
  props<{ listSongsIdAllPlaylist: any }>()
);

export const getListSongIdByUidFailure = createAction(
  '[Playlist] Get List Song Id By Uid Failure',
  props<{ error: any }>()
);
