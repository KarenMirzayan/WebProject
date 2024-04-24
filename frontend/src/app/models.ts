import {Product} from "./interfaces";

export interface Token {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  id: number;
  product: Product;
}

export interface Password {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
