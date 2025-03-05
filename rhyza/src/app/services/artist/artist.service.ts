import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SongModel} from '../../models/song.model';
import {ArtistModel} from '../../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  getAllArtist(){
    return this.http.get<ArtistModel[]>('http://localhost:3000/artist/all');
  }

  getArtistById(id: string){
    return this.http.get<ArtistModel>(`http://localhost:3000/artist?id=${id}`);
  }

  getArtistBySongId(songId: string){
    return this.http.get<SongModel[]>(`http://localhost:3000/artist/artist-song?song_id=${songId}`);
  }
}
