import {CarouselHomeComponent} from '../../shared/components/carousel-home/carousel-home.component';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MaterialModule} from '../../shared/material.module';
import {Observable, Subscription} from 'rxjs';
import {SongModel} from '../../models/song.model';
import {Store} from '@ngrx/store';
import {SongState} from '../../ngrx/song/song.state';
import * as SongActions from '../../ngrx/song/song.actions';
import {AsyncPipe} from '@angular/common';
import {MusicCardComponent} from '../../shared/components/music-card/music-card.component';




@Component({
  selector: 'app-music',
  standalone: true,
  imports: [
    CarouselHomeComponent,
    MaterialModule,
    AsyncPipe,
    MusicCardComponent
  ],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss'
})
export class MusicComponent implements OnInit{

  // @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  // @ViewChild('musicCard', { static: false }) musicCard!: ElementRef;
  //
  // ngAfterViewInit() {
  //   console.log('carousel:', this.carousel);
  //   console.log('musicCard:', this.musicCard);
  // }
  //
  // scroll(direction: 'left' | 'right', target: 'carousel' | 'musicCard') {
  //   const container = target === 'carousel' ? this.carousel : this.musicCard;
  //   if (container) {
  //     const scrollAmount = direction === 'left' ? -300 : 300;
  //     container.nativeElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  //   }
  // }


  songList$!: Observable<SongModel[]>;
  subscriptions:Subscription[]=[];



  constructor(
    private store: Store<{
      song:SongState;
    }>,
  ){
    this.songList$ = this.store.select('song', 'songList');
    this.store.dispatch(SongActions.getSongList());
    console.log('runnnnnn')
  }


  ngOnInit() {
    this.subscriptions.push(
      this.songList$.subscribe((songList) => {
        console.log('songList:', songList);
      })
    );

  }

}
