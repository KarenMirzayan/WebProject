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
