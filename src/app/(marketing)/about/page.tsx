import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CTASection } from '@/components/sections/CTASection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Optimum Academy\'s mission to provide quality vocational training in Australia.',
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* About Hero */}
        <section className="relative py-12 md:py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
               <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-8">
                 Empowering Careers in <span className="text-primary">Community Care.</span>
               </h1>
               <p className="text-xl text-slate-600 leading-relaxed">
                 Optimum Academy was founded with a clear mission: to bridge the skills gap in Australia’s care and support sectors by providing high-quality, industry-focused vocational training.
               </p>
            </div>
          </div>
        </section>

        {/* Mission/Vision */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="bg-white p-6 md:p-10 rounded-3xl border shadow-sm">
                   <h2 className="text-xl md:text-2xl font-bold mb-4 text-primary">Our Mission</h2>
                   <p className="text-slate-600 leading-relaxed">
                     To provide accessible and exceptional education that empowers individuals to build meaningful careers and make a positive impact in the lives of those they care for.
                   </p>
                </div>
                <div className="bg-white p-6 md:p-10 rounded-3xl border shadow-sm">
                   <h2 className="text-xl md:text-2xl font-bold mb-4 text-brand-blue-600">Our Vision</h2>
                   <p className="text-slate-600 leading-relaxed">
                     To be the leading vocational training provider in Australia, recognised for producing highly skilled, compassionate, and employment-ready professionals.
                   </p>
                </div>
             </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-12 md:py-20 bg-white">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                 <h2 className="text-2xl sm:text-4xl font-bold mb-4">Why Choose Optimum Academy?</h2>
                 <p className="text-slate-600">We go beyond the classroom to ensure our students are ready for the real world.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {[
                   { title: 'Industry Experts', desc: 'Our trainers are active professionals in the care sector.' },
                   { title: 'Modern Facilities', desc: 'Practical training rooms that simulate real-world environments.' },
                   { title: 'Supportive Culture', desc: 'We treat our students as individuals with unique goals.' },
                   { title: 'Job Placement', desc: 'Strong links with healthcare providers across the country.' }
                 ].map((item, i) => (
                   <div key={i} className="text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                         <span className="text-2xl font-bold text-primary">{i+1}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
