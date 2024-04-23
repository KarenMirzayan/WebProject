import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from './models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  BASE_URL = 'http://localhost:8000/api/cart';

  constructor(private http: HttpClient) { }

  getCart(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`);
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.BASE_URL}/add/`, { product_id: productId, quantity });
  }

  updateCartItem(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}/item/${cartItemId}/`, { quantity });
  }

  removeFromCart(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/item/${cartItemId}/remove/`);
  }
}
