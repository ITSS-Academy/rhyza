import { Component } from '@angular/core';
import {MaterialModule} from './shared/material.module';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';
import {MusicBarComponent} from './shared/components/music-bar/music-bar.component';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {AuthState} from './ngrx/auth/auth.state';
import {AuthModel} from './models/auth.model';
import * as AuthActions from './ngrx/auth/auth.actions';
import * as CategoryActions from './ngrx/category/category.action';
import * as ArtistActions from './ngrx/artist/artist.actions';
import {CategoryState} from './ngrx/category/category.state';
import {ArtistState} from './ngrx/artist/artist.state';
import {Observable} from 'rxjs';
import * as PlaylistActions from './ngrx/playlist/playlist.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialModule, SidebarComponent, RouterOutlet, MusicBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rhyza';

  loadingCategories$ !: Observable<boolean>
  loadingArtist$ !: Observable<boolean>
  constructor(
    private auth:Auth,
    private store: Store<{
      auth: AuthState
      category: CategoryState
      artist: ArtistState
    }>

  ) {
    this.loadingArtist$ = this.store.select('artist', 'isLoading');
    this.loadingCategories$ = this.store.select('category', 'isLoading');
    onAuthStateChanged(this.auth, async (user) => {
      if(user){
        const token = await user?.getIdToken();
        this.store.dispatch(AuthActions.getAuth({ idToken: token }));

        console.log(token);
        const authData:AuthModel = {
          uid: user.uid,
          idToken: token,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }
        this.store.dispatch(AuthActions.storeAuth({authData: authData}));
        this.store.dispatch(PlaylistActions.getPlaylist({
          idToken: token,
          uid: user.uid
        }))

        this.store.dispatch(PlaylistActions.getListSongIdByUid({
          idToken: token,
          uid: user.uid
        }))
      }

    });

    this.store.dispatch(CategoryActions.getCategories())
    this.store.dispatch(ArtistActions.getArtistList());


  }

}
