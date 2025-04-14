'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Filter, Grid, List, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { products } from '@/lib/data';
import ProductCard from '@/components/card/product-card';
import { useCart } from '@/hooks/use-card';

export default function PromotionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get promotion details
  const promotions = [
    {
      id: 1,
      title: 'Letnia wyprzedaż',
      description: 'Zniżki do 30% na wybrane rowery i akcesoria',
      longDescription:
        'Skorzystaj z naszej letniej wyprzedaży i oszczędź do 30% na wybranych rowerach i akcesoriach. Oferta ważna do wyczerpania zapasów.',
      image: '/placeholder.svg?height=600&width=1200',
      slug: 'letnia-wyprzedaz',
    },
    {
      id: 2,
      title: 'Rowery elektryczne',
      description: 'Oszczędź nawet 2000 zł na wybranych modelach',
      longDescription:
        'Odkryj świat rowerów elektrycznych w promocyjnych cenach. Teraz możesz zaoszczędzić nawet 2000 zł na wybranych modelach. Oferta ograniczona czasowo.',
      image: '/placeholder.svg?height=600&width=1200',
      slug: 'rowery-elektryczne',
    },
    {
      id: 3,
      title: 'Akcesoria rowerowe',
      description: 'Kup 2, zapłać za 1 na wybrane akcesoria',
      longDescription:
        'Wyposaż się w niezbędne akcesoria rowerowe w promocyjnych cenach. Przy zakupie dwóch wybranych akcesoriów, za drugi zapłacisz tylko 1 zł. Sprawdź pełną ofertę.',
      image: '/placeholder.svg?height=600&width=1200',
      slug: 'akcesoria-rowerowe',
    },
  ];

  const promotion = promotions.find((p) => p.slug === slug);

  if (!promotion) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-2xl font-bold">Promocja nie została znaleziona</h1>
        <p className="mt-2 text-muted-foreground">
          Przepraszamy, ale promocja o podanym identyfikatorze nie istnieje.
        </p>
        <Button asChild className="mt-4">
          <Link href="/promocje">Wróć do promocji</Link>
        </Button>
      </div>
    );
  }

  // Filter products for this promotion
  const promotionProducts = products.filter((product) => product.isOnSale);

  return (
    <div>
      {/* Hero banner */}
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={promotion.image || '/placeholder.svg'}
          alt={promotion.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="container relative h-full flex flex-col justify-center">
          <div className="max-w-lg space-y-4">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {promotion.title}
            </h1>
            <p className="text-white/90 md:text-lg">{promotion.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="flex flex-col gap-8">
          {/* Promotion description */}
          <div className="rounded-lg border bg-card p-6">
            <p>{promotion.longDescription}</p>
          </div>

          {/* Filters and products */}
          <div className="space-y-6">
            {/* Mobile filter button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtry
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filtry</SheetTitle>
                </SheetHeader>
                <div className="grid gap-6 py-4">
                  <div className="rounded-lg border bg-card p-4">
                    <form className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Szukaj..."
                        className="pl-8"
                      />
                    </form>
                  </div>
                  {/* Add more filters here */}
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort and view options */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-1 md:flex">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                    <span className="sr-only">Widok siatki</span>
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                    <span className="sr-only">Widok listy</span>
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Wyświetlanie {promotionProducts.length} produktów
              </p>
            </div>

            {/* Product list */}
            {promotionProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-8 text-center">
                <SlidersHorizontal className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Brak produktów</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Nie znaleziono produktów w tej promocji.
                </p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {promotionProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {promotionProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative flex overflow-hidden rounded-lg border bg-background p-4"
                  >
                    <div className="flex flex-1 gap-4">
                      <Link
                        href={`/produkt/${product.id}`}
                        className="aspect-square h-40 w-40 overflow-hidden rounded-md"
                      >
                        <Image
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          width={160}
                          height={160}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <h3 className="line-clamp-2 text-lg font-medium group-hover:text-primary">
                          <Link href={`/produkt/${product.id}`}>
                            {product.name}
                          </Link>
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {product.description}
                        </p>
                        <div className="mt-auto pt-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-semibold">
                              {product.salePrice} zł
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              {product.price} zł
                            </span>
                          </div>
                          <Button
                            className="mt-2"
                            onClick={() => useCart.getState().addItem(product)}
                          >
                            Dodaj do koszyka
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
