'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { categories, brands } from '@/lib/data';

export default function AddProductPage() {
  const [images, setImages] = useState<
    { id: number; file: File | null; preview: string }[]
  >([{ id: 1, file: null, preview: '/placeholder.svg?height=200&width=200' }]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    imageId: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        setImages((prevImages) =>
          prevImages.map((img) =>
            img.id === imageId
              ? { ...img, file, preview: event.target?.result as string }
              : img
          )
        );
      };

      reader.readAsDataURL(file);
    }
  };

  const addImageField = () => {
    const newId =
      images.length > 0 ? Math.max(...images.map((img) => img.id)) + 1 : 1;
    setImages([
      ...images,
      {
        id: newId,
        file: null,
        preview: '/placeholder.svg?height=200&width=200',
      },
    ]);
  };

  const removeImageField = (imageId: number) => {
    if (images.length > 1) {
      setImages(images.filter((img) => img.id !== imageId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/produkty">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Wróć</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Dodaj produkt</h1>
          <p className="text-muted-foreground">Dodaj nowy produkt do sklepu</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Ogólne</TabsTrigger>
          <TabsTrigger value="images">Zdjęcia</TabsTrigger>
          <TabsTrigger value="pricing">Ceny</TabsTrigger>
          <TabsTrigger value="inventory">Magazyn</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informacje podstawowe</CardTitle>
              <CardDescription>
                Podstawowe informacje o produkcie
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nazwa produktu</Label>
                <Input id="name" placeholder="Nazwa produktu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Opis</Label>
                <Textarea
                  id="description"
                  placeholder="Opis produktu"
                  rows={5}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategoria</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Marka</Label>
                  <Select>
                    <SelectTrigger id="brand">
                      <SelectValue placeholder="Wybierz markę" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.slug}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU (Kod produktu)</Label>
                <Input id="sku" placeholder="np. BZ-12345" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Atrybuty</CardTitle>
              <CardDescription>
                Dodatkowe informacje o produkcie
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Dostępne kolory</Label>
                <div className="flex flex-wrap gap-4">
                  {['Czarny', 'Biały', 'Czerwony', 'Niebieski', 'Zielony'].map(
                    (color) => (
                      <div key={color} className="flex items-center gap-2">
                        <Checkbox id={`color-${color}`} />
                        <Label
                          htmlFor={`color-${color}`}
                          className="text-sm font-normal"
                        >
                          {color}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Dostępne rozmiary</Label>
                <div className="flex flex-wrap gap-4">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <div key={size} className="flex items-center gap-2">
                      <Checkbox id={`size-${size}`} />
                      <Label
                        htmlFor={`size-${size}`}
                        className="text-sm font-normal"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Cechy produktu</Label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="feature-new" />
                    <Label
                      htmlFor="feature-new"
                      className="text-sm font-normal"
                    >
                      Nowość
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="feature-bestseller" />
                    <Label
                      htmlFor="feature-bestseller"
                      className="text-sm font-normal"
                    >
                      Bestseller
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="feature-featured" />
                    <Label
                      htmlFor="feature-featured"
                      className="text-sm font-normal"
                    >
                      Wyróżniony
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="feature-weekly-hit" />
                    <Label
                      htmlFor="feature-weekly-hit"
                      className="text-sm font-normal"
                    >
                      Hit tygodnia
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zdjęcia produktu</CardTitle>
              <CardDescription>Dodaj zdjęcia produktu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {images.map((image) => (
                  <div key={image.id} className="relative">
                    <div className="aspect-square overflow-hidden rounded-lg border">
                      <img
                        src={image.preview || '/placeholder.svg'}
                        alt={`Podgląd ${image.id}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute right-2 top-2 flex gap-1">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-6 w-6 rounded-full"
                        onClick={() => removeImageField(image.id)}
                        disabled={images.length === 1}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Usuń</span>
                      </Button>
                    </div>
                    <div className="mt-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, image.id)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                ))}
                <div className="flex aspect-square items-center justify-center rounded-lg border border-dashed">
                  <Button variant="outline" onClick={addImageField}>
                    <Plus className="mr-2 h-4 w-4" />
                    Dodaj zdjęcie
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ceny</CardTitle>
              <CardDescription>Ustaw ceny produktu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="regular-price">Cena regularna (zł)</Label>
                  <Input
                    id="regular-price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sale-price">Cena promocyjna (zł)</Label>
                  <Input
                    id="sale-price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="on-sale" />
                <Label htmlFor="on-sale" className="text-sm font-normal">
                  Produkt w promocji
                </Label>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Podatek VAT</Label>
                <RadioGroup defaultValue="23">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="vat-23" value="23" />
                      <Label htmlFor="vat-23" className="text-sm font-normal">
                        23%
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="vat-8" value="8" />
                      <Label htmlFor="vat-8" className="text-sm font-normal">
                        8%
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="vat-5" value="5" />
                      <Label htmlFor="vat-5" className="text-sm font-normal">
                        5%
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="vat-0" value="0" />
                      <Label htmlFor="vat-0" className="text-sm font-normal">
                        0%
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stan magazynowy</CardTitle>
              <CardDescription>
                Zarządzaj stanem magazynowym produktu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="stock">Ilość w magazynie</Label>
                  <Input id="stock" type="number" min="0" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="low-stock-threshold">
                    Próg niskiego stanu
                  </Label>
                  <Input
                    id="low-stock-threshold"
                    type="number"
                    min="0"
                    placeholder="5"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="track-inventory" defaultChecked />
                <Label
                  htmlFor="track-inventory"
                  className="text-sm font-normal"
                >
                  Śledź stan magazynowy
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="allow-backorders" />
                <Label
                  htmlFor="allow-backorders"
                  className="text-sm font-normal"
                >
                  Zezwalaj na zamówienia mimo braku towaru
                </Label>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="weight">Waga (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="length">Długość (cm)</Label>
                  <Input
                    id="length"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="0.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Szerokość (cm)</Label>
                  <Input
                    id="width"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="0.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Wysokość (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="0.0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/admin/produkty">Anuluj</Link>
        </Button>
        <Button>Zapisz produkt</Button>
      </div>
    </div>
  );
}
