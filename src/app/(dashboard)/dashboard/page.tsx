import { Card } from '@/app/components/ui/card';
import { BookOpenCheck, CheckCircle2, Target, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Anasayfa</h1>
        <p className="text-gray-500">Hoş geldin! İşte senin için hazırladığımız genel bakış.</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Tamamlanan Dersler</h3>
            <BookOpenCheck className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-3xl font-bold">12</p>
          <p className="text-xs text-gray-500 mt-1">+2 son hafta</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Ortalama Başarı</h3>
             <Target className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-3xl font-bold">%84</p>
          <p className="text-xs text-green-600 mt-1">+%5 artış</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Tamamlanan Sınavlar</h3>
            <CheckCircle2 className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-3xl font-bold">8</p>
           <p className="text-xs text-gray-500 mt-1">Bu ay</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Haftalık İlerleme</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-3xl font-bold">+%15</p>
          <p className="text-xs text-gray-500 mt-1">Geçen haftaya göre</p>
        </Card>
      </div>
      
      {/* Diğer Bileşenler */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
            <div className="p-6">
                <h3 className="text-lg font-semibold">Son Aktiviteler</h3>
                {/* Buraya bir aktivite listesi bileşeni gelebilir */}
            </div>
        </Card>
        <Card>
            <div className="p-6">
                 <h3 className="text-lg font-semibold">Önerilen Dersler</h3>
                 {/* Buraya önerilen dersler bileşeni gelebilir */}
            </div>
        </Card>
      </div>
    </div>
  );
}