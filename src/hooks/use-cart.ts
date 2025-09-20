"use client";

import { CartContext } from "@/lib/cart-provider";
import { useContext } from "react";

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
