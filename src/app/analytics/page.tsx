'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, BarChart3, Settings, LifeBuoy, GraduationCap, Search, TrendingUp, TrendingDown, Clock, CheckCircle } from 'lucide-react';
import { cn } from '@/app/lib/utils'; // Assuming this utility function exists
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Kullanıcının sağladığı Sidebar bileşeni
const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Anasayfa', icon: Home },
    { href: '/courses', label: 'Derslerim', icon: BookOpen },
    { href: '/analytics', label: 'İstatistikler', icon: BarChart3 },
    { href: '/settings', label: 'Ayarlar', icon: Settings },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r bg-white md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <GraduationCap className="h-6 w-6 text-blue-600" />
          <span>GÜNÜBİRLİK DOZ</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900",
              { "bg-gray-100 text-gray-900 font-semibold": pathname === item.href }
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4 border-t">
        <Link href="/support" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900">
          <LifeBuoy className="h-4 w-4" />
          Destek
        </Link>
      </div>
    </aside>
  );
};

// Sahte (mock) veri
const analyticsData = {
  totalCourses: 12,
  completedCourses: 8,
  averageScore: 84,
  monthlyProgress: [
    { month: 'Ocak', progress: 65 },
    { month: 'Şubat', progress: 70 },
    { month: 'Mart', progress: 75 },
    { month: 'Nisan', progress: 80 },
    { month: 'Mayıs', progress: 85 },
  ],
};

const completionData = [
  { name: 'Tamamlandı', value: analyticsData.completedCourses },
  { name: 'Devam Ediyor', value: analyticsData.totalCourses - analyticsData.completedCourses },
];

const AnalyticsPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header/Navbar */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Derslerde veya içeriklerde ara..."
              className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="ml-auto flex items-center gap-4">
            {/* Bildirimler ve Kullanıcı Avatarları buraya eklenebilir */}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight">İstatistikler</h1>
            <p className="mt-2 text-lg text-gray-500">
              Genel ilerlemeniz ve başarılarınızın detaylı dökümü.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Toplam Ders Sayısı */}
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Toplam Ders</span>
                <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
              <p className="mt-4 text-4xl font-bold">{analyticsData.totalCourses}</p>
            </div>

            {/* Tamamlanan Ders Sayısı */}
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Tamamlanan Ders</span>
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <p className="mt-4 text-4xl font-bold">{analyticsData.completedCourses}</p>
            </div>

            {/* Ortalama Başarı */}
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Ortalama Puan</span>
                <BarChart3 className="h-6 w-6 text-purple-500" />
              </div>
              <p className="mt-4 text-4xl font-bold">{analyticsData.averageScore}%</p>
            </div>

            {/* Haftalık İlerleme */}
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Haftalık Oran</span>
                <TrendingUp className="h-6 w-6 text-orange-500" />
              </div>
              <p className="mt-4 text-4xl font-bold">+{analyticsData.monthlyProgress[4].progress}%</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Aylık İlerleme Grafiği */}
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Aylık Ortalama Puan</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#3B82F6" barSize={40} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;
