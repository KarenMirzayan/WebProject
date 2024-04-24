import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CartService} from "../cart.service";
import {WishlistService} from "../wishlist.service";

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css',
})
export class CategoryProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private wishlistService: WishlistService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('category_id')) {
        const id = Number(params.get('category_id'));
        this.apiService
          .getCategoryProducts(id)
          .subscribe((data) => (this.products = data as Product[]));
      }
    });
  }

  viewProductDetails(id: number) {
    this.router.navigate(['../../../products', id]);
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId, 1).subscribe()
  }

  addToWishlist(productId: number) {
    this.wishlistService.add_item(productId).subscribe()
  }
}
