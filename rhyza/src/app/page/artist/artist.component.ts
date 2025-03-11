import {Component, OnInit} from '@angular/core';
import {ArtistsComponent} from '../../shared/components/artists/artists.component';
import {Store} from '@ngrx/store';
import {ArtistState} from '../../ngrx/artist/artist.state';
import {ArtistModel} from '../../models/artist.model';
import {debounceTime, Observable, Subscription} from 'rxjs';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MaterialModule} from "../../shared/material.module";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-artist',
  standalone: true,
    imports: [
        ArtistsComponent,
        MatFormField,
        MatInput,
        MatLabel,
        MaterialModule
    ],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})
export class ArtistComponent implements OnInit {
  artistList$ !: Observable<ArtistModel[]>;
  subscription: Subscription[]= [];
  artistList: ArtistModel[] = [];
  filteredArtist = [...this.artistList];
  searchControl = new FormControl('');
  isSearching = false;
  isLoading = true; // Trạng thái loading
  mode: 'determinate' | 'indeterminate' = 'indeterminate';

  filterArtists(searchTerm: string | null) {
    if (!searchTerm || !searchTerm.trim()) {
      this.filteredArtist = [...this.artistList];
      return;
    }

    this.filteredArtist = this.artistList.filter(artist =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  constructor(private store : Store<{
    artist: ArtistState
  }>) {
    this.artistList$ = this.store.select('artist', 'artistList');
    this.searchControl.valueChanges.pipe(
      debounceTime(300) // Chờ 300ms để tránh lag khi nhập
    ).subscribe(value => {
      this.isSearching = value!.trim().length > 0;
      this.filterArtists(value);
    });
    setTimeout(() => {
      this.isLoading = false; // Giả lập tải xong
    }, 1000);
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
