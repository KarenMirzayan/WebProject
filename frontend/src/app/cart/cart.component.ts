import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CartItem} from "../models";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cartService.getCart()
      .subscribe(cart => {
        this.cartItems = cart.products;
      });
  }

  updateQuantity(cartItemId: number, quantity: number): void {
    this.cartService.updateCartItem(cartItemId, quantity)
      .subscribe(() => {
        this.getCart();
      });
  }

  removeFromCart(cartItemId: number): void {
    this.cartService.removeFromCart(cartItemId)
      .subscribe(() => {
        this.getCart();
      });
  }
}
