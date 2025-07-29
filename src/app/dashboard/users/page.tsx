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

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        // Fetch current user to check permissions
        const meResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!meResponse.ok) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }

        const userData = await meResponse.json();
        setCurrentUser(userData);

        // Check if user has admin role
        if (userData.role !== 'admin') {
          router.push('/dashboard');
          return;
        }

        // Fetch all users
        const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/users`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData);
        } else {
          setError('Kullanıcılar yüklenemedi');
        }
      } catch (err) {
        setError('Veri yüklenirken hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(user => 
          user.id === userId ? updatedUser : user
        ));
        setSuccess('Kullanıcı rolü başarıyla güncellendi');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Rol güncellenirken hata oluştu');
      }
    } catch (err) {
      setError('Rol güncellenirken hata oluştu');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId));
        setSuccess('Kullanıcı başarıyla silindi');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Kullanıcı silinirken hata oluştu');
      }
    } catch (err) {
      setError('Kullanıcı silinirken hata oluştu');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === '' || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

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
              <h1 className="text-xl font-semibold text-gray-900">Kullanıcı Yönetimi</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700">
                {currentUser?.firstName} {currentUser?.lastName}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
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

          {/* Filters */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                    Arama
                  </label>
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Ad, soyad veya e-posta ile ara..."
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Rol Filtresi
                  </label>
                  <select
                    id="role"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  >
                    <option value="">Tüm Roller</option>
                    <option value="admin">Admin</option>
                    <option value="user">Kullanıcı</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Kullanıcılar ({filteredUsers.length})
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <li key={user.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role === 'admin' ? 'Admin' : 'Kullanıcı'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                        <div className="text-xs text-gray-400">
                          Kayıt: {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {user.id !== currentUser?.id && (
                        <>
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-2 py-1 border"
                          >
                            <option value="user">Kullanıcı</option>
                            <option value="admin">Admin</option>
                          </select>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                          >
                            Sil
                          </button>
                        </>
                      )}
                      {user.id === currentUser?.id && (
                        <span className="text-sm text-gray-500 italic">
                          (Siz)
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {filteredUsers.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-500">
                Kullanıcı bulunamadı
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}