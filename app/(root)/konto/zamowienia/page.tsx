import Link from 'next/link';
import { Package, Eye, Download, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';

// Sample orders data
const orders = [
  {
    id: 'ORD-12345',
    date: '2023-05-15',
    status: 'completed',
    total: 3499,
    items: [
      { id: 1, name: 'Rower górski XTR Pro Carbon', quantity: 1, price: 7499 },
    ],
    paymentMethod: 'Karta płatnicza',
    deliveryMethod: 'Kurier',
  },
  {
    id: 'ORD-12346',
    date: '2023-06-20',
    status: 'processing',
    total: 299,
    items: [
      { id: 6, name: 'Kask rowerowy Safety Pro', quantity: 1, price: 299 },
    ],
    paymentMethod: 'BLIK',
    deliveryMethod: 'Odbiór osobisty',
  },
  {
    id: 'ORD-12347',
    date: '2023-07-05',
    status: 'shipped',
    total: 149,
    items: [
      { id: 7, name: 'Lampka rowerowa Night Rider', quantity: 1, price: 119 },
      { id: 12, name: 'Bidon rowerowy 750ml', quantity: 1, price: 30 },
    ],
    paymentMethod: 'Przelew bankowy',
    deliveryMethod: 'Kurier',
  },
];

// Status badge component
const OrderStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-500">Zrealizowane</Badge>;
    case 'processing':
      return <Badge className="bg-blue-500">W trakcie realizacji</Badge>;
    case 'shipped':
      return <Badge className="bg-orange-500">Wysłane</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-500">Anulowane</Badge>;
    default:
      return <Badge>Nieznany</Badge>;
  }
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Moje zamówienia</h2>
        <p className="text-muted-foreground">
          Przeglądaj historię swoich zamówień
        </p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Brak zamówień</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Nie złożyłeś jeszcze żadnych zamówień.
            </p>
            <Button asChild className="mt-4">
              <Link href="/sklep">Przejdź do sklepu</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-3">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <CardTitle className="text-base">
                      Zamówienie {order.id}
                    </CardTitle>
                    <CardDescription>
                      Złożone {new Date(order.date).toLocaleDateString('pl-PL')}
                    </CardDescription>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-medium">Produkty</h4>
                      <ul className="mt-2 space-y-2">
                        {order.items.map((item) => (
                          <li key={item.id} className="text-sm">
                            <div className="flex justify-between">
                              <span>
                                {item.name} x{item.quantity}
                              </span>
                              <span>{formatPrice(item.price)}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        Szczegóły zamówienia
                      </h4>
                      <dl className="mt-2 space-y-1 text-sm">
                        <div className="flex justify-between">
                          <dt>Metoda płatności:</dt>
                          <dd>{order.paymentMethod}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt>Metoda dostawy:</dt>
                          <dd>{order.deliveryMethod}</dd>
                        </div>
                        <div className="flex justify-between font-medium">
                          <dt>Razem:</dt>
                          <dd>{formatPrice(order.total)}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/konto/zamowienia/${order.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Szczegóły
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Faktura
                    </Button>
                    {order.status === 'processing' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                      >
                        Anuluj zamówienie
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/sklep" className="gap-1">
                Kontynuuj zakupy <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
