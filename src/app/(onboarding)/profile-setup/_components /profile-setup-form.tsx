// src/app/(onboarding)/onboarding/profile-setup/_components/profile-setup-form.tsx

"use client"; // Form etkileşimi için

import { useState } from "react";
import { User, Camera, ArrowRight } from "lucide-react";

// Bu bileşenleri kendi UI kütüphanenizden (örn: Shadcn/UI) veya özel olarak oluşturabilirsiniz.
// Örnek olması açısından temel yapılarını gösteriyorum.
const Input = ({ icon: Icon, ...props }: any) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <input
      {...props}
      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
    />
  </div>
);

const Button = ({ children, ...props }: any) => (
  <button
    {...props}
    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
  >
    {children}
  </button>
);


export function ProfileSetupForm() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarPreview(URL.createObjectURL(file));
      // Burada dosyayı sunucuya yükleme mantığını ekleyebilirsiniz.
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemleri
    console.log("Profil kaydedildi!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar Yükleyici */}
      <div className="flex flex-col items-center space-y-4">
        <label htmlFor="avatar-upload" className="cursor-pointer group">
          <div className="relative w-28 h-28 rounded-full border-2 border-dashed border-gray-300 group-hover:border-indigo-500 transition-all flex items-center justify-center">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full rounded-full object-cover" />
            ) : (
              <div className="text-center text-gray-400 group-hover:text-indigo-600 transition-colors">
                <Camera className="h-8 w-8 mx-auto" />
                <span className="text-xs mt-1 block">Fotoğraf Ekle</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full flex items-center justify-center transition-all">
              <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </label>
        <input
          id="avatar-upload"
          name="avatar"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </div>

      {/* İsim ve Soyisim Alanı */}
      <div className="space-y-4">
         <Input
          id="displayName"
          name="displayName"
          type="text"
          placeholder="Görünen Adınız"
          required
          icon={User}
        />
         <Input
          id="username"
          name="username"
          type="text"
          placeholder="Kullanıcı Adınız"
          required
          icon={User} // Farklı bir ikon da kullanabilirsiniz.
        />
      </div>

      {/* Kaydet Butonu */}
      <div className="pt-4">
        <Button type="submit">
          Kaydet ve Devam Et
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}