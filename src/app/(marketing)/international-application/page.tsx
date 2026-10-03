import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getCourses } from '@/lib/api/cms';
import { TrackedLink } from '@/components/ui/tracked-link';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, GraduationCap, ArrowRight, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'International Student Applications | Optimum Training Academy',
  description: 'Apply for CRICOS international qualifications at Optimum Training Academy. Choose your course and start your application today.',
};

export default async function InternationalApplicationPage() {
  const allCourses = await getCourses();
  const internationalCourses = allCourses.filter(c => c.courseFields.audience === 'International');

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-slate-900 py-12 sm:py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,#6F1D77,transparent)]" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple-300 bg-brand-purple-900/60 border border-brand-purple-500/30 px-4 py-1.5 rounded-full inline-block mb-4">
              CRICOS Registered Provider • RTO 46534
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 font-heading leading-tight">
              International Student Admissions
            </h1>
            <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto">
              Welcome to Optimum Training Academy. Select your intended course of study below to begin your official CRICOS student application.
            </p>
          </div>
        </section>

        {/* Application Process Overview */}
        <section className="py-10 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-center text-sm font-bold uppercase tracking-wider text-slate-500 mb-8">
                Simple 3-Step Application Journey
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border">
                  <div className="w-8 h-8 rounded-full bg-brand-purple-600 text-white font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">Select Course</h3>
                    <p className="text-xs text-slate-600">Choose your CRICOS qualification below and click &quot;Start Your Application&quot;.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border">
                  <div className="w-8 h-8 rounded-full bg-brand-purple-600 text-white font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">Submit Application</h3>
                    <p className="text-xs text-slate-600">Complete our online form with your personal, education, and passport details.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border">
                  <div className="w-8 h-8 rounded-full bg-brand-purple-600 text-white font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">Assessment & Offer</h3>
                    <p className="text-xs text-slate-600">Our Admissions Team reviews your application and contacts you regarding next steps.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Available International Courses */}
        <section className="py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                Select Your International Course
              </h2>
              <p className="text-slate-600 text-base mt-2">
                Choose a CRICOS qualification to open its dedicated application form.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {internationalCourses.map((course) => {
                const cleanTitle = course.title.replace(/\s*\d{5,6}[A-Z]?$/, '');
                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-3xl border shadow-lg overflow-hidden flex flex-col hover:border-brand-purple-300 transition-all duration-300"
                  >
                    {/* Image Header */}
                    <div className="relative aspect-[16/9] bg-slate-900">
                      {course.featuredImage?.node.sourceUrl ? (
                        <Image
                          src={course.featuredImage.node.sourceUrl}
                          alt={course.featuredImage.node.altText || cleanTitle}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Globe className="w-12 h-12" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <Badge className="bg-brand-purple-600 text-white font-mono text-xs px-3 py-1">
                          {course.courseFields.qualificationCode}
                        </Badge>
                        {course.courseFields.cricosCode && (
                          <Badge variant="outline" className="bg-white/90 backdrop-blur text-slate-900 font-mono text-xs border-none font-bold">
                            CRICOS: {course.courseFields.cricosCode}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-3">
                          {cleanTitle}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                          {course.courseFields.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-brand-purple-600 shrink-0" />
                            <span><strong>Duration:</strong> {course.courseFields.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-brand-purple-600 shrink-0" />
                            <span><strong>Delivery:</strong> {course.courseFields.deliveryMode}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-slate-100">
                        <TrackedLink
                          href={`/courses/${course.slug}/apply`}
                          className="w-full bg-brand-purple-600 hover:bg-brand-purple-700 text-white rounded-full font-bold h-12 text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                        >
                          <span>Start Your Application</span>
                          <ArrowRight className="w-4 h-4" />
                        </TrackedLink>

                        <TrackedLink
                          href={`/courses/${course.slug}`}
                          className="w-full border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full text-xs font-semibold h-10 flex items-center justify-center transition-colors"
                        >
                          <span>View Course Overview &amp; Units</span>
                        </TrackedLink>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Need Advice Section */}
        <section className="py-12 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="p-8 sm:p-10 rounded-3xl bg-brand-blue-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-brand-blue-300 text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
                  <GraduationCap className="w-4 h-4" />
                  <span>Student Admissions Support</span>
                </div>
                <h3 className="text-2xl font-bold font-heading">Need Advice Before Applying?</h3>
                <p className="text-brand-blue-200 text-sm max-w-xl">
                  Unsure which qualification suits your career goals or need assistance with entry requirements and application guidelines? Our Student Support team is here to guide you.
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto text-center">
                <TrackedLink
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white text-brand-blue-900 hover:bg-brand-blue-50 font-bold rounded-full px-8 h-12 text-sm w-full md:w-auto transition-colors shadow-md"
                >
                  Contact Student Support
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
