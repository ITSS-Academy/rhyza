import {Component, Input} from '@angular/core';
import {MaterialModule} from '../../shared/material.module';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
   MaterialModule



  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {




  products = [
    {
      productName: "EDM",
      productImage: "https://th.bing.com/th/id/OIP.MwViLOvPjSX4AB3EbXfKggHaEK?rs=1&pid=ImgDetMain",
      productStat: "Update today"
    },

    {
      productName: "Rap",
      productImage: "https://i.scdn.co/image/ab67616d0000b27336bdacf812e934437dda69fe",
      productStat: "Update yesterday"
    },

    {
      productName: "Bolero",
      productImage: "https://i1.sndcdn.com/avatars-000289495193-9xhjdi-t240x240.jpg",
      productStat: "Update 2 days ago"
    },

    {
      productName: "Pop",
      productImage: "https://static.vecteezy.com/system/resources/previews/007/379/506/non_2x/pop-music-vintage-3d-lettering-retro-bold-font-typeface-pop-art-stylized-text-old-school-style-neon-light-letters-90s-80s-poster-banner-dark-violet-color-background-vector.jpg",
      productStat: "Update 3 days ago"
    },

    {
      productName: "US-UK",
      productImage: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da840f94efc9fb88a2ccb8828be1",
      productStat: "Update 5 days ago"
    },

    {
      productName: "Pop Ballad",
      productImage: "https://i.scdn.co/image/ab67616d0000b273a312a79c2bbc8fa5bfc5a182",
      productStat: "Update 6 days ago"
    },

    {
      productName: "Deep Sleep",
      productImage: "https://play-lh.googleusercontent.com/4Turc7Ajuxvd5GvH0XvbW-Qu1yldwEFw29GX0ORMjZuYnJAgQffdFYFN16cdK3NmWSs=w240-h480-rw",
      productStat: "Update 1 weeks ago"
    },

    {
      productName: "Blues",
      productImage: "https://i.scdn.co/image/ab67616d0000b2732eca20002b3302bdc4531b9f",
      productStat: "Update today"
    },

    {
      productName: "Jazz",
      productImage: "https://i1.sndcdn.com/artworks-c5387626-e859-46e2-a6ee-7bbd50b794c0-0-t500x500.jpg",
      productStat: "Update today"
    },

    {
      productName: "R&B",
      productImage: "https://i.scdn.co/image/ab67616d00001e02ccfa5146e54fa6a91d5bb0bd",
      productStat: "Update today"
    },

    {
      productName: "Rock",
      productImage: "https://i.pinimg.com/736x/d0/39/a6/d039a64d40861db237e419294cd34813.jpg",
      productStat: "Update today"
    },

  ]

}
