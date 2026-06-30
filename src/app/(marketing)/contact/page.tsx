import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/api/cms';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Optimum Academy. We are here to help you with your vocational education and training needs.',
};

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();
  const settings = siteSettings?.siteSettingsFields;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <div>
                  <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900 mb-6">
                    Get in Touch
                  </h1>
                  <p className="text-lg text-slate-600 mb-12">
                    Have questions about our courses or the enrolment process? Our friendly team is here to help you start your career journey.
                  </p>

                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-purple-100 rounded-xl flex items-center justify-center shrink-0 text-primary">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Call Us</h3>
                        <p className="text-slate-600">{settings?.phoneNumber || '08 7095 9486'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-blue-100 rounded-xl flex items-center justify-center shrink-0 text-brand-blue-600">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Email Us</h3>
                        <p className="text-slate-600">{settings?.contactEmail || 'enquiries@optimumacademy.edu.au'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-purple-100 rounded-xl flex items-center justify-center shrink-0 text-primary">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Visit Us</h3>
                        <p className="text-slate-600">{settings?.address || '28B Anderson Walk, Smithfield Plains SA 5114'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-blue-100 rounded-xl flex items-center justify-center shrink-0 text-brand-blue-600">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Opening Hours</h3>
                        <p className="text-slate-600">Mon - Fri: 9am - 5pm</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
