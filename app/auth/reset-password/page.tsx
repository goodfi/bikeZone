'use client';

import { useState } from 'react';
import ResetPasswordForm from '@/components/auth/reset-password-form';
import ResetPasswordSuccess from '@/components/auth/reset-password-success';

export default function ResetPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-8">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Resetowanie hasła</h1>
          <p className="mt-2 text-muted-foreground">
            Podaj swój adres email, aby zresetować hasło
          </p>
        </div>

        {!isSubmitted ? (
          <ResetPasswordForm
            setIsSubmitted={setIsSubmitted}
            setEmail={setEmail}
          />
        ) : (
          <ResetPasswordSuccess email={email} setIsSubmitted={setIsSubmitted} />
        )}
      </div>
    </div>
  );
}
