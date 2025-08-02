// src/app/(onboarding)/onboarding/profile-setup/page.tsx

import { ProfileSetupForm } from "@/app/(onboarding)/profile-setup/profile-setup/_components/profile-setup-form";
import { MoveRight } from "lucide-react"; // Şık bir ikon için

export default function ProfileSetupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto">
        {/* Başlık Alanı */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
            Profilinizi Oluşturalım
          </h1>
          <p className="mt-3 text-base text-gray-500">
            Sizi daha yakından tanımamız için birkaç adım kaldı.
          </p>
        </div>

        {/* Form Komponenti */}
        <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300">
          <ProfileSetupForm />
        </div>

        {/* Yardım veya İletişim Alanı (İsteğe bağlı) */}
        <div className="text-center mt-8">
          <a
            href="/help"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 inline-flex items-center group"
          >
            Yardıma mı ihtiyacınız var?
            <MoveRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}