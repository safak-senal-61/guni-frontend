import Link from 'next/link';
import { ArrowRight, BrainCircuit, PenSquare, ShieldCheck, Users, BarChart3, GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white text-gray-800 antialiased">
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
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Özellikler</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Nasıl Çalışır?</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Fiyatlandırma</a>
            </nav>
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

      <main>
        {/* Hero Section */}
        <section className="relative bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 mb-6 shadow-sm">
              🤖 AI Destekli Kişiselleştirilmiş Eğitim Platformu
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Öğrenme Potansiyelinizi
              <br/>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Yapay Zeka
              </span> ile Keşfedin
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              GÜNÜBİRLİK DOZ, her öğrencinin benzersiz öğrenme stilini anlar ve kişiye özel eğitim içerikleri sunarak başarıyı en üst düzeye çıkarır.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Hemen Ücretsiz Başlayın <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="#how-it-works" className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                Daha Fazla Bilgi Al
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Eğitimin Geleceği Burada</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Modern eğitim için geliştirilmiş, yapay zeka destekli güçlü araçlar.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: BrainCircuit, title: "AI Destekli İçerik Analizi", description: "Google Gemini ile metinleri, videoları ve dosyaları otomatik özetleyin, anahtar noktaları çıkarın." },
                { icon: PenSquare, title: "Akıllı Sınav Sistemi", description: "LangGraph ile içeriklerinizden saniyeler içinde zorluk seviyesine göre sınavlar ve sorular oluşturun." },
                { icon: Users, title: "Rol Bazlı Erişim Kontrolü", description: "Öğrenci, öğretmen, veli ve yönetici rolleri ile organize ve güvenli bir sistem yönetimi sağlayın." },
                { icon: ShieldCheck, title: "Güvenli Kimlik Doğrulama", description: "JWT Bearer Token sistemi ile tüm kullanıcı verilerinin güvende olduğundan emin olun." },
                { icon: BarChart3, title: "Gelişmiş Analitik ve Raporlama", description: "Öğrenci gelişimini detaylı raporlar ve görsel analitik araçları ile yakından takip edin." },
                { icon: GraduationCap, title: "Kişiselleştirilmiş Öğrenme Yolları", description: "LangChain ile her öğrencinin zayıf yönlerine ve ilgi alanlarına özel içerik önerileri sunun." }
              ].map((feature, i) => (
                <div key={i} className="p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-5">
                    <feature.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">3 Adımda Başarıya Ulaşın</h2>
                <p className="text-xl text-gray-600">Platformumuzu kullanmak işte bu kadar kolay.</p>
              </div>
              <div className="relative">
                  <div className="absolute left-1/2 -translate-x-1/2 top-10 h-full w-0.5 bg-gray-200 hidden md:block" aria-hidden="true"></div>
                  <div className="space-y-12 md:space-y-0">
                      {[
                          { title: "Hesabınızı Oluşturun", description: "Birkaç saniye içinde ücretsiz kaydolun ve öğrenci profilinizi kişiselleştirin." },
                          { title: "AI Analizini Başlatın", description: "Mevcut bilgi seviyenizi ölçmek için yapay zeka destekli başlangıç testimizi çözün." },
                          { title: "Kişiselleştirilmiş Yolculuğa Başlayın", description: "Size özel hazırlanan dersleri, sınavları ve içerikleri keşfederek öğrenmeye başlayın." }
                      ].map((step, i) => (
                          <div key={i} className="md:flex items-center md:space-x-8 text-center md:text-left">
                              <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:order-2'}`}>
                                  <div className="flex items-center justify-center md:justify-start mb-2">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl shadow-lg">
                                        {i + 1}
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-900 ml-4">{step.title}</h3>
                                  </div>
                                  <p className="text-gray-600">{step.description}</p>
                              </div>
                              <div className={`md:w-1/2 ${i % 2 !== 0 && 'md:order-1'}`}>
                                  {/* İsteğe bağlı olarak buraya bir illüstrasyon eklenebilir. */}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-30 animate-pulse"></div>
                <h2 className="text-4xl font-bold text-white mb-6 relative z-10">
                    Eğitimde Yapay Zeka Devrimine Katılın
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
                    GÜNÜBİRLİK DOZ ile öğrenme deneyiminizi bir üst seviyeye taşıyın. potansiyelinizi bugün ortaya çıkarın.
                </p>
                <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative z-10">
                    Ücretsiz Kaydol <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="text-white h-5 w-5" />
                </div>
                <span className="text-xl font-bold">GÜNÜBİRLİK DOZ</span>
              </div>
              <p className="text-gray-500">AI destekli modern eğitim platformu.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-800">Ürün</h3>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#features" className="hover:text-blue-600 transition-colors">Özellikler</a></li>
                <li><a href="#pricing" className="hover:text-blue-600 transition-colors">Fiyatlandırma</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-800">Şirket</h3>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Kariyer</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-800">Destek</h3>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Yardım Merkezi</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">İletişim</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Gizlilik Politikası</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} GÜNÜBİRLİK DOZ. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}