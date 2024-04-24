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

export interface Category {
  id: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  discount: number;
  category: number;
  brand: number;
}

export interface User{
  id:number;
  username:string;
  email:string;
  first_name:string;
  last_name:string;
}

