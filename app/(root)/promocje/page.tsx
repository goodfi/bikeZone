import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import ProductCard from '@/components/card/product-card';

export default function PromotionsPage() {
  // Get all products on sale
  const saleProducts = products.filter((product) => product.isOnSale);

  // Group promotions
  const promotions = [
    {
      id: 1,
      title: 'Letnia wyprzedaż',
      description: 'Zniżki do 30% na wybrane rowery i akcesoria',
      image: '/placeholder.svg?height=600&width=1200',
      slug: 'letnia-wyprzedaz',
    },
    {
      id: 2,
      title: 'Rowery elektryczne',
      description: 'Oszczędź nawet 2000 zł na wybranych modelach',
      image: '/placeholder.svg?height=600&width=1200',
      slug: 'rowery-elektryczne',
    },
    {
      id: 3,
      title: 'Akcesoria rowerowe',
      description: 'Kup 2, zapłać za 1 na wybrane akcesoria',
      image: '/placeholder.svg?height=600&width=1200',
      slug: 'akcesoria-rowerowe',
    },
  ];

  return (
    <div className="container py-8 mx-auto">
      <div className="flex flex-col gap-12">
        <div>
          <h1 className="text-3xl font-bold">Promocje</h1>
          <p className="mt-2 text-muted-foreground">
            Sprawdź nasze aktualne promocje i oferty specjalne
          </p>
        </div>

        {/* Featured promotions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {promotions.map((promo) => (
            <Link
              key={promo.id}
              href={`/promocje/${promo.slug}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <Image
                  src={promo.image || '/placeholder.svg'}
                  alt={promo.title}
                  width={600}
                  height={338}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-2xl font-bold text-white">
                    {promo.title}
                  </h2>
                  <p className="mt-2 text-white/90">{promo.description}</p>
                  <Button className="mt-4">Zobacz więcej</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All sale products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Wszystkie promocje</h2>
            <Button variant="ghost" asChild>
              <Link href="/sklep?promocja=true" className="gap-1">
                Zobacz wszystkie <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {saleProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
