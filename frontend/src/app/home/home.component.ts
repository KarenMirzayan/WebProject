import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models';
import { ApiService } from '../api.service';
import { Router,ActivatedRoute } from '@angular/router';
import {CartService} from "../cart.service";
import {WishlistService} from "../wishlist.service";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private apiService: ApiService,
              private router: Router,
              private activatedRoute:ActivatedRoute,
              private cartService: CartService,
              private wishlistService: WishlistService,
  ) {

  }

  ngOnInit() {
    this.apiService.getProducts().subscribe((data) => {
      this.products = data as Product[];
    });
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId, 1).subscribe()
  }

  addToWishlist(productId: number) {
    this.wishlistService.add_item(productId).subscribe()
  }
  viewProductDetails(id: number) {
    this.router.navigate(['../../../products', id]);
  }
}
