import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getCourseBySlug, getCourses } from '@/lib/api/cms';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrackedLink } from '@/components/ui/tracked-link';
import {
  Clock,
  Users,
  GraduationCap,
  CheckCircle2,
  BookOpen,
  Briefcase,
  FileText,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Calendar,
  Wallet
} from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';

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
      <main className="flex-1">
        {/* Premium Hero */}
        <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,#6F1D77,transparent)]" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge className="bg-brand-purple-500 text-white border-none px-4 py-1">
                    Nationally Recognised Training
                  </Badge>
                  {courseFields.audience === 'International' ? (
                    <Badge variant="outline" className="text-brand-purple-300 border-brand-purple-400 px-4 py-1">
                      International / CRICOS
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-slate-400 border-slate-700 px-4 py-1">
                      Domestic Students
                    </Badge>
                  )}
                  <div className="flex flex-col ml-auto sm:ml-0">
                    <span className="text-slate-400 font-mono text-sm leading-none">{courseFields.qualificationCode}</span>
                    {courseFields.cricosCode && (
                      <span className="text-brand-purple-400 font-mono text-[10px] uppercase mt-1">CRICOS {courseFields.cricosCode}</span>
                    )}
                  </div>
                </div>
                <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight leading-tight mb-8">
                  {course.title}
                </h1>
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10">
                      <Clock className="h-5 w-5 text-brand-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Duration</p>
                      <p className="font-semibold">{courseFields.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10">
                      <Users className="h-5 w-5 text-brand-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Delivery</p>
                      <p className="font-semibold">{courseFields.deliveryMode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10">
                      <Calendar className="h-5 w-5 text-brand-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Volume of Learning</p>
                      <p className="font-semibold">{courseFields.totalHours || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10">
                      <Wallet className="h-5 w-5 text-brand-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Course Fees</p>
                      <p className="font-semibold">{courseFields.price || 'Contact us'}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="h-14 px-10 text-lg rounded-full" asChild>
                    <TrackedLink href={courseFields.externalEnrolmentLink}>Enrol Today</TrackedLink>
                  </Button>
                  {courseFields.brochureLink && (
                    <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-white/30 hover:bg-white hover:text-slate-900 text-white transition-all" asChild>
                      <TrackedLink href={courseFields.brochureLink}>Download Brochure</TrackedLink>
                    </Button>
                  )}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-brand-purple-500/20 blur-3xl rounded-full" />
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                   {course.featuredImage?.node.sourceUrl && (
                     <Image
                       src={course.featuredImage.node.sourceUrl}
                       alt={course.featuredImage.node.altText || course.title}
                       fill
                       className="object-cover"
                     />
                   )}
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl text-slate-900 hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <ShieldCheck className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">RTO Accredited</p>
                      <p className="text-xs text-slate-500">Government Approved Provider</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Navigation Sticky Bar Placeholder could go here */}

        {/* Content Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8 space-y-20">

                   {/* Overview */}
                   <div id="overview">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                        <h2 className="text-3xl font-bold">Course Overview</h2>
                     </div>
                     <p className="text-xl text-slate-600 leading-relaxed mb-8">
                       The {courseFields.qualificationCode} {course.title} reflects the role of community services workers involved in the delivery, management, and coordination of person-centred services to individuals, groups, and communities.
                     </p>

                     {courseFields.whyStudy && (
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                         {courseFields.whyStudy.map((benefit, i) => (
                           <div key={i} className="flex gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                             <div className="flex-shrink-0">
                               <CheckCircle2 className="h-6 w-6 text-brand-purple-500" />
                             </div>
                             <p className="text-slate-700 font-medium">{benefit}</p>
                           </div>
                         ))}
                       </div>
                     )}
                   </div>

                   {/* Career Outcomes */}
                   <div id="careers">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                        <h2 className="text-3xl font-bold">Career Pathways</h2>
                     </div>
                     <p className="text-slate-600 mb-8">Graduates of this qualification are prepared for a variety of leadership and coordination roles in the community sector:</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {courseFields.careerOutcomes.map((outcome) => (
                         <div key={outcome} className="flex items-center gap-3 p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-brand-purple-200 transition-colors">
                            <Briefcase className="h-5 w-5 text-brand-blue-500" />
                            <span className="font-bold text-slate-900">{outcome}</span>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Learning Modules */}
                   <div id="modules">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                        <h2 className="text-3xl font-bold">What You Will Learn</h2>
                     </div>
                     <ul className="space-y-4">
                       {courseFields.whatYouWillLearn?.map((item, i) => (
                         <li key={i} className="flex items-start gap-4">
                           <div className="mt-1 bg-brand-purple-100 p-1 rounded-full">
                             <BookOpen className="h-4 w-4 text-brand-purple-600" />
                           </div>
                           <span className="text-lg text-slate-700">{item}</span>
                         </li>
                       ))}
                     </ul>
                   </div>

                   {/* Course Units */}
                   {courseFields.units && (
                     <div id="units">
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-3">
                            <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                            <h2 className="text-3xl font-bold">Course Units</h2>
                          </div>
                          <Badge variant="outline" className="px-4 py-1">
                            {courseFields.units.length} Units Total
                          </Badge>
                        </div>
                        <div className="rounded-3xl border border-slate-200 overflow-hidden">
                           <div className="bg-slate-50 p-4 border-b grid grid-cols-12 text-xs font-bold uppercase tracking-wider text-slate-500">
                             <div className="col-span-3">Code</div>
                             <div className="col-span-7">Title</div>
                             <div className="col-span-2 text-right">Type</div>
                           </div>
                           <div className="divide-y">
                              {courseFields.units.map((unit) => (
                                <div key={unit.code} className="p-4 grid grid-cols-12 items-center hover:bg-slate-50/50 transition-colors">
                                  <div className="col-span-3 font-mono text-sm font-bold text-slate-900">{unit.code}</div>
                                  <div className="col-span-7 text-sm font-medium text-slate-700">{unit.title}</div>
                                  <div className="col-span-2 text-right">
                                    <Badge variant="outline" className={unit.type === 'CORE' ? 'bg-brand-blue-50 text-brand-blue-700 border-brand-blue-100' : 'bg-slate-100 text-slate-600'}>
                                      {unit.type}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                           </div>
                        </div>
                     </div>
                   )}

                   {/* Requirements */}
                   <div id="requirements">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                        <h2 className="text-3xl font-bold">Entry Requirements</h2>
                     </div>
                     <div className="p-8 rounded-3xl bg-brand-purple-50 border border-brand-purple-100 relative overflow-hidden">
                        <AlertCircle className="absolute -top-4 -right-4 h-32 w-32 text-brand-purple-100 -rotate-12" />
                        <ul className="space-y-4 relative z-10">
                          {courseFields.entryRequirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-brand-purple-500 mt-1" />
                              <span className="text-slate-800 font-medium">{req}</span>
                            </li>
                          ))}
                        </ul>
                     </div>
                   </div>

                   {/* Vocational Placement */}
                   {courseFields.vocationalPlacement && (
                     <div id="placement">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                          <h2 className="text-3xl font-bold">Vocational Placement</h2>
                        </div>
                        <div className="p-8 rounded-3xl border border-slate-200 bg-white">
                          <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            {courseFields.vocationalPlacement}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-4">
                                <h4 className="font-bold flex items-center gap-2">
                                  <ShieldCheck className="h-5 w-5 text-green-600" />
                                  Placement Options
                                </h4>
                                <ul className="text-sm text-slate-600 space-y-2">
                                  <li>• Source your own local provider</li>
                                  <li>• Assistance from Optimum Academy</li>
                                  <li>• Access our partner network (Spry, Dynamic Care)</li>
                                </ul>
                             </div>
                             <div className="space-y-4">
                                <h4 className="font-bold flex items-center gap-2">
                                  <FileText className="h-5 w-5 text-brand-blue-500" />
                                  Support Provided
                                </h4>
                                <p className="text-sm text-slate-600">
                                  We provide a comprehensive Vocational Placement Pack and continuous support to ensure you meet the required 400 hours of workplace experience.
                                </p>
                             </div>
                          </div>
                        </div>
                     </div>
                   )}

                   {/* FAQs */}
                   {courseFields.faqs && (
                     <div id="faq">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                        </div>
                        <div className="space-y-4">
                           {courseFields.faqs.map((faq, i) => (
                             <div key={i} className="group p-6 rounded-2xl border border-slate-200 hover:border-brand-purple-300 transition-all">
                                <h3 className="text-lg font-bold flex items-center gap-3 mb-3">
                                  <HelpCircle className="h-5 w-5 text-brand-purple-500" />
                                  {faq.question}
                                </h3>
                                <p className="text-slate-600 pl-8">{faq.answer}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                   )}

                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                   <div className="sticky top-24 space-y-8">
                      {/* Enrolment Widget */}
                      <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 h-32 w-32 bg-brand-purple-500/20 blur-3xl rounded-full -mr-16 -mt-16" />
                         <h3 className="text-2xl font-bold mb-2">Ready to start?</h3>
                         <p className="text-slate-400 mb-8 text-sm">Join the next intake and transform your career in community services.</p>

                         <div className="space-y-6 mb-8">
                            <div className="flex justify-between items-center text-sm">
                               <span className="text-slate-400">Course Code</span>
                               <span className="font-bold">{courseFields.qualificationCode}</span>
                            </div>
                            {courseFields.cricosCode && (
                              <>
                                <Separator className="bg-white/10" />
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-slate-400">CRICOS Code</span>
                                  <span className="font-bold text-brand-purple-400">{courseFields.cricosCode}</span>
                                </div>
                              </>
                            )}
                            <Separator className="bg-white/10" />
                            <div className="flex justify-between items-center text-sm">
                               <span className="text-slate-400">Total Investment</span>
                               <span className="font-bold text-brand-purple-400 text-lg">{courseFields.price}</span>
                            </div>
                            <Separator className="bg-white/10" />
                            <div className="flex justify-between items-center text-sm">
                               <span className="text-slate-400">Payment Plan</span>
                               <span className="font-bold">From $500/mo</span>
                            </div>
                         </div>

                         <Button className="w-full h-14 rounded-full bg-brand-purple-500 hover:bg-brand-purple-600 text-white" size="lg" asChild>
                            <TrackedLink href={courseFields.externalEnrolmentLink}>Enrol Now</TrackedLink>
                         </Button>

                         <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-widest font-bold">
                           Nationally Recognised Training
                         </p>
                      </div>

                      {/* Resource Card */}
                      <div className="p-8 rounded-[2.5rem] border border-slate-200 bg-slate-50 shadow-sm">
                         <h3 className="text-xl font-bold mb-6">What&apos;s Included</h3>
                         <ul className="space-y-4 mb-8">
                            {courseFields.resources?.provided.map((res, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                {res}
                              </li>
                            ))}
                         </ul>
                         <Button variant="outline" className="w-full rounded-full border-slate-300">
                           View Full Specs
                         </Button>
                      </div>

                      {/* Contact Widget */}
                      <div className="p-8 rounded-[2.5rem] bg-brand-blue-900 text-white shadow-xl">
                         <GraduationCap className="h-12 w-12 text-brand-blue-400 mb-6" />
                         <h3 className="text-xl font-bold mb-2">Need advice?</h3>
                         <p className="text-brand-blue-200 mb-8 text-sm">Our career advisors are ready to help you plan your study path.</p>
                         <Button className="w-full rounded-full bg-white text-brand-blue-900 hover:bg-brand-blue-50">
                           Schedule a Callback
                         </Button>
                      </div>
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
