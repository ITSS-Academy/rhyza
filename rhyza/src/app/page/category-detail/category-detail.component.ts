import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {MaterialModule} from '../../shared/material.module';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
