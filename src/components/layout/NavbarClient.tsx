'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { Course, SiteSettings } from '@/lib/types';
import { cn } from '@/lib/utils';

interface NavbarClientProps {
  courses: Course[];
  siteSettings: SiteSettings | null;
}

export function NavbarClient({ courses, siteSettings }: NavbarClientProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = React.useState(false);

  const ctaLabels = siteSettings?.siteSettingsFields?.ctaLabels;

  // Categorize courses
  const domesticCourses = courses.filter(
    (c) => c.courseFields.audience === 'Domestic' && c.courseFields.level !== 'Unit of Competency'
  );
  const internationalCourses = courses.filter(
    (c) => c.courseFields.audience === 'International'
  );
  const shortCourses = courses.filter(
    (c) => c.courseFields.level === 'Unit of Competency'
  );

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
        <nav className="hidden md:flex items-center gap-6 relative">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary py-2"
          >
            Home
          </Link>

          {/* Courses Hover Dropdown */}
          <div className="relative group py-2">
            <Link
              href="/courses"
              className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
            >
              <span>Courses</span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </Link>

            {/* Dropdown Menu Container */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[760px] bg-white border border-slate-200 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-6 grid grid-cols-3 gap-6 text-slate-900">
              {/* Domestic Courses Column */}
              <div>
                <Link href="/courses?tab=domestic">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-brand-blue-600 hover:text-brand-blue-800 transition-colors mb-3 border-b pb-2">
                    Domestic Courses
                  </h4>
                </Link>
                <ul className="space-y-3">
                  {domesticCourses.map((course) => (
                    <li key={course.id}>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="block text-sm text-slate-700 hover:text-brand-purple-600 hover:translate-x-1 transition-all duration-150"
                      >
                        <div className="font-semibold text-[10px] text-slate-400 font-mono tracking-tight">
                          {course.courseFields.qualificationCode}
                        </div>
                        <div className="font-semibold text-slate-800 text-[13px] leading-snug">
                          {course.title}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* International Courses Column */}
              <div>
                <Link href="/courses?tab=international">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-brand-purple-600 hover:text-brand-purple-800 transition-colors mb-3 border-b pb-2">
                    International Courses
                  </h4>
                </Link>
                <ul className="space-y-3">
                  {internationalCourses.map((course) => (
                    <li key={course.id}>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="block text-sm text-slate-700 hover:text-brand-purple-600 hover:translate-x-1 transition-all duration-150"
                      >
                        <div className="font-semibold text-[10px] text-slate-400 font-mono tracking-tight">
                          {course.courseFields.qualificationCode} {course.courseFields.cricosCode && `• CRICOS ${course.courseFields.cricosCode}`}
                        </div>
                        <div className="font-semibold text-slate-800 text-[13px] leading-snug">
                          {course.title}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Short Courses Column */}
              <div>
                <Link href="/courses?tab=short">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-600 hover:text-emerald-800 transition-colors mb-3 border-b pb-2">
                    Short Courses
                  </h4>
                </Link>
                <ul className="space-y-3">
                  {shortCourses.map((course) => (
                    <li key={course.id}>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="block text-sm text-slate-700 hover:text-brand-purple-600 hover:translate-x-1 transition-all duration-150"
                      >
                        <div className="font-semibold text-[10px] text-slate-400 font-mono tracking-tight">
                          {course.courseFields.qualificationCode}
                        </div>
                        <div className="font-semibold text-slate-800 text-[13px] leading-snug">
                          {course.title}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary py-2"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-primary py-2"
          >
            Contact
          </Link>

          <div className="flex items-center gap-3 ml-4">
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
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-11 w-11">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] overflow-y-auto">
              <SheetTitle>Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                <Link
                  href="/"
                  className="text-lg font-medium transition-colors hover:text-primary py-1"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>

                {/* Mobile Courses Accordion */}
                <div>
                  <button
                    onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                    className="flex w-full items-center justify-between py-1 text-lg font-medium transition-colors hover:text-primary"
                  >
                    <span>Courses</span>
                    <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", isCoursesOpen && "rotate-180")} />
                  </button>

                  {isCoursesOpen && (
                    <div className="pl-4 mt-3 border-l border-slate-100 space-y-5">
                      {/* Domestic */}
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-brand-blue-600 mb-2">
                          Domestic Courses
                        </div>
                        <ul className="space-y-2 pl-2">
                          {domesticCourses.map((course) => (
                            <li key={course.id}>
                              <Link
                                href={`/courses/${course.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="block text-sm font-medium text-slate-700 hover:text-brand-purple-600 py-1"
                              >
                                <span className="font-mono text-[10px] text-slate-400 block leading-none mb-0.5">
                                  {course.courseFields.qualificationCode}
                                </span>
                                {course.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* International */}
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-brand-purple-600 mb-2">
                          International Courses
                        </div>
                        <ul className="space-y-2 pl-2">
                          {internationalCourses.map((course) => (
                            <li key={course.id}>
                              <Link
                                href={`/courses/${course.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="block text-sm font-medium text-slate-700 hover:text-brand-purple-600 py-1"
                              >
                                <span className="font-mono text-[10px] text-slate-400 block leading-none mb-0.5">
                                  {course.courseFields.qualificationCode} {course.courseFields.cricosCode && `• CRICOS ${course.courseFields.cricosCode}`}
                                </span>
                                {course.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Short Courses */}
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
                          Short Courses
                        </div>
                        <ul className="space-y-2 pl-2">
                          {shortCourses.map((course) => (
                            <li key={course.id}>
                              <Link
                                href={`/courses/${course.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="block text-sm font-medium text-slate-700 hover:text-brand-purple-600 py-1"
                              >
                                <span className="font-mono text-[10px] text-slate-400 block leading-none mb-0.5">
                                  {course.courseFields.qualificationCode}
                                </span>
                                {course.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/about"
                  className="text-lg font-medium transition-colors hover:text-primary py-1"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-lg font-medium transition-colors hover:text-primary py-1"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>

                <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                  <Button variant="outline" asChild className="w-full">
                    <a href="https://optimumtrainingacademy.rto.net.au/Account/Index" target="_blank" rel="noopener noreferrer">
                      {ctaLabels?.secondaryCta || 'Student Portal'}
                    </a>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      {ctaLabels?.primaryCta || 'Enquire Now'}
                    </Link>
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
