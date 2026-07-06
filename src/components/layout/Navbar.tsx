import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { getSiteSettings } from '@/lib/api/cms';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/courses' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export async function Navbar() {
  const settings = await getSiteSettings();
  const ctaLabels = settings?.siteSettingsFields?.ctaLabels;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-14 w-40 md:h-16 md:w-56 transition-all">
              <Image
                src="/logo.png"
                alt="Optimum Academy Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <a href="https://optimumtrainingacademy.rto.net.au/Account/Index" target="_blank" rel="noopener noreferrer">
                {ctaLabels?.secondaryCta || 'Student Portal'}
              </a>
            </Button>
            <Button asChild>
              <Link href="/contact">{ctaLabels?.primaryCta || 'Enquire Now'}</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-11 w-11">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle>Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-2">
                  <Button variant="outline" asChild className="w-full">
                    <a href="https://optimumtrainingacademy.rto.net.au/Account/Index" target="_blank" rel="noopener noreferrer">
                      {ctaLabels?.secondaryCta || 'Student Portal'}
                    </a>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/contact">{ctaLabels?.primaryCta || 'Enquire Now'}</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
