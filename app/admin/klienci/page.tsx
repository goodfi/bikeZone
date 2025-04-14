'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Edit,
  Mail,
  Phone,
  ShoppingBag,
  UserPlus,
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
import { formatPrice } from '@/lib/utils';

// Sample customers data
const customers = [
  {
    id: 1,
    name: 'Jan Kowalski',
    email: 'jan.kowalski@example.com',
    phone: '+48 123 456 789',
    orders: 5,
    totalSpent: 12499,
    lastOrder: '2023-07-15',
    status: 'active',
  },
  {
    id: 2,
    name: 'Anna Nowak',
    email: 'anna.nowak@example.com',
    phone: '+48 987 654 321',
    orders: 3,
    totalSpent: 4999,
    lastOrder: '2023-06-20',
    status: 'active',
  },
  {
    id: 3,
    name: 'Piotr Wiśniewski',
    email: 'piotr.wisniewski@example.com',
    phone: '+48 555 123 456',
    orders: 2,
    totalSpent: 6499,
    lastOrder: '2023-07-05',
    status: 'active',
  },
  {
    id: 4,
    name: 'Magdalena Dąbrowska',
    email: 'magdalena.dabrowska@example.com',
    phone: '+48 111 222 333',
    orders: 1,
    totalSpent: 899,
    lastOrder: '2023-07-10',
    status: 'inactive',
  },
  {
    id: 5,
    name: 'Tomasz Lewandowski',
    email: 'tomasz.lewandowski@example.com',
    phone: '+48 444 555 666',
    orders: 4,
    totalSpent: 8999,
    lastOrder: '2023-05-25',
    status: 'active',
  },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCustomers = customers.filter((customer) => {
    // Filter by search query
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);

    // Filter by status
    const matchesStatus =
      statusFilter === 'all' || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Klienci</h1>
          <p className="text-muted-foreground">Zarządzaj klientami sklepu</p>
        </div>
        <Button asChild>
          <Link href="/admin/klienci/dodaj">
            <UserPlus className="mr-2 h-4 w-4" />
            Dodaj klienta
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex flex-col items-start justify-between gap-4 p-4 sm:flex-row sm:items-center">
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Szukaj klientów..."
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
              <option value="all">Wszyscy klienci</option>
              <option value="active">Aktywni</option>
              <option value="inactive">Nieaktywni</option>
            </select>
          </div>
        </div>

        <div className="border-t">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Klient</TableHead>
                <TableHead>Kontakt</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Zamówienia
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Wydatki
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Ostatnie zamówienie
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Nie znaleziono klientów.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${customer.name.charAt(
                              0
                            )}`}
                          />
                          <AvatarFallback>
                            {customer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            ID: {customer.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>{formatPrice(customer.totalSpent)}</TableCell>
                    <TableCell>
                      {new Date(customer.lastOrder).toLocaleDateString('pl-PL')}
                    </TableCell>
                    <TableCell>
                      {customer.status === 'active' ? (
                        <Badge className="bg-green-500">Aktywny</Badge>
                      ) : (
                        <Badge variant="outline">Nieaktywny</Badge>
                      )}
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
                            <Link href={`/admin/klienci/${customer.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Szczegóły
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/klienci/${customer.id}/edytuj`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edytuj
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/klienci/${customer.id}/zamowienia`}
                            >
                              <ShoppingBag className="mr-2 h-4 w-4" />
                              Zamówienia
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Wyślij email
                          </DropdownMenuItem>
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
            Pokazuje {filteredCustomers.length} z {customers.length} klientów
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
