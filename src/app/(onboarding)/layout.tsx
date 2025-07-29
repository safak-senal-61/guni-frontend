// src/app/(onboarding)/layout.tsx
export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </main>
    );
}