import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {MaterialModule} from '../../shared/material.module';
import {MusicTabComponent} from '../../shared/components/music-tab/music-tab.component';
import {SongModel} from '../../models/song.model';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    MaterialModule,
    MusicTabComponent
  ],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent implements OnInit{
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }

  ngOnInit() {
  }

  musicCategoryList : SongModel [] = [
    {
      id:'1',
      title:'Song 1',
      performer_ref:'Artist 1',
      views: 100,
      uuid: '1',
      category_id: '1',
      composer: 'Composer 1',
      image_url:"https://i.ytimg.com/vi/8ElJRrLqcVY/maxresdefault.jpg",
      file_path: 'https://via.placeholder.com/150',
    createdAt: new Date().toISOString() ,
      duration: 100,


    },
    {
      id:'1',
      title:'Song 1',
      performer_ref:'Artist 1',
      views: 100,
      uuid: '1',
      category_id: '1',
      composer: 'Composer 1',
      image_url:"https://i.ytimg.com/vi/8ElJRrLqcVY/maxresdefault.jpg",
      file_path: 'https://via.placeholder.com/150',
      createdAt: new Date().toISOString() ,
      duration: 100,


    },
    {
      id:'1',
      title:'Song 1',
      performer_ref:'Artist 1',
      views: 100,
      uuid: '1',
      category_id: '1',
      composer: 'Composer 1',
      image_url:"https://i.ytimg.com/vi/8ElJRrLqcVY/maxresdefault.jpg",
      file_path: 'https://via.placeholder.com/150',
      createdAt: new Date().toISOString() ,
      duration: 100,


    },
    {
      id:'1',
      title:'Song 1',
      performer_ref:'Artist 1',
      views: 100,
      uuid: '1',
      category_id: '1',
      composer: 'Composer 1',
      image_url:"https://i.ytimg.com/vi/8ElJRrLqcVY/maxresdefault.jpg",
      file_path: 'https://via.placeholder.com/150',
      createdAt: new Date().toISOString() ,
      duration: 100,


    },
    {
      id:'1',
      title:'Song 1',
      performer_ref:'Artist 1',
      views: 100,
      uuid: '1',
      category_id: '1',
      composer: 'Composer 1',
      image_url:"https://i.ytimg.com/vi/8ElJRrLqcVY/maxresdefault.jpg",
      file_path: 'https://via.placeholder.com/150',
      createdAt: new Date().toISOString() ,
      duration: 100,


    },
    {
      id:'1',
      title:'Song 1',
      performer_ref:'Artist 1',
      views: 100,
      uuid: '1',
      category_id: '1',
      composer: 'Composer 1',
      image_url:"https://i.ytimg.com/vi/8ElJRrLqcVY/maxresdefault.jpg",

      file_path: 'https://via.placeholder.com/150',
      createdAt: new Date().toISOString() ,
      duration: 100,


    },
    {
      id:'1',
      title:'Song 1',
      performer_ref:'Artist 1',
      views: 100,
      uuid: '1',
      category_id: '1',
      composer: 'Composer 1',
      image_url:"https://i.ytimg.com/vi/8ElJRrLqcVY/maxresdefault.jpg",

      file_path: 'https://via.placeholder.com/150',
      createdAt: new Date().toISOString() ,
      duration: 100,

    },
    {
      id:'1',
      title:'Song 1',
      performer_ref:'Artist 1',
      views: 100,
      uuid: '1',
      category_id: '1',
      composer: 'Composer 1',
      image_url:"https://i.ytimg.com/vi/8ElJRrLqcVY/maxresdefault.jpg",

      file_path: 'https://via.placeholder.com/150',
      createdAt: new Date().toISOString() ,
      duration: 100,


    },

  ];

}
