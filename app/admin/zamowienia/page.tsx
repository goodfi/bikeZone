'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Download,
  Printer,
  CheckCircle2,
  XCircle,
  TruckIcon,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatPrice } from '@/lib/utils';

// Sample orders data
const orders = [
  {
    id: 'ORD-12345',
    customer: 'Jan Kowalski',
    email: 'jan.kowalski@example.com',
    date: '2023-05-15',
    status: 'completed',
    total: 7499,
    paymentStatus: 'paid',
  },
  {
    id: 'ORD-12346',
    customer: 'Anna Nowak',
    email: 'anna.nowak@example.com',
    date: '2023-06-20',
    status: 'processing',
    total: 2499,
    paymentStatus: 'paid',
  },
  {
    id: 'ORD-12347',
    customer: 'Piotr Wiśniewski',
    email: 'piotr.wisniewski@example.com',
    date: '2023-07-05',
    status: 'shipped',
    total: 5999,
    paymentStatus: 'paid',
  },
  {
    id: 'ORD-12348',
    customer: 'Magdalena Dąbrowska',
    email: 'magdalena.dabrowska@example.com',
    date: '2023-07-10',
    status: 'processing',
    total: 899,
    paymentStatus: 'pending',
  },
  {
    id: 'ORD-12349',
    customer: 'Tomasz Lewandowski',
    email: 'tomasz.lewandowski@example.com',
    date: '2023-07-12',
    status: 'cancelled',
    total: 149,
    paymentStatus: 'refunded',
  },
  {
    id: 'ORD-12350',
    customer: 'Karolina Kowalczyk',
    email: 'karolina.kowalczyk@example.com',
    date: '2023-07-15',
    status: 'completed',
    total: 3499,
    paymentStatus: 'paid',
  },
];

// Status badge component
const OrderStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'completed':
      return (
        <Badge className="bg-green-500">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Zrealizowane
        </Badge>
      );
    case 'processing':
      return (
        <Badge className="bg-blue-500">
          <span className="mr-1 flex h-3 w-3 items-center justify-center rounded-full bg-white">
            <span className="animate-ping absolute h-2 w-2 rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative h-1.5 w-1.5 rounded-full bg-blue-500"></span>
          </span>
          W realizacji
        </Badge>
      );
    case 'shipped':
      return (
        <Badge className="bg-orange-500">
          <TruckIcon className="mr-1 h-3 w-3" />
          Wysłane
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge variant="outline" className="border-red-500 text-red-500">
          <XCircle className="mr-1 h-3 w-3" />
          Anulowane
        </Badge>
      );
    default:
      return <Badge>Nieznany</Badge>;
  }
};

// Payment status badge component
const PaymentStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'paid':
      return <Badge className="bg-green-500">Opłacone</Badge>;
    case 'pending':
      return <Badge variant="outline">Oczekujące</Badge>;
    case 'refunded':
      return (
        <Badge variant="outline" className="border-red-500 text-red-500">
          Zwrócone
        </Badge>
      );
    default:
      return <Badge>Nieznany</Badge>;
  }
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter((order) => {
    // Filter by search query
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by status
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Zamówienia</h1>
        <p className="text-muted-foreground">Zarządzaj zamówieniami klientów</p>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:items-center">
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Szukaj zamówień..."
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status zamówienia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie</SelectItem>
                <SelectItem value="processing">W realizacji</SelectItem>
                <SelectItem value="shipped">Wysłane</SelectItem>
                <SelectItem value="completed">Zrealizowane</SelectItem>
                <SelectItem value="cancelled">Anulowane</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border-t">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <div className="flex items-center gap-1">
                    ID
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Klient</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Data
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Płatność</TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    Kwota
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="w-[100px]">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Nie znaleziono zamówień.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString('pl-PL')}
                    </TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>
                      <PaymentStatusBadge status={order.paymentStatus} />
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatPrice(order.total)}
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
                            <Link href={`/admin/zamowienia/${order.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Szczegóły
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Printer className="mr-2 h-4 w-4" />
                            Drukuj
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Pobierz fakturę
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {order.status === 'processing' && (
                            <DropdownMenuItem>
                              <TruckIcon className="mr-2 h-4 w-4" />
                              Oznacz jako wysłane
                            </DropdownMenuItem>
                          )}
                          {order.status === 'shipped' && (
                            <DropdownMenuItem>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Oznacz jako zrealizowane
                            </DropdownMenuItem>
                          )}
                          {(order.status === 'processing' ||
                            order.status === 'shipped') && (
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              Anuluj zamówienie
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
            Pokazuje {filteredOrders.length} z {orders.length} zamówień
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
