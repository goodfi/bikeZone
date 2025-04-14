import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import HomeSlider from '@/components/home-slider';
import ProductCard from '@/components/card/product-card';
import { products, brands } from '@/lib/data';

export default function Home() {
  // Filter products for different sections
  const dealOfTheDay = products.find((product) => product.id === 1);
  const weeklyHits = products
    .filter((product) => product.isWeeklyHit)
    .slice(0, 4);
  const selectedForYou = products.slice(0, 4);
  const promotions = products.filter((product) => product.isOnSale).slice(0, 8);
  const newArrivals = products.filter((product) => product.isNew).slice(0, 8);

  return (
    <div className="flex flex-col gap-12 pb-8">
      {/* Hero Slider */}
      <HomeSlider />

      {/* Deal of the day & Weekly hits */}
      <section className="container mx-auto max-md:p-4">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 ">
          {/* Deal of the day */}
          {dealOfTheDay && (
            <div className="relative overflow-hidden flex flex-col-reverse rounded-lg border bg-background  min-h-[500px]">
              <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">Oferta dnia</Badge>
                  <div className="text-sm text-muted-foreground">
                    Kończy się za: 12:34:56
                  </div>
                </div>
                <h2 className="text-2xl font-bold">{dealOfTheDay.name}</h2>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4"
                          fill={
                            i < dealOfTheDay.rating ? 'currentColor' : 'none'
                          }
                        />
                      ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({dealOfTheDay.reviewCount} opinii)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(dealOfTheDay.salePrice || dealOfTheDay.price)}
                  </span>
                  {dealOfTheDay.salePrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(dealOfTheDay.price)}
                    </span>
                  )}
                </div>
                <Button asChild className="w-full md:w-auto">
                  <Link href={`/produkt/${dealOfTheDay.id}`}>
                    Zobacz szczegóły
                  </Link>
                </Button>
              </div>
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10" />
              <div className="top-0 left-0 ">
                <Image
                  src={dealOfTheDay.image || '/placeholder.svg'}
                  alt={dealOfTheDay.name}
                  width={800}
                  height={800}
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* Weekly hits */}
          <div className="rounded-lg border bg-background">
            <div className="p-6">
              <h2 className="text-2xl font-bold">Hity tygodnia</h2>
              <p className="text-muted-foreground">
                Najpopularniejsze produkty w tym tygodniu
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6 pt-0">
              {weeklyHits.map((product) => (
                <Link
                  key={product.id}
                  href={`/produkt/${product.id}`}
                  className="group rounded-md p-2 transition-colors hover:bg-muted"
                >
                  <div className="aspect-square overflow-hidden rounded-md">
                    <Image
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="font-medium line-clamp-2">{product.name}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-semibold">
                        {formatPrice(product.salePrice || product.price)}
                      </span>
                      {product.salePrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected for you */}
      <section className="container mx-auto max-md:p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Wybrane dla Ciebie</h2>
          <Button variant="ghost" asChild>
            <Link href="/sklep" className="gap-1">
              Zobacz więcej <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {selectedForYou.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promotions */}
      <section className="container mx-auto max-md:p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Promocje</h2>
          <Button variant="ghost" asChild>
            <Link href="/promocje" className="gap-1">
              Zobacz wszystkie <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {promotions.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto max-md:p-4">
        <h2 className="text-2xl font-bold mb-6">Kategorie</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[
            {
              name: 'Rowery górskie',
              slug: 'rowery-gorskie',
              image: '/placeholder.svg?height=200&width=200',
            },
            {
              name: 'Rowery miejskie',
              slug: 'rowery-miejskie',
              image: '/placeholder.svg?height=200&width=200',
            },
            {
              name: 'Rowery szosowe',
              slug: 'rowery-szosowe',
              image: '/placeholder.svg?height=200&width=200',
            },
            {
              name: 'Rowery elektryczne',
              slug: 'rowery-elektryczne',
              image: '/placeholder.svg?height=200&width=200',
            },
            {
              name: 'Akcesoria',
              slug: 'akcesoria',
              image: '/placeholder.svg?height=200&width=200',
            },
            {
              name: 'Części',
              slug: 'czesci',
              image: '/placeholder.svg?height=200&width=200',
            },
          ].map((category) => (
            <Link
              key={category.slug}
              href={`/sklep?kategoria=${category.slug}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={category.image || '/placeholder.svg'}
                  alt={category.name}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-base font-medium text-white">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto max-md:p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Nowości</h2>
          <Button variant="ghost" asChild>
            <Link href="/sklep?sort=newest" className="gap-1">
              Zobacz więcej <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Zone */}
      <section className="container mx-auto max-md:p-4">
        <h2 className="text-2xl font-bold mb-6">Strefa marek</h2>
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/sklep?marka=${brand.slug}`}
              className="flex items-center justify-center rounded-lg border bg-background p-6 transition-colors hover:bg-muted"
            >
              <Image
                src={brand.logo || '/placeholder.svg'}
                alt={brand.name}
                width={120}
                height={60}
                className="max-h-12 w-auto object-contain"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
