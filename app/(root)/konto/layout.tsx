'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  Package,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const accountNavItems = [
  {
    title: 'Dane osobowe',
    href: '/konto',
    icon: User,
  },
  {
    title: 'Zamówienia',
    href: '/konto/zamowienia',
    icon: Package,
  },
  {
    title: 'Zapytania i pomoc',
    href: '/konto/zapytania',
    icon: MessageSquare,
  },
  {
    title: 'Płatności',
    href: '/konto/platnosci',
    icon: CreditCard,
  },
  {
    title: 'Ustawienia',
    href: '/konto/ustawienia',
    icon: Settings,
  },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">Moje konto</h1>
          <p className="mt-2 text-muted-foreground">
            Zarządzaj swoim kontem i zamówieniami
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block">
            <nav className="flex flex-col gap-2">
              {accountNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted',
                    pathname === item.href && 'bg-muted font-medium'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
              <Separator className="my-2" />
              <Button
                variant="ghost"
                className="justify-start gap-2 px-3"
                asChild
              >
                <Link href="/wyloguj">
                  <LogOut className="h-4 w-4" />
                  Wyloguj
                </Link>
              </Button>
            </nav>
          </div>

          {/* Sidebar - Mobile */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span>Menu konta</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col gap-2 mt-8">
                  {accountNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted',
                        pathname === item.href && 'bg-muted font-medium'
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  ))}
                  <Separator className="my-2" />
                  <Button
                    variant="ghost"
                    className="justify-start gap-2 px-3"
                    asChild
                  >
                    <Link href="/wyloguj">
                      <LogOut className="h-4 w-4" />
                      Wyloguj
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Content */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
