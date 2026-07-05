import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getCourseBySlug, getCourses } from '@/lib/api/cms';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CourseContent } from '@/components/sections/CourseContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: 'Course Not Found' };

  const audienceSuffix = course.courseFields.audience === 'International' ? ' (International Students)' : '';

  return {
    title: `${course.courseFields.qualificationCode} ${course.title}${audienceSuffix} | Optimum Training Academy`,
    description: `Enrol in the ${course.courseFields.qualificationCode} ${course.title} for ${course.courseFields.audience?.toLowerCase() || 'domestic'} students. ${course.courseFields.duration} course with ${course.courseFields.deliveryMode}.`,
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const { courseFields } = course;

  // JSON-LD Course Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": `${course.title} (${courseFields.audience})`,
    "description": `Nationally recognised ${courseFields.qualificationCode} ${course.title} course for ${courseFields.audience} students.`,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Optimum Training Academy",
      "sameAs": "https://optimumacademy.edu.au"
    },
    "courseCode": courseFields.qualificationCode,
    "identifier": courseFields.cricosCode,
    "educationalLevel": courseFields.level,
    "offers": {
      "@type": "Offer",
      "price": courseFields.price?.replace(/[^0-9.]/g, ''),
      "priceCurrency": "AUD"
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <CourseContent course={course} />
      <Footer />
    </div>
  );
}
