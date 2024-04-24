import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces';
import { ApiService } from '../api.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private apiService: ApiService, private router: Router, private activatedRoute:ActivatedRoute) {

  }

  ngOnInit() {
    this.apiService.getProducts().subscribe((data) => {
      this.products = data as Product[];
    });
  }

  viewProductbyID(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  addToWishlist() {}
}
