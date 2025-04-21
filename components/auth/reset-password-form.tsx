'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

// import { resetPassword } from "@/lib/auth"

export default function ResetPasswordForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // await resetPassword(email)
      setIsSubmitted(true);
      toast('Link resetujący wysłany', {
        description: 'Sprawdź swoją skrzynkę email, aby zresetować hasło.',
      });
    } catch (error) {
      console.error('Reset password error:', error);
      toast('Błąd', {
        description:
          'Nie udało się wysłać linku resetującego. Spróbuj ponownie.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="mb-4 text-4xl">✉️</div>
        <h2 className="text-xl font-semibold">Sprawdź swoją skrzynkę</h2>
        <p className="mt-2 text-muted-foreground">
          Wysłaliśmy link resetujący hasło na adres {email}. Sprawdź swoją
          skrzynkę i kliknij w link, aby zresetować hasło.
        </p>
        <div className="mt-6 space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsSubmitted(false)}
          >
            Użyj innego adresu email
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => router.push('/auth/login')}
          >
            Powrót do logowania
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="twoj@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Wysyłanie...' : 'Wyślij link resetujący'}
      </Button>

      <Button
        variant="ghost"
        className="w-full"
        onClick={() => router.push('/auth/login')}
        disabled={isLoading}
        type="button"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Powrót do logowania
      </Button>
    </form>
  );
}
