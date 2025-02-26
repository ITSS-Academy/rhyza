import { Injectable } from '@angular/core';
import {SongModel} from '../models/song.model';
import {CategoryModel} from '../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class MusicService {

  songs:SongModel[] = [
    {
      image: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/8/4/1737451732920193150637133093626329146106221360649n-16280630391791690018867.jpg',
      id: 1,
      nameSong: 'song1',
      nameArtist: 'artist1',
    },
    {
      image: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/8/4/1737451732920193150637133093626329146106221360649n-16280630391791690018867.jpg',
      id: 2,
      nameSong: 'song2',
      nameArtist: 'artist2',
    },
    {
      image: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/8/4/1737451732920193150637133093626329146106221360649n-16280630391791690018867.jpg',
      id: 3,
      nameSong: 'song3',
      nameArtist: 'artist3',
    },
    {
      image: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/8/4/1737451732920193150637133093626329146106221360649n-16280630391791690018867.jpg',
      id: 4,
      nameSong: 'song4',
      nameArtist: 'artist4',
    },
    {
      image: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/8/4/1737451732920193150637133093626329146106221360649n-16280630391791690018867.jpg',
      id: 5,
      nameSong: 'song5',
      nameArtist: 'artist5',
    },
    {
      image: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/8/4/1737451732920193150637133093626329146106221360649n-16280630391791690018867.jpg',
      id: 6,
      nameSong: 'song6',
      nameArtist: 'artist6',
    },
    {
      image: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/8/4/1737451732920193150637133093626329146106221360649n-16280630391791690018867.jpg',
      id: 7,
      nameSong: 'song7',
      nameArtist: 'artist7',
    },
    {
      image: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/8/4/1737451732920193150637133093626329146106221360649n-16280630391791690018867.jpg',
      id: 8,
      nameSong: 'song8',
      nameArtist: 'artist8',
    },
    {
      image: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/8/4/1737451732920193150637133093626329146106221360649n-16280630391791690018867.jpg',
      id: 9,
      nameSong: 'song1',
      nameArtist: 'artist1',
    },
    {
      image: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/8/4/1737451732920193150637133093626329146106221360649n-16280630391791690018867.jpg',
      id: 10,
      nameSong: 'song1',
      nameArtist: 'artist1',
    },
    {
      image: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/8/4/1737451732920193150637133093626329146106221360649n-16280630391791690018867.jpg',
      id: 10,
      nameSong: 'song1',
      nameArtist: 'artist1',
    },
    {
      image: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/8/4/1737451732920193150637133093626329146106221360649n-16280630391791690018867.jpg',
      id: 10,
      nameSong: 'song1',
      nameArtist: 'artist1',
    },
    {
      image: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/8/4/1737451732920193150637133093626329146106221360649n-16280630391791690018867.jpg',
      id: 10,
      nameSong: 'song1',
      nameArtist: 'artist1',
    },
    {
      image: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/8/4/1737451732920193150637133093626329146106221360649n-16280630391791690018867.jpg',
      id: 10,
      nameSong: 'song1',
      nameArtist: 'artist1',
    },
    {
      image: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2021/8/4/1737451732920193150637133093626329146106221360649n-16280630391791690018867.jpg',
      id: 10,
      nameSong: 'song1',
      nameArtist: 'artist1',
    },




  ]

  catogory: CategoryModel[] = [
    {
      id: 8,
      title: 'Rap',
      image: 'https://cdn.macrumors.com/article-new/2019/07/rap-life.jpg?retina'
    },
    {
      id: 9,
      title: 'Bolero',
      image: 'https://th.bing.com/th/id/OIP.etxAd132JX1q7IL4_26gsgHaHa?rs=1&pid=ImgDetMain'
    },
    {
      id: 10,
      title: 'Pop',
      image: 'https://th.bing.com/th/id/OIP.RW5qy5Q0idW83GdPI6sPewHaHa?rs=1&pid=ImgDetMain'
    },
    {
      id: 11,
      title: 'US-UK',
      image: 'https://th.bing.com/th/id/OIP.1tTdsg1WeMt6EycFiH1QiwHaHa?rs=1&pid=ImgDetMain'
    },
    {
      id: 12,
      title: 'Chill',
      image: 'https://s3.amazonaws.com/prod-wp-tunota/wp-content/uploads/2024/11/principal_popular-meme-chill-guy-enfrenta-problema-legal-todo-debes-saber.jpg'
    },
    {
      id: 13,
      title: 'Sleep',
      image: 'https://i.ytimg.com/vi/584O2iWQFHI/maxresdefault.jpg'
    },
    {
      id: 14,
      title: 'Kpop',
      image: 'https://img.freepik.com/premium-vector/k-pop-music-concept_23-2148660028.jpg?w=2000'
    },
    {
      id: 15,
      title: 'Jazz',
      image: 'https://cdn.macrumors.com/article-new/2019/07/rap-life.jpg?retina'
    },{
      id: 16,
      title: 'R&B',
      image: 'https://cdn.macrumors.com/article-new/2019/07/rap-life.jpg?retina'
    },
    {
      id: 17,
      title: 'Ballad',
      image: 'https://th.bing.com/th/id/OIP.OoL4nzJvr8yoSvdVOAxhVwHaHa?rs=1&pid=ImgDetMain'
    },
    {
      id: 18,
      title: 'edm',
      image: 'https://www.sharetopros.com/blog/images/the-top-best-edm-artists-right-now/the-top-best-edm-artists-right-now-img-cover-1.webp'
    },


  ]

}
