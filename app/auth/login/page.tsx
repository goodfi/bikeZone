'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AuthCard from '@/components/auth/auth-card';
import LoginForm from '@/components/auth/login-form';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');

  return (
    <AuthCard
      title="Zaloguj się do konta"
      description="Wprowadź swoje dane, aby się zalogować"
    >
      {error && (
        <div className="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error === 'CredentialsSignin' && 'Nieprawidłowy email lub hasło.'}
          {error === 'OAuthAccountNotLinked' &&
            'To konto jest już połączone z innym sposobem logowania.'}
          {!['CredentialsSignin', 'OAuthAccountNotLinked'].includes(error) &&
            'Wystąpił błąd podczas logowania.'}
        </div>
      )}

      <LoginForm callbackUrl={callbackUrl} />

      <div className="mt-6 text-center text-sm">
        Nie masz jeszcze konta?{' '}
        <Button variant="link" className="p-0" asChild>
          <Link href="/auth/register">Zarejestruj się</Link>
        </Button>
      </div>
    </AuthCard>
  );
}
