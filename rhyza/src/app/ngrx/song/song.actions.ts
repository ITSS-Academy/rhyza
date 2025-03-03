import { createAction, props } from '@ngrx/store';
import { SongModel } from '../../models/song.model';

export const getSongById = createAction(
  '[Song] Get Song Detail',
  props<{ id: string }>(),
);

export const getSongByIdSuccess = createAction(
  '[Song] Get Song Detail Success',
  props<{ songDetail: SongModel }>(),
);

export const getSongByIdFailure = createAction(
  '[Song] Get Song Detail Failure',
  props<{ error: any }>(),
);

//get list of songs

export const getSongList = createAction('[Song] Get Song List');

export const getSongListSuccess = createAction(
  '[Song] Get Song List Success',
  props<{ songList: SongModel[] }>(),
);

export const getSongListFailure = createAction(
  '[Song] Get Song List Failure',
  props<{ error: any }>(),
);


export const createSong = createAction(
  '[Song] Create Song',
  props<{ song: SongModel; idToken: string }>(),
);

export const createSongSuccess = createAction(
  '[Song] Create Song Success',
  props<{ song: SongModel }>(),
);

export const createSongFailure = createAction(
  '[Song] Create Song Failure',
  props<{ error: any }>(),
);

//update views

export const updateSongViews = createAction(
  '[Song] Update Song Views',
  props<{ id: string }>(),
);

export const updateSongViewsSuccess = createAction(
  '[Song] Update Song Views Success',
);

export const updateSongViewsFailure = createAction(
  '[Song] Update Song Views Failure',
  props<{ error: any }>(),
);


//create song history

export const createSongHistory = createAction('[Song] Create Song History', props<{uid:string, songId: string, idToken: string }>());

export const createSongHistorySuccess = createAction('[Song] Create Song History Success');

export const createSongHistoryFailure = createAction('[Song] Create Song History Failure', props<{error: any}>());





//song History
export const getSongHistory = createAction('[Song] Get Song History', props<{uid:string, idToken: string }>());

export const getSongHistorySuccess = createAction('[Song] Get Song History Success', props<{songHistory: SongModel[]}>());

export const getSongHistoryFailure = createAction('[Song] Get Song History Failure', props<{error: any}>());
