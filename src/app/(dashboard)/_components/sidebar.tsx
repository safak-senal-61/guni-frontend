'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, BarChart3, Settings, LifeBuoy, GraduationCap } from 'lucide-react';
import { cn } from '@/app/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Anasayfa', icon: Home },
  { href: '/courses', label: 'Derslerim', icon: BookOpen },
  { href: '/analytics', label: 'İstatistikler', icon: BarChart3 },
  { href: '/settings', label: 'Ayarlar', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

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