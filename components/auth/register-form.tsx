'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

// import { register } from "@/lib/auth"
import PasswordInput from '@/components/auth/password-input';
import SocialButtons from '@/components/auth/social-buttons';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function RegisterForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast('Błąd rejestracji', {
        description: 'Hasła nie są identyczne. Spróbuj ponownie.',
      });
      return;
    }

    setIsLoading(true);

    try {
      // await register({
      //   name: formData.name,
      //   email: formData.email,
      //   password: formData.password,
      // })

      toast('Konto utworzone', {
        description:
          'Twoje konto zostało pomyślnie utworzone. Możesz się teraz zalogować.',
      });

      router.push('/auth/login');
    } catch (error) {
      console.error('Register error:', error);
      toast('Błąd rejestracji', {
        description: 'Nie udało się utworzyć konta. Spróbuj ponownie.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Imię i nazwisko</Label>
          <Input
            id="name"
            placeholder="Jan Kowalski"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="twoj@email.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Hasło</Label>
          <PasswordInput
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
          <PasswordInput
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            disabled={isLoading}
          />
        </div>

        <div className="text-xs text-muted-foreground">
          Rejestrując się, akceptujesz nasz{' '}
          <Link href="/regulamin" className="underline hover:text-primary">
            Regulamin
          </Link>{' '}
          oraz{' '}
          <Link
            href="/polityka-prywatnosci"
            className="underline hover:text-primary"
          >
            Politykę Prywatności
          </Link>
          .
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Rejestracja...' : 'Zarejestruj się'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Lub kontynuuj z
          </span>
        </div>
      </div>

      <SocialButtons isLoading={isLoading} />
    </div>
  );
}
