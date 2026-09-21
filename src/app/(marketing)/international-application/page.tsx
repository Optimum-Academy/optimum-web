import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCourses } from '@/lib/api/cms';
import { TrackedLink } from '@/components/ui/tracked-link';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Start Your International Application | Optimum Training Academy',
  description: 'Select an international CRICOS qualification to start your application with Optimum Training Academy.',
};

export default async function InternationalApplicationGatewayPage() {
  const allCourses = await getCourses();
  const internationalCourses = allCourses.filter(
    (course) => course.courseFields.audience === 'International'
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="outline" className="bg-brand-purple-50 text-brand-purple-700 border-brand-purple-200 px-3 py-1 text-xs uppercase font-bold tracking-wider">
              CRICOS Admissions Gateway
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
              Start Your International Application
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Optimum Training Academy welcomes international students. Select the qualification you wish to apply for to launch your dedicated online application form.
            </p>
          </div>

          {/* International Course Gateway Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {internationalCourses.map((course) => {
              const { qualificationCode, cricosCode, duration, deliveryMode, price } = course.courseFields;
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden hover:border-brand-purple-300 transition-all flex flex-col justify-between"
                >
                  <div className="p-8 space-y-6">
                    <div className="flex items-center justify-between gap-2">
                      <Badge className="bg-slate-900 text-white text-xs px-2.5 py-1 font-mono">
                        {qualificationCode}
                      </Badge>
                      {cricosCode && (
                        <span className="text-xs font-mono text-brand-purple-600 font-bold bg-brand-purple-50 px-2.5 py-1 rounded-md">
                          CRICOS: {cricosCode}
                        </span>
                      )}
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2 font-heading">
                        {course.title}
                      </h2>
                      <p className="text-slate-500 text-sm line-clamp-3">
                        {course.courseFields.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2 text-sm text-slate-600 border-t border-slate-100">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Duration:</span>
                        <span className="font-semibold text-slate-800">{duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Delivery Mode:</span>
                        <span className="font-semibold text-slate-800 text-right">{deliveryMode}</span>
                      </div>
                      {price && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Tuition Fee:</span>
                          <span className="font-bold text-brand-purple-600 text-base">{price}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-8 bg-slate-50 border-t border-slate-100">
                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-full border border-slate-300 bg-white text-slate-900 font-bold hover:bg-brand-purple-600 hover:text-white hover:border-brand-purple-600 transition-all flex items-center justify-center gap-2 shadow-sm"
                      asChild
                    >
                      <TrackedLink
                        href={`/courses/${course.slug}/apply`}
                        eventName="international_course_selected"
                        eventParams={{
                          course_code: qualificationCode,
                          cricos_code: cricosCode || '',
                          course_slug: course.slug,
                        }}
                      >
                        <span>Start Your Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </TrackedLink>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info Banner */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-purple-600" />
              Application Process Overview
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>Submit your completed online application form.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>OTA Student Services reviews your eligibility & supporting documents.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>We contact you regarding assessment outcome and Letter of Offer.</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
