'use client';

import type React from 'react';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/navigator/Sidebar';
import Navbar from '@/components/admin/navigator/Navbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className=" gap-2">
      <AdminSidebar />

      <SidebarInset>
        <Navbar />
        <div className="mx-auto p-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
