'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-bounce delay-500"></div>
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Sayfa Bulunamadı
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönebilir veya arama yapabilirsiniz.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="w-64 h-64 mx-auto relative">
            <svg
              className="w-full h-full text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Ana Sayfaya Dön
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Geri Git
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Yardıma mı ihtiyacınız var?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Eğer bu sayfaya bir bağlantıdan geldiyseniz, lütfen site yöneticisine bildirin.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Hata Kodu: 404
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              Sayfa Bulunamadı
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}