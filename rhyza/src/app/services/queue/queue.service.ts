import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private http: HttpClient) { }


  createQueue(songId: string, uid: string, idToken: string){
    const headers = {
      Authorization: idToken,
    }


    return this.http.post('http://localhost:3000/queue/create-song-queues',{
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

    return this.http.post('http://localhost:3000/queue/playlist-queues', {
      headers
    })

  }

  createQueueWithPlaylistRandom(playlistId: string, idToken: string){
    const headers = {
      Authorization: idToken,
    }

    return this.http.post('http://localhost:3000/queue/playlist-queues-random', {
      headers
  })
  }

  deleteSongInQueue(uid:string,songId: string,   idToken: string){
    const headers = {
      Authorization: idToken,
    }
    //delete with uid and songId body
   return this.http.delete(`http://localhost:3000/queue/delete-song-queues?uid=${uid}&songId=${songId}`, {
     headers
   })
  }
}
