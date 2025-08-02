import { GraduationCap, Briefcase, Code, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <GraduationCap className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GÜNÜBİRLİK DOZ
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="px-5 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors">
                Giriş Yap
              </Link>
              <Link href="/signup" className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                Ücretsiz Başla
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Hakkımda</h1>
          <p className="text-xl text-gray-600">GÜNÜBİRLİK DOZ projesinin arkasındaki geliştirici.</p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex-shrink-0 shadow-md border-4 border-white">
              {/* Placeholder for an image */}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800">Şafak Şenal</h2>
              <p className="text-lg text-blue-600 font-semibold mt-1">Full Stack Developer</p>
              <p className="text-gray-600 mt-4">
                Merhaba! Ben Şafak, bu platformun geliştiricisiyim. Teknolojiye ve eğitime olan tutkumla, öğrenmeyi daha kişisel, etkili ve eğlenceli hale getirmek için yola çıktım. Amacım, her öğrencinin kendi potansiyelini en üst düzeye çıkarabileceği akıllı bir öğrenme ortamı yaratmaktır.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Teknik Yeteneklerim</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Frontend</p>
                <p className="text-sm text-gray-600">Next.js, React, TypeScript</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Backend</p>
                <p className="text-sm text-gray-600">NestJS, Node.js</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Veritabanı</p>
                <p className="text-sm text-gray-600">PostgreSQL, Prisma</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">AI & Makine Öğrenmesi</p>
                <p className="text-sm text-gray-600">Google AI, LangChain</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center text-gray-600">
            <p className="flex items-center justify-center gap-2">
              <Heart className="text-red-500" size={20} />
              <span>Açık kaynak kodlu yazılımları ve öğrenme topluluklarını destekliyorum.</span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} GÜNÜBİRLİK DOZ. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}