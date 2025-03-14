import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlaylistModel } from '../../models/playlist.model';
import { SongModel } from '../../models/song.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private http: HttpClient) {}

  getPlaylistByUid(uid: string, idToken: string): Observable<PlaylistModel[]> {
    const headers = { Authorization: idToken };
    return this.http.get<PlaylistModel[]>(
      `${environment.apiUrl}playlists/user?uid=${uid}`,
      { headers }
    );
  }
  createPlaylist(
    playlist: PlaylistModel,
    idToken: string
  ): Observable<PlaylistModel> {
    const headers = { Authorization: idToken };
    const formData = new FormData();


    formData.append('uid', playlist.uid);
    formData.append('name', playlist.name);
    formData.append('file', playlist.image_url);
    formData.append('songs_id', JSON.stringify(playlist.songs_id));
    formData.append('description', playlist.description);

    return this.http.post<PlaylistModel>(
      `${environment.apiUrl}playlists`,
      formData,
      { headers }
    );
  }



  getPlaylistDetail(id: string, idToken: string): Observable<PlaylistModel> {
    const headers = { Authorization: idToken };
    return this.http.get<PlaylistModel>(
      `${environment.apiUrl}playlists/user/playlist?id=${id}`,
      { headers }
    );
  }

  updatePlaylistSong(idToken: string, songId: string, uid: string) {
    const headers = {
      Authorization: idToken,
    };
    const body = {
      songId: songId,
      uid: uid,
    };

    return this.http.post(
      'http://localhost:3000/playlists/update-songList',
      body,
      { headers }
    );
  }

  deletePlaylistById(id: string, uid: string, idToken: string) {
    const headers = {
      Authorization: idToken,
    };

    return this.http.delete<boolean>(
      `${environment.apiUrl}playlists?id=${id}&uid=${uid}`,
      { headers }
    );
  }

  //add song to playlist
  addSongToPlaylist(
    playlistId: string,
    songId: string,
    uid: string,
    idToken: string
  ) {
    const headers = {
      Authorization: idToken,
    };

    const body = {
      id: playlistId,
      songId: songId,
      uid: uid,
    };

    return this.http.post<PlaylistModel>(
      `${environment.apiUrl}playlists/update-songList`,
      body,
      { headers }
    );
  }

  //remove song from playlist

  removeSongFromPlaylist(
    playlistId: string,
    songId: string,
    uid: string,
    idToken: string
  ) {

    const headers = {
      Authorization: idToken,
    };

    return this.http.delete<SongModel[]>(
      `${environment.apiUrl}playlists/song?id=${playlistId}&songId=${songId}&uid=${uid}`,
      { headers }
    );
  }

  getListSongIdByUid(uid: string, idToken: string) {
    const headers = {
      Authorization: idToken,
    }

    return this.http.get<any>(`${environment.apiUrl}playlists/list-songsid?uid=${uid}`, { headers });

  }
}
