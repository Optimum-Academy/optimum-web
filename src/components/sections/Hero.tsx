import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-brand-purple-50 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-brand-blue-50 rounded-full blur-3xl opacity-50 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-brand-purple-100 text-brand-purple-700 hover:bg-brand-purple-100 border-none px-3 py-1">
              Nationally Recognised Training
            </Badge>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Become job-ready for Australia&apos;s <span className="text-primary">growing care sector</span>.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
              Empowering you with the skills, confidence, and industry connections to thrive in Australia’s fast-growing disability, aged care, and community service sectors.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-lg font-semibold shadow-lg shadow-primary/20" asChild>
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold" asChild>
                <Link href="/contact">Enquire Now</Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Expert Industry Trainers',
                'Flexible Learning Options',
                'Job-Ready Certification',
                'Pathway to Employment',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-blue-500" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative lg:h-[600px]">
             {/* Authentic hero image */}
             <div className="w-full h-full min-h-[400px] rounded-3xl bg-slate-100 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731522-7454671420cd?q=80&w=2070')] bg-cover bg-center mix-blend-overlay opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />

                {/* Floating trust card */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur p-6 rounded-2xl border shadow-lg max-w-sm hidden sm:block">
                   <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                         {[1,2,3,4].map(i => (
                           <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
                         ))}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-tight">Become job-ready for in-demand roles in care and community services.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
