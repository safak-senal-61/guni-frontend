'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMe, logout, isAuthenticated, User } from '@/lib/api';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!isAuthenticated()) {
          router.push('/login');
          return;
        }

        const response = await getMe();
        if (response.data) {
          setUser(response.data);
        } else {
          setError('Kullanıcı bilgileri alınamadı');
          // Clear any invalid tokens
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          router.push('/login');
        }
      } catch (err) {
        setError('Kullanıcı bilgileri alınamadı');
        // Clear any invalid tokens
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error: unknown) {
      console.error('Logout failed:', error);
      // Even if logout fails, clear tokens and redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Hoş geldiniz, {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Günlük Doz Takip Sistemi
              </h2>
              <p className="text-gray-600 mb-8">
                Hoş geldiniz! Bu sistem üzerinden günlük doz takibinizi yapabilirsiniz.
              </p>
              
              {/* User Info Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Kullanıcı Bilgileri
                  </h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Ad Soyad</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">E-posta</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Rol</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user?.role}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Kullanıcı ID</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user?.id}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/dashboard/profile"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors"
                >
                  Profil Ayarları
                </Link>
                <Link
                  href="/dashboard/doses"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors"
                >
                  Doz Takibi
                </Link>
                <Link
                  href="/dashboard/reports"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors"
                >
                  Raporlar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}