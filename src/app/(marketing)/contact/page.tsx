import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Optimum Academy for course enquiries and support.',
};

export default function ContactPage() {
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
                        <p className="text-slate-600">+61 123 456 789</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-blue-100 rounded-xl flex items-center justify-center shrink-0 text-brand-blue-600">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Email Us</h3>
                        <p className="text-slate-600">info@optimumacademy.edu.au</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-purple-100 rounded-xl flex items-center justify-center shrink-0 text-primary">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Visit Us</h3>
                        <p className="text-slate-600">123 Learning Street, Melbourne, VIC 3000</p>
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
                <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border shadow-sm">
                  <h2 className="text-2xl font-bold mb-8 text-slate-900">Send an Enquiry</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Jane" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="jane@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course">Interested Course</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                         <option>Select a course</option>
                         <option>Certificate III in Individual Support</option>
                         <option>Certificate IV in Disability Support</option>
                         <option>Other / General Enquiry</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" />
                    </div>
                    <Button type="submit" size="lg" className="w-full">Submit Enquiry</Button>
                  </form>
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
