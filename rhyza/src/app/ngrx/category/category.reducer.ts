import {CategoryState} from './category.state';
import{CategoryModel} from '../../models/category.model';
import * as CategoryActions from './category.action';
import {createReducer, on} from '@ngrx/store';

export const initialState: CategoryState = {
  categoryDetail: <CategoryModel>{},
  categoryList: <CategoryModel[]>[],
  isLoading: false,
  isLoadingDetail: false,
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
  }),

  on(CategoryActions.getCategoryById, (state, {type}) => {
    console.log(type);
    return{
      ...state,
      isLoadingDetail: true,
    }
  }),

  on(CategoryActions.getCategoryByIdSuccess, (state, {categoryDetail, type}) => {
    console.log(type);
    return<CategoryState>{
      ...state,
      categoryDetail: categoryDetail,
      isLoadingDetail: false,
    }
  }),

  on(CategoryActions.getCategoryByIdFailure, (state, {error, type}) => {
    console.log(type);
    return{
      ...state,
      error: error,
      isLoadingDetail: false,
    }
  }),

  //clear state category detail
  on(CategoryActions.clearCategoryDetail, (state, {type}) => {
    console.log(type);
    return<CategoryState>{
      ...state,
      categoryDetail: <CategoryModel>{},
    }
  }),

)
