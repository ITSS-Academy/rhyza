import {QueueState} from './queue.state';
import {createReducer, on} from '@ngrx/store';
import * as queueActions from './queue.actions';

export const initialState: QueueState = {
  isCreating: false,
  isCreateSuccess: false,
  error: null
};


export const queueReducer = createReducer(
  initialState,

  on(queueActions.createQueue ,(state,{type}) =>{
    console.log(type)
    return {
      ...state,
      isCreating: true,
      isCreateSuccess: false,
      error: null
    }
  }),

  on(queueActions.createQueueSuccess, (state,{type}) => {
    console.log(type)
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: true,
      error: null
    }
  }),

  on(queueActions.createQueueFailure, (state, {error,type}) => {
    console.log(type)
    console.log(error)
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: false,
      error: error
    }
  }),


  //create queue with playlist

  on(queueActions.createQueueWithPlaylist, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isCreating: true,
      isCreateSuccess: false,
      error: null
    }
  }),

  on(queueActions.createQueueWithPlaylistSuccess, (state,{type}) => {
    console.log(type)
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: true,
      error: null
    }
  }),


  on(queueActions.createQueueWithPlaylistFailure, (state, {error,type}) => {
    console.log(type)
    console.log(error)
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: false,
      error: error
    }
  }),

  //create queue with playlist random

  on(queueActions.createQueueWithPlaylistRandom, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isCreating: true,
      isCreateSuccess: false,
      error: null
    }
  }),


  on(queueActions.createQueueWithPlaylistRandomSuccess, (state,{type}) => {
    console.log(type)
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: true,
      error: null
    }
  }),


  on(queueActions.createQueueWithPlaylistRandomFailure, (state, {error,type}) => {
    console.log(type)
    console.log(error)
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: false,
      error: error
    }
  }),


  //delete song in queue

  on(queueActions.deleteSongInQueue, (state, {type}) => {
    console.log(type)
    return {
      ...state,
      isCreating: true,
      isCreateSuccess: false,
      error: null
    }
  }),


  on(queueActions.deleteSongInQueueSuccess, (state,{type}) => {
    console.log(type)
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: true,
      error: null
    }
  }),

  on(queueActions.deleteSongInQueueFailure, (state, {error,type}) => {
    console.log(type)
    console.log(error)
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: false,
      error: error
    }
  }),


  on(queueActions.clearQueue,(state,{type}) =>{
    console.log(type)
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: false,
      error: null
    }
}),
)


