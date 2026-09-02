import type { Product } from "./Product";

export interface ProductsResponse {
  data: Product[];
}

export interface ProductResponse {
  data: Product;
}