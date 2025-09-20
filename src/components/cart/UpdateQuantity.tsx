"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";

type UpdateQuantityProps = {
  productId: string;
  quantity: number;
};

export default function UpdateQuantity({
  productId,
  quantity,
}: UpdateQuantityProps) {
  const { updateQuantity } = useCart();

  const handleDecrement = () => {
    updateQuantity(productId, quantity - 1);
  };

  const handleIncrement = () => {
    updateQuantity(productId, quantity + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      updateQuantity(productId, value);
    }
  };

  return (
    <div className="mt-2 flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={handleDecrement}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        value={quantity}
        onChange={handleChange}
        className="mx-2 h-8 w-14 text-center"
        min="0"
      />
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={handleIncrement}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
