import {Component, Input} from '@angular/core';
import {SongModel} from '../../../models/song.model';
import {SongService} from '../../../services/song/song.service';
import {IdToNamePipe} from '../../pipes/id-to-name.pipe';

@Component({
  selector: 'app-carousel-home',
  standalone: true,
  imports: [IdToNamePipe],
  templateUrl: './carousel-home.component.html',
  styleUrl: './carousel-home.component.scss'
})
export class CarouselHomeComponent {
  @Input() carousel!: SongModel;
  constructor(private songService: SongService) {
  }
  playSong() {
    console.log(this.carousel);

    this.songService.setCurrentSong(this.carousel);

  }





}
