import {Component, Input} from '@angular/core';
import {MaterialModule} from '../../shared/material.module';
import { CategoryModel } from '../../models/category.model';
import {CategoryCardComponent} from '../../shared/components/category-card/category-card.component';
import {Router, RouterOutlet} from '@angular/router';


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
export class CategoryComponent {
  constructor() {}

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
      image_url: "https://i.scdn.co/image/ab67616d00001e02c7ac62280cf86e07a785a30e",
      name: "Latin"
    },
    {
      description: "",
      id: "Update 10 months ago",
      image_url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da841da40ad6c7704a5997ca72d7",
      name: "Classical"
    },
    {
      description: "",
      id: "Update 1 year ago",
      image_url: "data:image/jpeg;base64,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",
      name: "Hip-Hop"
    },
    {
      description: "",
      id: "Update 1 year ago",
      image_url: "https://i.scdn.co/image/ab67616d00001e02402a49452ead0ff3aaf3eff9",
      name: "Disco"
    },
    {
      description: "",
      id: "Update 2 years ago",
      image_url: "https://i.scdn.co/image/ab67616d00001e024dccb74a381fae53f92f2794",
      name: "Indie"
    },
    {
      description: "",
      id: "Update 3 years ago",
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOI-2W_g3TX7VjPxK2Wnk-vRgqlsG55rXMhw&s",
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

