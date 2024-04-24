import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-products.component.html',
  styleUrl: './brand-products.component.css',
})
export class BrandProductsComponent implements OnInit {
  products: Product[] = [];
  brandId!: number;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.brandId = params['brand_id'];
      this.getBrandProducts(this.brandId);
    });
  }

  getBrandProducts(id: number): void {
    this.apiService.getBrandProducts(id).subscribe((data) => {
      this.products = data as Product[];
    });
  }
  viewProductDetails(id: number) {
    this.router.navigate(['../../../products', id]);
  }
  addToCart() {}

  addToWishlist() {}
}
