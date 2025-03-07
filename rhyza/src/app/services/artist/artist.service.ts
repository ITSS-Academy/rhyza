import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SongModel} from '../../models/song.model';
import {ArtistModel} from '../../models/artist.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  getAllArtist(){
    return this.http.get<ArtistModel[]>(`${environment.apiUrl}artist/all`);
  }

  getArtistById(id: string){
    return this.http.get<ArtistModel>(`${environment.apiUrl}artist?id=${id}`);
  }


}

