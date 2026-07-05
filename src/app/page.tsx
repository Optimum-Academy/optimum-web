import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { CourseCard } from '@/components/cards/CourseCard';
import { CTASection } from '@/components/sections/CTASection';
import { FAQSection } from '@/components/sections/FAQSection';
import { Testimonials } from '@/components/sections/Testimonials';
import { getCourses } from '@/lib/api/cms';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, GraduationCap, Briefcase } from 'lucide-react';

export default async function Home() {
  const courses = await getCourses();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* Featured Courses */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Explore Our Courses
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Find the right pathway for your career in the care and support sector.
                </p>
              </div>
              <Button variant="ghost" className="text-primary hover:text-primary-foreground hover:bg-primary font-bold group transition-all" asChild>
                <Link href="/courses">
                  View All Courses <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.slice(0, 3).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-8 rounded-2xl bg-slate-50 border transition-all hover:shadow-md">
                <div className="mx-auto w-16 h-16 bg-brand-purple-100 rounded-2xl flex items-center justify-center mb-6 text-primary">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Quality Education</h3>
                <p className="text-slate-600">Nationally recognised courses designed by industry experts to ensure you get the best training.</p>
              </div>
              <div className="p-8 rounded-2xl bg-slate-50 border transition-all hover:shadow-md">
                <div className="mx-auto w-16 h-16 bg-brand-blue-100 rounded-2xl flex items-center justify-center mb-6 text-brand-blue-600">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Supportive Learning</h3>
                <p className="text-slate-600">Small class sizes and dedicated trainers who care about your success and personal growth.</p>
              </div>
              <div className="p-8 rounded-2xl bg-slate-50 border transition-all hover:shadow-md">
                <div className="mx-auto w-16 h-16 bg-brand-purple-100 rounded-2xl flex items-center justify-center mb-6 text-primary">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Career Outcomes</h3>
                <p className="text-slate-600">Strong industry partnerships and practical placement that lead directly to employment opportunities.</p>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
