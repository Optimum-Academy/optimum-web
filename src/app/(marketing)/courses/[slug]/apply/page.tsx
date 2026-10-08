import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getCourseBySlug, getCourses } from '@/lib/api/cms';
import { InternationalApplicationForm } from '@/components/forms/InternationalApplicationForm';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses
    .filter((c) => c.courseFields.audience === 'International')
    .map((course) => ({
      slug: course.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: 'Course Application Not Found' };

  const cleanTitle = course.title.replace(/\s*\d{5,6}[A-Z]?$/, '');

  return {
    title: `Apply for ${course.courseFields.qualificationCode} ${cleanTitle} | Optimum Training Academy`,
    description: `International student application form for ${course.courseFields.qualificationCode} ${cleanTitle} (CRICOS ${course.courseFields.cricosCode || ''}).`,
  };
}

export default async function CourseApplyPage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const cleanTitle = course.title.replace(/\s*\d{5,6}[A-Z]?$/, '');

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
              Complete this application form to apply for {course.courseFields.qualificationCode} {cleanTitle}.
              Our Student Services team will review your application and contact you regarding assessment and next steps.
            </p>
          </div>

          <InternationalApplicationForm initialCourseSlug={course.slug} course={course} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
