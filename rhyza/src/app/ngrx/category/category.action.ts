import {createAction, props} from '@ngrx/store';
import {CategoryModel} from '../../models/category.model';

export const getCategories = createAction(
  '[Category] Get Categories'
);

export const getCategoriesSuccess = createAction(
  '[Category] Get Categories Success',
  props<{ categoryList: CategoryModel[] }>(),
);

export const getCategoriesFailure = createAction(
  '[Category] Get Categories Failure',
  props<{ error: any }>(),
);
