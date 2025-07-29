# 📚 Günlük Doz Takip Sistemi - Frontend

Modern ve kullanıcı dostu bir günlük doz takip sistemi. Bu proje, öğrencilerin günlük öğrenme dozlarını takip etmelerine, ilerlemelerini görüntülemelerine ve eğitim içeriklerini yönetmelerine olanak tanır.

## ✨ Özellikler

### 🔐 Kimlik Doğrulama
- Güvenli kullanıcı kaydı ve girişi
- JWT tabanlı kimlik doğrulama
- E-posta doğrulama sistemi
- Şifre sıfırlama özelliği
- Otomatik token yenileme

### 📊 Dashboard
- Kişiselleştirilmiş kullanıcı paneli
- Günlük ilerleme takibi
- İstatistik görüntüleme
- Hızlı erişim menüleri

### 🎨 Modern UI/UX
- Responsive tasarım (mobil uyumlu)
- Dark/Light tema desteği
- Smooth animasyonlar
- Kullanıcı dostu arayüz
- Türkçe dil desteği

### 🛠️ Teknik Özellikler
- Server-side rendering (SSR)
- Client-side routing
- Form validasyonu
- Error handling
- Loading states
- 404 sayfası

## 🚀 Teknolojiler

### Frontend Framework
- **Next.js 15.4.4** - React framework with SSR
- **React 19.1.0** - UI library
- **TypeScript** - Type safety

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Lucide React** - Icon library
- **Class Variance Authority** - Component variants

### State Management & Forms
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **TanStack Query** - Server state management

### HTTP Client
- **Axios** - HTTP client for API calls

## 📋 Gereksinimler

- Node.js 18.0 veya üzeri
- npm, yarn, pnpm veya bun
- Backend API (localhost:3000)

## 🛠️ Kurulum

### 1. Projeyi klonlayın
```bash
git clone <repository-url>
cd guni-frontend
```

### 2. Bağımlılıkları yükleyin
```bash
npm install
# veya
yarn install
# veya
pnpm install
# veya
bun install
```

### 3. Geliştirme sunucusunu başlatın
```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
# veya
bun dev
```

### 4. Tarayıcıda açın
[http://localhost:3000](http://localhost:3000) adresini ziyaret edin.

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Kimlik doğrulama sayfaları
│   ├── dashboard/         # Dashboard sayfası
│   ├── login/             # Giriş sayfası
│   ├── globals.css        # Global stiller
│   ├── layout.tsx         # Ana layout
│   ├── not-found.tsx      # 404 sayfası
│   └── page.tsx           # Ana sayfa
├── components/            # Yeniden kullanılabilir bileşenler
│   ├── auth/              # Kimlik doğrulama bileşenleri
│   └── ui/                # UI bileşenleri
└── lib/                   # Yardımcı fonksiyonlar
    ├── api.ts             # API client
    └── utils.ts           # Utility fonksiyonlar
```

## 🔧 Kullanılabilir Komutlar

```bash
# Geliştirme sunucusunu başlat
npm run dev

# Production build oluştur
npm run build

# Production sunucusunu başlat
npm run start

# Linting kontrolü
npm run lint
```

## 🌐 API Entegrasyonu

Proje, `localhost:3000` adresinde çalışan NestJS backend API'si ile entegre çalışır. API endpoints:

- `POST /auth/signup` - Kullanıcı kaydı
- `POST /auth/signin` - Kullanıcı girişi
- `POST /auth/logout` - Çıkış yapma
- `GET /auth/me` - Kullanıcı bilgileri
- `POST /auth/refresh` - Token yenileme
- `POST /auth/forgot-password` - Şifre sıfırlama
- `POST /auth/verify-email` - E-posta doğrulama

## 🎯 Kullanım

### Yeni Kullanıcı Kaydı
1. Ana sayfada "Kayıt Ol" butonuna tıklayın
2. Gerekli bilgileri doldurun (Ad, Soyad, E-posta, Şifre)
3. E-posta doğrulama linkini kontrol edin
4. Hesabınızı doğruladıktan sonra giriş yapın

### Giriş Yapma
1. "Giriş Yap" butonuna tıklayın
2. E-posta ve şifrenizi girin
3. Dashboard'a yönlendirileceksiniz

### Dashboard Kullanımı
- Günlük ilerlemenizi görüntüleyin
- Profil ayarlarınızı düzenleyin
- Doz takibi yapın
- Raporlarınızı inceleyin

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Kod Standartları

- TypeScript kullanın
- ESLint kurallarına uyun
- Tailwind CSS sınıflarını kullanın
- Component'leri modüler tutun
- Anlamlı commit mesajları yazın

## 🐛 Hata Bildirimi

Bir hata bulduysanız, lütfen aşağıdaki bilgileri içeren bir issue oluşturun:
- Hatanın açıklaması
- Hatayı yeniden oluşturma adımları
- Beklenen davranış
- Ekran görüntüleri (varsa)
- Tarayıcı ve işletim sistemi bilgileri

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

```
MIT License

Copyright (c) 2024 Günlük Doz Takip Sistemi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👥 Ekip

- **Frontend Developer** - Modern React/Next.js uygulaması
- **UI/UX Designer** - Kullanıcı deneyimi tasarımı
- **Backend Developer** - NestJS API geliştirme

## 📞 İletişim

Sorularınız için:
- 📧 E-posta: [email@example.com]
- 🐛 Issues: GitHub Issues sayfası
- 💬 Discussions: GitHub Discussions

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

**Günlük Doz Takip Sistemi** ile öğrenme yolculuğunuzu takip edin! 🚀
