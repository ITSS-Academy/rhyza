import {Component, Input, OnInit} from '@angular/core';
import {MaterialModule} from '../../shared/material.module';
import { CategoryModel } from '../../models/category.model';
import {CategoryCardComponent} from '../../shared/components/category-card/category-card.component';
import {Router, RouterOutlet} from '@angular/router';
import {Store} from '@ngrx/store';
import {CategoryState} from '../../ngrx/category/category.state';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MaterialModule,
    CategoryCardComponent,

  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  categoryList$ !: Observable<CategoryModel[]>;
  subscription : Subscription[] = [];
  categoryList: CategoryModel[] = [];
  is_loading$ !: Observable<boolean>;


  constructor(private store:Store<{
    category: CategoryState
  }>) {

    this.categoryList$ = this.store.select('category','categoryList')
    this.is_loading$ = this.store.select('category','isLoading')

  }

  ngOnInit() {
    this.subscription.push(
      this.categoryList$.subscribe((category) =>{
        if (category.length > 0) {
          this.categoryList = category;
        }
      })
    )
  }

  getCategoryDetail(id: number) {
    const category = this.categoryList.find((e) => e.id == id.toString());
    console.log(category)
    return category;
  }



}

