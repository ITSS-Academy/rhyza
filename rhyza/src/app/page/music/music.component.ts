import { Component } from '@angular/core';
import {MaterialModule} from '../../shared/material.module';


@Component({
  selector: 'app-music',
  standalone: true,
  imports: [
 MaterialModule
  ],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})
export class MusicComponent {

}
