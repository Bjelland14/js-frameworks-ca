import { useState } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../types/CartItem";
import type { Product } from "../types/Product";
import { CartContext } from "./CartContext";

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }

          return item;
        })
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  }

  function removeFromCart(id: string) {
    setCart(cart.filter((item) => item.product.id !== id));
  }

 
  function updateQuantity(id: string, quantity: number) {
    if (quantity < 1) {
      return;
    }

  setCart(
    cart.map((item) => {
      if (item.product.id === id) {
        return { ...item, quantity };
      }

      return item;
    })
  );
}

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}