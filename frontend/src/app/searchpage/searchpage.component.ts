import { Component,OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../interfaces';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { CommonModule} from '@angular/common';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-searchpage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './searchpage.component.html',
  styleUrl: './searchpage.component.css'
})
export class SearchpageComponent implements OnInit{
  products:Product[]=[];

  constructor(private apiService:ApiService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.searchTerm) {
        this.apiService.getProductsBySearch(params.searchTerm)
          .subscribe(products => this.products = products);
      } else {
        this.apiService.getProducts()
          .subscribe(products => this.products = products);
      }
    });
  }
  }

