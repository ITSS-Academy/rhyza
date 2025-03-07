import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {CategoryService} from '../../services/category/category.service';
import * as CategoryActions from './category.action';
import {catchError, exhaustMap, map, of} from 'rxjs';

export const getListCategory = createEffect(
  (actions$ = inject(Actions), categoryService = inject(CategoryService)) => {
    return actions$.pipe(
      ofType(CategoryActions.getCategories),
      exhaustMap(() =>
        categoryService.getCategoryList().pipe(
          map((categoryList) => CategoryActions.getCategoriesSuccess({ categoryList })),
          catchError((error) => of(CategoryActions.getCategoriesFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const getCategoryById = createEffect(
  (actions$ = inject(Actions), categoryService = inject(CategoryService)) => {
    return actions$.pipe(
      ofType(CategoryActions.getCategoryById),
      exhaustMap((action) =>
        categoryService.getCategoryDetail(action.id).pipe(
          map((categoryDetail) => CategoryActions.getCategoryByIdSuccess({ categoryDetail })),
          catchError((error) => of(CategoryActions.getCategoryByIdFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);
