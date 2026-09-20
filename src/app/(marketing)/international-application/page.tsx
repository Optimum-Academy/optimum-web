import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { InternationalApplicationForm } from '@/components/forms/InternationalApplicationForm';

export const metadata: Metadata = {
  title: 'International Student Application | Optimum Training Academy',
  description: 'Apply for international CRICOS qualifications at Optimum Training Academy. Fill out your student application for assessment by OTA Student Services.',
};

interface PageProps {
  searchParams: Promise<{ course?: string }>;
}

export default async function InternationalApplicationPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const courseSlug = params.course;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple-600 bg-brand-purple-50 px-3 py-1 rounded-full">
              CRICOS International Admissions
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-4 mb-4 font-heading">
              International Student Application
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Complete this application form to apply for international study at Optimum Training Academy.
              Our Student Services team will review your application and contact you regarding assessment and next steps.
            </p>
          </div>

          <InternationalApplicationForm initialCourseSlug={courseSlug} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
