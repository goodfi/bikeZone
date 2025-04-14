'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Clock,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/use-card';
import { useFavorites } from '@/hooks/use-favorites';
import { products } from '@/lib/data';
import ProductCard from '@/components/card/product-card';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('m');
  const { addItem } = useCart();
  const { addItem: addToFavorites, items: favoriteItems } = useFavorites();

  const productId = Number(params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-2xl font-bold">Produkt nie został znaleziony</h1>
        <p className="mt-2 text-muted-foreground">
          Przepraszamy, ale produkt o podanym ID nie istnieje.
        </p>
        <Button asChild className="mt-4">
          <Link href="/sklep">Wróć do sklepu</Link>
        </Button>
      </div>
    );
  }

  // Generate multiple images for the product
  const productImages = [
    product.image,
    '/placeholder.svg?height=600&width=600',
    '/placeholder.svg?height=600&width=600',
    '/placeholder.svg?height=600&width=600',
    '/placeholder.svg?height=600&width=600',
  ];

  // Get related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const isFavorite = favoriteItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addItem({
      ...product,
      selectedColor,
      selectedSize,
    });
  };

  return (
    <div className="container mx-auto py-8 max-md:px-4">
      <div className="flex flex-col gap-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            Strona główna
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href="/sklep"
            className="text-muted-foreground hover:text-foreground"
          >
            Sklep
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href={`/sklep?kategoria=${product.category}`}
            className="text-muted-foreground hover:text-foreground"
          >
            {product.category}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="truncate">{product.name}</span>
        </nav>

        {/* Product details */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Product images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image
                src={productImages[currentImage] || '/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.isNew && (
                <Badge className="absolute left-2 top-2">Nowość</Badge>
              )}
              {product.isOnSale && (
                <Badge variant="destructive" className="absolute left-2 top-2">
                  -
                  {Math.round(
                    ((product.price - (product.salePrice || 0)) /
                      product.price) *
                      100
                  )}
                  %
                </Badge>
              )}
              <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 p-4">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-8 rounded-full transition-colors ${
                      index === currentImage ? 'bg-primary' : 'bg-primary/30'
                    }`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <span className="sr-only">Zdjęcie {index + 1}</span>
                  </button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-background/80 text-foreground backdrop-blur-sm hover:bg-background/90"
                onClick={() =>
                  setCurrentImage((prev) =>
                    prev === 0 ? productImages.length - 1 : prev - 1
                  )
                }
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Poprzednie zdjęcie</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-background/80 text-foreground backdrop-blur-sm hover:bg-background/90"
                onClick={() =>
                  setCurrentImage((prev) =>
                    prev === productImages.length - 1 ? 0 : prev + 1
                  )
                }
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Następne zdjęcie</span>
              </Button>
            </div>
            <div className="flex gap-2 overflow-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                    index === currentImage ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setCurrentImage(index)}
                >
                  <Image
                    src={image || '/placeholder.svg'}
                    alt={`${product.name} - zdjęcie ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5"
                        fill={i < product.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                </div>
                <Link
                  href="#reviews"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {product.reviewCount} opinii
                </Link>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.salePrice || product.price)}
                </span>
                {product.salePrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              <p className="mt-4 text-muted-foreground">
                {product.description}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="outline" className="text-sm font-normal">
                  Kod produktu: {product.sku || `BZ-${product.id}`}
                </Badge>
                <Badge variant="outline" className="text-sm font-normal">
                  Kategoria: {product.category}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Product options */}
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">Kolor</h3>
                <RadioGroup
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                  className="flex gap-2"
                >
                  {['black', 'white', 'red', 'blue'].map((color) => (
                    <div key={color} className="flex items-center gap-2">
                      <RadioGroupItem
                        id={`color-${color}`}
                        value={color}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`color-${color}`}
                        className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border ${
                          selectedColor === color ? 'ring-2 ring-primary' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        <span className="sr-only">{color}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Rozmiar</h3>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2"
                >
                  {['xs', 's', 'm', 'l', 'xl', 'xxl'].map((size) => (
                    <div key={size} className="flex items-center gap-2">
                      <RadioGroupItem
                        id={`size-${size}`}
                        value={size}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border uppercase ${
                          selectedSize === size
                            ? 'border-primary bg-primary/10 font-medium text-primary'
                            : 'hover:border-primary hover:text-primary'
                        }`}
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            <Separator />

            {/* Add to cart */}
            <div className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Dodaj do koszyka
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => addToFavorites(product)}
                >
                  <Heart
                    className={`mr-2 h-5 w-5 ${
                      isFavorite ? 'fill-primary text-primary' : ''
                    }`}
                  />
                  {isFavorite ? 'W ulubionych' : 'Dodaj do ulubionych'}
                </Button>
              </div>

              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <span className="font-medium">
                      Kup teraz, otrzymasz jutro!
                    </span>{' '}
                    Zamów w ciągu <span className="text-primary">12:34:56</span>
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <span className="font-medium">Darmowa dostawa</span> od 299
                    zł
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <span className="font-medium">Gwarancja 24 miesiące</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product tabs */}
        <Tabs defaultValue="description" className="mt-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Opis</TabsTrigger>
            <TabsTrigger value="specification">Specyfikacja</TabsTrigger>
            <TabsTrigger value="accessories">Akcesoria</TabsTrigger>
            <TabsTrigger value="reviews" id="reviews">
              Opinie ({product.reviewCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none dark:prose-invert">
              <h2>Opis produktu</h2>
              <p>
                {product.name} to wysokiej jakości rower zaprojektowany z myślą
                o najbardziej wymagających rowerzystach. Wykonany z najlepszych
                materiałów, zapewnia komfort i niezawodność podczas każdej
                podróży.
              </p>
              <h3>Główne cechy</h3>
              <ul>
                <li>Lekka i wytrzymała rama aluminiowa</li>
                <li>Wysokiej jakości komponenty</li>
                <li>Ergonomiczna konstrukcja zapewniająca komfort jazdy</li>
                <li>Niezawodny system hamulcowy</li>
                <li>Płynna zmiana biegów</li>
              </ul>
              <h3>Zalety</h3>
              <p>
                Rower ten wyróżnia się doskonałym stosunkiem jakości do ceny.
                Jego konstrukcja została starannie przemyślana, aby zapewnić
                maksymalną wydajność i komfort podczas jazdy. Dzięki wysokiej
                jakości komponentom, rower ten będzie służył przez wiele lat,
                niezależnie od warunków.
              </p>
              <h3>Dla kogo?</h3>
              <p>
                Ten model jest idealny zarówno dla początkujących, jak i
                zaawansowanych rowerzystów. Sprawdzi się doskonale w mieście, na
                szlakach oraz podczas dłuższych wypraw.
              </p>
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Szczegóły produktu"
                width={800}
                height={400}
                className="my-6 rounded-lg"
              />
              <p>
                Nie czekaj, wybierz jakość i komfort, które oferuje{' '}
                {product.name}!
              </p>
            </div>
          </TabsContent>
          <TabsContent value="specification" className="mt-6">
            <div className="rounded-lg border">
              <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
                <div className="p-4 sm:p-6">
                  <h3 className="mb-4 text-lg font-medium">
                    Specyfikacja techniczna
                  </h3>
                  <dl className="grid gap-3 text-sm">
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium">Marka</dt>
                      <dd>{product.brand}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium">Model</dt>
                      <dd>{product.name}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium">Rok produkcji</dt>
                      <dd>2023</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium">Materiał ramy</dt>
                      <dd>Aluminium</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium">Rozmiar ramy</dt>
                      <dd>M (17")</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium">Waga</dt>
                      <dd>12.5 kg</dd>
                    </div>
                  </dl>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="mb-4 text-lg font-medium">Komponenty</h3>
                  <dl className="grid gap-3 text-sm">
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium">Napęd</dt>
                      <dd>Shimano Deore, 12 biegów</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium">Hamulce</dt>
                      <dd>Hydrauliczne tarczowe</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium">Koła</dt>
                      <dd>29"</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium">Opony</dt>
                      <dd>Schwalbe Racing Ralph, 29x2.25"</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium">Siodełko</dt>
                      <dd>Ergonomiczne, sportowe</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium">Kierownica</dt>
                      <dd>Aluminiowa, szerokość 720mm</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="accessories" className="mt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products
                .filter((p) => p.category === 'akcesoria')
                .slice(0, 4)
                .map((accessory) => (
                  <ProductCard key={accessory.id} product={accessory} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium">Opinie klientów</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.reviewCount} opinii dla {product.name}
                  </p>
                </div>
                <Button>Napisz opinię</Button>
              </div>
              <div className="grid gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-muted" />
                        <div>
                          <div className="font-medium">Użytkownik{i + 1}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(2023, 5 - i, 15).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, j) => (
                            <Star
                              key={j}
                              className="h-4 w-4"
                              fill={j < 5 - i ? 'currentColor' : 'none'}
                            />
                          ))}
                      </div>
                    </div>
                    <p className="text-sm">
                      {i === 0 &&
                        'Świetny rower, bardzo wygodny i dobrze wykonany. Polecam!'}
                      {i === 1 &&
                        'Dobry stosunek jakości do ceny. Przesyłka dotarła szybko i w nienaruszonym stanie.'}
                      {i === 2 &&
                        'Rower spełnia moje oczekiwania, choć montaż zajął trochę czasu. Ogólnie jestem zadowolony z zakupu.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related products */}
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Podobne produkty</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
