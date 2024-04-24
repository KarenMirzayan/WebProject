import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces';
import { WishlistItem } from '../models';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WishlistService } from '../wishlist.service';
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
    private wishListService:WishlistService
  ) {}

  ngOnInit() {
    this.apiService.getProducts().subscribe((data) => {
      this.products = data as Product[];
    });
  }

  viewProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  addToCart() {}

  addToWishlist(product: Product): void {
    const wishlistItem: WishlistItem = { id: product.id, product: product}; 
    this.wishListService.add_item(wishlistItem).subscribe((addedItem: WishlistItem) => {
      console.log('Item added to wishlist:', addedItem);
    });
  }
  
}
