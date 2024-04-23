import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.getProducts().subscribe((data) => {
      this.products = data as Product[];
    });
  }

  viewProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }
}
