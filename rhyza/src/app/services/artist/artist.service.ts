import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SongModel} from '../../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  getAllArtist(){
    return this.http.get('http://localhost:3000/artist');
  }

  getArtistById(id: string){
    return this.http.get(`http://localhost:3000/artist?id=${id}`);
  }

  getArtistBySongId(songId: string){
    return this.http.get<SongModel[]>(`http://localhost:3000/artist/artist-song?song_id=${songId}`);
  }
}
