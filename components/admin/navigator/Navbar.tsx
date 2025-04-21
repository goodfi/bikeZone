import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';

import React from 'react';

const Navbar = () => {
  const isSignedIn = false; // Replace with actual authentication check

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>
      {isSignedIn ? (
        <div className="ml-auto px-3">UserButon</div>
      ) : (
        <div>
          <Button>
            <Link href="/auth/login">Zaloguj się</Link>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
