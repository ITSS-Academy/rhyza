import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardSmImage, MatCardTitleGroup} from '@angular/material/card';
import {CategoryCardComponent} from '../../shared/components/category-card/category-card.component';
import {CategoryModel} from '../../models/category.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatIcon,
    CategoryCardComponent
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  products:CategoryModel[] = [
    {
      id:"Update today",
      title:"EDM",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGhjbj_1GPPy3jm1RWHh4fworoyRFPU-_BEw&s"
    },
    {
      id:"Update yesterday",
      title:"Rap",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQ6wqN3403nCRi6aJ0GH_wdCZ4pEAJIwo3w&s"
    },
    {
      id:"Update 2 days ago",
      title:"Bolero",
      image:"https://i1.sndcdn.com/avatars-000289495193-9xhjdi-t240x240.jpg"
    },
    {
      id:"Update 3 days ago",
      title:"Pop",
      image:"https://yt3.googleusercontent.com/Z8w-S67SqRr1QM3uZVQLzNQc9cIx-l4pokLv17Hd5cnoDIIl16WsNetzycuFeyhKO911kBwbfg=s900-c-k-c0x00ffffff-no-rj"
    },
    {
      id:"Update 5 days ago",
      title:"US-UK",
      image:"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da840f94efc9fb88a2ccb8828be1"
    },
    {
      id:"Update 6 days ago",
      title:"Pop Ballad",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3fbZJ5Cjz0I9UqUknmmpOi5-PuYHz9j9TQg&s"
    },
    {
      id:"Update 1 week ago",
      title:"Deep Sleep",
      image:"https://i.scdn.co/image/ab67616d0000b2732eca20002b3302bdc4531b9f"
    },
    {
      id:"Update 2 weeks ago",
      title:"Blues",
      image:"https://cdn-images.audioaddict.com/8/e/1/7/8/a/8e178a2e3d96608fb8a3a4810cbe6141.jpg?size=217x217&quality=100"
    },
    {
      id:"Update 3 weeks ago",
      title:"Jazz",
      image:"https://as1.ftcdn.net/v2/jpg/01/93/43/84/1000_F_193438413_HyXCr1RQubvGSQKrKoixqqJCAw5aAReI.jpg"
    },
    {
      id:"Update 1 month ago",
      title:"R&B",
      image:"https://i.scdn.co/image/ab67616d0000b273ccfa5146e54fa6a91d5bb0bd"
    },
    {
      id:"Update 2 months ago",
      title:"Rock",
      image:"https://media.gettyimages.com/id/1320141536/vector/vector-illustration-lets-rock-music-print-graphic-design-with-guitar-vintage-stamp-label-t.jpg?b=1&s=1024x1024&w=gi&k=20&c=BMf-5bm7cc9f3LmIQ5KRJRPbSrsnGdXbhN4WGf-KnhI="
    },
    {
      id:"Update 3 months ago",
      title:"Latin",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq1uYtfQWQYHM-MjoPYa3QTCdyshL3h9ZQsQ&s"
    },{
      id:"Update 10 months ago",
      title:"Classical",
      image:"https://play-lh.googleusercontent.com/J86GagKKsvCqrZmXJwPZ_9zBNm0Smm-saLHCkvLZ5Y5RheGL0cnNJ2w2B9jEBeyaPHgj"
    },{
      id:"Update 1 year ago",
      title:"Hip-Hop",
      image:"https://static.vecteezy.com/system/resources/previews/034/205/833/non_2x/colored-hip-hop-music-style-concept-background-illustration-vector.jpg"
    },
    {
      id:"Update 1 year ago",
      title:"Disco",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxUMCQzTqzitzHLcEKqf8cAz37Kc1hZyTwwQ&s"
    },
    {
      id:"Update 2 years ago",
      title:"Indie",
      image:"https://www.sharetopros.com/blog/images/exploring-indie-music-scenes-from-around-the-world/exploring-indie-music-scenes-from-around-the-world-img-5.webp"
    },
    {
      id:"Update 3 years ago",
      title:"Folk & Acoustic",
      image:"https://i1.sndcdn.com/artworks-BFGxbrcFjmBMOozZ-a8BdpA-t500x500.jpg"
    },
    {
      id:"Update 4 years ago",
      title:"DJ",
      image:"https://static.wixstatic.com/media/b4dbad_713fc98aac8540439b877b28793707c5~mv2.png/v1/crop/x_0,y_184,w_1545,h_1693/fill/w_640,h_652,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/2024%20DIGITAL%20WONDERBALL%20Sponsorship%20Opportunities%20bl.png"
    },
    {
      id:"Update 2 days ago",
      title:"VPop",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4f5kEwxY5EE75-bBAPa6kxnZwlczUC0C_6w&s"
    },
    {
      id:"Update 3 days ago",
      title:"JPop",
      image:"https://thumbs.dreamstime.com/b/jpop-otaku-color-icon-vector-jpop-otaku-sign-isolated-symbol-illustration-jpop-otaku-color-icon-vector-illustration-319341736.jpg"
    },
    {
      id:"Update 2 days ago",
      title:"Indi-Pop",
      image:"https://i.scdn.co/image/ab67616d0000b273e78d305607c6cc7292d306d9"
    },
    {
      id:"Update 2 days ago",
      title:"KPop",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ-nZLjhnHIZ6ODF-68sLeeWAUnZTx-9EJ0w&s"
    },









  ]

}
