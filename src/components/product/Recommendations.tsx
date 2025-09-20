"use client";

import { useState, useEffect } from "react";
import { aiProductRecommendations } from "@/ai/flows/ai-product-recommendations";
import { products as allProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLanguage } from "@/hooks/use-language";

type RecommendationsProps = {
  currentProductId: string;
};

export function Recommendations({ currentProductId }: RecommendationsProps) {
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { translate } = useLanguage();

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        // In a real app, user history would be dynamically tracked.
        const userHistory = ["prod-1", "prod-3"];
        const { productRecommendations } = await aiProductRecommendations({
          userHistory,
          numRecommendations: 5,
        });

        // Filter out the current product and map IDs to full product objects
        const fullProducts = productRecommendations
          .filter((id) => id !== currentProductId)
          .map((id) => allProducts.find((p) => p.id === id))
          .filter(Boolean); // Filter out any undefined results

        setRecommendedProducts(fullProducts as any[]);
      } catch (error) {
        console.error("Failed to fetch AI recommendations:", error);
        // Fallback to simple category-based recommendations
        const currentProduct = allProducts.find(p => p.id === currentProductId);
        if (currentProduct) {
          const fallback = allProducts.filter(p => p.category === currentProduct.category && p.id !== currentProductId).slice(0, 4);
          setRecommendedProducts(fallback);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendations();
  }, [currentProductId]);

  if (loading) {
    return (
        <div className="space-y-4">
            <h2 className="font-headline text-2xl font-bold tracking-tight">{translate('You Might Also Like')}</h2>
            <p>{translate('Loading recommendations...')}</p>
        </div>
    )
  }
  
  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="font-headline text-2xl font-bold tracking-tight">{translate('You Might Also Like')}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {recommendedProducts.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
}