import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  MessageSquare,
  FileText,
  Settings,
  BarChart3,
  Tag,
} from 'lucide-react';

export const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Produkty',
    href: '/admin/produkty',
    icon: ShoppingBag,
  },
  {
    title: 'Zamówienia',
    href: '/admin/zamowienia',
    icon: FileText,
  },
  {
    title: 'Klienci',
    href: '/admin/klienci',
    icon: Users,
  },
  {
    title: 'Zgłoszenia',
    href: '/admin/zgloszenia',
    icon: MessageSquare,
  },
  {
    title: 'Marketing',
    href: '/admin/marketing',
    icon: Tag,
  },
  {
    title: 'Statystyki',
    href: '/admin/statystyki',
    icon: BarChart3,
  },
  {
    title: 'Ustawienia',
    href: '/admin/ustawienia',
    icon: Settings,
  },
];
