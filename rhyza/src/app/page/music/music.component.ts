import { Component } from '@angular/core';
import {MusicCardComponent} from '../../shared/components/music-card/music-card.component';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [
    MusicCardComponent
  ],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})
export class MusicComponent {

}
