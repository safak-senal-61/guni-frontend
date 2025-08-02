'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { userOnboarding } from '@/app/lib/api';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { UpdateUserProfileDto, LearningStyle, GradeLevel } from '@/app/types/user';

// Zod şeması
const profileSetupSchema = z.object({
  age: z.string().optional(),
  gradeLevel: z.union([z.nativeEnum(GradeLevel), z.literal('')]).optional(),
  learningStyle: z.union([z.nativeEnum(LearningStyle), z.literal('')]).optional(),
  interests: z.string().optional(),
  weakSubjects: z.string().min(2, 'En az bir ders girmelisiniz.'),
}).superRefine((data, ctx) => {
  if (data.age && (isNaN(Number(data.age)) || Number(data.age) < 5)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Yaş en az 5 olmalıdır ve geçerli bir sayı olmalıdır.',
      path: ['age'],
    });
  }
});

// 🔄 React Hook Form tipi Zod'dan türetiliyor
type ProfileFormData = z.infer<typeof profileSetupSchema>;

export function ProfileSetupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      age: '',
      gradeLevel: '',
      learningStyle: '',
      interests: '',
      weakSubjects: '',
    },
  });

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const apiData: UpdateUserProfileDto = {
        age: data.age ? Number(data.age) : undefined,
        gradeLevel: data.gradeLevel || undefined,
        learningStyle: data.learningStyle || undefined,
        interests: data.interests
          ? data.interests.split(',').map(item => item.trim()).filter(Boolean)
          : [],
        weakSubjects: data.weakSubjects
          ? data.weakSubjects.split(',').map(item => item.trim()).filter(Boolean)
          : [],
      };

      await userOnboarding.updateProfile(apiData);
      router.push('/onboarding/assessment');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Profil güncellenirken bir hata oluştu.';
      setError(errorMessage);
      console.error("Profile setup failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Sizi Tanıyalım</h1>
        <p className="text-gray-500">Öğrenme deneyiminizi kişiselleştirmek için bu bilgilere ihtiyacımız var.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="age">Yaşınız</label>
            <Input id="age" type="number" {...form.register('age')} />
            {form.formState.errors.age && (
              <p className="text-red-500 text-sm">{form.formState.errors.age.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="gradeLevel">Sınıf Seviyeniz</label>
            <select
              id="gradeLevel"
              {...form.register('gradeLevel')}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              <option value="">Seçiniz...</option>
              {Object.values(GradeLevel).map(level => (
                <option key={level} value={level}>
                  {level.replace('GRADE_', '')}. Sınıf
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="learningStyle">Tercih Ettiğiniz Öğrenme Stili</label>
          <select
            id="learningStyle"
            {...form.register('learningStyle')}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            <option value="">Seçiniz...</option>
            {Object.values(LearningStyle).map(style => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="interests">İlgi Alanlarınız (Virgülle ayırarak yazınız)</label>
          <Input
            id="interests"
            placeholder="Örn: Uzay, futbol, müzik"
            {...form.register('interests')}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="weakSubjects">Zorlandığınız Dersler (Virgülle ayırarak yazınız)</label>
          <Input
            id="weakSubjects"
            placeholder="Örn: Matematik, Fizik"
            {...form.register('weakSubjects')}
          />
          {form.formState.errors.weakSubjects && (
            <p className="text-red-500 text-sm">{form.formState.errors.weakSubjects.message}</p>
          )}
        </div>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Kaydediliyor...' : 'Devam Et'}
        </Button>
      </form>
    </Card>
  );
}
