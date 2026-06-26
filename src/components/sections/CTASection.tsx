import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-16 text-center shadow-2xl lg:px-16 lg:py-24">
          {/* Decorative circles */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-brand-blue-500/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Start Your Career in Care?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
              Speak with our friendly student advisors today to find the right course for your career goals.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-14 px-10 text-lg font-semibold w-full sm:w-auto" asChild>
                <Link href="/contact">Enquire Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-semibold text-white border-slate-700 hover:bg-slate-800 w-full sm:w-auto" asChild>
                <Link href="/courses">View All Courses</Link>
              </Button>
            </div>
            <p className="mt-8 text-sm text-slate-400">
              No obligation enquiry • Personalised career guidance • RTO Accredited
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
