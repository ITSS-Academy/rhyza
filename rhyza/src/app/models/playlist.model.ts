export interface PlaylistModel {
  id: string;
  name: string;
  description: string;
  image_url: string | File;
  total_tracks: number;
  author_description: string;
  uid: string;
  songs_id: string[];
  is_pined: boolean;
  created_at: string;
}
