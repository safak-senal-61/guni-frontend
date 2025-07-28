'use client';

import { useState } from 'react';
import Link from 'next/link';
import LoginForm from '@/components/auth/login-form';
import RegisterForm from '@/components/auth/register-form';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo and Back Button */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ana Sayfaya Dön
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">🎓</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GÜNÜBİRLİK DOZ
            </h1>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Hoş Geldiniz!' : 'Hesap Oluşturun'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Hesabınıza giriş yapın' : 'Yeni hesabınızı oluşturun'}
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                isLogin
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Giriş Yap
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                !isLogin
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Kayıt Ol
            </button>
          </div>
          
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
        
        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 GÜNÜBİRLİK DOZ. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </div>
  );
}