import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import {CartService} from "../cart.service";
import {WishlistService} from "../wishlist.service";
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private wishlistService: WishlistService,
  ) {}

  ngOnInit() {
    this.apiService.getProducts().subscribe((data) => {
      this.products = data as Product[];
    });
  }

  viewProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId, 1).subscribe()
  }

  addToWishlist(productId: number) {
    this.wishlistService.add_item(productId).subscribe()
  }
}
