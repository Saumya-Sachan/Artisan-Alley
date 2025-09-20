
"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/cart/CartItem";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { cart, itemCount, cartTotal, clearCart } = useCart();
  const { translate } = useLanguage();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      router.push('/login?redirect=/checkout');
    } else {
      router.push('/checkout');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <h1 className="font-headline text-4xl font-bold mb-8">{translate('Your Cart')}</h1>
      {itemCount > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{translate('Items')} ({itemCount})</CardTitle>
                <Button variant="outline" size="sm" onClick={clearCart}>{translate('Clear Cart')}</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id}>
                       <CartItem item={item} />
                       <Separator className="mt-6"/>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle>{translate('Order Summary')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{translate('Subtotal')}</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{translate('Shipping')}</span>
                  <span>{translate('Calculated at next step')}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>{translate('Total')}</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full" onClick={handleCheckout}>
                  {translate('Proceed to Checkout')}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex h-96 flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed">
            <ShoppingCart size={64} className="text-muted-foreground" />
            <h2 className="text-2xl font-semibold">{translate('Your cart is empty')}</h2>
            <p className="text-muted-foreground">{translate("Looks like you haven't added anything to your cart yet.")}</p>
            <Button asChild>
                <Link href="/marketplace">{translate('Start Shopping')}</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
