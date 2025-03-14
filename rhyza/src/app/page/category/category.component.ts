  import {Component, Input, OnInit} from '@angular/core';
import {MaterialModule} from '../../shared/material.module';
import { CategoryModel } from '../../models/category.model';
import {CategoryCardComponent} from '../../shared/components/category-card/category-card.component';
import {Router, RouterOutlet} from '@angular/router';
import {Store} from '@ngrx/store';
import {CategoryState} from '../../ngrx/category/category.state';
import {debounceTime, Observable, Subscription} from 'rxjs';
  import {FormControl, FormsModule} from '@angular/forms';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MaterialModule,
    CategoryCardComponent,
    FormsModule,

  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  categoryList$ !: Observable<CategoryModel[]>;
  subscription : Subscription[] = [];
  categoryList: CategoryModel[] = [];
  is_loading$ !: Observable<boolean>;
  filteredCategories = [...this.categoryList];
  searchControl = new FormControl('');
  isSearching = false;
  mode: 'determinate' | 'indeterminate' = 'indeterminate';

  filterCategories(searchTerm: string | null) {
    if (!searchTerm || !searchTerm.trim()) {
      this.filteredCategories = [...this.categoryList];
      return;
    }

    this.filteredCategories = this.categoryList.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  constructor(private store:Store<{
    category: CategoryState
  }>) {

    this.categoryList$ = this.store.select('category','categoryList')
    this.is_loading$ = this.store.select('category','isLoading')
    this.searchControl.valueChanges.pipe(
      debounceTime(300) // Chờ 300ms để tránh lag khi nhập
    ).subscribe(value => {
      this.isSearching = value!.trim().length > 0;
      this.filterCategories(value);
    });

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
    return category;
  }



}

