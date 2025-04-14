import Link from 'next/link';
import {
  ShoppingBag,
  Users,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Przegląd działalności sklepu</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Przychód
                </p>
                <p className="text-2xl font-bold">{formatPrice(124500)}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm">
              <Badge className="bg-green-500 text-white">
                <TrendingUp className="mr-1 h-3 w-3" />
                12%
              </Badge>
              <span className="text-muted-foreground">
                od ostatniego miesiąca
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Zamówienia
                </p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <Package className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm">
              <Badge className="bg-green-500 text-white">
                <TrendingUp className="mr-1 h-3 w-3" />
                8%
              </Badge>
              <span className="text-muted-foreground">
                od ostatniego miesiąca
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Klienci
                </p>
                <p className="text-2xl font-bold">256</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm">
              <Badge className="bg-green-500 text-white">
                <TrendingUp className="mr-1 h-3 w-3" />
                24%
              </Badge>
              <span className="text-muted-foreground">
                od ostatniego miesiąca
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Zwroty
                </p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <ShoppingBag className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm">
              <Badge variant="outline" className="text-red-500 border-red-500">
                <TrendingDown className="mr-1 h-3 w-3" />
                2%
              </Badge>
              <span className="text-muted-foreground">
                od ostatniego miesiąca
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity and alerts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle>Ostatnie zamówienia</CardTitle>
            <CardDescription>
              Przegląd ostatnich zamówień w sklepie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 text-sm text-muted-foreground">
                <div>ID</div>
                <div>Klient</div>
                <div>Status</div>
                <div className="text-right">Kwota</div>
              </div>
              <div className="space-y-4">
                {[
                  {
                    id: 'ORD-12350',
                    customer: 'Jan Kowalski',
                    status: 'completed',
                    amount: 7499,
                  },
                  {
                    id: 'ORD-12349',
                    customer: 'Anna Nowak',
                    status: 'processing',
                    amount: 2499,
                  },
                  {
                    id: 'ORD-12348',
                    customer: 'Piotr Wiśniewski',
                    status: 'shipped',
                    amount: 5999,
                  },
                  {
                    id: 'ORD-12347',
                    customer: 'Magdalena Dąbrowska',
                    status: 'processing',
                    amount: 899,
                  },
                  {
                    id: 'ORD-12346',
                    customer: 'Tomasz Lewandowski',
                    status: 'completed',
                    amount: 149,
                  },
                ].map((order) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-4 items-center text-sm"
                  >
                    <div className="font-medium">{order.id}</div>
                    <div>{order.customer}</div>
                    <div>
                      <Badge
                        className={
                          order.status === 'completed'
                            ? 'bg-green-500'
                            : order.status === 'processing'
                            ? 'bg-blue-500'
                            : 'bg-orange-500'
                        }
                      >
                        {order.status === 'completed'
                          ? 'Zrealizowane'
                          : order.status === 'processing'
                          ? 'W realizacji'
                          : 'Wysłane'}
                      </Badge>
                    </div>
                    <div className="text-right font-medium">
                      {formatPrice(order.amount)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/zamowienia" className="gap-1">
                    Zobacz wszystkie <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle>Alerty</CardTitle>
            <CardDescription>
              Ważne powiadomienia wymagające uwagi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border bg-muted/50 p-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium">Niski stan magazynowy</p>
                    <p className="text-sm text-muted-foreground">
                      3 produkty mają niski stan magazynowy i wymagają
                      uzupełnienia.
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-1 h-auto p-0"
                      asChild
                    >
                      <Link href="/admin/produkty?filter=low-stock">
                        Sprawdź produkty
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/50 p-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">Nowe zgłoszenia</p>
                    <p className="text-sm text-muted-foreground">
                      5 zgłoszeń klientów oczekuje na odpowiedź.
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-1 h-auto p-0"
                      asChild
                    >
                      <Link href="/admin/zgloszenia">Przejdź do zgłoszeń</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-muted/50 p-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Aktualizacja systemu</p>
                    <p className="text-sm text-muted-foreground">
                      Dostępna jest nowa aktualizacja systemu. Zalecana
                      instalacja.
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-1 h-auto p-0"
                    >
                      Zainstaluj aktualizację
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales overview */}
      <Card>
        <CardHeader>
          <CardTitle>Przegląd sprzedaży</CardTitle>
          <CardDescription>
            Analiza sprzedaży w różnych okresach
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="week">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="day">Dzień</TabsTrigger>
                <TabsTrigger value="week">Tydzień</TabsTrigger>
                <TabsTrigger value="month">Miesiąc</TabsTrigger>
                <TabsTrigger value="year">Rok</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm" className="gap-1">
                Pobierz raport <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
            <TabsContent value="day" className="mt-4">
              <div className="h-[300px] rounded-lg border bg-muted/50 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Wykres sprzedaży dziennej
                </p>
              </div>
            </TabsContent>
            <TabsContent value="week" className="mt-4">
              <div className="h-[300px] rounded-lg border bg-muted/50 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Wykres sprzedaży tygodniowej
                </p>
              </div>
            </TabsContent>
            <TabsContent value="month" className="mt-4">
              <div className="h-[300px] rounded-lg border bg-muted/50 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Wykres sprzedaży miesięcznej
                </p>
              </div>
            </TabsContent>
            <TabsContent value="year" className="mt-4">
              <div className="h-[300px] rounded-lg border bg-muted/50 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Wykres sprzedaży rocznej
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="mt-3 font-medium">Dodaj produkt</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Dodaj nowy produkt do sklepu
              </p>
              <Button className="mt-4 w-full" asChild>
                <Link href="/admin/produkty/dodaj">Dodaj produkt</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-3 font-medium">Zarządzaj klientami</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Przeglądaj i edytuj dane klientów
              </p>
              <Button className="mt-4 w-full" asChild>
                <Link href="/admin/klienci">Zarządzaj</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="mt-3 font-medium">Zgłoszenia klientów</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Odpowiedz na zgłoszenia klientów
              </p>
              <Button className="mt-4 w-full" asChild>
                <Link href="/admin/zgloszenia">Zgłoszenia</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="mt-3 font-medium">Statystyki</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Analizuj dane sprzedażowe
              </p>
              <Button className="mt-4 w-full" asChild>
                <Link href="/admin/statystyki">Statystyki</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
