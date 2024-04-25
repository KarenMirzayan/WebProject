import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Brand, Product } from '../models';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  productId!: number;
  brandName!: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.route.params.subscribe((params) => {
        this.productId = params['product_id'];
        this.getProductDetails(this.productId);
      });
    });
  }

  getProductDetails(id: number) {
    this.apiService.getProduct(id).subscribe((data) => {
      this.product = data;
      this.getBrandName(this.product.brand);
    });
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId, 1).subscribe();
  }

  addToWishlist(productId: number) {
    this.wishlistService.add_item(productId).subscribe();
  }

  getBrandName(brandId: number) {
    this.apiService.getBrand(brandId).subscribe((brand: Brand) => {
      this.brandName = brand.name;
    });
  }
}
