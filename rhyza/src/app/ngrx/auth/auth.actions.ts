import {createAction, props} from '@ngrx/store';
import {AuthModel} from '../../models/auth.model';


export const login = createAction('[Auth] Login');
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFailure = createAction('[Auth] Login Failure',  props<{ error: any }>(),);

//storeAuth
export const storeAuth = createAction('[Auth] Store Auth', props<{ authData: AuthModel }>());

export const logout = createAction('[Auth] Logout');
