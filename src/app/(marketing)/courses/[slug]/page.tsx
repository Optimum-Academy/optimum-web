import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getCourseBySlug } from '@/lib/api/cms';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, GraduationCap, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: 'Course Not Found' };

  return {
    title: course.title,
    description: `Learn more about our ${course.title} course at Optimum Academy.`,
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Course Hero */}
        <section className="bg-slate-900 py-20 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-6 bg-brand-purple-500 text-white border-none">
                  {course.courseFields.level}
                </Badge>
                <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                  {course.title}
                </h1>
                <div className="mt-8 flex flex-wrap gap-6 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Duration: {course.courseFields.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Mode: {course.courseFields.deliveryMode}</span>
                  </div>
                </div>
                <div className="mt-10">
                  <Button size="lg" className="h-14 px-8 text-lg" asChild>
                    <a href={course.courseFields.externalEnrolmentLink}>Apply Now</a>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                 {course.featuredImage?.node.sourceUrl && (
                   <Image
                     src={course.featuredImage.node.sourceUrl}
                     alt={course.featuredImage.node.altText || course.title}
                     fill
                     className="object-cover"
                   />
                 )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-12">
                   <div>
                     <h2 className="text-3xl font-bold mb-6">Course Overview</h2>
                     <p className="text-lg text-slate-600 leading-relaxed">
                       This course provides you with the skills and knowledge required to provide person-centred support to people who may require support due to ageing, disability or some other reason. It involves using a person-centred approach to facilitate individualised support and community participation.
                     </p>
                   </div>

                   <div>
                     <h2 className="text-3xl font-bold mb-6">Career Outcomes</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {course.courseFields.careerOutcomes.map((outcome) => (
                         <div key={outcome} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border">
                            <CheckCircle2 className="h-5 w-5 text-brand-blue-500 mt-0.5" />
                            <span className="font-semibold text-slate-900">{outcome}</span>
                         </div>
                       ))}
                     </div>
                   </div>

                   <div>
                     <h2 className="text-3xl font-bold mb-6">Entry Requirements</h2>
                     <div className="p-6 rounded-2xl bg-brand-purple-50 border border-brand-purple-100">
                        <p className="text-slate-800">{course.courseFields.entryRequirements}</p>
                     </div>
                   </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                   <div className="p-8 rounded-3xl bg-slate-900 text-white">
                      <h3 className="text-xl font-bold mb-6">Enquire about this course</h3>
                      <form className="space-y-4">
                         <div className="space-y-2">
                           <label className="text-sm font-medium">Full Name</label>
                           <input className="w-full bg-slate-800 border-slate-700 rounded-lg p-3 text-white" placeholder="John Doe" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-sm font-medium">Email Address</label>
                           <input className="w-full bg-slate-800 border-slate-700 rounded-lg p-3 text-white" placeholder="john@example.com" />
                         </div>
                         <Button className="w-full mt-4" size="lg">Send Enquiry</Button>
                      </form>
                   </div>

                   <div className="p-8 rounded-3xl border bg-white shadow-sm">
                      <GraduationCap className="h-10 w-10 text-primary mb-4" />
                      <h3 className="text-xl font-bold mb-2">Need advice?</h3>
                      <p className="text-slate-600 mb-6">Contact our advisors to discuss your career goals.</p>
                      <Button variant="outline" className="w-full">Book a Call</Button>
                   </div>
                </div>
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
