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
  cardmusictabs=[
    {
      imagecardmusic: "https://kenh14cdn.com/203336854389633024/2024/10/2/image2-1630-1727833092698-17278330935461724047371.jpg",
      textTopMusicTabs: "HIEUTHUHAI",
      textBottomMusicTabs: "Update today",
      timeMusicTabs: 3,
    },
];
}
