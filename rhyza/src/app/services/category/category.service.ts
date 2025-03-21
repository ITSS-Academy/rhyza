import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryModel} from '../../models/category.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategoryList() {
    return this.http.get<CategoryModel[]>(`${environment.apiUrl}category/all`);
  }

  getCategoryDetail(id: string) {
    return this.http.get<CategoryModel>(`${environment.apiUrl}category?id=${id}`);
  }
}
