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
}

interface Medication {
  id: string;
  patientId: string;
  patient: Patient;
  medicationName: string;
  name: string;
  description: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  instructions: string;
  prescribedBy: string;
  isActive: boolean;
  sideEffects: string;
  contraindications: string;
  createdAt: string;
  updatedAt: string;
}

export default function Medications() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const [formData, setFormData] = useState({
    patientId: '',
    medicationName: '',
    name: '',
    description: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    instructions: '',
    prescribedBy: '',
    isActive: true,
    sideEffects: '',
    contraindications: ''
  });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        // Fetch current user
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

        // Fetch medications
        const medicationsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/medications`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (medicationsResponse.ok) {
          const medicationsData = await medicationsResponse.json();
          setMedications(medicationsData);
        } else {
          setError('İlaçlar yüklenemedi');
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
      const token = localStorage.getItem('token');
      const url = editingMedication 
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/medications/${editingMedication.id}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/medications`;
      
      const method = editingMedication ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const medicationData = await response.json();
        
        if (editingMedication) {
          setMedications(medications.map(med => 
            med.id === editingMedication.id ? medicationData : med
          ));
          setSuccess('İlaç başarıyla güncellendi');
        } else {
          setMedications([...medications, medicationData]);
          setSuccess('İlaç başarıyla eklendi');
        }
        
        setFormData({
          patientId: '',
          medicationName: '',
          name: '',
          description: '',
          dosage: '',
          frequency: '',
          startDate: '',
          endDate: '',
          instructions: '',
          prescribedBy: '',
          isActive: true,
          sideEffects: '',
          contraindications: ''
        });
        setShowAddForm(false);
        setEditingMedication(null);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'İlaç kaydedilirken hata oluştu');
      }
    } catch (err) {
      setError('İlaç kaydedilirken hata oluştu');
    }
  };

  const handleEdit = (medication: Medication) => {
    setEditingMedication(medication);
    setFormData({
      patientId: medication.patientId,
      medicationName: medication.medicationName,
      name: medication.name,
      description: medication.description,
      dosage: medication.dosage,
      frequency: medication.frequency,
      startDate: medication.startDate,
      endDate: medication.endDate,
      instructions: medication.instructions,
      prescribedBy: medication.prescribedBy,
      isActive: medication.isActive,
      sideEffects: medication.sideEffects,
      contraindications: medication.contraindications
    });
    setShowAddForm(true);
  };

  const handleDelete = async (medicationId: string) => {
    if (!confirm('Bu ilacı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/medications/${medicationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMedications(medications.filter(med => med.id !== medicationId));
        setSuccess('İlaç başarıyla silindi');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'İlaç silinirken hata oluştu');
      }
    } catch (err) {
      setError('İlaç silinirken hata oluştu');
    }
  };

  const filteredMedications = medications.filter(medication =>
    medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medication.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <h1 className="text-xl font-semibold text-gray-900">İlaç Yönetimi</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setShowAddForm(true);
                  setEditingMedication(null);
                  setFormData({
                    patientId: '',
                    medicationName: '',
                    name: '',
                    description: '',
                    dosage: '',
                    frequency: '',
                    startDate: '',
                    endDate: '',
                    instructions: '',
                    prescribedBy: '',
                    isActive: true,
                    sideEffects: '',
                    contraindications: ''
                  });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Yeni İlaç Ekle
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
                  {editingMedication ? 'İlaç Düzenle' : 'Yeni İlaç Ekle'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        İlaç Adı *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">
                        Doz *
                      </label>
                      <input
                        type="text"
                        id="dosage"
                        required
                        value={formData.dosage}
                        onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                        placeholder="örn: 500mg"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                      Kullanım Sıklığı *
                    </label>
                    <input
                      type="text"
                      id="frequency"
                      required
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                      placeholder="örn: Günde 3 kez"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Açıklama
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="sideEffects" className="block text-sm font-medium text-gray-700">
                      Yan Etkiler
                    </label>
                    <textarea
                      id="sideEffects"
                      rows={3}
                      value={formData.sideEffects}
                      onChange={(e) => setFormData({ ...formData, sideEffects: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="contraindications" className="block text-sm font-medium text-gray-700">
                      Kontrendikasyonlar
                    </label>
                    <textarea
                      id="contraindications"
                      rows={3}
                      value={formData.contraindications}
                      onChange={(e) => setFormData({ ...formData, contraindications: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingMedication(null);
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      {editingMedication ? 'Güncelle' : 'Ekle'}
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
                  İlaç Ara
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="İlaç adı veya açıklama ile ara..."
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                />
              </div>
            </div>
          </div>

          {/* Medications List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                İlaçlar ({filteredMedications.length})
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {filteredMedications.map((medication) => (
                <li key={medication.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-gray-900">
                          {medication.name}
                        </h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(medication)}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                          >
                            Düzenle
                          </button>
                          <button
                            onClick={() => handleDelete(medication.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Doz:</span>
                          <span className="ml-1 text-sm text-gray-900">{medication.dosage}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Sıklık:</span>
                          <span className="ml-1 text-sm text-gray-900">{medication.frequency}</span>
                        </div>
                      </div>
                      {medication.description && (
                        <div className="mt-2">
                          <span className="text-sm font-medium text-gray-500">Açıklama:</span>
                          <p className="mt-1 text-sm text-gray-900">{medication.description}</p>
                        </div>
                      )}
                      {medication.sideEffects && (
                        <div className="mt-2">
                          <span className="text-sm font-medium text-gray-500">Yan Etkiler:</span>
                          <p className="mt-1 text-sm text-gray-900">{medication.sideEffects}</p>
                        </div>
                      )}
                      {medication.contraindications && (
                        <div className="mt-2">
                          <span className="text-sm font-medium text-gray-500">Kontrendikasyonlar:</span>
                          <p className="mt-1 text-sm text-gray-900">{medication.contraindications}</p>
                        </div>
                      )}
                      <div className="mt-2 text-xs text-gray-400">
                        Eklendi: {new Date(medication.createdAt).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {filteredMedications.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-500">
                İlaç bulunamadı
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}