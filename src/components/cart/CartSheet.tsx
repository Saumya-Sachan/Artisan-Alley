"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartItem from "./CartItem";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { useLanguage } from "@/hooks/use-language";
import { formatPrice } from "@/lib/utils";

export function CartSheet() {
  const { cart, itemCount, cartTotal } = useCart();
  const { translate } = useLanguage();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
             <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0 text-xs">
              {itemCount}
             </Badge>
          )}
          <span className="sr-only">{translate('Open cart')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>{translate('Shopping Cart')} ({itemCount})</SheetTitle>
        </SheetHeader>
        <Separator />
        {cart.length > 0 ? (
          <>
            <ScrollArea className="flex-grow">
              <div className="flex flex-col gap-4 pr-6">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="mt-auto">
              <div className="flex w-full flex-col gap-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>{translate('Subtotal')}</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <SheetTrigger asChild>
                        <Button variant="outline" className="flex-1" asChild>
                            <Link href="/cart">{translate('View Cart')}</Link>
                        </Button>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                        <Button className="flex-1" asChild>
                            <Link href="/checkout">{translate('Checkout')}</Link>
                        </Button>
                    </SheetTrigger>
                </div>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <ShoppingCart size={48} className="text-muted-foreground" />
            <p className="text-muted-foreground">{translate('Your cart is empty.')}</p>
            <SheetTrigger asChild>
                <Button asChild>
                    <Link href="/marketplace">{translate('Start Shopping')}</Link>
                </Button>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
