import {Component, Input} from '@angular/core';
import {SongModel} from '../../../models/song.model';
import {SongService} from '../../../services/song/song.service';
import {IdToNamePipe} from '../../pipes/id-to-name.pipe';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-carousel-home',
  standalone: true,
  imports: [IdToNamePipe, AsyncPipe],
  templateUrl: './carousel-home.component.html',
  styleUrl: './carousel-home.component.scss'
})
export class CarouselHomeComponent {
  @Input() carousel!: SongModel;
  constructor(private songService: SongService) {
  }
  playSong() {

    this.songService.setCurrentSong(this.carousel);

  }





}
