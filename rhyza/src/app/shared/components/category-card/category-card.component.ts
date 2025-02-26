import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardSmImage, MatCardTitleGroup} from '@angular/material/card';
import {CategoryModel} from '../../../models/category.model';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [
    MatIcon,
    MatCardTitleGroup,
    MatCardSmImage,
    MatCard,
    NgOptimizedImage
  ],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {

  @Input() item?: CategoryModel;

}
