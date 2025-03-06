import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SongModel } from '../../models/song.model';
import { Store } from '@ngrx/store';
import { SongState } from '../../ngrx/song/song.state';
import * as SongActions from '../../ngrx/song/song.actions';
import { CarouselHomeComponent } from '../../shared/components/carousel-home/carousel-home.component';
import { MaterialModule } from '../../shared/material.module';
import { MusicCardComponent } from '../../shared/components/music-card/music-card.component';
import {ArtistComponent} from '../artist/artist.component';
import {ArtistModel} from '../../models/artist.model';
import {ArtistState} from '../../ngrx/artist/artist.state';
import {CategoryState} from '../../ngrx/category/category.state';
import {CategoryModel} from '../../models/category.model';
import {ArtistsComponent} from '../../shared/components/artists/artists.component';
import {CategoryCardComponent} from '../../shared/components/category-card/category-card.component';


@Component({
  selector: 'app-music',
  standalone: true,
  imports: [
    CarouselHomeComponent,
    MaterialModule,
    MusicCardComponent,
    ArtistsComponent,
    CategoryCardComponent
  ],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})
export class MusicComponent implements OnInit{
  @ViewChild('musicCarousel', { static: false }) musicCarousel!: ElementRef;
  @ViewChild('carouselContainer', { static: false }) carouselContainer!: ElementRef;
  @ViewChild('artistCarousel', {static: false} )artistCarousel!: ElementRef;
  @ViewChild('categoryCarousel', {static: false} )categoryCarousel!: ElementRef;


  ngAfterViewInit(): void {
    console.log('Trending:', this.carouselContainer);
    console.log('Music:', this.musicCarousel);
  }

  // Scroll Trending Section
  scrollTrendingLeft(): void {
    if (this.carouselContainer) {
      this.carouselContainer.nativeElement.scrollBy({ left: -600, behavior: 'smooth' });
    }
  }

  scrollTrendingRight(): void {
    if (this.carouselContainer) {
      this.carouselContainer.nativeElement.scrollBy({ left: 600, behavior: 'smooth' });
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


  scrollArtistLeft(): void {
    if (this.artistCarousel) {
      this.artistCarousel.nativeElement.scrollBy({ left: -500, behavior: 'smooth' });
    }
  }

  scrollArtistRight(): void {
    if (this.artistCarousel) {
      this.artistCarousel.nativeElement.scrollBy({ left: 500, behavior: 'smooth' });
    }
  }

  scrollCategoryLeft(): void {
    if (this.artistCarousel) {
      this.artistCarousel.nativeElement.scrollBy({ left: -500, behavior: 'smooth' });
    }
  }

  scrollCategoryRight(): void {
    if (this.artistCarousel) {
      this.artistCarousel.nativeElement.scrollBy({ left: 500, behavior: 'smooth' });
    }
  }



  songList$!: Observable<SongModel[]>;
  subscriptions:Subscription[]=[];
  song :SongModel[] = [];
  songTrending:SongModel[] = [];
  aristList$!: Observable<ArtistModel[]>
  artistList: ArtistModel[] = [];
  categoryList$!: Observable<CategoryModel[]>;
  categoryList: CategoryModel[] = [];

  constructor(
    private store: Store<{
      song:SongState;
      artist:ArtistState;
      category:CategoryState;
    }>,
  ){
    this.songList$ = this.store.select('song', 'songList');
    this.store.dispatch(SongActions.getSongList());
    console.log(this.song);

    this.aristList$ = this.store.select('artist', 'artistList');
    this.categoryList$ = this.store.select('category', 'categoryList');

  }


  ngOnInit() {
    this.subscriptions.push(
      this.songList$.subscribe((songList) => {
        console.log('songList:', songList);
        if (songList.length > 0) {
          this.song = songList;
          this.songTrending = this.song.filter(song => song.views >= 1);
        }
      }),

      this.categoryList$.subscribe((categoryList) => {

        if (categoryList.length > 0) {

          this.categoryList = categoryList;
        }
      }),

      this.aristList$.subscribe((artistList) => {
        if (artistList.length > 0) {
          this.artistList = artistList;

        }
      }),
    );
  }
}
