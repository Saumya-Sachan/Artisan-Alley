import Link from "next/link";
import { Instagram, Youtube, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-headline text-lg font-semibold">
              About Us
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="hover:text-primary">
                  Artisan Empowerment
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-primary">
                  Our Impact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-headline text-lg font-semibold">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-primary">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/culture" className="hover:text-primary">
                  Support
                </Link>
              </li>
            </ul>
          </div>
           <div>
            <h3 className="mb-4 font-headline text-lg font-semibold">
              Get Involved
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-headline text-lg font-semibold">
              Contact & Socials
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:support@artisanai.com" className="hover:text-primary">
                  support@artisanai.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:text-primary">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <Link href="https://instagram.com" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="https://youtube.com" aria-label="YouTube">
                <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="https://facebook.com" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Artisan Alley – Preserving Culture Through
            Technology.
          </p>
        </div>
      </div>
    </footer>
  );
}
