'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Course } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrackedLink } from '@/components/ui/tracked-link';
import { BrochureDownloadModal } from '@/components/modals/BrochureDownloadModal';
import {
  Clock,
  BookOpen,
  GraduationCap,
  Award,
  CheckCircle2,
  FileText,
  Download,
  HelpCircle,
  ShieldCheck,
  Globe,
  Briefcase
} from 'lucide-react';

interface CourseContentProps {
  course: Course;
}

export function CourseContent({ course }: CourseContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { courseFields } = course;

  return (
    <>
      <main className="flex-1 bg-white">
        {/* Course Header / Hero */}
        <section className="relative bg-slate-900 text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            {course.featuredImage?.node?.sourceUrl && (
              <Image
                src={course.featuredImage.node.sourceUrl}
                alt={course.featuredImage.node.altText || course.title}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
          </div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-brand-purple-500 text-white hover:bg-brand-purple-600 font-mono text-xs px-3 py-1">
                  {courseFields.qualificationCode}
                </Badge>
                {courseFields.cricosCode && (
                  <Badge variant="outline" className="text-brand-purple-300 border-brand-purple-400 font-mono text-xs px-3 py-1">
                    CRICOS: {courseFields.cricosCode}
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 text-xs px-3 py-1">
                  {courseFields.audience}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight">
                {course.title}
              </h1>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                {courseFields.description}
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-sm">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-brand-purple-400 shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-400">Duration</span>
                    <span className="font-semibold">{courseFields.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-brand-purple-400 shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-400">Delivery</span>
                    <span className="font-semibold">{courseFields.deliveryMode}</span>
                  </div>
                </div>

                {courseFields.level && (
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-brand-purple-400 shrink-0" />
                    <div>
                      <span className="block text-xs text-slate-400">Level</span>
                      <span className="font-semibold">{courseFields.level}</span>
                    </div>
                  </div>
                )}

                {courseFields.totalHours && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-brand-purple-400 shrink-0" />
                    <div>
                      <span className="block text-xs text-slate-400">Hours</span>
                      <span className="font-semibold">{courseFields.totalHours}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="h-12 px-8 rounded-full bg-brand-purple-500 hover:bg-brand-purple-600 text-white font-bold" size="lg" asChild>
                  <TrackedLink
                    href={
                      courseFields.audience === 'International'
                        ? `/courses/${course.slug}/apply`
                        : courseFields.externalEnrolmentLink
                    }
                  >
                    {courseFields.audience === 'International' ? 'Start Your Application' : 'Enrol Now'}
                  </TrackedLink>
                </Button>

                {courseFields.brochureLink && (
                  <Button
                    variant="outline"
                    className="h-12 px-6 rounded-full border-white/20 text-white hover:bg-white/10 font-bold flex items-center gap-2"
                    size="lg"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Download className="h-4 w-4" />
                    Download Course Guide
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs Bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 overflow-x-auto py-4 text-sm font-medium scrollbar-none">
              <a href="#overview" className="text-brand-purple-600 border-b-2 border-brand-purple-600 pb-4 -mb-4 whitespace-nowrap">Overview</a>
              <a href="#what-you-will-learn" className="text-slate-600 hover:text-slate-900 pb-4 -mb-4 whitespace-nowrap">What You Will Learn</a>
              {courseFields.units && courseFields.units.length > 0 && (
                <a href="#units" className="text-slate-600 hover:text-slate-900 pb-4 -mb-4 whitespace-nowrap">Units of Competency</a>
              )}
              {courseFields.careerOutcomes && courseFields.careerOutcomes.length > 0 && (
                <a href="#outcomes" className="text-slate-600 hover:text-slate-900 pb-4 -mb-4 whitespace-nowrap">Career Outcomes</a>
              )}
              <a href="#requirements" className="text-slate-600 hover:text-slate-900 pb-4 -mb-4 whitespace-nowrap">Entry Requirements</a>
              {courseFields.vocationalPlacement && (
                <a href="#placement" className="text-slate-600 hover:text-slate-900 pb-4 -mb-4 whitespace-nowrap">Vocational Placement</a>
              )}
              {courseFields.faqs && (
                <a href="#faq" className="text-slate-600 hover:text-slate-900 pb-4 -mb-4 whitespace-nowrap">FAQs</a>
              )}
            </nav>
          </div>
        </div>

        {/* Content Body */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-16">
                   {/* Overview */}
                   <div id="overview" className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                        <h2 className="text-2xl md:text-3xl font-bold font-heading">Course Overview</h2>
                      </div>
                      <p className="text-slate-600 text-lg leading-relaxed">
                        {courseFields.description}
                      </p>

                      {courseFields.whyStudy && courseFields.whyStudy.length > 0 && (
                        <div className="mt-8 p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-4">
                          <h3 className="text-xl font-bold text-slate-900">Why Study This Course with Optimum Training Academy?</h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {courseFields.whyStudy.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                   </div>

                   {/* What You Will Learn */}
                   {courseFields.whatYouWillLearn && courseFields.whatYouWillLearn.length > 0 && (
                     <div id="what-you-will-learn" className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                          <h2 className="text-2xl md:text-3xl font-bold font-heading">What You Will Learn</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {courseFields.whatYouWillLearn.map((item, i) => (
                            <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-start gap-3">
                              <BookOpen className="h-5 w-5 text-brand-purple-500 shrink-0 mt-0.5" />
                              <span className="text-slate-700 font-medium text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                     </div>
                   )}

                   {/* Units of Competency */}
                   {courseFields.units && courseFields.units.length > 0 && (
                     <div id="units" className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                          <h2 className="text-2xl md:text-3xl font-bold font-heading">Units of Competency</h2>
                        </div>
                        <div className="divide-y border border-slate-200 rounded-2xl overflow-hidden bg-white">
                          {courseFields.units.map((unit, i) => (
                            <div key={i} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                              <div className="flex items-center gap-3">
                                <Badge variant={unit.type === 'CORE' ? 'default' : 'secondary'} className="font-mono text-xs">
                                  {unit.type}
                                </Badge>
                                <div>
                                  <span className="font-mono text-xs font-bold text-slate-500 block sm:inline mr-2">{unit.code}</span>
                                  <span className="font-semibold text-slate-900 text-sm">{unit.title}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                     </div>
                   )}

                   {/* Career Outcomes */}
                   {courseFields.careerOutcomes && courseFields.careerOutcomes.length > 0 && (
                     <div id="outcomes" className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                          <h2 className="text-2xl md:text-3xl font-bold font-heading">Career Opportunities</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {courseFields.careerOutcomes.map((outcome, i) => (
                            <div key={i} className="p-5 rounded-2xl bg-brand-purple-50/50 border border-brand-purple-100 flex items-center gap-3">
                              <Briefcase className="h-5 w-5 text-brand-purple-600 shrink-0" />
                              <span className="font-semibold text-slate-800 text-sm">{outcome}</span>
                            </div>
                          ))}
                        </div>
                     </div>
                   )}

                   {/* Entry Requirements */}
                   <div id="requirements" className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                        <h2 className="text-2xl md:text-3xl font-bold font-heading">Entry Requirements</h2>
                      </div>
                      <div className="p-6 md:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
                        <ul className="space-y-3">
                          {courseFields.entryRequirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                   </div>

                   {/* Vocational Placement */}
                   {courseFields.vocationalPlacement && (
                     <div id="placement" className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                          <h2 className="text-2xl md:text-3xl font-bold font-heading">Vocational Placement</h2>
                        </div>
                        <div className="p-6 md:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
                          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                            {courseFields.vocationalPlacement}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                             <div className="space-y-2">
                                <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                                  Placement Support
                                </h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                  Optimum Academy provides dedicated placement officers to support learners in securing appropriate host facilities and managing logbooks.
                                </p>
                             </div>
                             <div className="space-y-2">
                                <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                                  <FileText className="h-5 w-5 text-brand-purple-600" />
                                  Logbook & Documentation
                                </h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                  A complete Vocational Placement Pack including supervisor sign-off forms and assessment tasks will be provided upon course commencement.
                                </p>
                             </div>
                          </div>
                        </div>
                     </div>
                   )}

                   {/* FAQs */}
                   {courseFields.faqs && courseFields.faqs.length > 0 && (
                     <div id="faq" className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="h-1 w-12 bg-brand-purple-500 rounded-full" />
                          <h2 className="text-2xl md:text-3xl font-bold font-heading">Frequently Asked Questions</h2>
                        </div>
                        <div className="space-y-4">
                           {courseFields.faqs.map((faq, i) => (
                             <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2">
                                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                                  <HelpCircle className="h-5 w-5 text-brand-purple-500 shrink-0" />
                                  {faq.question}
                                </h3>
                                <p className="text-slate-600 text-sm pl-7 leading-relaxed">{faq.answer}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                   )}
                </div>

                {/* Sidebar Widget Area */}
                <div className="lg:col-span-4 space-y-8">
                   <div className="lg:sticky lg:top-24 space-y-8">
                      {/* Enrolment Widget */}
                      <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden space-y-6">
                         <div className="space-y-2">
                           <span className="text-xs font-mono text-brand-purple-300 uppercase tracking-wider block">
                             {courseFields.audience} Application
                           </span>
                           <h3 className="text-2xl font-bold font-heading">Ready to Start?</h3>
                           <p className="text-slate-400 text-sm">
                             {courseFields.audience === 'International'
                               ? 'Submit your application for review by OTA Student Services.'
                               : 'Join the next intake and transform your career path.'}
                           </p>
                         </div>

                         <div className="space-y-4 text-sm border-t border-white/10 pt-4">
                            <div className="flex justify-between items-center">
                               <span className="text-slate-400">Course Code</span>
                               <span className="font-mono font-bold">{courseFields.qualificationCode}</span>
                            </div>
                            {courseFields.cricosCode && (
                              <div className="flex justify-between items-center">
                                <span className="text-slate-400">CRICOS Code</span>
                                <span className="font-mono font-bold text-brand-purple-300">{courseFields.cricosCode}</span>
                              </div>
                            )}
                            {courseFields.price && (
                              <div className="flex justify-between items-center">
                                <span className="text-slate-400">Tuition Fee</span>
                                <span className="font-bold text-brand-purple-300">{courseFields.price}</span>
                              </div>
                            )}
                         </div>

                         <Button className="w-full h-14 rounded-full bg-brand-purple-500 hover:bg-brand-purple-600 text-white font-bold" size="lg" asChild>
                            <TrackedLink
                              href={
                                courseFields.audience === 'International'
                                  ? `/courses/${course.slug}/apply`
                                  : courseFields.externalEnrolmentLink
                              }
                            >
                              {courseFields.audience === 'International' ? 'Start Your Application' : 'Enrol Now'}
                            </TrackedLink>
                         </Button>

                         {courseFields.audience === 'International' && (
                           <p className="text-xs text-slate-400 text-center leading-normal">
                             * Application assessment phase. No payment is charged upon submission.
                           </p>
                         )}
                      </div>

                      {/* Contact Box */}
                      <div className="p-8 rounded-[2.5rem] bg-brand-purple-900 text-white shadow-xl space-y-4">
                         <GraduationCap className="h-10 w-10 text-brand-purple-300" />
                         <h3 className="text-xl font-bold font-heading">Need Assistance?</h3>
                         <p className="text-brand-purple-100 text-sm leading-relaxed">
                           Our Admissions and Student Services team is available to help answer questions regarding entry requirements or application steps.
                         </p>
                         <Button variant="secondary" className="w-full rounded-full bg-white text-slate-900 hover:bg-slate-100 font-bold" asChild>
                            <TrackedLink href="/contact">Contact Student Services</TrackedLink>
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
