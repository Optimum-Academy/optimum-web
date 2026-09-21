import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCourseBySlug, getCourses } from '@/lib/api/cms';
import InternationalApplicationForm from '@/components/forms/InternationalApplicationForm';

interface CourseApplyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const courses = await getCourses();
  const internationalCourses = courses.filter((c) => c.courseFields.audience === 'International');
  return internationalCourses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: CourseApplyPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const course = await getCourseBySlug(resolvedParams.slug);

  if (!course || course.courseFields.audience !== 'International') {
    return {
      title: 'International Student Application | Optimum Training Academy',
    };
  }

  return {
    title: `Apply for ${course.title} | Optimum Training Academy`,
    description: `Complete your international student application for ${course.title} (${course.courseFields.qualificationCode} - CRICOS ${course.courseFields.cricosCode || ''}) at Optimum Training Academy.`,
  };
}

export default async function CourseApplyPage({ params }: CourseApplyPageProps) {
  const resolvedParams = await params;
  const course = await getCourseBySlug(resolvedParams.slug);

  if (!course) {
    notFound();
  }

  // Ensure this route is strictly for International courses
  if (course.courseFields.audience !== 'International') {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple-100 text-brand-purple-900 text-xs font-semibold tracking-wide uppercase">
            CRICOS International Admissions
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Apply for {course.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Submit your application for review by Optimum Training Academy&apos;s Student Services team.
            After we review your application, we will contact you regarding the next steps.
          </p>
        </div>

        {/* Application Form */}
        <InternationalApplicationForm
          courseCode={course.courseFields.qualificationCode}
          courseTitle={course.title}
          cricosCode={course.courseFields.cricosCode || ''}
          deliveryMode={course.courseFields.deliveryMode}
          duration={course.courseFields.duration}
          slug={course.slug}
        />
      </div>
    </main>
  );
}
