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
export const getSongByPlaylist = createAction(
  '[Song] Get Song By Playlist',
  props<{ playlistId: string; idToken: string }>()
);

export const getSongByPlaylistSuccess = createAction(
  '[Song] Get Song By Playlist Success',
  props<{ songList: SongModel[] }>()
);

export const getSongByPlaylistFailure = createAction(
  '[Song] Get Song By Playlist Failure',
  props<{ error: any }>()
);

// Action để xóa thông tin chi tiết playlist
export const clearPlaylistDetail = createAction('[Playlist] Clear Playlist Detail');
