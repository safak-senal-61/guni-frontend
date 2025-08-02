'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, BarChart3, Settings, LifeBuoy, GraduationCap, Search, ArrowRight, PlayCircle } from 'lucide-react';
import { cn } from '@/app/lib/utils'; // Assuming this utility function exists

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
}

// Derslerim sayfası için sahte (mock) veri
const mockCourses = [
  {
    id: 1,
    title: 'JavaScript Temelleri',
    description: 'Modern web geliştirme için JavaScript dilinin temellerini öğrenin.',
    progress: 75,
    totalModules: 12,
    completedModules: 9,
    image: 'https://placehold.co/600x400/2563EB/ffffff?text=JS',
  },
  {
    id: 2,
    title: 'CSS ve Animasyonlar',
    description: 'Web sitelerinizi şık ve interaktif hale getirmek için CSS ve animasyon teknikleri.',
    progress: 40,
    totalModules: 10,
    completedModules: 4,
    image: 'https://placehold.co/600x400/2563EB/ffffff?text=CSS',
  },
  {
    id: 3,
    title: 'React ile Bileşen Geliştirme',
    description: 'React ile yeniden kullanılabilir ve modern bileşenler oluşturmayı öğrenin.',
    progress: 90,
    totalModules: 8,
    completedModules: 7,
    image: 'https://placehold.co/600x400/2563EB/ffffff?text=React',
  },
  {
    id: 4,
    title: 'Veri Yapıları ve Algoritmalar',
    description: 'Programlamanın temelini oluşturan veri yapıları ve algoritmalar.',
    progress: 10,
    totalModules: 15,
    completedModules: 2,
    image: 'https://placehold.co/600x400/2563EB/ffffff?text=Algoritma',
  },
  {
    id: 5,
    title: 'Python ile Makine Öğrenmesi',
    description: 'Python kütüphanelerini kullanarak makine öğrenmesi modelleri oluşturun.',
    progress: 60,
    totalModules: 18,
    completedModules: 11,
    image: 'https://placehold.co/600x400/2563EB/ffffff?text=Python',
  },
];

const CoursesPage = () => {
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
            <h1 className="text-4xl font-bold tracking-tight">Derslerim</h1>
            <p className="mt-2 text-lg text-gray-500">
              Devam ettiğin tüm dersler ve ilerlemelerin burada.
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockCourses.map((course) => (
              <div
                key={course.id}
                className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="relative h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="absolute h-full rounded-full bg-blue-500 transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="ml-4 text-sm font-medium text-gray-600">
                      {course.progress}%
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    {course.completedModules} / {course.totalModules} modül tamamlandı
                  </p>
                  <Link href={`/courses/${course.id}`} className="mt-4 inline-flex items-center font-medium text-blue-600 transition-transform duration-300 hover:translate-x-1">
                    Derse Devam Et <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayCircle className="h-16 w-16 text-white" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoursesPage;
