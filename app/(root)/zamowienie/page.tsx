'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, Truck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/use-card';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
    deliveryMethod: 'courier',
  });

  // Calculate totals
  const subtotal = items.reduce((total, item) => {
    return total + (item.salePrice || item.price) * item.quantity;
  }, 0);

  const shipping = subtotal > 299 ? 0 : 19.99;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process order
    clearCart();
    router.push('/zamowienie/podziekowanie');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-muted p-6">
          <Check className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Twój koszyk jest pusty</h1>
        <p className="mt-2 text-muted-foreground">
          Dodaj produkty do koszyka, aby złożyć zamówienie.
        </p>
        <Button asChild className="mt-6">
          <Link href="/sklep">Przejdź do sklepu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container  mx-auto py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/koszyk">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Wróć</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Zamówienie</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal information */}
              <div className="rounded-lg border bg-card">
                <div className="p-6">
                  <h2 className="text-xl font-semibold">Dane osobowe</h2>
                </div>
                <Separator />
                <div className="p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">Imię</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Nazwisko</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping address */}
              <div className="rounded-lg border bg-card">
                <div className="p-6">
                  <h2 className="text-xl font-semibold">Adres dostawy</h2>
                </div>
                <Separator />
                <div className="p-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="address">Adres</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="city">Miasto</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="postalCode">Kod pocztowy</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery method */}
              <div className="rounded-lg border bg-card">
                <div className="p-6">
                  <h2 className="text-xl font-semibold">Metoda dostawy</h2>
                </div>
                <Separator />
                <div className="p-6">
                  <RadioGroup
                    value={formData.deliveryMethod}
                    onValueChange={(value) =>
                      handleRadioChange('deliveryMethod', value)
                    }
                    className="grid gap-4"
                  >
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <RadioGroupItem id="courier" value="courier" />
                      <Label
                        htmlFor="courier"
                        className="flex flex-1 cursor-pointer items-center gap-4"
                      >
                        <Truck className="h-5 w-5 text-muted-foreground" />
                        <div className="grid gap-1">
                          <span className="font-medium">Kurier</span>
                          <span className="text-sm text-muted-foreground">
                            Dostawa w ciągu 1-2 dni roboczych
                          </span>
                        </div>
                        <span className="ml-auto">
                          {shipping === 0 ? (
                            <span className="text-green-600 dark:text-green-400">
                              Darmowa
                            </span>
                          ) : (
                            formatPrice(shipping)
                          )}
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <RadioGroupItem id="pickup" value="pickup" />
                      <Label
                        htmlFor="pickup"
                        className="flex flex-1 cursor-pointer items-center gap-4"
                      >
                        <div className="flex h-5 w-5 items-center justify-center text-muted-foreground">
                          🏪
                        </div>
                        <div className="grid gap-1">
                          <span className="font-medium">Odbiór osobisty</span>
                          <span className="text-sm text-muted-foreground">
                            Odbiór w salonie w ciągu 24h
                          </span>
                        </div>
                        <span className="ml-auto">
                          <span className="text-green-600 dark:text-green-400">
                            Darmowy
                          </span>
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Payment method */}
              <div className="rounded-lg border bg-card">
                <div className="p-6">
                  <h2 className="text-xl font-semibold">Metoda płatności</h2>
                </div>
                <Separator />
                <div className="p-6">
                  <Tabs
                    defaultValue="card"
                    onValueChange={(value) =>
                      handleRadioChange('paymentMethod', value)
                    }
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Karta</TabsTrigger>
                      <TabsTrigger value="blik">BLIK</TabsTrigger>
                      <TabsTrigger value="transfer">Przelew</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="mt-4 space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="cardNumber">Numer karty</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expiryDate">Data ważności</Label>
                          <Input id="expiryDate" placeholder="MM/RR" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="blik" className="mt-4">
                      <div className="grid gap-2">
                        <Label htmlFor="blikCode">Kod BLIK</Label>
                        <Input
                          id="blikCode"
                          placeholder="Wprowadź 6-cyfrowy kod"
                          maxLength={6}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="transfer" className="mt-4">
                      <div className="rounded-lg border bg-muted p-4">
                        <p className="text-sm">
                          Po złożeniu zamówienia zostaniesz przekierowany na
                          stronę banku, gdzie dokonasz płatności.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Złóż zamówienie
              </Button>
            </form>
          </div>

          {/* Order summary */}
          <div className="space-y-6">
            <div className="rounded-lg border bg-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold">
                  Podsumowanie zamówienia
                </h2>
              </div>
              <Separator />
              <div className="p-6">
                <ul className="divide-y">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                        <img
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="mt-1 text-sm text-muted-foreground">
                          Ilość: {item.quantity}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatPrice(
                            (item.salePrice || item.price) * item.quantity
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <div className="space-y-2">
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
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Razem</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
