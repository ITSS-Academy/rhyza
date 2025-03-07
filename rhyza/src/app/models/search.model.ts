import { ArtistModel } from './artist.model';
import { SongModel } from './song.model';
import { CategoryModel } from './category.model';

export interface SearchModel {
  songs: SongModel[];
  artists: ArtistModel[];
  categories: CategoryModel[];
}
