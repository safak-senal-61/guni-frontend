'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Geçerli bir e-posta adresi giriniz.' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      // Simulate API call for sending password reset email
      // In a real application, you would make an actual API call here
      console.log('Password reset request for:', data.email);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      // Simulate successful email send
      setSuccessMessage('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
      form.reset(); // Clear the form
    } catch (err) {
      console.error('Password reset failed:', err);
      setErrorMessage('Şifre sıfırlama isteği başarısız oldu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm p-8 space-y-6 bg-white shadow-xl rounded-2xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Şifremi Unuttum</h1>
        <p className="text-gray-500">E-posta adresinizi girin, size şifre sıfırlama bağlantısı göndereceğiz.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="font-medium text-gray-700">E-posta</label>
          <Input id="email" type="email" placeholder="ornek@gunibirlikdoz.com" {...form.register('email')} />
          {form.formState.errors.email && <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>}
        </div>

        {successMessage && <p className="text-green-600 text-center text-sm p-2 bg-green-50 rounded-md">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 text-center text-sm p-2 bg-red-50 rounded-md">{errorMessage}</p>}

        <Button
          type="submit"
          className="w-full text-white font-bold py-3 text-base transition-all duration-300 ease-in-out"
          style={{
            background: 'linear-gradient(to right, #1E90FF, #8A2BE2)',
            border: 'none',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          disabled={isLoading}
        >
          {isLoading ? 'Gönderiliyor...' : 'Sıfırlama Bağlantısı Gönder'}
        </Button>
      </form>
      <div className="pt-4 text-center text-sm">
        <span className="text-gray-600">Giriş sayfasına geri dönmek için{' '}</span>
        <Link href="/login" className="font-semibold text-blue-600 hover:underline">
          Tıklayın
        </Link>
      </div>
    </Card>
  );
}