import { Component, OnInit } from '@angular/core';
import { Brand } from '../models';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css',
})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getBrands().subscribe((data) => {
      this.brands = data as Brand[];
    });
  }

  viewBrandProducts(brandId: number): void {
    this.router.navigate(['/brands', brandId, 'products']);
  }
}
