
import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {SongModel} from '../../../models/song.model';
import {SongService} from '../../../services/song/song.service';


@Component({
  selector: 'app-music-card',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './music-card.component.html',
  styleUrl: './music-card.component.scss'
})
export class MusicCardComponent {
  @Input() song!: SongModel;
  constructor(private songService: SongService) {
  }
  playSong() {
    console.log(this.song);

    this.songService.setCurrentSong(this.song);

  }






}
