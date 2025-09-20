"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import type { CartItem as CartItemType } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import UpdateQuantity from "./UpdateQuantity";
import { formatPrice } from "@/lib/utils";

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart } = useCart();
  const image = PlaceHolderImages.find(
    (img) => img.id === item.images[0]
  );

  return (
    <div className="flex items-start gap-4">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        {image && (
          <Image
            src={image.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        )}
      </div>
      <div className="flex-grow">
        <Link
          href={`/products/${item.id}`}
          className="font-medium hover:underline"
        >
          {item.name}
        </Link>
        <p className="text-sm text-muted-foreground">
          {formatPrice(item.price)}
        </p>
        <UpdateQuantity productId={item.id} quantity={item.quantity} />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 flex-shrink-0"
        onClick={() => removeFromCart(item.id)}
        aria-label={`Remove ${item.name} from cart`}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
