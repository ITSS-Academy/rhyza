import {Component, OnInit} from '@angular/core';
import {ArtistsComponent} from '../../shared/components/artists/artists.component';
import {Store} from '@ngrx/store';
import {ArtistState} from '../../ngrx/artist/artist.state';
import {ArtistModel} from '../../models/artist.model';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [
    ArtistsComponent
  ],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})
export class ArtistComponent implements OnInit {
  artistList$ !: Observable<ArtistModel[]>;
  subscription: Subscription[]= [];
  artistList: ArtistModel[] = [];
  constructor(private store : Store<{
    artist: ArtistState
  }>) {
    this.artistList$ = this.store.select('artist', 'artistList');
  }



  ngOnInit() {
    this.subscription.push(
      this.artistList$.subscribe((artistList) => {
        if(artistList.length > 0){
          console.log(artistList);
          this.artistList = artistList;
        }
      })
    )
  }


}
