import {Component, Input} from '@angular/core';
import {CategoryModel} from '../../../models/category.model';
import {NgOptimizedImage} from '@angular/common';
import {MaterialModule} from '../../material.module';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [
   MaterialModule,
    NgOptimizedImage
  ],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {

  @Input() item?: CategoryModel;

}
