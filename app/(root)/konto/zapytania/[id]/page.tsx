'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Send,
  ChevronLeft,
  Paperclip,
  Clock,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// Sample tickets data
const tickets = [
  {
    id: 'TIC-1001',
    subject: 'Problem z dostawą zamówienia ORD-12345',
    date: '2023-07-10',
    status: 'open',
    lastUpdate: '2023-07-11',
    messages: [
      {
        id: 1,
        sender: 'user',
        content:
          'Dzień dobry, mam problem z dostawą zamówienia ORD-12345. Miało zostać dostarczone wczoraj, ale kurier się nie pojawił. Czy mogą Państwo sprawdzić, co się stało?',
        timestamp: '2023-07-10T10:30:00',
      },
      {
        id: 2,
        sender: 'support',
        content:
          'Dzień dobry, dziękujemy za zgłoszenie. Sprawdzimy status Pana/Pani zamówienia u kuriera i wrócimy z informacją. Proszę o cierpliwość.',
        timestamp: '2023-07-10T11:15:00',
      },
      {
        id: 3,
        sender: 'support',
        content:
          'Dzień dobry ponownie, skontaktowaliśmy się z firmą kurierską. Paczka jest w trakcie dostawy i powinna zostać dostarczona dzisiaj do końca dnia. Przepraszamy za opóźnienie.',
        timestamp: '2023-07-11T09:45:00',
      },
    ],
  },
  {
    id: 'TIC-1002',
    subject: 'Pytanie o dostępność produktu',
    date: '2023-06-25',
    status: 'closed',
    lastUpdate: '2023-06-27',
    messages: [
      {
        id: 1,
        sender: 'user',
        content:
          'Dzień dobry, chciałbym zapytać o dostępność roweru górskiego XTR Pro Carbon w kolorze czerwonym i rozmiarze L. Na stronie widnieje jako niedostępny, ale może jest szansa na dostawę w najbliższym czasie?',
        timestamp: '2023-06-25T14:20:00',
      },
      {
        id: 2,
        sender: 'support',
        content:
          'Dzień dobry, dziękujemy za zainteresowanie. Sprawdzę dostępność tego modelu w naszym magazynie centralnym i u dostawcy.',
        timestamp: '2023-06-25T15:05:00',
      },
      {
        id: 3,
        sender: 'support',
        content:
          'Dzień dobry, mam dobre wieści. Nowa dostawa tego modelu jest planowana na przyszły tydzień. Czy chciałby Pan/Pani, żebyśmy zarezerwowali jeden egzemplarz?',
        timestamp: '2023-06-26T10:30:00',
      },
      {
        id: 4,
        sender: 'user',
        content:
          'Świetnie! Tak, poproszę o rezerwację. Jak mogę dokonać płatności?',
        timestamp: '2023-06-26T11:15:00',
      },
      {
        id: 5,
        sender: 'support',
        content:
          'Doskonale. Rezerwacja została dokonana. Może Pan/Pani dokonać płatności przez stronę, dodając produkt do koszyka - będzie dostępny dla Pana/Pani konta. Alternatywnie, może Pan/Pani zapłacić przy odbiorze w sklepie. Czy to odpowiada Panu/Pani?',
        timestamp: '2023-06-26T11:45:00',
      },
      {
        id: 6,
        sender: 'user',
        content: 'Tak, zapłacę przez stronę. Dziękuję za pomoc!',
        timestamp: '2023-06-26T12:10:00',
      },
      {
        id: 7,
        sender: 'support',
        content:
          'Cieszymy się, że mogliśmy pomóc. Jeśli będzie Pan/Pani miał/a jakiekolwiek pytania, proszę śmiało pisać. Życzymy udanych zakupów!',
        timestamp: '2023-06-27T09:30:00',
      },
    ],
  },
  {
    id: 'TIC-1003',
    subject: 'Reklamacja - uszkodzony produkt',
    date: '2023-06-15',
    status: 'pending',
    lastUpdate: '2023-06-20',
    messages: [
      {
        id: 1,
        sender: 'user',
        content:
          'Dzień dobry, otrzymałem dzisiaj zamówiony kask rowerowy, ale niestety jest uszkodzony - ma pęknięcie z boku. Chciałbym złożyć reklamację i prosić o wymianę na nowy egzemplarz.',
        timestamp: '2023-06-15T16:45:00',
      },
      {
        id: 2,
        sender: 'support',
        content:
          'Dzień dobry, bardzo przepraszamy za zaistniałą sytuację. Oczywiście przyjmiemy reklamację. Czy mógłby Pan/Pani przesłać zdjęcie uszkodzenia?',
        timestamp: '2023-06-15T17:20:00',
      },
      {
        id: 3,
        sender: 'user',
        content: 'Oczywiście, w załączniku przesyłam zdjęcia uszkodzenia.',
        timestamp: '2023-06-15T17:45:00',
        attachments: [
          { name: 'zdjecie1.jpg', size: '1.2 MB' },
          { name: 'zdjecie2.jpg', size: '0.9 MB' },
        ],
      },
      {
        id: 4,
        sender: 'support',
        content:
          'Dziękujemy za przesłane zdjęcia. Reklamacja została przyjęta. Wyślemy kuriera po odbiór uszkodzonego produktu i jednocześnie dostarczymy nowy egzemplarz. Czy adres dostawy pozostaje ten sam?',
        timestamp: '2023-06-16T09:15:00',
      },
      {
        id: 5,
        sender: 'user',
        content:
          'Tak, adres pozostaje ten sam. Kiedy mogę spodziewać się kuriera?',
        timestamp: '2023-06-16T10:00:00',
      },
      {
        id: 6,
        sender: 'support',
        content:
          'Kurier powinien pojawić się w ciągu 2-3 dni roboczych. Poinformujemy Pana/Panią SMS-em o dokładnej dacie dostawy. Przepraszamy jeszcze raz za niedogodności.',
        timestamp: '2023-06-16T10:30:00',
      },
      {
        id: 7,
        sender: 'user',
        content: 'Rozumiem, dziękuję za szybką reakcję.',
        timestamp: '2023-06-16T10:45:00',
      },
      {
        id: 8,
        sender: 'support',
        content:
          'Dzień dobry, informujemy, że kurier odbierze uszkodzony produkt i dostarczy nowy w dniu jutrzejszym (20.06) w godzinach 10:00-15:00. Czy ten termin Panu/Pani odpowiada?',
        timestamp: '2023-06-19T14:20:00',
      },
      {
        id: 9,
        sender: 'user',
        content:
          'Dzień dobry, tak, ten termin mi odpowiada. Będę czekać na kuriera. Dziękuję.',
        timestamp: '2023-06-19T15:05:00',
      },
    ],
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

export default function TicketDetailPage() {
  const params = useParams();
  const ticketId = params.id as string;

  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  // Find the current ticket
  const currentTicket = tickets.find((ticket) => ticket.id === ticketId);

  if (!currentTicket) {
    return (
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">
            Zgłoszenie nie znalezione
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Nie znaleziono zgłoszenia o podanym identyfikatorze.
          </p>
          <Button asChild className="mt-4">
            <Link href="/konto/zapytania">Wróć do listy zgłoszeń</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would send the message to the server here
      console.log('Sending message:', newMessage);
      console.log('Attachments:', attachments);

      // Clear the form
      setNewMessage('');
      setAttachments([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/konto/zapytania">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Wróć</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Szczegóły zgłoszenia</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        {/* Tickets list - sidebar */}
        <div className="hidden lg:block">
          <div className="rounded-lg border">
            <div className="p-4">
              <h2 className="font-semibold">Twoje zgłoszenia</h2>
            </div>
            <Separator />
            <div className="divide-y">
              {tickets.map((ticket) => (
                <Link
                  key={ticket.id}
                  href={`/konto/zapytania/${ticket.id}`}
                  className={cn(
                    'block p-4 hover:bg-muted',
                    ticket.id === ticketId && 'bg-muted'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className={cn(
                          'font-medium line-clamp-1',
                          ticket.id === ticketId && 'text-primary'
                        )}
                      >
                        {ticket.subject}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {ticket.id} •{' '}
                        {new Date(ticket.lastUpdate).toLocaleDateString(
                          'pl-PL'
                        )}
                      </p>
                    </div>
                    <TicketStatusBadge status={ticket.status} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-col rounded-lg border">
          {/* Ticket header */}
          <div className="p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold">{currentTicket.subject}</h2>
                <p className="text-sm text-muted-foreground">
                  {currentTicket.id} • Utworzono{' '}
                  {new Date(currentTicket.date).toLocaleDateString('pl-PL')}
                </p>
              </div>
              <TicketStatusBadge status={currentTicket.status} />
            </div>
          </div>
          <Separator />

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {currentTicket.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-4',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'support' && (
                    <Avatar>
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Support"
                      />
                      <AvatarFallback>BP</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg p-4',
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-medium">
                        {message.sender === 'user' ? 'Ty' : 'Obsługa klienta'}
                      </p>
                      <p className="text-xs opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString(
                          'pl-PL',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}
                      </p>
                    </div>
                    <p className="mt-1 text-sm">{message.content}</p>

                    {/* Attachments if any */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.attachments.map((attachment, index) => (
                          <div
                            key={index}
                            className={cn(
                              'flex items-center gap-2 rounded-md p-2',
                              message.sender === 'user'
                                ? 'bg-primary/80'
                                : 'bg-background'
                            )}
                          >
                            <Paperclip className="h-4 w-4" />
                            <div className="flex-1 truncate text-xs">
                              {attachment.name}
                            </div>
                            <span className="text-xs opacity-70">
                              {attachment.size}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {message.sender === 'user' && (
                    <Avatar>
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                      />
                      <AvatarFallback>JK</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Message input */}
          {currentTicket.status !== 'closed' ? (
            <div className="border-t p-4">
              <div className="flex flex-col gap-4">
                <Textarea
                  placeholder="Napisz wiadomość..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={3}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      multiple
                      onChange={handleFileChange}
                    />
                    <Button variant="outline" size="sm" asChild>
                      <label
                        htmlFor="file-upload"
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <Paperclip className="h-4 w-4" />
                        Załącz plik
                      </label>
                    </Button>
                    {attachments.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {attachments.length}{' '}
                        {attachments.length === 1 ? 'plik' : 'pliki'}
                      </span>
                    )}
                  </div>
                  <Button onClick={handleSendMessage}>
                    <Send className="mr-2 h-4 w-4" />
                    Wyślij
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-t p-4 bg-muted">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <p className="text-sm">
                  To zgłoszenie zostało zamknięte. Jeśli masz dodatkowe pytania,
                  utwórz nowe zgłoszenie.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
