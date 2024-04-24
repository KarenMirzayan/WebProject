import { Component, OnInit } from '@angular/core';
import { Product } from '../models';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {CartService} from "../cart.service";
import {WishlistService} from "../wishlist.service";

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
    private route: ActivatedRoute,
  private cartService: CartService,
  private wishlistService: WishlistService,
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
  addToCart(productId: number) {
    this.cartService.addToCart(productId, 1).subscribe()
  }

  addToWishlist(productId: number) {
    this.wishlistService.add_item(productId).subscribe()
  }
}
