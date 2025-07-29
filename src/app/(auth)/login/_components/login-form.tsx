'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/app/stores/auth-store';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';

const loginSchema = z.object({
  email: z.string().email({ message: 'Geçerli bir e-posta adresi giriniz.' }),
  password: z.string().min(6, { message: 'Şifre en az 6 karakter olmalıdır.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      router.push('/dashboard'); // Başarılı giriş sonrası yönlendirme
    } catch (err) {
      // Hata mesajı store'da zaten ayarlandı.
      console.error("Login failed:", err);
    }
  };

  return (
    <Card className="w-full max-w-sm p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Giriş Yap</h1>
        <p className="text-gray-500">Hesabınıza erişmek için bilgilerinizi girin.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
            <label htmlFor="email">E-posta</label>
            <Input id="email" type="email" placeholder="ornek@gunibirlikdoz.com" {...form.register('email')} />
            {form.formState.errors.email && <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>}
        </div>
        <div className="space-y-2">
            <label htmlFor="password">Şifre</label>
            <Input id="password" type="password" {...form.register('password')} />
             {form.formState.errors.password && <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>}
        </div>
        
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </Button>
      </form>
      <div className="text-center text-sm">
        Hesabınız yok mu?{' '}
        <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
          Kayıt Ol
        </Link>
      </div>
    </Card>
  );
}