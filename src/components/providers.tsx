"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { CartProvider } from "@/lib/cart-provider";
import { AuthProvider } from "@/lib/auth-provider";
import { WishlistProvider } from "@/lib/wishlist-provider";
import { LanguageProvider } from "@/lib/language-provider";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </NextThemesProvider>
  );
}
