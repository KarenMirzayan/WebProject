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
  password:string;
}
