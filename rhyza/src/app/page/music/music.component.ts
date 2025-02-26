import {MusicCardComponent} from '../../shared/components/music-card/music-card.component';
import {CarouselHomeComponent} from '../../shared/components/carousel-home/carousel-home.component';
import {ArtistHomeComponent} from '../../shared/components/artist-home/artist-home.component';
import {MusicService} from '../../services/music.service';
import {CategoryHomeComponent} from '../../shared/components/category-home/category-home.component';
import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {MaterialModule} from '../../shared/material.module';




@Component({
  selector: 'app-music',
  standalone: true,
  imports: [
    ArtistHomeComponent,
    CarouselHomeComponent,
    MusicCardComponent,
    CategoryHomeComponent,
    MaterialModule
  ],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})
export class MusicComponent {

  @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  @ViewChild('musicCard', { static: false }) musicCard!: ElementRef;

  ngAfterViewInit() {
    console.log('carousel:', this.carousel);
    console.log('musicCard:', this.musicCard);
  }

  scroll(direction: 'left' | 'right', target: 'carousel' | 'musicCard') {
    const container = target === 'carousel' ? this.carousel : this.musicCard;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.nativeElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  constructor(private musicService: MusicService,
  ) {
    this.songs;
    this.categories;
    console.log(this.musicService.songs);
    console.log(this.musicService);
  }
  get songs() {
    return this.musicService.songs;
  }
  get categories() {
    return this.musicService.catogory;
  }
}
