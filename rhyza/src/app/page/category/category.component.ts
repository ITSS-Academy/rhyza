import {Component, Input, OnInit} from '@angular/core';
import {MaterialModule} from '../../shared/material.module';
import { CategoryModel } from '../../models/category.model';
import {CategoryCardComponent} from '../../shared/components/category-card/category-card.component';
import {Router, RouterOutlet} from '@angular/router';
import {Store} from '@ngrx/store';
import {CategoryState} from '../../ngrx/category/category.state';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MaterialModule,
    CategoryCardComponent,
    RouterOutlet

  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  categoryList$ !: Observable<CategoryModel[]>;
  subscription : Subscription[] = [];


  constructor(private store:Store<{
    category: CategoryState
  }>) {

    this.categoryList$ = this.store.select('category','categoryList')

  }

  ngOnInit() {
    this.subscription.push(
      this.categoryList$.subscribe((category) =>{
        if (category.length > 0) {
          console.log('category', category)
        }
      })
    )
  }

  getCategoryDetail(id: number) {
    const category = this.products.find((e) => e.id == id.toString());
    console.log(category)
    return category;
  }

  products: CategoryModel[] = [
    {
      description: "",
      id: "Update today",
      image_url: "https://i1.sndcdn.com/avatars-000314373332-ucnx5x-t240x240.jpg",
      name: "EDM"
    },
    {
      description: "",
      id: "Update yesterday",
      image_url: "https://m.media-amazon.com/images/I/41U9+NMF95L._AC_UF1000,1000_QL80_.jpg",
      name: "Rap"
    },
    {
      description: "",
      id: "Update 2 days go",
      image_url: "https://i1.sndcdn.com/avatars-000289495193-9xhjdi-t240x240.jpg",
      name: "Bolero"
    }, {
      description: "",
      id: "Update 3 days ago",
      image_url: "https://static.vecteezy.com/system/resources/thumbnails/007/379/506/small_2x/pop-music-vintage-3d-lettering-retro-bold-font-typeface-pop-art-stylized-text-old-school-style-neon-light-letters-90s-80s-poster-banner-dark-violet-color-background-vector.jpg",
      name: "Pop"
    },
    {
      description: "",
      id: "Update 5 days ago",
      image_url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da840f94efc9fb88a2ccb8828be1",
      name: "US-UK"
    },
    {
      description: "",
      id: "Update 6 days ago",
      image_url: "https://i.scdn.co/image/ab67616d0000b273a312a79c2bbc8fa5bfc5a182",
      name: "Pop Ballad"
    },
    {
      description: "",
      id: "Update 1 week ago",
      image_url: "https://i.scdn.co/image/ab67616d0000b2732eca20002b3302bdc4531b9f",
      name: "Deep Sleep"
    },
    {
      description: "",
      id: "Update 2 weeks ago",
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA0pCww8qS1H85I8dRVB6Dg7Qhmh56Tm1opg&s",
      name: "Blues"
    },
    {
      description: "",
      id: "Update 3 weeks ago",
      image_url: "https://cdn.britannica.com/27/125427-050-28FB4BA8/Louis-Armstrong-1953.jpg",
      name: "Jazz"
    },
    {
      description: "",
      id: "Update 1 month ago",
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLdRTZ9vUC8yg4TQj_hedc9--WxYslYbEP-g&s",
      name: "R&B"
    }, {
      description: "",
      id: "Update 2 months ago",
      image_url: "https://c8.alamy.com/comp/K6RY0R/rock-music-lettering-guitar-fretboard-label-vector-illustration-K6RY0R.jpg",
      name: "Rock"
    },
    {
      description: "",
      id: "Update 3 months ago",
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT6dAWCA6kygMguermgEFYYiuxFLeBlv0n1g&s",
      name: "Latin"
    },
    {
      description: "",
      id: "Update 10 months ago",
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZwMmqbwHUss1Kr6vR-OqUtvne9dmPhXdrgA&s",
      name: "Classical"
    },
    {
      description: "",
      id: "Update 1 year ago",
      image_url: "https://media.timeout.com/images/106032113/750/562/image.jpg",
      name: "Hip-Hop"
    },
    {
      description: "",
      id: "Update 1 year ago",
      image_url: "https://i.pinimg.com/originals/db/5c/76/db5c76ee0980d9ecb1ce2eeefc0bf719.jpg",
      name: "Disco"
    },
    {
      description: "",
      id: "Update 2 years ago",
      image_url: "https://www.yorkshirepost.co.uk/jpim-static/image/2024/11/22/16/54/indie-music-listener-hero.png?width=1200&enable=upscale",
      name: "Indie"
    },
    {
      description: "",
      id: "Update 3 years ago",
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYqKKHfhtcRSDoCwegcTXgz7GfEwBN0fB_JU8lqbqD2CarPHKvpqJNFHGqKlZo0Yx6RHo&usqp=CAU",
      name: "Folk & Acoustic"
    },
    {
      description: "",
      id: "Update 4 years ago",
      image_url: "https://i1.sndcdn.com/artworks-000223108447-ezixde-t500x500.jpg",
      name: "DJ"
    },

  ]


}

