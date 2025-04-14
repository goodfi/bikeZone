'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface ResetPasswordSuccessProps {
  email: string;
  setIsSubmitted: (isSubmitted: boolean) => void;
}

export default function ResetPasswordSuccess({
  email,
  setIsSubmitted,
}: ResetPasswordSuccessProps) {
  const router = useRouter();

  return (
    <div className="rounded-lg border bg-card p-6 text-center">
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
          onClick={() => router.push('/auth')}
        >
          Powrót do logowania
        </Button>
      </div>
    </div>
  );
}
