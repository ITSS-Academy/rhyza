import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import * as AuthActions from './auth.actions';
import {catchError, map, of, switchMap} from 'rxjs';


export const login = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.login),
      switchMap(() => {
        return authService.loginWithGoogle().pipe(
          map(() => AuthActions.loginSuccess())
        )
      }),
      catchError((error) => {
        return of(AuthActions.loginFailure({error: error.message}))
      })
    )
  },
  {functional: true},
)
