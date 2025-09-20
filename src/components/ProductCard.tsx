
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { getArtisan } from "@/lib/data";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { translate } = useLanguage();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const artisan = getArtisan(product.artisanId);
  const image = PlaceHolderImages.find((img) => img.id === product.images[0]);
  
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      router.push(`/login?redirect=/wishlist&addItem=${product.id}`);
      return;
    }
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }

  return (
    <Card className="group flex flex-col overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Link href={`/products/${product.id}`}>
            <div className="aspect-square w-full">
              {image && (
                <Image
                  src={image.imageUrl}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={image.imageHint}
                />
              )}
            </div>
          </Link>
          {product.sustainability && (
            <Badge variant="secondary" className="absolute top-2 left-2 bg-green-100 text-green-800 dark:bg-green-900/80 dark:text-green-200">
              🌱 {translate(product.sustainability)}
            </Badge>
          )}
          <Button 
            size="icon" 
            variant="secondary" 
            className="absolute bottom-2 right-2 h-8 w-8 rounded-full"
            onClick={handleWishlistClick}
          >
            <Heart className={cn("h-4 w-4", inWishlist && "fill-red-500 text-red-500")}/>
            <span className="sr-only">{translate('Add to wishlist')}</span>
          </Button>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="truncate font-semibold leading-none">
            <Link href={`/products/${product.id}`}>{translate(product.name)}</Link>
          </h3>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {translate('by')}{" "}
            <Link
              href={`/artisans/${artisan?.id}`}
              className="hover:underline"
            >
              {artisan?.name}
            </Link>
          </p>
          <p className="mt-2 font-semibold">{formatPrice(product.price)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          size="sm"
          onClick={() => addToCart(product)}
          className="w-full"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> {translate('Add to Cart')}
        </Button>
      </CardFooter>
    </Card>
  );
}
