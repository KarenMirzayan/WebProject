import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private apiService: ApiService, private router: Router, private activatedRoute:ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getProductsBySearch(String(params['name']));
  });

  }

  ngOnInit() {
    this.apiService.getProducts().subscribe((data) => {
      this.products = data as Product[];
    });
  }

  viewProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }


  getProductsBySearch(searchTerm?:string):void{
      if(searchTerm){
        this.apiService.getProducts()
        .subscribe(products=>{
          this.products = products.filter((product:Product)=>product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        });
      }
      else{
        this.apiService.getProducts().subscribe(products => this.products = products);
      }

  }
}
