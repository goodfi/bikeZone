'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, X, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-card';
import { formatPrice } from '@/lib/utils';

export default function CartSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  const totalPrice = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="mr-2">
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
          <span className="sr-only">Koszyk</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md px-2">
        <SheetHeader>
          <SheetTitle>
            Koszyk ({items.reduce((acc, item) => acc + item.quantity, 0)})
          </SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <div className="text-xl font-medium">Twój koszyk jest pusty</div>
            <div className="text-sm text-muted-foreground">
              Dodaj produkty do koszyka, aby kontynuować zakupy
            </div>
            <Button onClick={() => setIsOpen(false)} className="mt-4">
              Kontynuuj zakupy
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 py-6">
            <div className="grid gap-4">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[80px_1fr] gap-4 ">
                  <div className="aspect-square overflow-hidden rounded-md">
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="grid gap-1">
                    <div className="flex items-start justify-between">
                      <div className="grid gap-0.5">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Usuń</span>
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Zmniejsz ilość</span>
                      </Button>
                      <div className="w-8 text-center">{item.quantity}</div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Zwiększ ilość</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Suma</div>
                <div className="text-sm font-medium">
                  {formatPrice(totalPrice)}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button asChild className="w-full">
                  <Link href="/koszyk" onClick={() => setIsOpen(false)}>
                    Przejdź do koszyka
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => clearCart()}>
                  Wyczyść koszyk
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
