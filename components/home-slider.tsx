'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 1,
    title: 'Nowa kolekcja rowerów górskich',
    description: 'Odkryj najnowsze modele rowerów górskich na sezon 2023',
    buttonText: 'Zobacz ofertę',
    buttonLink: '/sklep?kategoria=rowery-gorskie',
    image: '/placeholder.svg?height=600&width=1200',
  },
  {
    id: 2,
    title: 'Wyprzedaż rowerów elektrycznych',
    description:
      'Oszczędź nawet do 30% na wybranych modelach rowerów elektrycznych',
    buttonText: 'Sprawdź promocje',
    buttonLink: '/promocje/rowery-elektryczne',
    image: '/placeholder.svg?height=600&width=1200',
  },
  {
    id: 3,
    title: 'Akcesoria rowerowe',
    description:
      'Wszystko czego potrzebujesz do swojego roweru w jednym miejscu',
    buttonText: 'Przejdź do sklepu',
    buttonLink: '/sklep?kategoria=akcesoria',
    image: '/placeholder.svg?height=600&width=1200',
  },
];

export default function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-500',
              index === currentSlide
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            )}
          >
            <Image
              src={slide.image || '/placeholder.svg'}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="container relative h-full flex flex-col justify-center">
              <div className="max-w-lg space-y-4">
                <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  {slide.title}
                </h1>
                <p className="text-white/90 md:text-lg">{slide.description}</p>
                <Button asChild size="lg" className="mt-4">
                  <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-background/50 text-foreground backdrop-blur-sm hover:bg-background/80"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Poprzedni slajd</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-background/50 text-foreground backdrop-blur-sm hover:bg-background/80"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Następny slajd</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              'h-2 w-8 rounded-full transition-colors',
              index === currentSlide
                ? 'bg-primary'
                : 'bg-white/50 hover:bg-white/80'
            )}
            onClick={() => goToSlide(index)}
          >
            <span className="sr-only">Slajd {index + 1}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
