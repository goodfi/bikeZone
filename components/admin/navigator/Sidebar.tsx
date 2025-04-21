'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { adminNavItems } from '@/constant';

import { LogIn, LogOut, MoveLeft, ShoppingBag, User2 } from 'lucide-react';
import Link from 'next/link';

const AdminSidebar = () => {
  const isSignedIn = false; // Replace with actual authentication check

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex justify-center h-16 items-center border-b px-6 ">
        <Link
          href="/admin"
          className="flex justify-center items-center gap-2 font-semibold  "
        >
          <SidebarMenuButton>
            <ShoppingBag />
            <span className="text-primary  truncate">BikeZone</span>
            <span className="truncate">Admin</span>
          </SidebarMenuButton>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {adminNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton tooltip={item.title}>
                    <item.icon className="h-4 w-4" />
                    <p className="truncate font-semibold">{item.title}</p>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <Link href="/">
                <SidebarMenuButton tooltip="Powrót do sklepu">
                  <MoveLeft className="h-4 w-4" />
                  <p className="truncate font-semibold">Powrót do sklepu</p>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {isSignedIn ? (
          <>
            <SidebarMenuButton className=" " tooltip={'Profil'}>
              <User2 className="h-4 w-4" />
              <div className=" text-s truncate">
                <p className="font-medium t">Admin</p>
                <p className="text-xs text-muted-foreground ">
                  admin@bikezone.pl
                </p>
              </div>
            </SidebarMenuButton>
            <Link href="/">
              <SidebarMenuButton>
                <LogOut className="h-4 w-4" />
                <span className="truncate">Wyloguj</span>
              </SidebarMenuButton>
            </Link>
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <SidebarMenuButton>
                <LogIn className="h-4 w-4" />
                <span className="truncate">Zaloguj sie</span>
              </SidebarMenuButton>
            </Link>
          </>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AdminSidebar;
