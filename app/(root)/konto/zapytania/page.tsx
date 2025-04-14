import Link from 'next/link';
import { MessageSquare, Plus } from 'lucide-react';
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

// Sample support tickets
const tickets = [
  {
    id: 'TIC-1001',
    subject: 'Problem z dostawą zamówienia ORD-12345',
    date: '2023-07-10',
    status: 'open',
    lastUpdate: '2023-07-11',
    messages: 3,
  },
  {
    id: 'TIC-1002',
    subject: 'Pytanie o dostępność produktu',
    date: '2023-06-25',
    status: 'closed',
    lastUpdate: '2023-06-27',
    messages: 4,
  },
  {
    id: 'TIC-1003',
    subject: 'Reklamacja - uszkodzony produkt',
    date: '2023-06-15',
    status: 'pending',
    lastUpdate: '2023-06-20',
    messages: 5,
  },
];

// Status badge component
const TicketStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'open':
      return <Badge className="bg-green-500">Otwarty</Badge>;
    case 'pending':
      return <Badge className="bg-orange-500">Oczekujący</Badge>;
    case 'closed':
      return <Badge variant="outline">Zamknięty</Badge>;
    default:
      return <Badge>Nieznany</Badge>;
  }
};

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Zapytania i pomoc</h2>
          <p className="text-muted-foreground">
            Zarządzaj swoimi zgłoszeniami i zapytaniami
          </p>
        </div>
        <Button asChild>
          <Link href="/konto/zapytania/nowe">
            <Plus className="mr-2 h-4 w-4" />
            Nowe zgłoszenie
          </Link>
        </Button>
      </div>

      {tickets.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Brak zgłoszeń</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Nie masz jeszcze żadnych zgłoszeń ani zapytań.
            </p>
            <Button asChild className="mt-4">
              <Link href="/konto/zapytania/nowe">Utwórz nowe zgłoszenie</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Card key={ticket.id}>
              <CardHeader className="pb-3">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <CardTitle className="text-base">
                      <Link
                        href={`/konto/zapytania/${ticket.id}`}
                        className="hover:text-primary"
                      >
                        {ticket.subject}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      Zgłoszenie {ticket.id} • Utworzone{' '}
                      {new Date(ticket.date).toLocaleDateString('pl-PL')}
                    </CardDescription>
                  </div>
                  <TicketStatusBadge status={ticket.status} />
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="text-sm text-muted-foreground">
                    <p>
                      Ostatnia aktualizacja:{' '}
                      {new Date(ticket.lastUpdate).toLocaleDateString('pl-PL')}
                    </p>
                    <p>Liczba wiadomości: {ticket.messages}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/konto/zapytania/${ticket.id}`}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {ticket.status === 'closed'
                        ? 'Zobacz szczegóły'
                        : 'Odpowiedz'}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Potrzebujesz pomocy?</CardTitle>
          <CardDescription>
            Sprawdź nasze centrum pomocy lub skontaktuj się z nami
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row">
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/pomoc">Centrum pomocy</Link>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/pomoc?tab=contact">Kontakt</Link>
          </Button>
          <Button className="flex-1" asChild>
            <Link href="/konto/zapytania/nowe">Nowe zgłoszenie</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
