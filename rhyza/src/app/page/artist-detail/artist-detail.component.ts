import {Component, Input} from '@angular/core';
import {MusicTabComponent} from '../../shared/components/music-tab/music-tab.component';


@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [
    MusicTabComponent
  ],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.scss'
})
export class ArtistDetailComponent {
  constructor() {
  }

}
