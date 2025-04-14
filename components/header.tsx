'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Search,
  User,
  Heart,
  HelpCircle,
  Menu,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-card';
import { useFavorites } from '@/hooks/use-favorites';
import { ModeToggle } from '@/components/mode-toggle';
import CartSheet from '@/components/cart-sheet';
import { cn } from '@/lib/utils';

const categories = [
  { name: 'Rowery górskie', slug: 'rowery-gorskie' },
  { name: 'Rowery miejskie', slug: 'rowery-miejskie' },
  { name: 'Rowery szosowe', slug: 'rowery-szosowe' },
  { name: 'Rowery elektryczne', slug: 'rowery-elektryczne' },
  { name: 'Rowery dziecięce', slug: 'rowery-dzieciece' },
  { name: 'Akcesoria', slug: 'akcesoria' },
  { name: 'Części', slug: 'czesci' },
  { name: 'Odzież', slug: 'odziez' },
  { name: 'Kaski', slug: 'kaski' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { items: cartItems } = useCart();
  const { items: favoriteItems } = useFavorites();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">BikeZone</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/sklep?kategoria=${category.slug}`}
                    className="text-base font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex-1 mx-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Szukaj wśród 2 milionów produktów..."
              className="w-full rounded-md pl-8 md:w-[300px] lg:w-[400px]"
            />
          </div>
        </div>
        <nav className="hidden gap-6 lg:flex">
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
              Kategorie
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full z-50 hidden w-[200px] rounded-md border bg-background p-2 group-hover:block">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/sklep?kategoria=${category.slug}`}
                  className="block rounded-sm px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6 max-[1200px]:hidden">
            <Link
              href="/promocje"
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === '/promocje' && 'text-primary'
              )}
            >
              Promocje
            </Link>
            <Link
              href="/wyprzedaz"
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === '/wyprzedaz' && 'text-primary'
              )}
            >
              Wyprzedaż
            </Link>
            <Link
              href="/outlet"
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === '/outlet' && 'text-primary'
              )}
            >
              Outlet
            </Link>
          </div>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <ModeToggle />
          </div>
          <Link href="/konto">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Konto</span>
            </Button>
          </Link>
          <Link href="/pomoc" className="hidden lg:block">
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Pomoc</span>
            </Button>
          </Link>
          <Link href="/ulubione">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {favoriteItems.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {favoriteItems.length}
                </span>
              )}
              <span className="sr-only">Ulubione</span>
            </Button>
          </Link>
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
