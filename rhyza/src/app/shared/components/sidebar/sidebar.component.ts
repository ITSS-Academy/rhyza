import {Component, OnInit} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {NavigationEnd, Router} from '@angular/router';
import {NgClass, NgForOf} from '@angular/common';
import {filter} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{

  activeLink = '';

  constructor(private router: Router) {
  }
  menuItems = [
      { label: 'Music', icon: 'graphic_eq', route: '/music' },
      { label: 'Category', icon: 'category', route: '/category' },
      { label: 'Artist', icon: 'artist', route: '/artist' },
      { label: 'Playlist', icon: 'queue_music', route: '/playlist' },
      { label: 'Upload', icon: 'cloud_upload', route: '/upload' }
    ];

    navigate(route: string) {
      this.router.navigate([route]);
      this.activeLink=route;

    }

  ngOnInit(): void {
       this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
              this.setActiveLink();
              console.log(this.router.url);

            });
  }

   setActiveLink(): void {
     if (this.router.url.includes('/home')) {
        this.activeLink = this.menuItems[0].route;
        console.log(this.activeLink);
      } else if (this.router.url.includes('/category')) {
       this.activeLink = this.menuItems[1].route;
     }else if (this.router.url.includes('/artist')) {
       this.activeLink = this.menuItems[2].route;
     }else if (this.router.url.includes('/playlist')) {
        this.activeLink = this.menuItems[3].route;
     }else if(this.router.url.includes('/upload')) {
       this.activeLink = this.menuItems[4].route;
     }else if (this.router.url.includes('/')) {
       this.activeLink = this.menuItems[0].route;
     }
    }
   }

