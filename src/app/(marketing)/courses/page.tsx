import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CTASection } from '@/components/sections/CTASection';
import { CourseFilter } from '@/components/sections/CourseFilter';
import { getCourses } from '@/lib/api/cms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Explore our range of nationally recognised courses in care, disability support, and community services for domestic and international students.',
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-slate-900 py-12 md:py-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,#6F1D77,transparent)]" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="font-heading text-3xl sm:text-6xl font-bold tracking-tight">
              Our Courses
            </h1>
            <p className="mt-8 text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Nationally recognised training pathways designed to launch your career in the healthcare and community sectors, available for both domestic and international students.
            </p>
          </div>
        </section>

        {/* Filtered Course Grid */}
        <section className="py-12 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <CourseFilter courses={courses} />
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
