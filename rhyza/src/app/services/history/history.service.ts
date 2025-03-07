import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SongModel} from '../../models/song.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  createHistory(songId:string, idToken:string, uid:string){
    const headers = {
      Authorization: idToken,
    };
    //create with body
    const body = {
      songId: songId,
      uid: uid
    }

    return this.http.post(`${environment.apiUrl}history`, body, {headers});
  }


  getHistory(uid:string, idToken:string){

    const headers = {
      Authorization: idToken,

    }
    return this.http.get<SongModel[]>(`${environment.apiUrl}history?uid=${uid}`, {headers});
  }
}
