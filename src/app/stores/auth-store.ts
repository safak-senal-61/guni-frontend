import { create } from 'zustand';
import { auth as apiAuth } from '@/app/lib/api';
import { AuthDto, SignupDto } from '@/app/types';

// API'den dönen kullanıcı verisi için tip tanımı
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

// Login işleminden dönen yanıtın tipini tanımlıyoruz
interface LoginResponse {
  user: User;
  accessToken: string;
  // refreshToken?: string; 
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: AuthDto) => Promise<void>;
  signup: (data: SignupDto) => Promise<void>;
  logout: () => void;
  setUserAndToken: (user: User, token: string) => void;
  clearAuth: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (data) => {
    set({ isLoading: true, error: null });
    try {
      console.log('[AuthStore] Login işlemi başlatıldı...');
      const response = await apiAuth.signin(data);
      
      // API yanıtının tüm yapısını detaylı şekilde loglayalım
      console.log('[AuthStore] Tam API Yanıtı:', response);
      console.log('[AuthStore] Response Data:', response.data);
      console.log('[AuthStore] Response Data Keys:', Object.keys(response.data || {}));
      console.log('[AuthStore] Response Data Type:', typeof response.data);
      
      // Gelen veriyi kontrol edelim
      const responseData = response.data;
      
      // Farklı olası response yapılarını kontrol edelim
      let user: User;
      let accessToken: string;
      
      // Senaryo 1: Direkt user ve accessToken alanları varsa
      if (responseData.user && responseData.accessToken) {
        user = responseData.user;
        accessToken = responseData.accessToken;
        console.log('[AuthStore] Senaryo 1: user ve accessToken direkt bulundu');
      }
      // Senaryo 2: token yerine accessToken alanı varsa
      else if (responseData.user && responseData.token) {
        user = responseData.user;
        accessToken = responseData.token;
        console.log('[AuthStore] Senaryo 2: user ve token alanı bulundu');
      }
      // Senaryo 3: Kullanıcı bilgileri direkt response.data'da, token ayrı alanda
      else if (responseData.id && responseData.email && (responseData.accessToken || responseData.token)) {
        user = {
          id: responseData.id,
          email: responseData.email,
          firstName: responseData.firstName || '',
          lastName: responseData.lastName || '',
          role: responseData.role || 'user'
        };
        accessToken = responseData.accessToken || responseData.token;
        console.log('[AuthStore] Senaryo 3: Kullanıcı bilgileri düz response\'da bulundu');
      }
      // Senaryo 4: Data bir üst seviyede wrap edilmiş olabilir
      else if (responseData.data && responseData.data.user && (responseData.data.accessToken || responseData.data.token)) {
        user = responseData.data.user;
        accessToken = responseData.data.accessToken || responseData.data.token;
        console.log('[AuthStore] Senaryo 4: Data bir üst seviyede wrap edilmiş');
      }
      // Senaryo 5: JWT token decode edilebilir mi kontrol edelim
      else if (responseData.accessToken || responseData.token) {
        accessToken = responseData.accessToken || responseData.token;
        // JWT token'dan user bilgisini çıkarmaya çalışalım (eğer mümkünse)
        try {
          const tokenParts = accessToken.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            console.log('[AuthStore] JWT Payload:', payload);
            
            // JWT'den user bilgisini çıkarmaya çalışalım
            if (payload.id || payload.userId || payload.sub) {
              user = {
                id: payload.id || payload.userId || payload.sub,
                email: payload.email || data.email,
                firstName: payload.firstName || payload.first_name || '',
                lastName: payload.lastName || payload.last_name || '',
                role: payload.role || 'user'
              };
              console.log('[AuthStore] Senaryo 5: Kullanıcı bilgisi JWT\'den çıkarıldı');
            } else {
              throw new Error('JWT\'de kullanıcı bilgisi bulunamadı');
            }
          } else {
            throw new Error('Geçersiz JWT formatı');
          }
        } catch (jwtError) {
          console.error('[AuthStore] JWT decode hatası:', jwtError);
          throw new Error('Token var ancak kullanıcı bilgisi eksik');
        }
      }
      else {
        // Hiçbir senaryo uymazsa detaylı hata mesajı verelim
        console.error('[AuthStore] Desteklenmeyen API yanıt yapısı:');
        console.error('- response.data:', responseData);
        console.error('- Mevcut alanlar:', Object.keys(responseData || {}));
        
        throw new Error(`API yanıtı beklenen formatta değil. 
          Mevcut alanlar: ${Object.keys(responseData || {}).join(', ')}
          Beklenen alanlar: user+accessToken, user+token, veya direkt kullanıcı bilgileri`);
      }
      
      // Son kontrol: user ve token'ın geçerli olduğundan emin olalım
      if (!user || !user.id || !user.email || !accessToken) {
        throw new Error('Kullanıcı bilgileri veya token eksik/geçersiz');
      }
      
      console.log('[AuthStore] Login başarılı. User:', user);
      console.log('[AuthStore] Token mevcut:', !!accessToken);
      
      get().setUserAndToken(user, accessToken);
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Giriş yapılamadı.';
      console.error('[AuthStore] Login hatası:', errorMessage);
      console.error('[AuthStore] Hata detayı:', err);
      set({ error: errorMessage, isAuthenticated: false, isLoading: false });
      throw err;
    }
  },

  signup: async (data) => {
    set({ isLoading: true, error: null });
    try {
      console.log('[AuthStore] Signup işlemi başlatıldı...');
      await apiAuth.signup(data);
      console.log('[AuthStore] Signup başarılı. Otomatik giriş yapılıyor...');
      await get().login({ email: data.email, password: data.password });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Kayıt işlemi başarısız.';
      console.error('[AuthStore] Signup hatası:', errorMessage);
      set({ error: errorMessage, isAuthenticated: false, isLoading: false });
      throw err;
    }
  },

  logout: () => {
    console.log('[AuthStore] Logout işlemi başlatıldı.');
    apiAuth.logout().catch(() => console.error("Sunucu çıkış işlemi başarısız, client temizleniyor."));
    get().clearAuth();
  },

  setUserAndToken: (user, token) => {
    if (user && token) {
      console.log('[AuthStore] setUserAndToken çağrıldı. Geçerli user ve token kaydediliyor.');
      set({ user, token, isAuthenticated: true, isLoading: false, error: null });
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('[AuthStore] localStorage güncellendi.');
      }
    } else {
      console.error('[AuthStore] setUserAndToken çağrıldı ancak user veya token geçersiz. İşlem iptal edildi.');
      get().clearAuth();
    }
  },
  
  clearAuth: () => {
    console.log('[AuthStore] clearAuth çağrıldı. State ve localStorage temizleniyor.');
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
     if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      console.log('[AuthStore] localStorage temizlendi.');
    }
  },

  initializeAuth: () => {
    console.log('[AuthStore] initializeAuth: Oturum kontrolü başlatıldı.');
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      const userString = localStorage.getItem('user');
      console.log(`[AuthStore] localStorage'dan okunan token: ${token ? 'VAR' : 'YOK'}`);
      
      if (token && userString && userString !== 'undefined' && userString !== 'null') {
        try {
          const user = JSON.parse(userString);
          set({ user, token, isAuthenticated: true });
          console.log('[AuthStore] Oturum bilgileri localStorage\'dan başarıyla yüklendi.');
        } catch (error) {
           console.error('[AuthStore] localStorage\'daki kullanıcı verisi bozuk, oturum temizleniyor.', error);
           get().clearAuth();
        }
      } else {
        console.log('[AuthStore] localStorage\'da geçerli oturum bilgisi bulunamadı.');
      }
    }
    set({ isLoading: false });
    console.log('[AuthStore] Oturum kontrolü tamamlandı. isLoading: false');
  },
}));

if (typeof window !== 'undefined') {
    useAuthStore.getState().initializeAuth();
}