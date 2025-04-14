'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import SocialButtons from '@/components/auth/social-buttons';
import { toast } from 'sonner';

interface RegisterFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export default function RegisterForm({
  isLoading,
  setIsLoading,
}: RegisterFormProps) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Walidacja haseł
    if (formData.password !== formData.confirmPassword) {
      toast('Błąd rejestracji', {
        description: 'Hasła nie są identyczne. Spróbuj ponownie.',
      });
      setIsLoading(false);
      return;
    }

    try {
      // Tutaj będzie integracja z API do rejestracji
      console.log('Register data:', formData);

      // Symulacja opóźnienia rejestracji
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast('Konto utworzone', {
        description:
          'Twoje konto zostało pomyślnie utworzone. Możesz się teraz zalogować.',
      });

      // Przełącz na zakładkę logowania po udanej rejestracji
      router.push('/auth?tab=login');
    } catch (error) {
      console.error('Register error:', error);
      toast('Błąd rejestracji', {
        description: 'Nie udało się utworzyć konta. Spróbuj ponownie.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="register-name">Imię i nazwisko</Label>
          <Input
            id="register-name"
            type="text"
            placeholder="Jan Kowalski"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-email">Email</Label>
          <Input
            id="register-email"
            type="email"
            placeholder="twoj@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-password">Hasło</Label>
          <div className="relative">
            <Input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="sr-only">
                {showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
              </span>
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-confirm-password">Potwierdź hasło</Label>
          <Input
            id="register-confirm-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange('confirmPassword', e.target.value)
            }
            required
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
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Rejestracja...
            </>
          ) : (
            'Zarejestruj się'
          )}
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
    </>
  );
}
