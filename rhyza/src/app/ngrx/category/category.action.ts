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


export const getCategoryById = createAction(
  '[Category] Get Category Detail',
  props<{ id: string }>(),
);

export const getCategoryByIdSuccess = createAction(
  '[Category] Get Category Detail Success',
  props<{ categoryDetail: CategoryModel }>(),
);

export const getCategoryByIdFailure = createAction(
  '[Category] Get Category Detail Failure',
  props<{ error: any }>(),
);

//clear category detail
export const clearCategoryDetail = createAction(
  '[Category] Clear Category Detail',
);
