'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  MessageSquare,
  FileText,
  Settings,
  BarChart3,
  Tag,
  LogOut,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Produkty',
    href: '/admin/produkty',
    icon: ShoppingBag,
  },
  {
    title: 'Zamówienia',
    href: '/admin/zamowienia',
    icon: FileText,
  },
  {
    title: 'Klienci',
    href: '/admin/klienci',
    icon: Users,
  },
  {
    title: 'Zgłoszenia',
    href: '/admin/zgloszenia',
    icon: MessageSquare,
  },
  {
    title: 'Marketing',
    href: '/admin/marketing',
    icon: Tag,
  },
  {
    title: 'Statystyki',
    href: '/admin/statystyki',
    icon: BarChart3,
  },
  {
    title: 'Ustawienia',
    href: '/admin/ustawienia',
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen  bg-muted/30">
      {/* Mobile sidebar toggle */}
      <div className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 lg:hidden">
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="flex h-16 items-center border-b px-6 lg:h-[61px]">
              <Link
                href="/admin"
                className="flex items-center gap-2 font-semibold"
              >
                <span className="text-primary">BikeZone</span>
                <span>Admin</span>
              </Link>
            </div>
            <div className="flex flex-col gap-6 p-6 justify-between h-full">
              <nav className="flex flex-col gap-1">
                {adminNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted',
                      pathname === item.href && 'bg-muted font-medium'
                    )}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </nav>
              <Separator />
              <div className="mt-auto">
                <div className="flex items-center gap-3 rounded-md bg-muted px-3 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    A
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium">Admin</p>
                    <p className="text-xs text-muted-foreground">
                      admin@bikezone.pl
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="mt-2 w-full justify-start gap-3 px-3"
                  asChild
                >
                  <Link href="/">
                    <LogOut className="h-4 w-4" />
                    Wyloguj
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="font-semibold">BikeZone Admin</div>
      </div>

      <div className=" flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed inset-y-0 flex flex-col  left-0 z-30 w-64 transform border-r bg-background transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex h-16 items-center border-b px-6 lg:h-[61px]">
            <Link
              href="/admin"
              className="flex items-center gap-2 font-semibold"
            >
              <span className="text-primary">BikeZone</span>
              <span>Admin</span>
            </Link>
          </div>
          <div className="flex flex-col flex-1  justify-between gap-6 p-6">
            <nav className="flex flex-col gap-1">
              {adminNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted',
                    pathname === item.href && 'bg-muted font-medium'
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </nav>
            <Separator />
            <div className="mt-auto">
              <div className="flex items-center gap-3 rounded-md bg-muted px-3 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  A
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-medium">Admin</p>
                  <p className="text-xs text-muted-foreground">
                    admin@bikezone.pl
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="mt-2 w-full justify-start gap-3 px-3"
                asChild
              >
                <Link href="/">
                  <LogOut className="h-4 w-4" />
                  Wyloguj
                </Link>
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
