
'use client';

import { Suspense } from "react";
import MarketplaceClient from "./MarketplaceClient";

import { ProductGrid } from "@/components/marketplace/ProductGrid";
import { FilterSidebar } from "@/components/marketplace/FilterSidebar";
import { products } from "@/lib/data";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MarketplacePage() {
  const { translate } = useLanguage();
  const isMobile = useIsMobile();
  // This page now serves as a general entry to the marketplace.
  // The FilterSidebar will handle navigation to specific category pages.
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold">{translate('Marketplace')}</h1>
        <p className="text-muted-foreground">
          {translate('Find your next handcrafted treasure. Use the filters to start exploring.')}
        </p>
      </header>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {!isMobile ? (
            <FilterSidebar />
        ) : (
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                        <Filter className="mr-2 h-4 w-4" />
                        {translate('Filters')}
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle className="font-headline text-xl">{translate('Filters')}</SheetTitle>
                    </SheetHeader>
                    <FilterSidebar />
                </SheetContent>
            </Sheet>
        )}
        <div className="flex-1">
           <div className="flex items-center justify-between mb-4">
             <h2 className="font-headline text-2xl font-bold">{translate('Featured Products')}</h2>
           </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </div>
    </div>
  );
}
