'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { useCart } from '@/hooks/use-card';
import { useFavorites } from '@/hooks/use-favorites';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { addItem: addToFavorites, items: favoriteItems } = useFavorites();

  const isFavorite = favoriteItems.some((item) => item.id === product.id);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-background">
      <Link
        href={`/produkt/${product.id}`}
        className="aspect-square overflow-hidden"
      >
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </Link>
      {product.isNew && <Badge className="absolute left-2 top-2">Nowość</Badge>}
      {product.isOnSale && (
        <Badge variant="destructive" className="absolute left-2 top-2">
          -
          {Math.round(
            ((product.price - (product.salePrice || 0)) / product.price) * 100
          )}
          %
        </Badge>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
        onClick={() => addToFavorites(product)}
      >
        <Heart
          className={isFavorite ? 'fill-primary text-primary' : ''}
          size={18}
        />
        <span className="sr-only">Dodaj do ulubionych</span>
      </Button>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-medium group-hover:text-primary">
          <Link href={`/produkt/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3"
                  fill={i < product.rating ? 'currentColor' : 'none'}
                />
              ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>
        <div className="mt-auto pt-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold">
              {formatPrice(product.salePrice || product.price)}
            </span>
            {product.salePrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <div className="mt-3 flex  gap-2">
            <Button
              className=" cursor-pointer"
              size="sm"
              onClick={() => addItem(product)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link href={`/produkt/${product.id}`}>Szczegóły</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
