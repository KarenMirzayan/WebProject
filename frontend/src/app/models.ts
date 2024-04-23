import {Product} from "./interfaces";

export interface Token {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  is_superuser: boolean;
}

export interface Cart {
  id: number;
  user: number;
  products: CartItem[];
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}
