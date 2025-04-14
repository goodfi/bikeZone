import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dane osobowe</h2>
        <p className="text-muted-foreground">
          Zarządzaj swoimi danymi osobowymi i preferencjami
        </p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">Dane osobowe</TabsTrigger>
          <TabsTrigger value="address">Adresy</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dane podstawowe</CardTitle>
              <CardDescription>Zaktualizuj swoje dane osobowe</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Imię</Label>
                    <Input id="firstName" defaultValue="Jan" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nazwisko</Label>
                    <Input id="lastName" defaultValue="Kowalski" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="jan.kowalski@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" type="tel" defaultValue="+48 123 456 789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data urodzenia</Label>
                  <Input id="birthDate" type="date" defaultValue="1990-01-01" />
                </div>
                <Button type="submit">Zapisz zmiany</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Zmiana hasła</CardTitle>
              <CardDescription>Zaktualizuj swoje hasło</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Aktualne hasło</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nowe hasło</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Potwierdź nowe hasło</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button type="submit">Zmień hasło</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferencje komunikacji</CardTitle>
              <CardDescription>
                Zarządzaj swoimi preferencjami komunikacji
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    id="newsletter"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked
                  />
                  <Label htmlFor="newsletter">
                    Chcę otrzymywać newsletter z promocjami i nowościami
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="sms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="sms">
                    Chcę otrzymywać powiadomienia SMS o statusie zamówienia
                  </Label>
                </div>
                <Button type="submit">Zapisz preferencje</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="address" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Adres dostawy</CardTitle>
                <CardDescription>Twój domyślny adres dostawy</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Edytuj
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">Jan Kowalski</p>
                <p>ul. Przykładowa 123</p>
                <p>00-001 Warszawa</p>
                <p>Polska</p>
                <p>+48 123 456 789</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Adres rozliczeniowy</CardTitle>
                <CardDescription>
                  Twój domyślny adres rozliczeniowy
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Edytuj
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">Jan Kowalski</p>
                <p>ul. Przykładowa 123</p>
                <p>00-001 Warszawa</p>
                <p>Polska</p>
                <p>+48 123 456 789</p>
              </div>
            </CardContent>
          </Card>

          <Button>Dodaj nowy adres</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
