import {Component, Input} from '@angular/core';
import {CategoryModel} from '../../../models/category.model';

@Component({
  selector: 'app-category-home',
  standalone: true,
  imports: [
  ],
  templateUrl: './category-home.component.html',
  styleUrl: './category-home.component.scss'
})
export class CategoryHomeComponent {
  @Input() category:CategoryModel | undefined;
  constructor() {
  }

}
