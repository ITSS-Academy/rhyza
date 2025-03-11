import {createAction, props} from '@ngrx/store';


//create a queue with song id
export const createQueue = createAction(
  '[Queue] Create Queue',props<{songId: string, uid: string, idToken: string}>());

export const createQueueSuccess = createAction(
  '[Queue] Create Queue Success',);

export const createQueueFailure = createAction(
  '[Queue] Create Queue Failure',props<{error: any}>());


//create a queue with song playlist

export const createQueueWithPlaylist = createAction(
  '[Queue] Create Queue With Playlist',props<{playlistId: string, idToken: string}>());

export const createQueueWithPlaylistSuccess = createAction(
  '[Queue] Create Queue With Playlist Success',);

export const createQueueWithPlaylistFailure = createAction(
  '[Queue] Create Queue With Playlist Failure',props<{error: any}>());


//create a queue with song playlist random

export const createQueueWithPlaylistRandom = createAction(
  '[Queue] Create Queue With Playlist Random',props<{playlistId: string, idToken: string}>());

export const createQueueWithPlaylistRandomSuccess = createAction(
  '[Queue] Create Queue With Playlist Random Success',);

export const createQueueWithPlaylistRandomFailure = createAction(
  '[Queue] Create Queue With Playlist Random Failure',props<{error: any}>());

//delete song in queue
export const deleteSongInQueue = createAction(
  '[Queue] Delete Song In Queue',props<{uid:string,songId: string, idToken: string}>());

export const deleteSongInQueueSuccess = createAction(
  '[Queue] Delete Song In Queue Success',);

export const deleteSongInQueueFailure = createAction(
  '[Queue] Delete Song In Queue Failure',props<{error: any}>());

export const clearQueue = createAction(
  '[Queue] Clear Queue',);

