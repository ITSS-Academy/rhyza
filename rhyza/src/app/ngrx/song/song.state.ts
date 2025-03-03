import { SongModel } from '../../models/song.model';
export interface SongState {
  songDetail: SongModel;
  songList: SongModel[];
  songHistory: SongModel[];
  isLoading: boolean;
  error: any;
}
