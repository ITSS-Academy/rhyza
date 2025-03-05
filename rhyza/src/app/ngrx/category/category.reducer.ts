import {CategoryState} from './category.state';
import{CategoryModel} from '../../models/category.model';
import * as CategoryActions from './category.action';
import {createReducer, on} from '@ngrx/store';

export const initialState: CategoryState = {
  categoryDetail: <CategoryModel>{},
  categoryList: <CategoryModel[]>[],
  isLoading: false,
  error: null,
}

export  const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.getCategories, (state, {type}) => {
    console.log(type);
    return{
      ...state,
      isLoading: true,
    }
  }),

  on(CategoryActions.getCategoriesSuccess, (state, {categoryList, type}) => {
    console.log(type);
    return<CategoryState>{
      ...state,
      categoryList: categoryList,
      isLoading: false,
    }
  }),

  on(CategoryActions.getCategoriesFailure, (state, {error, type}) => {
    console.log(type);
    return{
      ...state,
      error: error,
      isLoading: false,
    }
  })
)
