import Link from 'next/link';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Sample payment methods
const paymentMethods = [
  {
    id: 'pm_1',
    type: 'card',
    brand: 'visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
  },
  {
    id: 'pm_2',
    type: 'card',
    brand: 'mastercard',
    last4: '5555',
    expMonth: 8,
    expYear: 2024,
    isDefault: false,
  },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Metody płatności</h2>
          <p className="text-muted-foreground">
            Zarządzaj swoimi metodami płatności
          </p>
        </div>
        <Button asChild>
          <Link href="/konto/platnosci/dodaj">
            <Plus className="mr-2 h-4 w-4" />
            Dodaj metodę
          </Link>
        </Button>
      </div>

      {paymentMethods.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <CreditCard className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">
              Brak zapisanych metod płatności
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Nie masz jeszcze żadnych zapisanych metod płatności.
            </p>
            <Button asChild className="mt-4">
              <Link href="/konto/platnosci/dodaj">Dodaj metodę płatności</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <Card key={method.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-16 items-center justify-center rounded-md border bg-muted">
                      {method.brand === 'visa' && (
                        <span className="text-lg font-bold text-blue-600">
                          VISA
                        </span>
                      )}
                      {method.brand === 'mastercard' && (
                        <span className="text-lg font-bold text-red-600">
                          MC
                        </span>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        {method.brand.charAt(0).toUpperCase() +
                          method.brand.slice(1)}{' '}
                        •••• {method.last4}
                      </CardTitle>
                      <CardDescription>
                        Wygasa {method.expMonth}/{method.expYear}
                        {method.isDefault && ' • Domyślna'}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!method.isDefault && (
                      <Button variant="outline" size="sm">
                        Ustaw jako domyślną
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Usuń</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Historia płatności</CardTitle>
          <CardDescription>Ostatnie transakcje na Twoim koncie</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Zamówienie ORD-12345</p>
                <p className="text-sm text-muted-foreground">15.05.2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">7 499,00 zł</p>
                <p className="text-sm text-green-600">Zapłacono</p>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Zamówienie ORD-12346</p>
                <p className="text-sm text-muted-foreground">20.06.2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">299,00 zł</p>
                <p className="text-sm text-green-600">Zapłacono</p>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Zamówienie ORD-12347</p>
                <p className="text-sm text-muted-foreground">05.07.2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">149,00 zł</p>
                <p className="text-sm text-green-600">Zapłacono</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/konto/zamowienia">Zobacz wszystkie zamówienia</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
