'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/login-form';
import RegisterForm from '@/components/auth/register-form';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const defaultTab = searchParams.get('tab') || 'login';
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-8">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Witaj w BikeZone</h1>
          <p className="mt-2 text-muted-foreground">
            Zaloguj się do swojego konta lub utwórz nowe
          </p>
        </div>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Logowanie</TabsTrigger>
            <TabsTrigger value="register">Rejestracja</TabsTrigger>
          </TabsList>

          {/* Login Form */}
          <TabsContent value="login" className="mt-6 space-y-4">
            <LoginForm
              callbackUrl={callbackUrl}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </TabsContent>

          {/* Register Form */}
          <TabsContent value="register" className="mt-6 space-y-4">
            <RegisterForm isLoading={isLoading} setIsLoading={setIsLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
