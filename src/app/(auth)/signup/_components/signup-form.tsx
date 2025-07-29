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

const signupSchema = z.object({
  firstName: z.string().min(2, { message: 'İsim en az 2 karakter olmalıdır.' }),
  lastName: z.string().min(2, { message: 'Soyisim en az 2 karakter olmalıdır.' }),
  email: z.string().email({ message: 'Geçerli bir e-posta adresi giriniz.' }),
  password: z.string().min(6, { message: 'Şifre en az 6 karakter olmalıdır.' }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();
  const { signup, isLoading, error } = useAuthStore();
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await signup(data);
      // YÖNLENDİRME GÜNCELLENDİ: Kullanıcıyı onboarding'in ilk adımına yönlendiriyoruz.
      router.push('/profile-setup'); 
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <Card className="w-full max-w-sm p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Hesap Oluştur</h1>
        <p className="text-gray-500">Öğrenme yolculuğunuza başlamak için kaydolun.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
                <label htmlFor="firstName">İsim</label>
                <Input id="firstName" {...form.register('firstName')} />
                {form.formState.errors.firstName && <p className="text-red-500 text-sm">{form.formState.errors.firstName.message}</p>}
            </div>
             <div className="w-1/2 space-y-2">
                <label htmlFor="lastName">Soyisim</label>
                <Input id="lastName" {...form.register('lastName')} />
                {form.formState.errors.lastName && <p className="text-red-500 text-sm">{form.formState.errors.lastName.message}</p>}
            </div>
        </div>
         <div className="space-y-2">
            <label htmlFor="email">E-posta</label>
            <Input id="email" type="email" {...form.register('email')} />
            {form.formState.errors.email && <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>}
        </div>
        <div className="space-y-2">
            <label htmlFor="password">Şifre</label>
            <Input id="password" type="password" {...form.register('password')} />
             {form.formState.errors.password && <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>}
        </div>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Hesap Oluşturuluyor...' : 'Ücretsiz Kaydol'}
        </Button>
      </form>
      <div className="text-center text-sm">
        Zaten bir hesabınız var mı?{' '}
        <Link href="/login" className="font-semibold text-blue-600 hover:underline">
          Giriş Yap
        </Link>
      </div>
    </Card>
  );
}