import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryModel} from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategoryList() {
    return this.http.get<CategoryModel[]>('http://localhost:3000/category/all');
  }

  getCategoryDetail(id: string) {
    return this.http.get<CategoryModel>(`http://localhost:3000/category?id=${id}`);
  }
}
