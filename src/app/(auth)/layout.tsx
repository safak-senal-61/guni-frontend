// Bu layout, auth sayfalarını ekranın ortasında gösterecek.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4">
        {children}
      </main>
    );
  }