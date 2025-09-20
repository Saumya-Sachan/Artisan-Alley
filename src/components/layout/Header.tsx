
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Menu, Search, ShoppingCart, User, LogIn, UserPlus, LogOut as LogOutIcon, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CartSheet } from "@/components/cart/CartSheet";
import { useAuth } from "@/hooks/use-auth";
import { useWishlist } from "@/hooks/use-wishlist";
import { Badge } from "../ui/badge";
import { SearchDialog } from "../search/SearchDialog";
import { LanguageSelector } from "../LanguageSelector";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const { itemCount: wishlistCount } = useWishlist();
  const { translate } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();
  const userName = user?.name || "Anonymous";
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    toast({
      title: translate("Logged Out"),
      description: translate("You have been successfully logged out."),
    });
    router.push('/');
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/artisans", label: "Artisans" },
    { href: "/culture", label: "Story Map" },
    { href: "/community", label: "Community" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link
          href="/"
          className="mr-6 flex items-center gap-2 font-headline text-lg font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <path d="M12 2l-8 8.5 4.5 5L4 22h16l-4.5-6.5 4.5-5L12 2z" />
            <path d="M12 2v20" />
          </svg>
          Artisan Alley
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === href || (href !== "/" && pathname.startsWith(href))
                  ? "text-primary"
                  : "text-foreground"
              )}
            >
              {translate(label)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchDialog />
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0 text-xs"
                >
                  {wishlistCount}
                </Badge>
              )}
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>
          <CartSheet />

          {/* Desktop User Menu */}
          <div className="hidden md:flex">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isLoggedIn ? (
                  <>
                     <DropdownMenuLabel>{translate("My Account")}</DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <Link href="/profile">
                        <DropdownMenuItem>{translate("Profile")}</DropdownMenuItem>
                     </Link>
                     <Link href="/profile/settings">
                        <DropdownMenuItem>{translate("Settings")}</DropdownMenuItem>
                     </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOutIcon className="mr-2 h-4 w-4" />
                        <span>{translate("Logout")}</span>
                      </DropdownMenuItem>
                  </>
                ) : (
                   <>
                     <DropdownMenuLabel>{translate("Welcome")}</DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <Link href="/login">
                        <DropdownMenuItem>
                           <LogIn className="mr-2 h-4 w-4" />
                           <span>{translate("Login")}</span>
                        </DropdownMenuItem>
                     </Link>
                      <Link href="/signup">
                        <DropdownMenuItem>
                           <UserPlus className="mr-2 h-4 w-4" />
                           <span>{translate("Sign Up")}</span>
                        </DropdownMenuItem>
                      </Link>
                   </>
                )}
                 <DropdownMenuSeparator />
                 <LanguageSelector />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
         

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle className="sr-only">{translate('Menu')}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 pt-10">
                  {navLinks.map(({ href, label }) => (
                    <SheetClose asChild key={href}>
                      <Link
                        href={href}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          pathname === href ? "text-primary" : "text-foreground"
                        )}
                      >
                        {translate(label)}
                      </Link>
                    </SheetClose>
                  ))}
                  <div className="border-t pt-6">
                    {isLoggedIn ? (
                      <SheetClose asChild>
                        <Link href="/profile">
                          <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9 cursor-pointer">
                                <AvatarImage src={user?.avatar} />
                                <AvatarFallback>
                                  {userName.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                  <p className="font-semibold">{userName}</p>
                                  <p className="text-sm text-muted-foreground">{translate("View Profile")}</p>
                              </div>
                          </div>
                        </Link>
                      </SheetClose>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <SheetClose asChild>
                           <Button asChild>
                            <Link href="/signup">{translate("Sign Up")}</Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                           <Button variant="outline" asChild>
                            <Link href="/login">{translate("Login")}</Link>
                          </Button>
                        </SheetClose>
                      </div>
                    )}
                  </div>
                   <div className="border-t pt-6">
                      <p className="text-sm text-muted-foreground mb-2">{translate("Language")}</p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <Languages className="mr-2 h-4 w-4" />
                            {translate("Language")}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <LanguageSelector />
                        </DropdownMenuContent>
                      </DropdownMenu>
                   </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
