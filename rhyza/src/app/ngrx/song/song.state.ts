import { SongModel } from '../../models/song.model';
export interface SongState {
  songDetail: SongModel;
  songList: SongModel[];
  songHistory: SongModel[];
  songQueue: SongModel[];
  songCategory: SongModel[];
  isLoading: boolean;
  error: any;
}
