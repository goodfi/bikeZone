import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Ustawienia</h2>
        <p className="text-muted-foreground">
          Zarządzaj ustawieniami swojego konta
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Powiadomienia</CardTitle>
          <CardDescription>
            Zarządzaj swoimi preferencjami powiadomień
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-orders" className="font-medium">
                  Powiadomienia o zamówieniach
                </Label>
                <p className="text-sm text-muted-foreground">
                  Otrzymuj powiadomienia email o statusie zamówień
                </p>
              </div>
              <Switch id="email-orders" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-marketing" className="font-medium">
                  Newsletter
                </Label>
                <p className="text-sm text-muted-foreground">
                  Otrzymuj informacje o promocjach i nowościach
                </p>
              </div>
              <Switch id="email-marketing" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications" className="font-medium">
                  Powiadomienia SMS
                </Label>
                <p className="text-sm text-muted-foreground">
                  Otrzymuj powiadomienia SMS o statusie zamówień
                </p>
              </div>
              <Switch id="sms-notifications" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prywatność</CardTitle>
          <CardDescription>Zarządzaj ustawieniami prywatności</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-collection" className="font-medium">
                  Zbieranie danych
                </Label>
                <p className="text-sm text-muted-foreground">
                  Pozwól nam zbierać dane o Twoich preferencjach zakupowych
                </p>
              </div>
              <Switch id="data-collection" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="cookies" className="font-medium">
                  Pliki cookie
                </Label>
                <p className="text-sm text-muted-foreground">
                  Zarządzaj ustawieniami plików cookie
                </p>
              </div>
              <Switch id="cookies" defaultChecked />
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline">Pobierz moje dane</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferencje</CardTitle>
          <CardDescription>
            Dostosuj swoje doświadczenie w sklepie
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode" className="font-medium">
                  Ciemny motyw
                </Label>
                <p className="text-sm text-muted-foreground">
                  Automatycznie przełączaj między jasnym i ciemnym motywem
                </p>
              </div>
              <Switch id="dark-mode" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="save-history" className="font-medium">
                  Historia przeglądania
                </Label>
                <p className="text-sm text-muted-foreground">
                  Zapisuj historię przeglądanych produktów
                </p>
              </div>
              <Switch id="save-history" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-red-500">Usunięcie konta</CardTitle>
          <CardDescription>Usuń swoje konto i wszystkie dane</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">
            Usunięcie konta spowoduje trwałe usunięcie wszystkich Twoich danych,
            w tym historii zamówień, zapisanych adresów i metod płatności. Tej
            operacji nie można cofnąć.
          </p>
          <Button variant="destructive" className="mt-4">
            Usuń konto
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
