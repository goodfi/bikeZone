'use client';

import type React from 'react';

import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

// import { login } from "@/lib/auth"
import PasswordInput from '@/components/auth/password-input';
import SocialButtons from '@/components/auth/social-buttons';
import { toast } from 'sonner';

interface LoginFormProps {
  callbackUrl?: string;
}

export default function LoginForm({ callbackUrl = '/' }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // await login({
      //   email: formData.email,
      //   password: formData.password,
      //   callbackUrl,
      // })
    } catch (error) {
      console.error('Login error:', error);
      toast('Błąd logowania', {
        description: 'Nieprawidłowy email lub hasło. Spróbuj ponownie.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Hasło</Label>
            <Link
              href="/auth/reset-password"
              className="text-xs text-muted-foreground hover:text-primary"
            >
              Zapomniałeś hasła?
            </Link>
          </div>
          <PasswordInput
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            disabled={isLoading}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Logowanie...' : 'Zaloguj się'}
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
