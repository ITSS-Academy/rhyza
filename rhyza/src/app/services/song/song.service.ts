import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SongModel } from '../../models/song.model';
import { BehaviorSubject } from 'rxjs';
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
    formData.append('performer', 'eabdd474-f08d-4ba9-9b8b-7a39a02baa1a');
    formData.append('files', song.file_path);
    formData.append('files', song.image_url);
    formData.append('uuid', song.uuid);
    formData.append('views', song.views.toString());
    formData.append('category_id', 'b86a086b-3610-40de-99f3-e08c4fe7f631');
    return this.http.post<SongModel>('http://localhost:3000/songs', formData, {
      headers,
    });
  }

  updateSongViews(songId: string) {
    return this.http.put(
      `http://localhost:3000/songs/update-views?id=${songId}`,
      {},
    );
  }

  private currentSongSubject = new BehaviorSubject<SongModel | null>(null);
  currentSong$ = this.currentSongSubject.asObservable();

  setCurrentSong(song: SongModel) {
    this.currentSongSubject.next(song);
  }

}
