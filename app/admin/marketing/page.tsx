import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Tag,
  Megaphone,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Marketing</h1>
        <p className="text-muted-foreground">
          Zarządzaj promocjami i kampaniami marketingowymi
        </p>
      </div>

      <Tabs defaultValue="promotions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="promotions">Promocje</TabsTrigger>
          <TabsTrigger value="banners">Banery</TabsTrigger>
          <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          <TabsTrigger value="analytics">Analityka</TabsTrigger>
        </TabsList>

        {/* Promotions Tab */}
        <TabsContent value="promotions" className="mt-6 space-y-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Aktywne promocje</h2>
            <Button asChild>
              <Link href="/admin/marketing/promocje/dodaj">
                <Plus className="mr-2 h-4 w-4" />
                Dodaj promocję
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: 1,
                title: 'Letnia wyprzedaż',
                description: 'Zniżki do 30% na wybrane rowery i akcesoria',
                image: '/placeholder.svg?height=200&width=400',
                startDate: '2023-06-01',
                endDate: '2023-08-31',
                status: 'active',
              },
              {
                id: 2,
                title: 'Rowery elektryczne',
                description: 'Oszczędź nawet 2000 zł na wybranych modelach',
                image: '/placeholder.svg?height=200&width=400',
                startDate: '2023-07-01',
                endDate: '2023-09-30',
                status: 'active',
              },
              {
                id: 3,
                title: 'Akcesoria rowerowe',
                description: 'Kup 2, zapłać za 1 na wybrane akcesoria',
                image: '/placeholder.svg?height=200&width=400',
                startDate: '2023-07-15',
                endDate: '2023-08-15',
                status: 'active',
              },
            ].map((promotion) => (
              <Card key={promotion.id}>
                <div className="aspect-[2/1] overflow-hidden">
                  <Image
                    src={promotion.image || '/placeholder.svg'}
                    alt={promotion.title}
                    width={400}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{promotion.title}</CardTitle>
                    <Badge className="bg-green-500">Aktywna</Badge>
                  </div>
                  <CardDescription>{promotion.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(promotion.startDate).toLocaleDateString(
                        'pl-PL'
                      )}{' '}
                      -{' '}
                      {new Date(promotion.endDate).toLocaleDateString('pl-PL')}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/marketing/promocje/${promotion.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Podgląd
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`/admin/marketing/promocje/${promotion.id}/edytuj`}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edytuj
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Usuń
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Zaplanowane promocje</h2>
            <div className="mt-4 rounded-lg border">
              <div className="p-4 text-center text-muted-foreground">
                Brak zaplanowanych promocji.
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Banners Tab */}
        <TabsContent value="banners" className="mt-6 space-y-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Banery na stronie głównej</h2>
            <Button asChild>
              <Link href="/admin/marketing/banery/dodaj">
                <Plus className="mr-2 h-4 w-4" />
                Dodaj baner
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {[
              {
                id: 1,
                title: 'Nowa kolekcja rowerów górskich',
                image: '/placeholder.svg?height=300&width=1200',
                position: 'slider-1',
                status: 'active',
              },
              {
                id: 2,
                title: 'Wyprzedaż rowerów elektrycznych',
                image: '/placeholder.svg?height=300&width=1200',
                position: 'slider-2',
                status: 'active',
              },
              {
                id: 3,
                title: 'Akcesoria rowerowe',
                image: '/placeholder.svg?height=300&width=1200',
                position: 'slider-3',
                status: 'active',
              },
            ].map((banner) => (
              <div key={banner.id} className="rounded-lg border bg-card">
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <div className="aspect-[4/1] w-full overflow-hidden rounded-md sm:w-[200px]">
                    <Image
                      src={banner.image || '/placeholder.svg'}
                      alt={banner.title}
                      width={200}
                      height={50}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{banner.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Pozycja: {banner.position}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500">Aktywny</Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`/admin/marketing/banery/${banner.id}/edytuj`}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edytuj
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Usuń
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Newsletter Tab */}
        <TabsContent value="newsletter" className="mt-6 space-y-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Kampanie newslettera</h2>
            <Button asChild>
              <Link href="/admin/marketing/newsletter/dodaj">
                <Plus className="mr-2 h-4 w-4" />
                Nowa kampania
              </Link>
            </Button>
          </div>

          <div className="rounded-lg border bg-card">
            <div className="p-4">
              <h3 className="font-medium">Statystyki newslettera</h3>
            </div>
            <div className="border-t p-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border bg-muted p-4 text-center">
                  <p className="text-sm text-muted-foreground">Subskrybenci</p>
                  <p className="text-2xl font-bold">1,245</p>
                </div>
                <div className="rounded-lg border bg-muted p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Średni Open Rate
                  </p>
                  <p className="text-2xl font-bold">32.5%</p>
                </div>
                <div className="rounded-lg border bg-muted p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Średni Click Rate
                  </p>
                  <p className="text-2xl font-bold">8.7%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Ostatnie kampanie</h3>
            {[
              {
                id: 1,
                title: 'Letnia wyprzedaż - ostatnie dni!',
                sentDate: '2023-07-10',
                recipients: 1245,
                openRate: 38.2,
                clickRate: 12.5,
              },
              {
                id: 2,
                title: 'Nowa kolekcja rowerów górskich',
                sentDate: '2023-06-15',
                recipients: 1230,
                openRate: 42.1,
                clickRate: 15.3,
              },
              {
                id: 3,
                title: 'Akcesoria rowerowe - promocja 2+1',
                sentDate: '2023-05-20',
                recipients: 1210,
                openRate: 35.8,
                clickRate: 9.2,
              },
            ].map((campaign) => (
              <div key={campaign.id} className="rounded-lg border bg-card">
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <h3 className="font-medium">{campaign.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Wysłano:{' '}
                      {new Date(campaign.sentDate).toLocaleDateString('pl-PL')}{' '}
                      • Odbiorcy: {campaign.recipients}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Open Rate</p>
                      <p className="font-medium">{campaign.openRate}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Click Rate
                      </p>
                      <p className="font-medium">{campaign.clickRate}%</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/marketing/newsletter/${campaign.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Szczegóły
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Współczynnik konwersji
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">3.2%</div>
                  <div className="rounded-full bg-green-500/10 p-2 text-green-500">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  +0.5% od ostatniego miesiąca
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Średnia wartość zamówienia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">1 245 zł</div>
                  <div className="rounded-full bg-green-500/10 p-2 text-green-500">
                    <Tag className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  +125 zł od ostatniego miesiąca
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Skuteczność promocji
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">24.8%</div>
                  <div className="rounded-full bg-green-500/10 p-2 text-green-500">
                    <Megaphone className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  +2.3% od ostatniego miesiąca
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Porzucone koszyki
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">68.5%</div>
                  <div className="rounded-full bg-red-500/10 p-2 text-red-500">
                    <Calendar className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  -1.2% od ostatniego miesiąca
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Skuteczność kampanii marketingowych</CardTitle>
              <CardDescription>
                Analiza skuteczności kampanii w ostatnich 6 miesiącach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] rounded-lg border bg-muted/50 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Wykres skuteczności kampanii
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Źródła ruchu</CardTitle>
                <CardDescription>Skąd przychodzą klienci</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-lg border bg-muted/50 flex items-center justify-center">
                  <p className="text-muted-foreground">Wykres źródeł ruchu</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Najpopularniejsze produkty</CardTitle>
                <CardDescription>
                  Najczęściej oglądane i kupowane produkty
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-lg border bg-muted/50 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Wykres popularności produktów
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
