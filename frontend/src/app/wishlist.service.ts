import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WishlistItem} from "./models";

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  BASE_URL = 'http://localhost:8000/api/wishlist';

  constructor(private http: HttpClient) { }

  get_items(): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(this.BASE_URL);
  }

  add_item(item: WishlistItem): Observable<WishlistItem> {
    return this.http.post<WishlistItem>(this.BASE_URL, item);
  }

  delete_item(product_id: number): Observable<any> {
    return this.http.delete<any>(this.BASE_URL + product_id);
  }
}
