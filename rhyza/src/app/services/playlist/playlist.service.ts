import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlaylistModel } from '../../models/playlist.model';
import { SongModel } from '../../models/song.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(private http: HttpClient) {}

  getPlaylistByUid(uid: string, idToken: string): Observable<PlaylistModel[]> {
    const headers = { Authorization: idToken };
    return this.http.get<PlaylistModel[]>(`${environment.apiUrl}playlists/user?uid=${uid}`, { headers });
  }
  createPlaylist(playlist: PlaylistModel, idToken: string): Observable<PlaylistModel> {
    const headers = { Authorization: idToken };
    const formData = new FormData();

    if (playlist.image_url instanceof File) {
      formData.append('file', playlist.image_url);
    } else if (typeof playlist.image_url === 'string') {
      console.warn('image_url is a string, not a File. Skipping file upload.');
    }

    formData.append('uid', playlist.uid);
    formData.append('name', playlist.name);
    formData.append('songs_id', JSON.stringify(playlist.songs_id));
    formData.append('description', playlist.description);
    formData.append('author_description', playlist.author_description);

    return this.http.post<PlaylistModel>(`${environment.apiUrl}playlists`, formData, { headers });
  }

  getSongByPlaylistId(playlistId: string, idToken: string): Observable<SongModel[]> {
    const headers = { Authorization: idToken };
    return this.http.get<SongModel[]>(`${environment.apiUrl}playlists/playlist-song?id=${playlistId}`, { headers });
  }

  getPlaylistDetail(id: string, idToken: string): Observable<PlaylistModel> {
    const headers = { Authorization: idToken };
    return this.http.get<PlaylistModel>(`${environment.apiUrl}playlists/user/playlist?id=${id}`, { headers });
  }


}
