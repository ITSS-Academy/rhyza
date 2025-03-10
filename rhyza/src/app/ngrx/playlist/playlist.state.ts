import { PlaylistModel } from '../../models/playlist.model';
import { SongModel } from '../../models/song.model';

export interface PlaylistState {
  playlistDetail: PlaylistModel;
  playlistList: PlaylistModel[];
  listSongsIdAllPlaylist: any;
  isLoading: boolean;
  isLoadingDetail: boolean;
  isDeletedSuccess: boolean;
  isAddSongSuccess: boolean;
  error: any;
}
