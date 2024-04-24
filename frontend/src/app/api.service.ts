import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand, Category, Product } from './interfaces';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories/`);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}/`);
  }

  getCategoryProducts(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrl}/categories/${id}/products/`
    );
  }

  getCategoryProduct(id: number, prod_id: number): Observable<Product> {
    return this.http.get<Product>(
      `${this.apiUrl}/categories/${id}/products/${prod_id}/`
    );
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.apiUrl}/brands/`);
  }

  getBrand(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.apiUrl}/brands/${id}/`);
  }

  getBrandProducts(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/brands/${id}/products/`);
  }

  getBrandProduct(id: number, prod_id: number): Observable<Product> {
    return this.http.get<Product>(
      `${this.apiUrl}/brands/${id}/products/${prod_id}/`
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}/`);
  }

  getProductsBySearch(searchTerm: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => {
        if (searchTerm) {
          return products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        } else {
          return products;
        }
      })
    );
  } 
  /*щя добавлю чтобы перебрасывало на еррор если ниче не найдет*/ 
}
