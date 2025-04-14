'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingCart, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { useFavorites } from '@/hooks/use-favorites';
import { useCart } from '@/hooks/use-card';
import { products } from '@/lib/data';

export default function FavoritesPage() {
  const { items, removeItem, clearFavorites } = useFavorites();
  const { addItem } = useCart();

  // Get recommended products
  const recommendedProducts = products
    .filter((p) => !items.some((item) => item.id === p.id))
    .slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-muted p-6">
          <Heart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">
          Twoja lista ulubionych jest pusta
        </h1>
        <p className="mt-2 text-muted-foreground">
          Dodaj produkty do ulubionych, aby móc do nich wrócić później.
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
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Wróć</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Ulubione produkty</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-card">
              <div className="flex items-center justify-between p-6">
                <h2 className="text-xl font-semibold">
                  Twoje ulubione ({items.length})
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => clearFavorites()}
                >
                  Wyczyść listę
                </Button>
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
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                        <div className="mt-auto flex items-end justify-between pt-4">
                          <div className="text-right">
                            <div className="font-medium">
                              {formatPrice(item.salePrice || item.price)}
                            </div>
                            {item.salePrice && (
                              <div className="text-sm text-muted-foreground line-through">
                                {formatPrice(item.price)}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/produkt/${item.id}`}>
                                Szczegóły
                              </Link>
                            </Button>
                            <Button size="sm" onClick={() => addItem(item)}>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Do koszyka
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between p-6">
                <Button variant="outline" asChild>
                  <Link href="/sklep">Kontynuuj zakupy</Link>
                </Button>
                <Button asChild>
                  <Link href="/koszyk">Przejdź do koszyka</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Recommended products */}
            <Card>
              <CardHeader>
                <CardTitle>Polecane produkty</CardTitle>
                <CardDescription>
                  Produkty, które mogą Cię zainteresować
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                            useFavorites.getState().addItem(product);
                          }}
                        >
                          <Heart className="mr-2 h-4 w-4" />
                          Dodaj do ulubionych
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Zapisz się do newslettera</CardTitle>
                <CardDescription>
                  Bądź na bieżąco z nowościami i promocjami
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="email"
                        type="email"
                        placeholder="twoj@email.com"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Button type="submit">Zapisz</Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
