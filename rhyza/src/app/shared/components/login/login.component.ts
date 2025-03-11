import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import * as AuthActions from '../../../ngrx/auth/auth.actions';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private store: Store<{ auth: AuthState }>) {}

  login() {
    this.store.dispatch(AuthActions.login());
  }
}
