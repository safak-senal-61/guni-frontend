'use client';

import { Sidebar } from './_components/sidebar';
import { Header } from './_components/header';
import { useAuthGuard } from '@/app/hooks/use-auth-guard';
import { useEffect } from 'react';
import { useAuthStore } from '@/app/stores/auth-store';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuthGuard();
  const authState = useAuthStore.getState();

  useEffect(() => {
    console.log(`[DashboardLayout] Auth Guard durumu: isLoading=${isLoading}, isAuthenticated=${isAuthenticated}`);
    console.log('[DashboardLayout] Güncel Auth Store State:', authState);
  }, [isLoading, isAuthenticated, authState]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p>Oturum durumu kontrol ediliyor...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
     console.log('[DashboardLayout] Kullanıcı giriş yapmamış. Yönlendirme bekleniyor...');
    // Auth guard zaten yönlendirmeyi yapacağı için burada boş bir ekran göstermek yeterli.
    return null;
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}