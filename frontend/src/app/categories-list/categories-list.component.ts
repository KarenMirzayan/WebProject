import { Component, OnInit } from '@angular/core';
import { Category } from '../interfaces';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.getCategories().subscribe((data) => {
      this.categories = data as Category[];
    });
  }

  viewCategoryDetails(categoryId: number): void {
    this.router.navigate(['/categories', categoryId]);
  }
}
