import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseProvider } from 'src/supabase/supabase';

@Injectable()
export class ArtistService {
  constructor(private supabaseProvider: SupabaseProvider) {}

  async getArtistAll() {
    const { data, error } = await this.supabaseProvider
      .getClient()
      .from('artists')
      .select('*');

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return data;
  }

  async getSongArtistById(artistId: string) {
    const { data, error } = await this.supabaseProvider
      .getClient()
      .from('songs')
      .select('*')
      .eq('performer_ref', artistId);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return data;
  }

  async getArtistById(artistId: string) {
    const { data, error } = await this.supabaseProvider
      .getClient()
      .from('artists')
      .select('*')
      .eq('id', artistId);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return data;
  }
}
