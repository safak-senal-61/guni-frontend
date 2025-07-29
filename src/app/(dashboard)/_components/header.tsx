'use client';

import { Bell, Search } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { UserNav } from './user-nav'; // Bu bileşeni bir sonraki adımda oluşturacağız

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Derslerde veya içeriklerde ara..."
          className="w-full max-w-md rounded-lg bg-gray-100 pl-8"
        />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Bildirimler</span>
        </Button>
        <UserNav />
      </div>
    </header>
  );
}