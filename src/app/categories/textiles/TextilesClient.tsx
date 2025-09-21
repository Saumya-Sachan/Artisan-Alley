
'use client';

import { ProductGrid } from "@/components/marketplace/ProductGrid";
import { FilterSidebar } from "@/components/marketplace/FilterSidebar";
import { products } from "@/lib/data";
import type { Product } from "@/lib/types";
import { useLanguage } from "@/hooks/use-language";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useSearchParams } from "next/navigation";

export default function TextilesPage() {
  const { translate } = useLanguage();
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  
  const getArray = (value: string | null): string[] => {
    if (typeof value === "string") return value.split(",");
    return [];
  };

  const selectedProductTypes = getArray(searchParams.get('productType'));
  const selectedRegions = getArray(searchParams.get('region'));
  const selectedMaterials = getArray(searchParams.get('material'));
  const priceParam = searchParams.get('price');
  const priceRange =
    typeof priceParam === "string"
      ? priceParam.split(",").map(Number)
      : [0, 100000];

  const filteredProducts = products.filter((product: Product) => {
    if (product.category !== 'Textiles') return false;

    const productTypeMatch =
      selectedProductTypes.length === 0 ||
      selectedProductTypes.includes(product.productType);
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const regionMatch =
      selectedRegions.length === 0 ||
      selectedRegions.includes(product.region);
    const materialMatch =
      selectedMaterials.length === 0 ||
      selectedMaterials.includes(product.material);

    return productTypeMatch && priceMatch && regionMatch && materialMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
       <div className="flex items-center justify-between mb-8">
        <header>
            <h1 className="font-headline text-4xl font-bold">{translate('Textiles')}</h1>
            <p className="text-muted-foreground">
            {translate('Explore hand-woven and embroidered textiles.')}
            </p>
        </header>
         {isMobile && (
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
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
      </div>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {!isMobile && <FilterSidebar />}
        <div id="products" className="flex-1 scroll-mt-20">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
