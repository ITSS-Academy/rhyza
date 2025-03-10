import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SongModel } from '../../models/song.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private http: HttpClient) {}

  getSongDetail(songId: string) {
    return this.http.get<SongModel>(
      `${environment.apiUrl}songs/${songId}/hls-url`,
    );
  }

  getSongList() {
    return this.http.get<SongModel[]>(`${environment.apiUrl}songs/all`);
  }

  createSong(song: SongModel, idToken: string) {
    //with header Authorization
    const headers = {
      Authorization: idToken,
    };

    console.log('song services create song', song);
    const formData = new FormData();
    formData.append('title', song.title);
    formData.append('composer', song.composer);
    formData.append('performer_ref', song.performer_ref);
    formData.append('files', song.file_path);
    formData.append('files', song.image_url);
    formData.append('uuid', song.uuid);
    formData.append('views', song.views.toString());
    formData.append('category_id', song.category_id);
    return this.http.post<SongModel>('http://localhost:3000/songs', formData, {
      headers,
    });
  }

  updateSongViews(songId: string) {
    return this.http.put(
      `${environment.apiUrl}songs/update-views?id=${songId}`,
      {},
    );
  }

  getSongQueue(uid: string, idToken: string) {
    const headers = {
      Authorization: idToken,
    };
    return this.http.get<SongModel[]>(
      `${environment.apiUrl}queue/get-song-queues-user?uid=${uid}`,
      { headers },
    );
  }

  getSongCategoryId(categoryId: string){
    return this.http.get<SongModel[]>(`${environment.apiUrl}songs/category-song?id=${categoryId}`);

  }

  getArtistBySongId(songId: string){
    return this.http.get<SongModel[]>(`${environment.apiUrl}artist/artist-song?song_id=${songId}`);
  }

  // get song playlist
  getSongsByPlaylist(playlistId: string, idToken: string): Observable<SongModel[]> {
    const headers = {
      Authorization: idToken,
    };
    return this.http.get<SongModel[]>(
      `${environment.apiUrl}playlists/${playlistId}/songs`,
      { headers },
    );
  }



  private currentSongSubject = new BehaviorSubject<SongModel | null>(null);
  currentSong$ = this.currentSongSubject.asObservable();

  setCurrentSong(song: SongModel) {
    this.currentSongSubject.next(song);
  }

}
