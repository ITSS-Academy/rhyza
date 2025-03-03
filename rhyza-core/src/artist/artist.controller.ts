import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll() {
    try {
      return this.artistService.getArtistAll();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('artist')
  async getArtistById(@Request() req: any) {
    const { id } = req.query;
    try {
      return this.artistService.getArtistById(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('artist-song')
  async getSongArtistById(@Request() req: any) {
    const { song_id } = req.query;
    try {
      return this.artistService.getSongArtistById(song_id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
