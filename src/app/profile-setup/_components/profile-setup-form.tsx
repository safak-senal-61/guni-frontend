"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@radix-ui/react-label";

/**
 * Kullanıcının profil bilgilerini (isim, soyisim, eğitim seviyesi)
 * girdiği form bileşeni.
 * Bu bir "isimlendirilmiş export"tur, bu yüzden import edilirken
 * { ProfileSetupForm } şeklinde kullanılır.
 */
export const ProfileSetupForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Profil Kurulumu</CardTitle>
          <CardDescription>
            Lütfen profil bilgilerinizi girin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">İsim</Label>
                <Input id="name" placeholder="İsminizi girin" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="surname">Soyisim</Label>
                <Input id="surname" placeholder="Soyisminizi girin" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="education-level">Eğitim Seviyesi</Label>
                <Input id="education-level" placeholder="örn. Lise, Üniversite" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">İptal</Button>
          <Button>Kaydet</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
