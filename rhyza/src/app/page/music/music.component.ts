import { Component } from '@angular/core';
import {MaterialModule} from '../../shared/material.module';
import {ArtistComponent} from '../artist/artist.component';


@Component({
  selector: 'app-music',
  standalone: true,
  imports: [
    MaterialModule,
    ArtistComponent
  ],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})
export class MusicComponent {

}
