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
    AsyncPipe,
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
    console.log(this.song);

    this.songList$ = this.store.select('song', 'songList');
    this.store.dispatch(SongActions.getSongList());
    console.log(this.carousel);

  }


  ngOnInit() {
    // this.subscriptions.push(
    //   this.songList$.subscribe((songList) => {
    //     console.log('songList:', songList);
    //   })
    // );
  }


  song: SongModel[] =
    [
      {
        id: "1",
        title: "Shape of You",
        composer: "Ed Sheeran",
        performer: "Ed Sheeran",
        file_path: "/music/shape_of_you.mp3",
        image_url: "https://th.bing.com/th/id/OIP.EHwrQ_EMJJB3wfdhhWO7YwHaHa?rs=1&pid=ImgDetMain",
        category_id: "pop",
        createdAt: new Date("2017-01-06").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174000",
        views: 0
      },
      {
        id: "2",
        title: "Someone Like You",
        composer: "Adele",
        performer: "Adele",
        file_path: "/music/someone_like_you.mp3",
        image_url: "https://i1.sndcdn.com/artworks-000025514980-c6dl6t-t500x500.jpg",
        category_id: "pop",
        createdAt: new Date("2011-01-24").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174001",
        views: 0
      },
      {
        id: "3",
        title: "Blinding Lights",
        composer: "The Weeknd",
        performer: "The Weeknd",
        file_path: "/music/blinding_lights.mp3",
        image_url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4eee8b76-3061-46c6-ac9f-9795aed7eade/deowtgv-ce5bbbb3-64c9-4e52-b3b3-f6a5fe449a04.jpg/v1/fill/w_842,h_842,q_75,strp/the_weeknd_by_brendan125_deowtgv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODQyIiwicGF0aCI6IlwvZlwvNGVlZThiNzYtMzA2MS00NmM2LWFjOWYtOTc5NWFlZDdlYWRlXC9kZW93dGd2LWNlNWJiYmIzLTY0YzktNGU1Mi1iM2IzLWY2YTVmZTQ0OWEwNC5qcGciLCJ3aWR0aCI6Ijw9ODQyIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.0u9fWQkordT6s4OEigltqrDmAm7kSS8IJllQswYKm6w",
        category_id: "rnb",
        createdAt: new Date("2019-11-29").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174002",
        views: 0
      },
      {
        id: "4",
        title: "Bohemian Rhapsody",
        composer: "Freddie Mercury",
        performer: "Queen",
        file_path: "/music/bohemian_rhapsody.mp3",
        image_url: "https://intmusic.net/wp-content/uploads/5bc888db9e748.jpg",
        category_id: "rock",
        createdAt: new Date("1975-10-31").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174003",
        views: 0
      },
      {
        id: "5",
        title: "Billie Jean",
        composer: "Michael Jackson",
        performer: "Michael Jackson",
        file_path: "/music/billie_jean.mp3",
        image_url: "https://th.bing.com/th/id/OIP.LKHlcvLwpv9tP-Rfz_vCfAAAAA?w=300&h=299&rs=1&pid=ImgDetMain",
        category_id: "pop",
        createdAt: new Date("1983-01-02").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174004",
        views: 0
      },
      {
        id: "6",
        title: "Rolling in the Deep",
        composer: "Adele",
        performer: "Adele",
        file_path: "/music/rolling_in_the_deep.mp3",
        image_url: "https://i0.wp.com/musictrajectory.com/wp-content/uploads/2011/08/adele-21-album-cover.jpg",
        category_id: "pop",
        createdAt: new Date("2010-11-29").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174005",
        views: 0
      },
      {
        id: "7",
        title: "Havana",
        composer: "Camila Cabello",
        performer: "Camila Cabello",
        file_path: "/music/havana.mp3",
        image_url: "https://i1.sndcdn.com/artworks-000485180208-aqckpr-t500x500.jpg",
        category_id: "pop",
        createdAt: new Date("2017-08-03").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174006",
        views: 0
      },
      {
        id: "8",
        title: "Uptown Funk",
        composer: "Mark Ronson, Bruno Mars",
        performer: "Mark Ronson ft. Bruno Mars",
        file_path: "/music/uptown_funk.mp3",
        image_url: "https://th.bing.com/th/id/OIP.ee6_wKAZljfOdjaR8kYuJgHaHA?rs=1&pid=ImgDetMain",
        category_id: "funk",
        createdAt: new Date("2014-11-10").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174007",
        views: 0
      },
      {
        id: "9",
        title: "Lose Yourself",
        composer: "Eminem",
        performer: "Eminem",
        file_path: "/music/lose_yourself.mp3",
        image_url: "https://i.scdn.co/image/ab67616d0000b273ed1490bec97b20e519d083ac",
        category_id: "hiphop",
        createdAt: new Date("2002-10-28").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174008",
        views: 0
      },
      {
        id: "10",
        title: "Bad Guy",
        composer: "Billie Eilish",
        performer: "Billie Eilish",
        file_path: "/music/bad_guy.mp3",
        image_url: "https://i1.sndcdn.com/artworks-oFT68Kb67xwfGL6P-iIU45g-t500x500.jpg",
        category_id: "alternative",
        createdAt: new Date("2019-03-29").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174009",
        views: 0
      },
      {
        id: "11",
          title: "Thinking Out Loud",
        composer: "Ed Sheeran",
        performer: "Ed Sheeran",
        file_path: "/music/thinking_out_loud.mp3",
        image_url: "https://i1.sndcdn.com/artworks-000107517798-6ru8u5-t500x500.jpg",
        category_id: "pop",
        createdAt: new Date("2014-09-24").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174010",
        views: 0
      },
      {
        id: "12",
        title: "Let It Be",
        composer: "Paul McCartney, John Lennon",
        performer: "The Beatles",
        file_path: "/music/let_it_be.mp3",
        image_url: "https://th.bing.com/th/id/OIP.fsDHcEWx8LhZpxH-li0f7gHaHY?w=599&h=597&rs=1&pid=ImgDetMain",
        category_id: "rock",
        createdAt: new Date("1970-03-06").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174011",
        views: 0
      },
      {
        id: "13",
        title: "Shallow",
        composer: "Lady Gaga, Andrew Wyatt, Anthony Rossomando, Mark Ronson",
        performer: "Lady Gaga & Bradley Cooper",
        file_path: "/music/shallow.mp3",
        image_url: "https://th.bing.com/th/id/OIP.t7jtUcwU6Sdtv5R_cadtmgHaHa?w=500&h=500&rs=1&pid=ImgDetMain",
        category_id: "pop",
        createdAt: new Date("2018-09-27").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174012",
        views: 0
      }
    ]

  carousel:SongModel[]=
    [
      {
        id: "14",
        title: "Born to Die",
        composer: "Lana Del Rey, Justin Parker",
        performer: "Lana Del Rey",
        file_path: "/music/born_to_die.mp3",
        image_url: "https://th.bing.com/th/id/OIP.CusFmdlZ0sf8QW7jnw0Y0QAAAA?rs=1&pid=ImgDetMain",
        category_id: "alternative",
        createdAt: new Date("2012-01-27T00:00:00Z").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174013",
        views: 0
      },
      {
        id: "15",
        title: "Radioactive",
        composer: "Imagine Dragons",
        performer: "Imagine Dragons",
        file_path: "/music/radioactive.mp3",
        image_url: "https://www.teahub.io/photos/full/67-673011_imagine-dragons-hd-wallpaper-imagine-dragons-roots.jpg",
        category_id: "rock",
        createdAt: new Date("2012-10-29T00:00:00Z").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174014",
        views: 0
      },
      {
        id: "16",
        title: "Halo",
        composer: "Ryan Tedder, Evan Bogart, Beyoncé",
        performer: "Beyoncé",
        file_path: "/music/halo.mp3",
        image_url: "https://i.pinimg.com/736x/84/91/8e/84918e1cd8904d3627ff1397207f2c63.jpg",
        category_id: "rnb",
        createdAt: new Date("2008-11-20T00:00:00Z").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174015",
        views: 0
      },
      {
        id: "17",
        title: "Poker Face",
        composer: "Lady Gaga, RedOne",
        performer: "Lady Gaga",
        file_path: "/music/poker_face.mp3",
        image_url: "https://i.ytimg.com/vi/6lwr2D5zTYI/maxresdefault.jpg",
        category_id: "pop",
        createdAt: new Date("2008-09-26T00:00:00Z").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174016",
        views: 0
      },
      {
        id: "18",
        title: "Smells Like Teen Spirit",
        composer: "Kurt Cobain, Krist Novoselic, Dave Grohl",
        performer: "Nirvana",
        file_path: "/music/smells_like_teen_spirit.mp3",
        image_url: "https://i.ytimg.com/vi/cW3rOwIAq0Y/maxresdefault.jpg",
        category_id: "grunge",
        createdAt: new Date("1991-09-10T00:00:00Z").toISOString(),
        uuid: "123e4567-e89b-12d3-a456-426614174017",
        views: 0
      }
    ]




}
