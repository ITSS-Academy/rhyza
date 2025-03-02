import { Component } from '@angular/core';
import {MaterialModule} from './shared/material.module';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';
import {CategoryComponent} from './page/category/category.component';
import {MusicBarComponent} from './shared/components/music-bar/music-bar.component';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {AuthState} from './ngrx/auth/auth.state';
import {AuthModel} from './models/auth.model';
import * as AuthActions from './ngrx/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialModule, SidebarComponent, RouterOutlet, MusicBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rhyza';

  constructor(
    private auth:Auth,
    private store: Store<{ auth: AuthState }>
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if(user){
        const token = await user?.getIdToken();
        this.store.dispatch(AuthActions.getAuth({ idToken: token }));

        console.log(token);
        const authData:AuthModel = {
          idToken: token,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }
        this.store.dispatch(AuthActions.storeAuth({authData: authData}));
      }
    });

  }

}
