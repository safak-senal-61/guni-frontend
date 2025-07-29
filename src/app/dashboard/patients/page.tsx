'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from '@/lib/api';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string;
  allergies: string;
  currentMedications: string;
  createdAt: string;
  updatedAt: string;
}

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    emergencyContact: '',
    medicalHistory: '',
    allergies: '',
    currentMedications: ''
  });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          router.push('/login');
          return;
        }

        // Fetch current user
        const meResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!meResponse.ok) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          router.push('/login');
          return;
        }

        const userData = await meResponse.json();
        setCurrentUser(userData);

        // Fetch patients
        const patientsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/patients`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (patientsResponse.ok) {
          const patientsData = await patientsResponse.json();
          setPatients(patientsData);
        } else {
          setError('Hastalar yüklenemedi');
        }
      } catch (err) {
        setError('Veri yüklenirken hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('access_token');
      const url = editingPatient 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/patients/${editingPatient.id}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/patients`;
      
      const method = editingPatient ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const patientData = await response.json();
        
        if (editingPatient) {
          setPatients(patients.map(patient => 
            patient.id === editingPatient.id ? patientData : patient
          ));
          setSuccess('Hasta başarıyla güncellendi');
        } else {
          setPatients([...patients, patientData]);
          setSuccess('Hasta başarıyla eklendi');
        }
        
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          gender: '',
          address: '',
          emergencyContact: '',
          medicalHistory: '',
          allergies: '',
          currentMedications: ''
        });
        setShowAddForm(false);
        setEditingPatient(null);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Hasta kaydedilirken hata oluştu');
      }
    } catch (err) {
      setError('Hasta kaydedilirken hata oluştu');
    }
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setFormData({
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      phone: patient.phone,
      dateOfBirth: patient.dateOfBirth.split('T')[0], // Format for date input
      gender: patient.gender,
      address: patient.address,
      emergencyContact: patient.emergencyContact,
      medicalHistory: patient.medicalHistory,
      allergies: patient.allergies,
      currentMedications: patient.currentMedications
    });
    setShowAddForm(true);
  };

  const handleDelete = async (patientId: string) => {
    if (!confirm('Bu hastayı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/patients/${patientId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPatients(patients.filter(patient => patient.id !== patientId));
        setSuccess('Hasta başarıyla silindi');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Hasta silinirken hata oluştu');
      }
    } catch (err) {
      setError('Hasta silinirken hata oluştu');
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
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
              <h1 className="text-xl font-semibold text-gray-900">Hasta Yönetimi</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setShowAddForm(true);
                  setEditingPatient(null);
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    dateOfBirth: '',
                    gender: '',
                    address: '',
                    emergencyContact: '',
                    medicalHistory: '',
                    allergies: '',
                    currentMedications: ''
                  });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Yeni Hasta Ekle
              </button>
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

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="bg-white shadow rounded-lg mb-6">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {editingPatient ? 'Hasta Düzenle' : 'Yeni Hasta Ekle'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        Ad *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Soyad *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        E-posta *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                        Doğum Tarihi *
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        required
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Cinsiyet *
                      </label>
                      <select
                        id="gender"
                        required
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      >
                        <option value="">Seçiniz</option>
                        <option value="male">Erkek</option>
                        <option value="female">Kadın</option>
                        <option value="other">Diğer</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Adres
                    </label>
                    <textarea
                      id="address"
                      rows={2}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">
                      Acil Durum İletişim
                    </label>
                    <input
                      type="text"
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      placeholder="Ad Soyad - Telefon"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">
                      Tıbbi Geçmiş
                    </label>
                    <textarea
                      id="medicalHistory"
                      rows={3}
                      value={formData.medicalHistory}
                      onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                      Alerjiler
                    </label>
                    <textarea
                      id="allergies"
                      rows={2}
                      value={formData.allergies}
                      onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="currentMedications" className="block text-sm font-medium text-gray-700">
                      Mevcut İlaçlar
                    </label>
                    <textarea
                      id="currentMedications"
                      rows={2}
                      value={formData.currentMedications}
                      onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingPatient(null);
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      {editingPatient ? 'Güncelle' : 'Ekle'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                  Hasta Ara
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
            </div>
          </div>

          {/* Patients List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Hastalar ({filteredPatients.length})
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <li key={patient.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-gray-900">
                          {patient.firstName} {patient.lastName}
                        </h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(patient)}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                          >
                            Düzenle
                          </button>
                          <button
                            onClick={() => handleDelete(patient.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500">E-posta:</span>
                          <span className="ml-1 text-sm text-gray-900">{patient.email}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Yaş:</span>
                          <span className="ml-1 text-sm text-gray-900">{calculateAge(patient.dateOfBirth)}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Cinsiyet:</span>
                          <span className="ml-1 text-sm text-gray-900">
                            {patient.gender === 'male' ? 'Erkek' : patient.gender === 'female' ? 'Kadın' : 'Diğer'}
                          </span>
                        </div>
                      </div>
                      {patient.phone && (
                        <div className="mt-2">
                          <span className="text-sm font-medium text-gray-500">Telefon:</span>
                          <span className="ml-1 text-sm text-gray-900">{patient.phone}</span>
                        </div>
                      )}
                      {patient.address && (
                        <div className="mt-2">
                          <span className="text-sm font-medium text-gray-500">Adres:</span>
                          <span className="ml-1 text-sm text-gray-900">{patient.address}</span>
                        </div>
                      )}
                      {patient.emergencyContact && (
                        <div className="mt-2">
                          <span className="text-sm font-medium text-gray-500">Acil Durum İletişim:</span>
                          <span className="ml-1 text-sm text-gray-900">{patient.emergencyContact}</span>
                        </div>
                      )}
                      {patient.allergies && (
                        <div className="mt-2">
                          <span className="text-sm font-medium text-gray-500">Alerjiler:</span>
                          <p className="mt-1 text-sm text-gray-900">{patient.allergies}</p>
                        </div>
                      )}
                      {patient.currentMedications && (
                        <div className="mt-2">
                          <span className="text-sm font-medium text-gray-500">Mevcut İlaçlar:</span>
                          <p className="mt-1 text-sm text-gray-900">{patient.currentMedications}</p>
                        </div>
                      )}
                      <div className="mt-2 text-xs text-gray-400">
                        Kayıt: {new Date(patient.createdAt).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {filteredPatients.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-500">
                Hasta bulunamadı
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}