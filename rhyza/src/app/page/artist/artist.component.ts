import { Component } from '@angular/core';
import {ArtistsComponent} from '../../shared/components/artists/artists.component';
import { SongService } from '../../services/song/song.service';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [
    ArtistsComponent
  ],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})
export class ArtistComponent {
  constructor() {
  }
  cardarttists=[
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "HIEUTHUHAI",
      textMidArtists: "Update today",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Sơn Tùng MTP",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "MONO",
      textMidArtists: "Update 2 days ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Phan Mạnh Quỳnh",
      textMidArtists: "Update 3 days ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Đen Vâu",
      textMidArtists: "Update 5 days ago",
    },    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Hoàng Thùy Linh",
      textMidArtists: "Update 6 days ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "MCK",
      textMidArtists: "Update 1 week ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Wrxdie",
      textMidArtists: "Update 2 weeks ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Wren Evans",
      textMidArtists: "Update 3 weeks ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "GreyD",
      textMidArtists: "Update 1 month ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Obito",
      textMidArtists: "Update 2 months ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Dương Domic",
      textMidArtists: "Update 3 months ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Tlinh",
      textMidArtists: "Update 1 year ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "LowG",
      textMidArtists: "Update  1 year ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Bray",
      textMidArtists: "Update 2 years ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Anh Phan",
      textMidArtists: "Update 3 years ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Wean",
      textMidArtists: "Update 4 years ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "BinZ",
      textMidArtists: "Update today",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Soobin Hoàng Sơn",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "OnlyC",
      textMidArtists: "Update yesterday",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "OnlyC",
      textMidArtists: "Update 2 days ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Sơn Tùng ",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Karik",
      textMidArtists: "Update 3 days ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Sơn Tùng MTP",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Sơn Tùng MTP",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Sơn Tùng MTP",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Sơn Tùng MTP",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Sơn Tùng MTP",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Sơn Tùng MTP",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Sơn Tùng MTP",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Sơn Tùng MTP",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Sơn Tùng MTP",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Sơn Tùng MTP",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Sơn Tùng MTP",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Sơn Tùng MTP",
      textMidArtists: "Update 1 day ago",
    },
    {
      imageArtists: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
      textTopArtists: "Sơn Tùng MTP",
      textMidArtists: "Update 1 day ago",
    },
  ]

}
