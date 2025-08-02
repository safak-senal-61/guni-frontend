'use client';

import { useState } from 'react'; // Import useState for showing/hiding password
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react'; // Import Eye icons

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
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '' }, // Add default values
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await signup(data);
      // YÖNLENDİRME GÜNCELLENDİ: Kullanıcıyı onboarding'in ilk adımına yönlendiriyoruz.
      router.push('/profile-setup');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <Card className="w-full max-w-sm p-8 space-y-6 bg-white shadow-xl rounded-2xl"> {/* Added bg-white shadow-xl rounded-2xl */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Hesap Oluştur</h1> {/* Added text-gray-800 */}
        <p className="text-gray-500">Öğrenme yolculuğunuza başlamak için kaydolun.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <div className="w-1/2 space-y-2">
            <label htmlFor="firstName" className="font-medium text-gray-700">İsim</label> {/* Added styling */}
            <Input id="firstName" placeholder="Adınız" {...form.register('firstName')} /> {/* Added placeholder */}
            {form.formState.errors.firstName && <p className="text-red-500 text-sm mt-1">{form.formState.errors.firstName.message}</p>} {/* Added mt-1 for spacing */}
          </div>
          <div className="w-1/2 space-y-2">
            <label htmlFor="lastName" className="font-medium text-gray-700">Soyisim</label> {/* Added styling */}
            <Input id="lastName" placeholder="Soyadınız" {...form.register('lastName')} /> {/* Added placeholder */}
            {form.formState.errors.lastName && <p className="text-red-500 text-sm mt-1">{form.formState.errors.lastName.message}</p>} {/* Added mt-1 for spacing */}
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="font-medium text-gray-700">E-posta</label> {/* Added styling */}
          <Input id="email" type="email" placeholder="ornek@gunibirlikdoz.com" {...form.register('email')} /> {/* Added placeholder */}
          {form.formState.errors.email && <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>} {/* Added mt-1 for spacing */}
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="font-medium text-gray-700">Şifre</label> {/* Added styling */}
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
          {form.formState.errors.password && <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>} {/* Added mt-1 for spacing */}
        </div>

        {error && <p className="text-red-500 text-center text-sm p-2 bg-red-50 rounded-md">{error}</p>} {/* Added styling */}

        <Button
          type="submit"
          className="w-full text-white font-bold py-3 text-base transition-all duration-300 ease-in-out" // Added styling
          style={{
            background: 'linear-gradient(to right, #1E90FF, #8A2BE2)',
            border: 'none',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'} // Added hover effect
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} // Added hover effect
          disabled={isLoading}
        >
          {isLoading ? 'Hesap Oluşturuluyor...' : 'Ücretsiz Kaydol'}
        </Button>
      </form>
      <div className="pt-4 text-center text-sm"> {/* Added pt-4 */}
        <span className="text-gray-600">Zaten bir hesabınız var mı?{' '}</span> {/* Added text-gray-600 */}
        <Link href="/login" className="font-semibold text-blue-600 hover:underline">
          Giriş Yap
        </Link>
      </div>
    </Card>
  );
}