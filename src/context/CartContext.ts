import { createContext } from "react";
import type { CartItem } from "../types/CartItem";
import type { Product } from "../types/Product";

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);