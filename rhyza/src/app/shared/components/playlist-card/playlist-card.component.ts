import {Component, Input} from '@angular/core';
import {PlaylistModel} from '../../../models/playlist.model';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-playlist-card',
  standalone: true,
  imports: [
    MatCard
  ],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss'
})
export class PlaylistCardComponent {
  @Input() item?: PlaylistModel;

}
