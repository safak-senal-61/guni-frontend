import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🎓</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GÜNÜBİRLİK DOZ
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Özellikler</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">Hakkında</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">İletişim</a>
            </nav>
            <div className="flex space-x-4">
              <Link href="/login">
                <button className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors">
                  Giriş Yap
                </button>
              </Link>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                Başla
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
                🤖 AI Destekli Eğitim Platformu
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GÜNÜBİRLİK DOZ
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Yapay zeka teknolojileri ile desteklenen modern eğitim yönetim sistemi. 
              Kişiselleştirilmiş öğrenme deneyimi için tasarlandı.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Ücretsiz Başla
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                Demo İzle
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🌟 Özellikler</h2>
            <p className="text-xl text-gray-600">Modern eğitim için gelişmiş AI teknolojileri</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Destekli İçerik Analizi</h3>
              <p className="text-gray-600">Google Gemini 2.0 Flash ile otomatik özetleme ve içerik analizi</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Akıllı Quiz Sistemi</h3>
              <p className="text-gray-600">LangGraph ile otomatik soru oluşturma ve değerlendirme</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl">👨‍🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Kişiselleştirilmiş Öğrenme</h3>
              <p className="text-gray-600">LangChain ile özel öneriler ve bireysel öğrenme yolları</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🔐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Güvenli Kimlik Doğrulama</h3>
              <p className="text-gray-600">JWT Bearer Token sistemi ile güvenli erişim kontrolü</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rol Bazlı Erişim</h3>
              <p className="text-gray-600">Öğrenci, Öğretmen, Veli ve Admin rolleri ile organize sistem</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gelişmiş Analitik</h3>
              <p className="text-gray-600">Detaylı performans raporları ve öğrenme analitiği</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🛠️ Teknoloji Yığını</h2>
            <p className="text-xl text-gray-600">Modern ve güvenilir teknolojilerle geliştirildi</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {['NestJS', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Google AI', 'LangChain', 'LangGraph'].map((tech) => (
              <span key={tech} className="px-6 py-3 bg-white rounded-full shadow-md text-gray-700 font-medium hover:shadow-lg transition-shadow">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Eğitimde AI Devrimi Başlıyor
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            GÜNÜBİRLİK DOZ ile öğrenme deneyiminizi bir üst seviyeye taşıyın
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            Hemen Başla
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">🎓</span>
                </div>
                <span className="text-xl font-bold">GÜNÜBİRLİK DOZ</span>
              </div>
              <p className="text-gray-400">AI destekli modern eğitim platformu</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Ürün</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Özellikler</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fiyatlandırma</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Şirket</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kariyer</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Destek</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Yardım Merkezi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gizlilik</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GÜNÜBİRLİK DOZ. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
