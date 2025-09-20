"use client";

import { useCart } from "@/hooks/use-cart";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getArtisan } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function CheckoutSuccessPage() {
  const { cart, clearCart } = useCart();
  const { translate } = useLanguage();

  useEffect(() => {
    // Clear the cart when the user lands on the success page
    if (cart.length > 0) {
      clearCart();
    }
  }, [clearCart, cart.length]);
  
  // For demonstration, we'll pick the artisan from the first item in the cart before it was cleared.
  // In a real app, this data would come from the server-side confirmation.
  const artisanId = cart[0]?.artisanId || 'artisan-1'; 
  const artisan = getArtisan(artisanId);
  const artisanImage = artisan ? PlaceHolderImages.find(img => img.id === artisan.profileImage) : null;
  
  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-12 md:px-6">
        <Card className="w-full max-w-lg text-center">
            <CardContent className="p-8">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h1 className="font-headline text-3xl font-bold">{translate('Thank You!')}</h1>
                <p className="mt-2 text-muted-foreground">{translate('Your order has been placed successfully.')}</p>
                
                {artisan && (
                    <div className="mt-8 rounded-lg bg-secondary/50 p-6">
                        <h2 className="text-lg font-semibold">{translate('A Note from the Artisan')}</h2>
                        <div className="flex items-center justify-center gap-4 mt-4">
                           {artisanImage && <Avatar>
                                <AvatarImage src={artisanImage.imageUrl} alt={artisan.name} />
                                <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
                            </Avatar>}
                            <p className="font-semibold">{artisan.name}</p>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground italic">{translate('"Thank you for your support! Each purchase helps me continue my craft and share my passion with the world. I hope you love your new piece as much as I loved creating it."')}</p>
                    </div>
                )}
                
                <Button asChild className="mt-8 w-full" size="lg">
                    <Link href="/marketplace">{translate('Continue Shopping')}</Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}