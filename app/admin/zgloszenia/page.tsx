'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  MessageSquare,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Sample tickets data
const tickets = [
  {
    id: 'TIC-1001',
    customer: 'Jan Kowalski',
    email: 'jan.kowalski@example.com',
    subject: 'Problem z dostawą zamówienia ORD-12345',
    date: '2023-07-10',
    status: 'open',
    lastUpdate: '2023-07-11',
    messages: 3,
    priority: 'high',
  },
  {
    id: 'TIC-1002',
    customer: 'Anna Nowak',
    email: 'anna.nowak@example.com',
    subject: 'Pytanie o dostępność produktu',
    date: '2023-06-25',
    status: 'closed',
    lastUpdate: '2023-06-27',
    messages: 4,
    priority: 'medium',
  },
  {
    id: 'TIC-1003',
    customer: 'Piotr Wiśniewski',
    email: 'piotr.wisniewski@example.com',
    subject: 'Reklamacja - uszkodzony produkt',
    date: '2023-06-15',
    status: 'pending',
    lastUpdate: '2023-06-20',
    messages: 5,
    priority: 'high',
  },
  {
    id: 'TIC-1004',
    customer: 'Magdalena Dąbrowska',
    email: 'magdalena.dabrowska@example.com',
    subject: 'Prośba o zmianę adresu dostawy',
    date: '2023-07-12',
    status: 'open',
    lastUpdate: '2023-07-12',
    messages: 1,
    priority: 'medium',
  },
  {
    id: 'TIC-1005',
    customer: 'Tomasz Lewandowski',
    email: 'tomasz.lewandowski@example.com',
    subject: 'Pytanie o gwarancję',
    date: '2023-07-08',
    status: 'pending',
    lastUpdate: '2023-07-09',
    messages: 2,
    priority: 'low',
  },
];

// Status badge component
const TicketStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'open':
      return (
        <Badge className="bg-green-500">
          <MessageSquare className="mr-1 h-3 w-3" />
          Otwarty
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-orange-500">
          <Clock className="mr-1 h-3 w-3" />
          Oczekujący
        </Badge>
      );
    case 'closed':
      return (
        <Badge variant="outline">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Zamknięty
        </Badge>
      );
    default:
      return <Badge>Nieznany</Badge>;
  }
};

// Priority badge component
const PriorityBadge = ({ priority }: { priority: string }) => {
  switch (priority) {
    case 'high':
      return <Badge className="bg-red-500">Wysoki</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-500">Średni</Badge>;
    case 'low':
      return <Badge className="bg-blue-500">Niski</Badge>;
    default:
      return <Badge>Nieznany</Badge>;
  }
};

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTickets = tickets.filter((ticket) => {
    // Filter by search query
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by status
    const matchesStatus =
      statusFilter === 'all' || ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Zgłoszenia</h1>
        <p className="text-muted-foreground">Zarządzaj zgłoszeniami klientów</p>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:items-center">
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Szukaj zgłoszeń..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filtruj</span>
            </Button>
          </div>
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Wszystkie zgłoszenia</option>
              <option value="open">Otwarte</option>
              <option value="pending">Oczekujące</option>
              <option value="closed">Zamknięte</option>
            </select>
          </div>
        </div>

        <div className="border-t">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[200px]">Klient</TableHead>
                <TableHead>Temat</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Data
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priorytet</TableHead>
                <TableHead className="text-right">Wiadomości</TableHead>
                <TableHead className="w-[100px]">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    Nie znaleziono zgłoszeń.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${ticket.customer.charAt(
                              0
                            )}`}
                          />
                          <AvatarFallback>
                            {ticket.customer.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{ticket.customer}</div>
                          <div className="text-sm text-muted-foreground">
                            {ticket.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium line-clamp-1">
                        {ticket.subject}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(ticket.date).toLocaleDateString('pl-PL')}
                    </TableCell>
                    <TableCell>
                      <TicketStatusBadge status={ticket.status} />
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={ticket.priority} />
                    </TableCell>
                    <TableCell className="text-right">
                      {ticket.messages}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Otwórz menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/zgloszenia/${ticket.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Szczegóły
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/zgloszenia/${ticket.id}#reply`}>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Odpowiedz
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {ticket.status !== 'closed' && (
                            <DropdownMenuItem>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Oznacz jako zamknięte
                            </DropdownMenuItem>
                          )}
                          {ticket.status === 'closed' && (
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Otwórz ponownie
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t px-4 py-2">
          <div className="text-sm text-muted-foreground">
            Pokazuje {filteredTickets.length} z {tickets.length} zgłoszeń
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Poprzednia
            </Button>
            <Button variant="outline" size="sm">
              Następna
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
