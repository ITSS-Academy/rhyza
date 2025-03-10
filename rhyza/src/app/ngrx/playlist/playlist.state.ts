import { PlaylistModel } from '../../models/playlist.model';
import { SongModel } from '../../models/song.model';

export interface PlaylistState {
  playlistDetail: PlaylistModel;
  playlistList: PlaylistModel[];
  isLoading: boolean;
  isLoadingDetail: boolean;
  isDeletedSuccess: boolean;
  error: any;
}
