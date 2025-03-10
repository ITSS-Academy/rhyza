import { PlaylistModel } from '../../models/playlist.model';
import { SongModel } from '../../models/song.model';

export interface PlaylistState {
  playlistDetail: PlaylistModel;
  playlistList: PlaylistModel[];
  songList: SongModel[];
  isLoading: boolean;
  isLoadingDetail: boolean;
  error: any;
}
