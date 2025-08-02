'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

import { useAuthStore } from '@/app/stores/auth-store'; // Yol düzeltildi
import { Button } from '@/app/components/ui/button'; // Yol düzeltildi
import { Input } from '@/app/components/ui/input';   // Yol düzeltildi
import { Card } from '@/app/components/ui/card';     // Yol düzeltildi
import { Checkbox } from '@/app/components/ui/checkbox'; // Yol düzeltildi ve artık çalışacak

const loginSchema = z.object({
  email: z.string().email({ message: 'Geçerli bir e-posta adresi giriniz.' }),
  password: z.string().min(6, { message: 'Şifre en az 6 karakter olmalıdır.' }),
  rememberMe: z.boolean().default(false).optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      router.push('/dashboard');
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Card className="w-full max-w-sm p-8 space-y-6 bg-white shadow-xl rounded-2xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Giriş Yap</h1>
        <p className="text-gray-500">Hesabınıza erişmek için bilgilerinizi girin.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
            <label htmlFor="email" className="font-medium text-gray-700">E-posta</label>
            <Input id="email" type="email" placeholder="ornek@gunibirlikdoz.com" {...form.register('email')} />
            {form.formState.errors.email && <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>}
        </div>
        <div className="space-y-2">
            <label htmlFor="password" className="font-medium text-gray-700">Şifre</label>
            <div className="relative">
                <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...form.register('password')}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
             {form.formState.errors.password && <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Checkbox id="rememberMe" {...form.register('rememberMe')} />
                <label
                  htmlFor="rememberMe"
                  className="text-sm font-medium leading-none text-gray-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Beni Hatırla
                </label>
            </div>
            <Link href="/forgot-password" className="text-sm font-semibold text-blue-600 hover:underline">
              Şifremi Unuttum?
            </Link>
        </div>
        
        {error && <p className="text-red-500 text-center text-sm p-2 bg-red-50 rounded-md">{error}</p>}

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
          {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </Button>
      </form>
      <div className="pt-4 text-center text-sm">
        <span className="text-gray-600">Hesabınız yok mu?{' '}</span>
        <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
          Kayıt Ol
        </Link>
      </div>
    </Card>
  );
}