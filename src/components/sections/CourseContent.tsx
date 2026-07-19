'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrackedLink } from '@/components/ui/tracked-link';
import {
  Clock,
  Users,
  CheckCircle2,
  BookOpen,
  Briefcase,
  FileText,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Calendar,
  Wallet,
  GraduationCap
} from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Course } from '@/lib/types';
import { useState } from 'react';
import { BrochureDownloadModal } from '@/components/modals/BrochureDownloadModal';

interface CourseContentProps {
  course: Course;
}

export function CourseContent({ course }: CourseContentProps) {
  const { courseFields } = course;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main className="flex-1">
        {/* Premium Hero */}
        <section className="bg-slate-900 py-12 md:py-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,#6F1D77,transparent)]" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="relative h-10 w-24 brightness-0 invert">
                    <Image
                      src="/nrt-logo.webp"
                      alt="Nationally Recognised Training"
                      fill
                      className="object-contain"
                    />
                  </div>
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
                <h1 className="font-heading text-3xl sm:text-6xl font-bold tracking-tight leading-tight mb-8">
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
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-10 text-lg rounded-full border-white/30 bg-transparent hover:bg-white hover:text-slate-900 text-white transition-all flex items-center gap-2"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <FileText className="h-5 w-5" />
                      Download Brochure
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
                <div className="bg-white p-6 rounded-2xl shadow-xl text-slate-900 mt-6 md:mt-0 md:absolute md:-bottom-6 md:-left-6">
                  <div className="flex items-center gap-4">
                    <div className="relative h-10 w-20 shrink-0">
                      <Image
                        src="/nrt-logo.webp"
                        alt="Nationally Recognised Training"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="border-l pl-4">
                      <p className="text-sm font-bold text-slate-950">Nationally Recognised</p>
                      <p className="text-xs text-slate-600 font-medium">
                        Delivered by Optimum Training Academy Pty Ltd, Registered Training Organisation 46534.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8 space-y-20">

                   {/* Overview */}
                   <div id="overview">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                        <h2 className="text-2xl md:text-3xl font-bold">Course Overview</h2>
                     </div>
                     <p className="text-xl text-slate-600 leading-relaxed mb-8">
                       {courseFields.description}
                     </p>

                     {courseFields.qualificationCode === 'HLTAID011' && (
                       <div className="p-6 rounded-2xl bg-brand-purple-50 border border-brand-purple-100 mb-8 flex items-start gap-4">
                         <div className="flex-shrink-0 mt-0.5">
                           <AlertCircle className="h-5 w-5 text-brand-purple-500" />
                         </div>
                         <div>
                           <h4 className="font-bold text-slate-900 mb-1">Vocational Placement</h4>
                           <p className="text-slate-600 text-sm">Vocational placement is not required for this unit of competency.</p>
                         </div>
                       </div>
                     )}

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
                   {courseFields.careerOutcomes && courseFields.careerOutcomes.length > 0 && (
                     <div id="careers">
                       <div className="flex items-center gap-3 mb-6">
                          <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                          <h2 className="text-2xl md:text-3xl font-bold">Career Pathways</h2>
                       </div>
                       <p className="text-slate-600 mb-8">Graduates of this qualification are prepared for a variety of roles in the industry:</p>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {courseFields.careerOutcomes.map((outcome) => (
                           <div key={outcome} className="flex items-center gap-3 p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-brand-purple-200 transition-colors">
                              <Briefcase className="h-5 w-5 text-brand-blue-500" />
                              <span className="font-bold text-slate-900">{outcome}</span>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}

                   {/* Learning Modules */}
                   <div id="modules">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                        <h2 className="text-2xl md:text-3xl font-bold">What You Will Learn</h2>
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
                            <h2 className="text-2xl md:text-3xl font-bold">Course Units</h2>
                          </div>
                          <Badge variant="outline" className="px-4 py-1">
                            {courseFields.units.length} Units Total
                          </Badge>
                        </div>
                        <div className="rounded-3xl border border-slate-200 overflow-hidden">
                           <div className="bg-slate-50 p-4 border-b hidden md:grid grid-cols-12 text-xs font-bold uppercase tracking-wider text-slate-500">
                             <div className="col-span-3">Code</div>
                             <div className="col-span-7">Title</div>
                             <div className="col-span-2 text-right">Type</div>
                           </div>
                           <div className="divide-y">
                              {courseFields.units.map((unit) => (
                                <div key={unit.code} className="p-4 grid grid-cols-1 md:grid-cols-12 items-start md:items-center hover:bg-slate-50/50 transition-colors gap-2 md:gap-0">
                                  <div className="md:col-span-3 font-mono text-sm font-bold text-slate-900">{unit.code}</div>
                                  <div className="md:col-span-7 text-sm font-medium text-slate-700">{unit.title}</div>
                                  <div className="md:col-span-2 md:text-right">
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
                        <h2 className="text-2xl md:text-3xl font-bold">Entry Requirements</h2>
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
                          <h2 className="text-2xl md:text-3xl font-bold">Vocational Placement</h2>
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
                                  <li>• Direct support from Optimum Academy</li>
                                  <li>• Assistance in securing a local placement</li>
                                  <li>• Guidance on meeting industry requirements</li>
                                </ul>
                             </div>
                             <div className="space-y-4">
                                <h4 className="font-bold flex items-center gap-2">
                                  <FileText className="h-5 w-5 text-brand-blue-500" />
                                  Support Provided
                                </h4>
                                <p className="text-sm text-slate-600">
                                  We provide a comprehensive Vocational Placement Pack and continuous support to ensure you meet the required workplace experience hours.
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
                          <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
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
                <div className="lg:col-span-4 space-y-8 mt-12 lg:mt-0">
                   <div className="lg:sticky lg:top-24 space-y-8">
                      {/* Enrolment Widget */}
                      <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 h-32 w-32 bg-brand-purple-500/20 blur-3xl rounded-full -mr-16 -mt-16" />
                         <h3 className="text-2xl font-bold mb-2">Ready to start?</h3>
                         <p className="text-slate-400 mb-8 text-sm">
                           {course.courseFields.qualificationCode === 'HLTWHS005'
                             ? 'Get certified in workplace safety and manual handling.'
                             : 'Join the next intake and transform your career.'}
                         </p>

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
                               <span className="font-bold">{courseFields.paymentPlan || 'Contact us'}</span>
                            </div>
                         </div>

                         <Button className="w-full h-14 rounded-full bg-brand-purple-500 hover:bg-brand-purple-600 text-white" size="lg" asChild>
                            <TrackedLink href={courseFields.externalEnrolmentLink}>Enrol Now</TrackedLink>
                         </Button>

                         <div className="relative h-12 w-full mt-4 brightness-0 invert opacity-50">
                            <Image
                              src="/nrt-logo.webp"
                              alt="Nationally Recognised Training"
                              fill
                              className="object-contain"
                            />
                         </div>
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
                         <Button className="w-full rounded-full bg-white text-brand-blue-900 hover:bg-brand-blue-50" asChild>
                            <TrackedLink href="/contact">Schedule a Callback</TrackedLink>
                         </Button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>
      </main>

      {courseFields.brochureLink && (
        <BrochureDownloadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          courseTitle={course.title}
          brochureLink={courseFields.brochureLink}
        />
      )}
    </>
  );
}
