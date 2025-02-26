import {Component, Input} from '@angular/core';

import {SongModel} from '../../../models/song.model';
import {MusicService} from '../../../services/music.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-artist-home',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './artist-home.component.html',
  styleUrl: './artist-home.component.scss'
})
export class ArtistHomeComponent {
  @Input() nameArtist="";
  @Input() nameSong="";
  @Input() image="";
  @Input() id= 0;

  constructor(
    private musicService: MusicService,
  ) {
  }

}
