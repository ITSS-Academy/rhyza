import {ArtistModel} from '../../models/artist.model';

export interface ArtistState{
  artistDetail: ArtistModel;
  artistList: ArtistModel[];
  isLoading: boolean;
  isLoadingDetail: boolean;
  error: any;
}
