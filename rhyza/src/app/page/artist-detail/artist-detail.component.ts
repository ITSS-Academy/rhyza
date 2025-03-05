import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [
    MatIcon,
    MatCard
  ],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.scss'
})
export class ArtistDetailComponent {

}
