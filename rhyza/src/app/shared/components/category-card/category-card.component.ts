import {Component, Input} from '@angular/core';
import {CategoryModel} from '../../../models/category.model';
import {NgOptimizedImage} from '@angular/common';
import {MaterialModule} from '../../material.module';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [
    MaterialModule,
    RouterLinkActive,
  ],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {

  constructor(private router: Router) {
  }

  @Input() item?: CategoryModel;

  navigateToCategoryDetail(id: string) {
    if(id != null || id != undefined || id != ''){
      this.router.navigate(['category-detail', id]);

    }
  }

}
