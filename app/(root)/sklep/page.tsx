'use client';

import type React from 'react';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Filter,
  Grid,
  List,
  Search,
  SlidersHorizontal,
  X,
  Star,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/card/product-card';
import { products, brands, categories } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/use-card';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [activeFilters, setActiveFilters] = useState<{
    kategoria?: string;
    marka?: string[];
    dostepnosc?: boolean;
    promocja?: boolean;
    cenaOd?: number;
    cenaDo?: number;
    sort?: string;
    szukaj?: string;
  }>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Get initial filters from URL - only once on mount
  useEffect(() => {
    if (!mounted) {
      setMounted(true);

      const kategoria = searchParams.get('kategoria') || undefined;
      const marka = searchParams.getAll('marka') || [];
      const dostepnosc = searchParams.get('dostepnosc') === 'true';
      const promocja = searchParams.get('promocja') === 'true';
      const cenaOd = Number(searchParams.get('cenaOd')) || 0;
      const cenaDo = Number(searchParams.get('cenaDo')) || 10000;
      const sort = searchParams.get('sort') || 'popularity';
      const szukaj = searchParams.get('szukaj') || undefined;

      setActiveFilters({
        kategoria,
        marka: marka.length > 0 ? marka : undefined,
        dostepnosc,
        promocja,
        cenaOd,
        cenaDo,
        sort,
        szukaj,
      });

      setPriceRange([cenaOd, cenaDo]);
      setIsInitialized(true);
    }
  }, [searchParams, mounted]);

  // Apply filters to products
  const filteredProducts = products.filter((product) => {
    if (
      activeFilters.kategoria &&
      product.category !== activeFilters.kategoria
    ) {
      return false;
    }

    if (
      activeFilters.marka &&
      activeFilters.marka.length > 0 &&
      !activeFilters.marka.includes(product.brand)
    ) {
      return false;
    }

    if (activeFilters.dostepnosc && !product.inStock) {
      return false;
    }

    if (activeFilters.promocja && !product.isOnSale) {
      return false;
    }

    if (
      activeFilters.cenaOd !== undefined &&
      activeFilters.cenaDo !== undefined &&
      (product.price < activeFilters.cenaOd ||
        product.price > activeFilters.cenaDo)
    ) {
      return false;
    }

    if (
      activeFilters.szukaj &&
      !product.name.toLowerCase().includes(activeFilters.szukaj.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (activeFilters.sort) {
      case 'popularity':
        return b.reviewCount - a.reviewCount;
      case 'price-asc':
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case 'price-desc':
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      case 'newest':
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0;
    }
  });

  // Update URL with filters - memoized to prevent infinite loops
  const updateFilters = useCallback(
    (newFilters: typeof activeFilters) => {
      if (!isInitialized) return;

      const params = new URLSearchParams();

      if (newFilters.kategoria) {
        params.set('kategoria', newFilters.kategoria);
      }

      if (newFilters.marka && newFilters.marka.length > 0) {
        newFilters.marka.forEach((brand) => {
          params.append('marka', brand);
        });
      }

      if (newFilters.dostepnosc) {
        params.set('dostepnosc', 'true');
      }

      if (newFilters.promocja) {
        params.set('promocja', 'true');
      }

      if (newFilters.cenaOd !== undefined) {
        params.set('cenaOd', newFilters.cenaOd.toString());
      }

      if (newFilters.cenaDo !== undefined) {
        params.set('cenaDo', newFilters.cenaDo.toString());
      }

      if (newFilters.sort) {
        params.set('sort', newFilters.sort);
      }

      if (newFilters.szukaj) {
        params.set('szukaj', newFilters.szukaj);
      }

      router.push(`/sklep?${params.toString()}`, { scroll: false });
    },
    [router, isInitialized]
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    (key: keyof typeof activeFilters, value: any) => {
      setActiveFilters((prev) => {
        const newFilters = { ...prev, [key]: value };
        // Only update URL if component is fully initialized
        if (isInitialized) {
          // Use setTimeout to break the potential update cycle
          setTimeout(() => updateFilters(newFilters), 0);
        }
        return newFilters;
      });
    },
    [updateFilters, isInitialized]
  );

  // Handle brand filter changes
  const handleBrandChange = useCallback(
    (brand: string, checked: boolean) => {
      setActiveFilters((prev) => {
        const currentBrands = prev.marka || [];
        const newBrands = checked
          ? [...currentBrands, brand]
          : currentBrands.filter((b) => b !== brand);

        const newFilters = {
          ...prev,
          marka: newBrands.length > 0 ? newBrands : undefined,
        };

        // Only update URL if component is fully initialized
        if (isInitialized) {
          // Use setTimeout to break the potential update cycle
          setTimeout(() => updateFilters(newFilters), 0);
        }

        return newFilters;
      });
    },
    [updateFilters, isInitialized]
  );

  // Handle price range changes
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handlePriceChangeEnd = useCallback(() => {
    setActiveFilters((prev) => {
      const newFilters = {
        ...prev,
        cenaOd: priceRange[0],
        cenaDo: priceRange[1],
      };

      // Only update URL if component is fully initialized
      if (isInitialized) {
        // Use setTimeout to break the potential update cycle
        setTimeout(() => updateFilters(newFilters), 0);
      }

      return newFilters;
    });
  }, [priceRange, updateFilters, isInitialized]);

  // Handle search
  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const searchValue = formData.get('search') as string;

      setActiveFilters((prev) => {
        const newFilters = { ...prev };

        if (searchValue) {
          newFilters.szukaj = searchValue;
        } else {
          delete newFilters.szukaj;
        }

        // Only update URL if component is fully initialized
        if (isInitialized) {
          // Use setTimeout to break the potential update cycle
          setTimeout(() => updateFilters(newFilters), 0);
        }

        return newFilters;
      });
    },
    [updateFilters, isInitialized]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    setActiveFilters({
      sort: 'popularity',
    });
    setPriceRange([0, 10000]);

    // Only update URL if component is fully initialized
    if (isInitialized) {
      router.push('/sklep', { scroll: false });
    }
  }, [router, isInitialized]);

  // Remove single filter
  const removeFilter = useCallback(
    (key: keyof typeof activeFilters, value?: string) => {
      setActiveFilters((prev) => {
        const newFilters = { ...prev };

        if (key === 'marka' && value) {
          newFilters.marka = newFilters.marka?.filter((b) => b !== value);
          if (newFilters.marka?.length === 0) {
            delete newFilters.marka;
          }
        } else {
          delete newFilters[key];
        }

        // Only update URL if component is fully initialized
        if (isInitialized) {
          // Use setTimeout to break the potential update cycle
          setTimeout(() => updateFilters(newFilters), 0);
        }

        return newFilters;
      });
    },
    [updateFilters, isInitialized]
  );

  // Handle adding item to cart
  const handleAddToCart = (product: any) => {
    addItem(product);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="container py-8 mx-auto md:px-4">
      <div className="flex flex-col gap-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            Strona główna
          </Link>
          <span className="text-muted-foreground">/</span>
          <span>Sklep</span>
          {activeFilters.kategoria && (
            <>
              <span className="text-muted-foreground">/</span>
              <span>
                {
                  categories.find((c) => c.slug === activeFilters.kategoria)
                    ?.name
                }
              </span>
            </>
          )}
        </nav>

        {/* Page title */}
        <div>
          <h1 className="text-3xl font-bold">
            {activeFilters.kategoria
              ? categories.find((c) => c.slug === activeFilters.kategoria)?.name
              : 'Wszystkie produkty'}
          </h1>
          <p className="text-muted-foreground">
            {sortedProducts.length} produktów
          </p>
        </div>

        {/* Active filters */}
        {Object.keys(activeFilters).length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Aktywne filtry:</span>
            {activeFilters.kategoria && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Kategoria:{' '}
                {
                  categories.find((c) => c.slug === activeFilters.kategoria)
                    ?.name
                }
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0"
                  onClick={() => removeFilter('kategoria')}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Usuń filtr</span>
                </Button>
              </Badge>
            )}
            {activeFilters.marka?.map((brand) => (
              <Badge
                key={brand}
                variant="secondary"
                className="flex items-center gap-1"
              >
                Marka: {brand}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0"
                  onClick={() => removeFilter('marka', brand)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Usuń filtr</span>
                </Button>
              </Badge>
            ))}
            {activeFilters.dostepnosc && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Dostępne w magazynie
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0"
                  onClick={() => removeFilter('dostepnosc')}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Usuń filtr</span>
                </Button>
              </Badge>
            )}
            {activeFilters.promocja && (
              <Badge variant="secondary" className="flex items-center gap-1">
                W promocji
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0"
                  onClick={() => removeFilter('promocja')}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Usuń filtr</span>
                </Button>
              </Badge>
            )}
            {(activeFilters.cenaOd !== 0 || activeFilters.cenaDo !== 10000) && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Cena: {activeFilters.cenaOd} zł - {activeFilters.cenaDo} zł
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0"
                  onClick={() => {
                    removeFilter('cenaOd');
                    removeFilter('cenaDo');
                    setPriceRange([0, 10000]);
                  }}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Usuń filtr</span>
                </Button>
              </Badge>
            )}
            {activeFilters.szukaj && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Szukana fraza: {activeFilters.szukaj}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0"
                  onClick={() => removeFilter('szukaj')}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Usuń filtr</span>
                </Button>
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Wyczyść wszystkie
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
          {/* Filters - Desktop */}
          <div className="hidden md:block">
            <div className="sticky top-24 grid gap-6">
              <div className="rounded-lg border bg-card p-4">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    name="search"
                    placeholder="Szukaj..."
                    defaultValue={activeFilters.szukaj}
                    className="pl-8"
                  />
                </form>
              </div>

              <div className="rounded-lg border bg-card">
                <Accordion
                  type="multiple"
                  defaultValue={['category', 'brand', 'price', 'availability']}
                >
                  <AccordionItem value="category">
                    <AccordionTrigger className="px-4">
                      Kategorie
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="grid gap-2">
                        {categories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/sklep?kategoria=${category.slug}`}
                            className={cn(
                              'text-sm hover:text-primary',
                              activeFilters.kategoria === category.slug &&
                                'font-medium text-primary'
                            )}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="brand">
                    <AccordionTrigger className="px-4">Marka</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="grid gap-2">
                        {brands.map((brand) => (
                          <div
                            key={brand.id}
                            className="flex items-center gap-2"
                          >
                            <Checkbox
                              id={`brand-${brand.id}`}
                              checked={activeFilters.marka?.includes(
                                brand.name
                              )}
                              onCheckedChange={(checked) =>
                                handleBrandChange(
                                  brand.name,
                                  checked as boolean
                                )
                              }
                            />
                            <Label
                              htmlFor={`brand-${brand.id}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {brand.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="price">
                    <AccordionTrigger className="px-4">Cena</AccordionTrigger>
                    <AccordionContent className="px-4 pt-4 pb-4">
                      <div className="grid gap-4">
                        <Slider
                          defaultValue={[0, 10000]}
                          value={priceRange}
                          min={0}
                          max={10000}
                          step={100}
                          onValueChange={handlePriceChange}
                          onValueCommit={handlePriceChangeEnd}
                        />
                        <div className="flex items-center justify-between">
                          <Input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              setPriceRange([value, priceRange[1]]);
                            }}
                            onBlur={handlePriceChangeEnd}
                            className="w-20"
                          />
                          <span className="text-muted-foreground">-</span>
                          <Input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              setPriceRange([priceRange[0], value]);
                            }}
                            onBlur={handlePriceChangeEnd}
                            className="w-20"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="availability">
                    <AccordionTrigger className="px-4">
                      Dostępność
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="in-stock"
                            checked={activeFilters.dostepnosc}
                            onCheckedChange={(checked) =>
                              handleFilterChange('dostepnosc', checked)
                            }
                          />
                          <Label
                            htmlFor="in-stock"
                            className="text-sm font-normal cursor-pointer"
                          >
                            Dostępne w magazynie
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="on-sale"
                            checked={activeFilters.promocja}
                            onCheckedChange={(checked) =>
                              handleFilterChange('promocja', checked)
                            }
                          />
                          <Label
                            htmlFor="on-sale"
                            className="text-sm font-normal cursor-pointer"
                          >
                            W promocji
                          </Label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-6">
            {/* Filters - Mobile */}
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
                    <form onSubmit={handleSearch} className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        name="search"
                        placeholder="Szukaj..."
                        defaultValue={activeFilters.szukaj}
                        className="pl-8"
                      />
                    </form>
                  </div>
                  <Accordion
                    type="multiple"
                    defaultValue={[
                      'category',
                      'brand',
                      'price',
                      'availability',
                    ]}
                  >
                    <AccordionItem value="category">
                      <AccordionTrigger className="px-4">
                        Kategorie
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="grid gap-2">
                          {categories.map((category) => (
                            <Link
                              key={category.slug}
                              href={`/sklep?kategoria=${category.slug}`}
                              className={cn(
                                'text-sm hover:text-primary',
                                activeFilters.kategoria === category.slug &&
                                  'font-medium text-primary'
                              )}
                              onClick={() => setIsFilterOpen(false)}
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="brand">
                      <AccordionTrigger className="px-4">
                        Marka
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="grid gap-2">
                          {brands.map((brand) => (
                            <div
                              key={brand.id}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                id={`mobile-brand-${brand.id}`}
                                checked={activeFilters.marka?.includes(
                                  brand.name
                                )}
                                onCheckedChange={(checked) =>
                                  handleBrandChange(
                                    brand.name,
                                    checked as boolean
                                  )
                                }
                              />
                              <Label
                                htmlFor={`mobile-brand-${brand.id}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {brand.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="price">
                      <AccordionTrigger className="px-4">Cena</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="grid gap-4">
                          <Slider
                            defaultValue={[0, 10000]}
                            value={priceRange}
                            min={0}
                            max={10000}
                            step={100}
                            onValueChange={handlePriceChange}
                            onValueCommit={handlePriceChangeEnd}
                          />
                          <div className="flex items-center justify-between">
                            <Input
                              type="number"
                              value={priceRange[0]}
                              onChange={(e) => {
                                const value = Number(e.target.value);
                                setPriceRange([value, priceRange[1]]);
                              }}
                              onBlur={handlePriceChangeEnd}
                              className="w-20"
                            />
                            <span className="text-muted-foreground">-</span>
                            <Input
                              type="number"
                              value={priceRange[1]}
                              onChange={(e) => {
                                const value = Number(e.target.value);
                                setPriceRange([priceRange[0], value]);
                              }}
                              onBlur={handlePriceChangeEnd}
                              className="w-20"
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="availability">
                      <AccordionTrigger className="px-4">
                        Dostępność
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="grid gap-2">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="mobile-in-stock"
                              checked={activeFilters.dostepnosc}
                              onCheckedChange={(checked) =>
                                handleFilterChange('dostepnosc', checked)
                              }
                            />
                            <Label
                              htmlFor="mobile-in-stock"
                              className="text-sm font-normal cursor-pointer"
                            >
                              Dostępne w magazynie
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="mobile-on-sale"
                              checked={activeFilters.promocja}
                              onCheckedChange={(checked) =>
                                handleFilterChange('promocja', checked)
                              }
                            />
                            <Label
                              htmlFor="mobile-on-sale"
                              className="text-sm font-normal cursor-pointer"
                            >
                              W promocji
                            </Label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Button onClick={() => setIsFilterOpen(false)}>
                    Zastosuj filtry
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort and view options */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Select
                  value={activeFilters.sort}
                  onValueChange={(value) => handleFilterChange('sort', value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sortuj według" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularność</SelectItem>
                    <SelectItem value="price-asc">
                      Cena: od najniższej
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Cena: od najwyższej
                    </SelectItem>
                    <SelectItem value="newest">Najnowsze</SelectItem>
                  </SelectContent>
                </Select>
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
                Wyświetlanie {sortedProducts.length} z {products.length}{' '}
                produktów
              </p>
            </div>

            {/* Product list */}
            {sortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-8 text-center">
                <SlidersHorizontal className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Brak produktów</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Nie znaleziono produktów spełniających wybrane kryteria.
                </p>
                <Button onClick={clearFilters} className="mt-4">
                  Wyczyść filtry
                </Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {sortedProducts.map((product) => (
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
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4"
                                  fill={
                                    i < product.rating ? 'currentColor' : 'none'
                                  }
                                />
                              ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            ({product.reviewCount})
                          </span>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {product.description}
                        </p>
                        <div className="mt-auto pt-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-semibold">
                              {formatPrice(product.salePrice || product.price)}
                            </span>
                            {product.salePrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Button onClick={() => handleAddToCart(product)}>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Do koszyka
                            </Button>
                            <Button variant="outline" asChild>
                              <Link href={`/produkt/${product.id}`}>
                                Szczegóły
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Poprzednia strona</span>
              </Button>
              <Button variant="outline" size="sm" className="font-medium">
                1
              </Button>
              <Button variant="ghost" size="sm">
                2
              </Button>
              <Button variant="ghost" size="sm">
                3
              </Button>
              <span>...</span>
              <Button variant="ghost" size="sm">
                8
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Następna strona</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
