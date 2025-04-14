import type React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Logowanie i rejestracja | BikeZone',
  description:
    'Zaloguj się do swojego konta lub utwórz nowe konto w sklepie BikeZone',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      {children}
    </main>
  );
}
