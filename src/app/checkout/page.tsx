
"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/use-auth";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { cart, cartTotal, itemCount } = useCart();
  const [addTip, setAddTip] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);
  const router = useRouter();
  const { translate } = useLanguage();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login?redirect=/checkout');
    }
  }, [isLoggedIn, router]);

  const total = cartTotal + tipAmount;
  
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/checkout/success');
  }

  if (!isLoggedIn || !user) {
    // This will render a blank page or a loading spinner while redirecting.
    return null;
  }

  if (itemCount === 0) {
    return (
        <div className="container mx-auto flex h-screen items-center justify-center text-center">
            <div>
                <h1 className="text-2xl font-bold">{translate('Your cart is empty')}</h1>
                <p className="text-muted-foreground">{translate('Please add items to your cart before proceeding to checkout.')}</p>
                <Button asChild className="mt-4">
                    <Link href="/marketplace">{translate('Return to Marketplace')}</Link>
                </Button>
            </div>
        </div>
    )
  }

  return (
    <div className="bg-secondary/50">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 md:px-6">
        <div className="order-2 md:order-1">
          <h1 className="font-headline text-3xl font-bold mb-6">{translate('Checkout')}</h1>
          <form onSubmit={handleCheckout}>
            <Card>
              <CardHeader>
                <CardTitle>{translate('Shipping Information')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="first-name">{translate('First Name')}</Label>
                        <Input id="first-name" placeholder={translate('John')} required/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="last-name">{translate('Last Name')}</Label>
                        <Input id="last-name" placeholder={translate('Doe')} required/>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">{translate('Address')}</Label>
                    <Input id="address" placeholder="123 Artisan Way" required/>
                </div>
                <div className="grid grid-cols-3 gap-4">
                     <div className="space-y-2 col-span-2">
                        <Label htmlFor="city">{translate('City')}</Label>
                        <Input id="city" placeholder="Craftsville" required/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="zip">{translate('ZIP Code')}</Label>
                        <Input id="zip" placeholder="12345" required/>
                    </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>{translate('Payment')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="card-number">{translate('Card Number')}</Label>
                        <Input id="card-number" placeholder="**** **** **** 1234" required/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiry">{translate('Expiry')}</Label>
                            <Input id="expiry" placeholder="MM/YY" required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvc">{translate('CVC')}</Label>
                            <Input id="cvc" placeholder="123" required/>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Button type="submit" size="lg" className="w-full mt-6">{translate('Pay')} {formatPrice(total)}</Button>
          </form>
        </div>
        
        <div className="order-1 md:order-2">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>{translate('Order Summary')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.map(item => {
                  const image = PlaceHolderImages.find(img => img.id === item.images[0]);
                  return (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 rounded-md border">
                          {image && <Image src={image.imageUrl} alt={item.name} fill className="object-cover rounded-md" data-ai-hint={image.imageHint}/>}
                          <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">{item.quantity}</span>
                        </div>
                        <div>
                          <p className="font-medium">{translate(item.name)}</p>
                          <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  )
                })}
              </div>
              <Separator className="my-4"/>
              <div className="space-y-2">
                <div className="flex justify-between">
                    <p>{translate('Subtotal')}</p>
                    <p>{formatPrice(cartTotal)}</p>
                </div>
                 <div className="flex justify-between">
                    <p>{translate('Shipping')}</p>
                    <p>Rs.0</p>
                </div>
                <div className="flex justify-between">
                    <p>{translate('Taxes')}</p>
                    <p>Rs.0</p>
                </div>
              </div>
              <Separator className="my-4"/>
              <div className="flex items-center space-x-2">
                <Checkbox id="tip" checked={addTip} onCheckedChange={(checked) => setAddTip(checked as boolean)} />
                <Label htmlFor="tip">{translate('Add a tip to support the artisan directly')}</Label>
              </div>
              {addTip && (
                <div className="mt-2 flex gap-2">
                    {[150, 400, 800].map(amount => (
                        <Button key={amount} variant={tipAmount === amount ? "default" : "secondary"} size="sm" onClick={() => setTipAmount(amount)}>Rs.{amount}</Button>
                    ))}
                    <Input type="number" placeholder={translate('Custom')} className="h-9" onChange={(e) => setTipAmount(parseFloat(e.target.value) || 0)} />
                </div>
              )}
               <Separator className="my-4"/>
               <div className="flex justify-between font-bold text-lg">
                    <p>{translate('Total')}</p>
                    <p>{formatPrice(total)}</p>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    
