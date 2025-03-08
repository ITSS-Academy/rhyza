import { SongModel } from '../../models/song.model';
export interface SongState {
  songDetail: SongModel;
  songList: SongModel[];
  songHistory: SongModel[];
  songQueue: SongModel[];
  songCategory: SongModel[];
  songArtist: SongModel[];
  isLoading: boolean;
  isCreating: boolean;
  isLoadingArtist: boolean;
  isLoadingCategory: boolean;
  error: any;
}
