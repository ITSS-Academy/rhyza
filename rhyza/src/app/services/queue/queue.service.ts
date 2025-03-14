import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private http: HttpClient) { }


  createQueue(songId: string, uid: string, idToken: string){
    const headers = {
      Authorization: idToken,
    }


    return this.http.post(`${environment.apiUrl}queue/create-song-queues`,{
      songId: songId,
      uid: uid
    }, {
      headers
    })

  }


  createQueueWithPlaylist(playlistId: string, idToken: string){
    const headers = {
      Authorization: idToken,
    }
    const body = {
      playlistId: playlistId
    }

    return this.http.post(`${environment.apiUrl}queue/playlist-queues`, body,{
      headers
    })

  }

  createQueueWithPlaylistRandom(playlistId: string, idToken: string){
    const headers = {
      Authorization: idToken,
    }

    return this.http.post(`${environment.apiUrl}queue/playlist-queues-random`, {
      headers
  })
  }

  deleteSongInQueue(uid:string,songId: string,   idToken: string){
    const headers = {
      Authorization: idToken,
    }
    //delete with uid and songId body
   return this.http.delete(`${environment.apiUrl}queue/delete-song-queues?uid=${uid}&songId=${songId}`, {
     headers
   })
  }
}
