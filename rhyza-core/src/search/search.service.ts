import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { SupabaseProvider } from 'src/supabase/supabase';

@Injectable()
export class SearchService {
  constructor(private supabaseProvider: SupabaseProvider) {}

  async searchAll(query: string) {
    query = query.trim();
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('search_data', {
        search_text: query,
      });

    if (error) {
      return {
        songs: [],
        artists: [],
        categories: [],
      };
    }

    return data;
  }
}
