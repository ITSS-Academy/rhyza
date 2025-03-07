import {Component, Input} from '@angular/core';
import {MusicTabComponent} from '../../shared/components/music-tab/music-tab.component';
import {MatIcon} from '@angular/material/icon';
import {Location} from '@angular/common';


@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [
    MusicTabComponent,
    MatIcon
  ],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.scss'
})
export class ArtistDetailComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
