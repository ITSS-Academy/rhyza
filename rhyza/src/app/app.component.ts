import { Component } from '@angular/core';
import {MaterialModule} from './shared/material.module';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';
import {CategoryComponent} from './page/category/category.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialModule, SidebarComponent, RouterOutlet, CategoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rhyza';

}
