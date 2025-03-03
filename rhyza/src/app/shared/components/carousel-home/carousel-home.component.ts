import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {SongModel} from '../../../models/song.model';
import {SongService} from '../../../services/song/song.service';

@Component({
  selector: 'app-carousel-home',
  standalone: true,
  imports: [],
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
  // @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  //
  // scrollLeft() {
  //   this.carousel.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  // }
  //
  // scrollRight() {
  //   this.carousel.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  // }




}
