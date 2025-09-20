"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/types";
import { ShoppingCart } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { translate } = useLanguage();

  return (
    <Button size="lg" onClick={() => addToCart(product)}>
      <ShoppingCart className="mr-2 h-5 w-5" /> {translate('Add to Cart')}
    </Button>
  );
}