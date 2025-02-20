import { Component } from '@angular/core';
import {MaterialModule} from './shared/material.module';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialModule, SidebarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rhyza';
}
