import type React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Autoryzacja | BikeZone',
  description: 'Zaloguj się lub zarejestruj w sklepie BikeZone',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex min-h-screen items-center justify-center py-8">
      {children}
    </div>
  );
}
