"use client";

import { useWishlist } from "@/hooks/use-wishlist";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/marketplace/ProductGrid";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/hooks/use-language";

export default function WishlistPage() {
  const { wishlist, itemCount } = useWishlist();
  const { translate } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold">{translate('Your Wishlist')}</h1>
        <p className="text-muted-foreground">
          {translate('You have')} {itemCount} {itemCount === 1 ? translate('item') : translate('items')} {translate('in your wishlist.')}
        </p>
      </header>
      {itemCount > 0 ? (
        <ProductGrid products={wishlist} />
      ) : (
        <div className="flex h-96 flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed">
            <Heart size={64} className="text-muted-foreground" />
            <h2 className="text-2xl font-semibold">{translate('Your wishlist is empty')}</h2>
            <p className="text-muted-foreground">{translate("Looks like you haven't added anything to your wishlist yet.")}</p>
            <Button asChild>
                <Link href="/marketplace">{translate('Start Discovering')}</Link>
            </Button>
        </div>
      )}
    </div>
  );
}