'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/signin');
          return;
        }

        const response = await fetch('http://localhost:3001/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setFormData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email
          });
        } else {
          localStorage.removeItem('token');
          router.push('/auth/signin');
        }
      } catch (err) {
        setError('Kullanıcı bilgileri alınamadı');
        localStorage.removeItem('token');
        router.push('/auth/signin');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setSuccess('Profil başarıyla güncellendi');
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Profil güncellenirken hata oluştu');
      }
    } catch (err) {
      setError('Profil güncellenirken hata oluştu');
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || ''
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Dashboard
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Profil</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Profile Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  Profil Bilgileri
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Düzenle
                  </button>
                )}
              </div>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                  {success}
                </div>
              )}

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        Ad
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Soyad
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      E-posta
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Kaydet
                    </button>
                  </div>
                </form>
              ) : (
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Ad</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user?.firstName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Soyad</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user?.lastName}</dd>
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
                    <dt className="text-sm font-medium text-gray-500">Kayıt Tarihi</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('tr-TR') : '-'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Son Güncelleme</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString('tr-TR') : '-'}
                    </dd>
                  </div>
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}