'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/stores/auth-store';

export function useAuthGuard() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    // Yükleme tamamlandıysa ve kullanıcı giriş yapmamışsa login sayfasına yönlendir
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Yükleme durumu ve giriş durumunu döndürerek bileşenin buna göre render olmasını sağla
  return { isLoading, isAuthenticated };
}