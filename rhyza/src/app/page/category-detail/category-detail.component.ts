import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {
  MatCard,
  MatCardHeader,
  MatCardSmImage,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    MatIcon,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCardTitleGroup,
    MatCard,
    MatCardSmImage
  ],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent {

}
