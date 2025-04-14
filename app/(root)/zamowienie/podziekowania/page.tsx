import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThankYouPage() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-20 text-center">
      <div className="rounded-full bg-primary/10 p-6">
        <CheckCircle className="h-12 w-12 text-primary" />
      </div>
      <h1 className="mt-6 text-3xl font-bold">
        Dziękujemy za złożenie zamówienia!
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        Twoje zamówienie zostało przyjęte do realizacji. Na Twój adres email
        wysłaliśmy potwierdzenie z szczegółami zamówienia.
      </p>
      <div className="mt-8 rounded-lg border bg-card p-6">
        <div className="flex items-center gap-4">
          <Package className="h-8 w-8 text-muted-foreground" />
          <div className="text-left">
            <h2 className="font-medium">Numer zamówienia: #BZ12345</h2>
            <p className="text-sm text-muted-foreground">
              Przewidywany czas dostawy: 1-2 dni robocze
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button asChild>
          <Link href="/sklep">Kontynuuj zakupy</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/konto/zamowienia" className="gap-1">
            Sprawdź status zamówienia <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
