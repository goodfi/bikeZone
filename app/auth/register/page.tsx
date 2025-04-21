'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AuthCard from '@/components/auth/auth-card';
import RegisterForm from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <AuthCard
      title="Utwórz konto"
      description="Wprowadź swoje dane, aby utworzyć konto"
    >
      <RegisterForm />

      <div className="mt-6 text-center text-sm">
        Masz już konto?{' '}
        <Button variant="link" className="p-0" asChild>
          <Link href="/auth/login">Zaloguj się</Link>
        </Button>
      </div>
    </AuthCard>
  );
}
