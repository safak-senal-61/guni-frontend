'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background SVG */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          {/* Floating Circles */}
          <circle cx="200" cy="200" r="60" fill="#3b82f6" fillOpacity="0.1" className="animate-pulse">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 20,10; 0,0"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>
          
          <circle cx="800" cy="300" r="40" fill="#8b5cf6" fillOpacity="0.15" className="animate-pulse">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -15,20; 0,0"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>
          
          <circle cx="150" cy="700" r="30" fill="#06b6d4" fillOpacity="0.2">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 10,-15; 0,0"
              dur="7s"
              repeatCount="indefinite"
            />
          </circle>
          
          <circle cx="900" cy="800" r="50" fill="#10b981" fillOpacity="0.1">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -20,-10; 0,0"
              dur="9s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Geometric Shapes */}
          <polygon points="100,100 150,50 200,100 150,150" fill="#f59e0b" fillOpacity="0.1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 150 100; 360 150 100"
              dur="20s"
              repeatCount="indefinite"
            />
          </polygon>
          
          <polygon points="750,150 800,100 850,150 800,200" fill="#ef4444" fillOpacity="0.1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 800 150; -360 800 150"
              dur="25s"
              repeatCount="indefinite"
            />
          </polygon>
          
          {/* Flowing Lines */}
          <path d="M0,500 Q250,400 500,500 T1000,500" stroke="#3b82f6" strokeWidth="2" fill="none" strokeOpacity="0.2">
            <animate
              attributeName="stroke-dasharray"
              values="0,1000; 1000,0; 0,1000"
              dur="15s"
              repeatCount="indefinite"
            />
          </path>
          
          <path d="M0,300 Q300,200 600,300 T1000,300" stroke="#8b5cf6" strokeWidth="1.5" fill="none" strokeOpacity="0.15">
            <animate
              attributeName="stroke-dasharray"
              values="0,800; 800,0; 0,800"
              dur="12s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Hexagons */}
          <polygon points="400,50 430,70 430,110 400,130 370,110 370,70" fill="#06b6d4" fillOpacity="0.1">
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1; 1.2; 1"
              dur="4s"
              repeatCount="indefinite"
            />
          </polygon>
          
          <polygon points="600,850 630,870 630,910 600,930 570,910 570,870" fill="#10b981" fillOpacity="0.15">
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1; 0.8; 1"
              dur="5s"
              repeatCount="indefinite"
            />
          </polygon>
        </svg>
      </div>
      
      <div className="max-w-md mx-auto text-center relative z-10">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-gray-900 mb-4 drop-shadow-sm">
            404
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Sayfa Bulunamadı
          </h2>
          <p className="text-gray-600">
            Aradığınız sayfa mevcut değil.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Ana Sayfaya Dön
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="block w-full px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            Geri Git
          </button>
        </div>
      </div>
    </div>
  );
}