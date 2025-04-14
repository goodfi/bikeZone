'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface ResetPasswordFormProps {
  setIsSubmitted: (isSubmitted: boolean) => void;
  setEmail: (email: string) => void;
}

export default function ResetPasswordForm({
  setIsSubmitted,
  setEmail,
}: ResetPasswordFormProps) {
  const router = useRouter();

  const [emailValue, setEmailValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Tutaj będzie integracja z API do resetowania hasła
      console.log('Reset password for:', emailValue);

      // Symulacja opóźnienia
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setEmail(emailValue);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="twoj@email.com"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Wysyłanie...
          </>
        ) : (
          'Wyślij link resetujący'
        )}
      </Button>
      <Button
        variant="ghost"
        className="w-full"
        onClick={() => router.push('/auth')}
        disabled={isLoading}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Powrót do logowania
      </Button>
    </form>
  );
}
