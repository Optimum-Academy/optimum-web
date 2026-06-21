import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CourseCard } from '@/components/cards/CourseCard';
import { CTASection } from '@/components/sections/CTASection';
import { getCourses } from '@/lib/api/cms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Explore our range of nationally recognised courses in care, disability support, and community services.',
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-slate-900 py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">
              Our Courses
            </h1>
            <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto">
              Nationally recognised training pathways designed to launch your career in the healthcare and community sectors.
            </p>
          </div>
        </section>

        {/* Course Grid */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
