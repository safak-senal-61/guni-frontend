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

interface Appointment {
  id: string;
  patientId: string;
  patient: Patient;
  appointmentDate: string;
  appointmentTime: string;
  duration: number;
  reason: string;
  notes: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  createdAt: string;
  updatedAt: string;
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [formData, setFormData] = useState({
    patientId: '',
    appointmentDate: '',
    appointmentTime: '',
    duration: 30,
    reason: '',
    notes: '',
    status: 'scheduled' as 'scheduled' | 'completed' | 'cancelled' | 'no-show'
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

        // Fetch appointments
        const appointmentsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/appointments`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (appointmentsResponse.ok) {
          const appointmentsData = await appointmentsResponse.json();
          setAppointments(appointmentsData);
        } else {
          setError('Randevular yüklenemedi');
        }

        // Fetch patients for dropdown
        const patientsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/patients`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (patientsResponse.ok) {
          const patientsData = await patientsResponse.json();
          setPatients(patientsData);
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
      const url = editingAppointment 
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/appointments/${editingAppointment.id}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/appointments`;
      
      const method = editingAppointment ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const appointmentData = await response.json();
        
        if (editingAppointment) {
          setAppointments(appointments.map(appointment => 
            appointment.id === editingAppointment.id ? appointmentData : appointment
          ));
          setSuccess('Randevu başarıyla güncellendi');
        } else {
          setAppointments([...appointments, appointmentData]);
          setSuccess('Randevu başarıyla eklendi');
        }
        
        setFormData({
          patientId: '',
          appointmentDate: '',
          appointmentTime: '',
          duration: 30,
          reason: '',
          notes: '',
          status: 'scheduled'
        });
        setShowAddForm(false);
        setEditingAppointment(null);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Randevu kaydedilirken hata oluştu');
      }
    } catch (err) {
      setError('Randevu kaydedilirken hata oluştu');
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      patientId: appointment.patientId,
      appointmentDate: appointment.appointmentDate.split('T')[0],
      appointmentTime: appointment.appointmentTime,
      duration: appointment.duration,
      reason: appointment.reason,
      notes: appointment.notes,
      status: appointment.status
    });
    setShowAddForm(true);
  };

  const handleDelete = async (appointmentId: string) => {
    if (!confirm('Bu randevuyu silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/appointments/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
        setSuccess('Randevu başarıyla silindi');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Randevu silinirken hata oluştu');
      }
    } catch (err) {
      setError('Randevu silinirken hata oluştu');
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Planlandı';
      case 'completed':
        return 'Tamamlandı';
      case 'cancelled':
        return 'İptal Edildi';
      case 'no-show':
        return 'Gelmedi';
      default:
        return status;
    }
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
              <h1 className="text-xl font-semibold text-gray-900">Randevu Yönetimi</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setShowAddForm(true);
                  setEditingAppointment(null);
                  setFormData({
                    patientId: '',
                    appointmentDate: '',
                    appointmentTime: '',
                    duration: 30,
                    reason: '',
                    notes: '',
                    status: 'scheduled'
                  });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Yeni Randevu Ekle
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
                  {editingAppointment ? 'Randevu Düzenle' : 'Yeni Randevu Ekle'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
                      Hasta *
                    </label>
                    <select
                      id="patientId"
                      required
                      value={formData.patientId}
                      onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    >
                      <option value="">Hasta seçiniz</option>
                      {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                          {patient.firstName} {patient.lastName} - {patient.email}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">
                        Randevu Tarihi *
                      </label>
                      <input
                        type="date"
                        id="appointmentDate"
                        required
                        value={formData.appointmentDate}
                        onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">
                        Randevu Saati *
                      </label>
                      <input
                        type="time"
                        id="appointmentTime"
                        required
                        value={formData.appointmentTime}
                        onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                        Süre (dakika) *
                      </label>
                      <input
                        type="number"
                        id="duration"
                        required
                        min="15"
                        max="240"
                        step="15"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Durum *
                      </label>
                      <select
                        id="status"
                        required
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as Appointment['status'] })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      >
                        <option value="scheduled">Planlandı</option>
                        <option value="completed">Tamamlandı</option>
                        <option value="cancelled">İptal Edildi</option>
                        <option value="no-show">Gelmedi</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                      Randevu Nedeni *
                    </label>
                    <input
                      type="text"
                      id="reason"
                      required
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      placeholder="Kontrol, muayene, tedavi vb."
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Notlar
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingAppointment(null);
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      {editingAppointment ? 'Güncelle' : 'Ekle'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                    Randevu Ara
                  </label>
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Hasta adı veya randevu nedeni ile ara..."
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  />
                </div>
                <div>
                  <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">
                    Durum Filtresi
                  </label>
                  <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  >
                    <option value="">Tüm Durumlar</option>
                    <option value="scheduled">Planlandı</option>
                    <option value="completed">Tamamlandı</option>
                    <option value="cancelled">İptal Edildi</option>
                    <option value="no-show">Gelmedi</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Randevular ({filteredAppointments.length})
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <li key={appointment.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <h4 className="text-lg font-medium text-gray-900">
                            {appointment.patient.firstName} {appointment.patient.lastName}
                          </h4>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(appointment)}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                          >
                            Düzenle
                          </button>
                          <button
                            onClick={() => handleDelete(appointment.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Tarih:</span>
                          <span className="ml-1 text-sm text-gray-900">
                            {new Date(appointment.appointmentDate).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Saat:</span>
                          <span className="ml-1 text-sm text-gray-900">{appointment.appointmentTime}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Süre:</span>
                          <span className="ml-1 text-sm text-gray-900">{appointment.duration} dakika</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm font-medium text-gray-500">Randevu Nedeni:</span>
                        <span className="ml-1 text-sm text-gray-900">{appointment.reason}</span>
                      </div>
                      {appointment.notes && (
                        <div className="mt-2">
                          <span className="text-sm font-medium text-gray-500">Notlar:</span>
                          <p className="mt-1 text-sm text-gray-900">{appointment.notes}</p>
                        </div>
                      )}
                      <div className="mt-2 text-xs text-gray-400">
                        Oluşturulma: {new Date(appointment.createdAt).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {filteredAppointments.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-500">
                Randevu bulunamadı
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}