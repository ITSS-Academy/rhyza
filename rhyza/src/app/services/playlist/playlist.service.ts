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

    if (playlist.image_url instanceof File) {
      formData.append('file', playlist.image_url);
    } else {
      console.warn('image_url is a string, not a File. Skipping file upload.');
    }

    formData.append('uid', playlist.uid);
    formData.append('name', playlist.name);
    formData.append('songs_id', JSON.stringify(playlist.songs_id));
    formData.append('description', playlist.description);
    formData.append('author_description', playlist.author_description);

    return this.http.post<PlaylistModel>(
      `${environment.apiUrl}playlists`,
      formData,
      { headers }
    );
  }



  getPlaylistDetail(id: string, idToken: string): Observable<PlaylistModel> {
    console.log(idToken)
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

    return this.http.delete<PlaylistModel>(
      `${environment.apiUrl}playlists/user/playlist?id=${id}&uid=${uid}`,
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
      playlistId: playlistId,
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

    return this.http.post<PlaylistModel>(
      `${environment.apiUrl}playlists/song?id=${playlistId}&songId=${songId}&uid=${uid}`,
      { headers }
    );
  }
}
