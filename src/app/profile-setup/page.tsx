import { ProfileSetupForm } from "@/app/profile-setup/_components/profile-setup-form";

/**
 * /profile-setup rotası için ana sayfa bileşenidir.
 * 404 hatasını önler ve ilgili form bileşenini çağırır.
 *
 * @returns {JSX.Element} Profil kurulum sayfasını döndürür.
 */
const ProfileSetupPage = () => {
  // _components klasöründe oluşturduğumuz form bileşenini burada çağırıyoruz.
  // Bu sayede kullanıcı /profile-setup adresine gittiğinde formu görür.
  return <ProfileSetupForm />;
};

export default ProfileSetupPage;
