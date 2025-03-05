import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SongModel } from '../../models/song.model';
import { Store } from '@ngrx/store';
import { SongState } from '../../ngrx/song/song.state';
import * as SongActions from '../../ngrx/song/song.actions';
import { AsyncPipe } from '@angular/common';
import { CarouselHomeComponent } from '../../shared/components/carousel-home/carousel-home.component';
import { MaterialModule } from '../../shared/material.module';
import { MusicCardComponent } from '../../shared/components/music-card/music-card.component';


@Component({
  selector: 'app-music',
  standalone: true,
  imports: [
    CarouselHomeComponent,
    MaterialModule,
    MusicCardComponent
  ],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})
export class MusicComponent implements OnInit{
  @ViewChild('musicCarousel', { static: false }) musicCarousel!: ElementRef;
  @ViewChild('carouselContainer', { static: false }) carouselContainer!: ElementRef;

  ngAfterViewInit(): void {
    console.log('Trending:', this.carouselContainer);
    console.log('Music:', this.musicCarousel);
  }

  // Scroll Trending Section
  scrollTrendingLeft(): void {
    if (this.carouselContainer) {
      this.carouselContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollTrendingRight(): void {
    if (this.carouselContainer) {
      this.carouselContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  // Scroll Music Section
  scrollMusicLeft(): void {
    if (this.musicCarousel) {
      this.musicCarousel.nativeElement.scrollBy({ left: -500, behavior: 'smooth' });
    }
  }

  scrollMusicRight(): void {
    if (this.musicCarousel) {
      this.musicCarousel.nativeElement.scrollBy({ left: 500, behavior: 'smooth' });
    }
  }



  songList$!: Observable<SongModel[]>;
  subscriptions:Subscription[]=[];
  song :SongModel[] = [];
  songTrending:SongModel[] = [];

  constructor(
    private store: Store<{
      song:SongState;
    }>,
  ){
    this.songList$ = this.store.select('song', 'songList');
    this.store.dispatch(SongActions.getSongList());
    console.log(this.song);

    this.songList$ = this.store.select('song', 'songList');
    this.store.dispatch(SongActions.getSongList());

  }


  ngOnInit() {
    this.subscriptions.push(
      this.songList$.subscribe((songList) => {
        console.log('songList:', songList);
        if (songList.length >0){
          this.song= songList;
          this.song.forEach((song) => {
            if(song.views>= 1){
              this.songTrending.push(song);
              console.log(song);
            }
          });
        }
      })
    );
  }




}
