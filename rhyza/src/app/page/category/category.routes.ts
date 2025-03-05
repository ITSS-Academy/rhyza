import {Routes} from '@angular/router';

import {CategoryComponent} from './category.component';
import {CategoryDetailComponent} from '../category-detail/category-detail.component';

export const CATEGORY_ROUTES: Routes = [
  {
    path: '',
    redirectTo: "category",
    pathMatch: "full"
  },

  {
    path: "category",
    component: CategoryComponent

  },

  {
    path: "category-detail/:id",
    component: CategoryDetailComponent

  },
];

