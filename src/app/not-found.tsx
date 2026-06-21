import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-6xl font-bold text-brand-purple-600 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Page Not Found</h2>
            <p className="text-slate-600 mb-8">
              The page you are looking for doesn&apos;t exist or has been moved.
            </p>
            <Button size="lg" asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
