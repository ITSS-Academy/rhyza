import {Component, inject, OnInit} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {NavigationEnd, Router} from '@angular/router';
import {NgClass, NgForOf} from '@angular/common';
import {filter, Observable, Subscription} from 'rxjs';
import * as AuthActions from '../../../ngrx/auth/auth.actions';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../ngrx/auth/auth.state';
import {AuthModel} from '../../../models/auth.model';
import * as SongActions from '../../../ngrx/song/song.actions';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{

  activeLink = '';

  authData$ !:Observable<AuthModel|null>;
  subscription: Subscription[] = [];
  authData!: AuthModel |  null;

  constructor(private router: Router, private store: Store<{
    auth:AuthState
  }>
  ) {
    this.authData$ = store.select('auth','authData');
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setActiveLink();
      });
    this.setActiveLink();
  }
  menuItems = [
      { label: 'Music', icon: 'graphic_eq', route: '/music' },
      { label: 'Category', icon: 'category', route: '/category' },
      { label: 'Artist', icon: 'person', route: '/artist' },
      { label: 'Playlist', icon: 'queue_music', route: '/playlist' },
      { label: 'Upload', icon: 'cloud_upload', route: '/upload' }
    ];

    navigate(route: string) {
      this.router.navigate([route]);
      this.activeLink=route;

    }

  ngOnInit(): void {




    this.subscription.push(
          this.authData$.subscribe((authData) => {
            if (authData?.idToken) {
              this.authData = authData;
            }
          })
       );
  }

   setActiveLink(): void {
     if (this.router.url.includes('/music')) {
        this.activeLink = this.menuItems[0].route;

      } else if (this.router.url.includes('/category')) {
       this.activeLink = this.menuItems[1].route;
     }else if (this.router.url.includes('/artist')) {
       this.activeLink = this.menuItems[2].route;
     }else if (this.router.url.includes('/playlist')) {
        this.activeLink = this.menuItems[3].route;
     }else if(this.router.url.includes('/upload')) {
       this.activeLink = this.menuItems[4].route;
     }else if (this.router.url.includes('/search')) {
       this.activeLink = '';
     } else if (this.router.url.includes('/')) {
       this.activeLink = this.menuItems[0].route;
     }
    }

    login(){
      this.store.dispatch(AuthActions.login());
    }

    logOut(){
      this.store.dispatch(AuthActions.clearState());
      this.store.dispatch(AuthActions.logout());
      this.authData = null;
      this.store.dispatch(SongActions.clearSongQueue());
      this.router.navigate(['/music']);

    }

    navigateToSearch(){
      this.router.navigate(['/search']);
    }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src =
      'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg';
  }




}

