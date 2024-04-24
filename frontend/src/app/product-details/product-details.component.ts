import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces';
import { WishlistItem } from '../models';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private wishListService: WishlistService
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
    });
  }

  addToCart() {}

  addToWishlist(product: Product): void {
    const wishlistItem: WishlistItem = { id: product.id, product: product}; 
    this.wishListService.add_item(wishlistItem).subscribe((addedItem: WishlistItem) => {
      console.log('Item added to wishlist:', addedItem);
    });
  }
}
