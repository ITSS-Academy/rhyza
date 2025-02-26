import { Component } from '@angular/core';
import {MaterialModule} from './shared/material.module';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';
import {CategoryComponent} from './page/category/category.component';
import {MusicBarComponent} from './shared/components/music-bar/music-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialModule, SidebarComponent, RouterOutlet, CategoryComponent, MusicBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rhyza';

}
