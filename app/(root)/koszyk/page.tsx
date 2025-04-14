'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Trash2, CreditCard, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/use-card';
import { products } from '@/lib/data';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [insurance, setInsurance] = useState(false);

  // Calculate totals
  const subtotal = items.reduce((total, item) => {
    return total + (item.salePrice || item.price) * item.quantity;
  }, 0);

  const insuranceCost = insurance ? 500 : 0;
  const shipping = subtotal > 299 ? 0 : 19.99;
  const total = subtotal + insuranceCost + shipping;

  // Get recommended products
  const recommendedProducts = products
    .filter((p) => p.category === 'akcesoria')
    .slice(0, 4);

  // Handle checkout
  const handleCheckout = () => {
    router.push('/zamowienie');
  };

  if (items.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-muted p-6">
          <Trash2 className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Twój koszyk jest pusty</h1>
        <p className="mt-2 text-muted-foreground">
          Wygląda na to, że nie masz jeszcze żadnych produktów w koszyku.
        </p>
        <Button asChild className="mt-6">
          <Link href="/sklep">Przejdź do sklepu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold">Koszyk</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold">
                  Produkty w koszyku ({items.length})
                </h2>
              </div>
              <Separator />
              <ul className="divide-y">
                {items.map((item) => (
                  <li key={item.id} className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <Link
                            href={`/produkt/${item.id}`}
                            className="font-medium hover:text-primary"
                          >
                            {item.name}
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Usuń</span>
                          </Button>
                        </div>
                        {item.selectedColor && (
                          <div className="mt-1 text-sm text-muted-foreground">
                            Kolor:{' '}
                            <span className="capitalize">
                              {item.selectedColor}
                            </span>
                          </div>
                        )}
                        {item.selectedSize && (
                          <div className="mt-1 text-sm text-muted-foreground">
                            Rozmiar:{' '}
                            <span className="uppercase">
                              {item.selectedSize}
                            </span>
                          </div>
                        )}
                        <div className="mt-auto flex items-end justify-between pt-4">
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
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Zmniejsz ilość</span>
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
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
                          <div className="text-right">
                            <div className="font-medium">
                              {formatPrice(
                                (item.salePrice || item.price) * item.quantity
                              )}
                            </div>
                            {item.salePrice && (
                              <div className="text-sm text-muted-foreground line-through">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between p-6">
                <Button variant="outline" onClick={() => clearCart()}>
                  Wyczyść koszyk
                </Button>
                <Button asChild>
                  <Link href="/sklep">Kontynuuj zakupy</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Order summary */}
            <div className="rounded-lg border bg-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold">
                  Podsumowanie zamówienia
                </h2>
              </div>
              <Separator />
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Wartość produktów
                    </span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dostawa</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 dark:text-green-400">
                          Darmowa
                        </span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  {insurance > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Ubezpieczenie
                      </span>
                      <span>{formatPrice(insuranceCost)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Razem</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="insurance"
                      checked={insurance}
                      onCheckedChange={(checked) => setInsurance(!!checked)}
                    />
                    <Label htmlFor="insurance" className="text-sm font-normal">
                      Dodaj ubezpieczenie roweru (500 zł)
                    </Label>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Kod promocyjny"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button variant="outline">Zastosuj</Button>
                  </div>

                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    Przejdź do płatności
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Bezpieczne płatności</span>
                    <CreditCard className="ml-2 h-4 w-4" />
                    <span>Różne metody płatności</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended products */}
            <div className="rounded-lg border bg-card">
              <div className="p-6">
                <h2 className="text-lg font-semibold">Polecane akcesoria</h2>
              </div>
              <Separator />
              <div className="p-6">
                <div className="grid gap-4">
                  {recommendedProducts.map((product) => (
                    <div key={product.id} className="flex gap-4">
                      <div className="aspect-square h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <Link
                          href={`/produkt/${product.id}`}
                          className="font-medium hover:text-primary"
                        >
                          {product.name}
                        </Link>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="font-medium">
                            {formatPrice(product.salePrice || product.price)}
                          </span>
                          {product.salePrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 w-full"
                          onClick={() => {
                            useCart.getState().addItem(product);
                          }}
                        >
                          Dodaj do koszyka
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
