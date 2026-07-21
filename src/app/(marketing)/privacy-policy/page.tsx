import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Metadata } from 'next';
import { Shield, FileDown, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Optimum Training Academy. Learn how we collect, use, store, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  const officialPdfUrl = 'https://cms.optimumacademy.edu.au/wp-content/uploads/2026/07/OTA-Privacy-Policy-V1.pdf';

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-50 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header section */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-8 text-center md:text-left md:flex md:items-center md:justify-between gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple-50 text-brand-purple-700 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Shield className="h-4 w-4" />
                  Legal Statement
                </div>
                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                  Privacy Policy
                </h1>
                <p className="text-slate-500 font-medium text-sm">
                  Last Updated: 22 March 2026
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <Button asChild className="rounded-full gap-2 h-12 px-6" variant="outline">
                  <a href={officialPdfUrl} target="_blank" rel="noopener noreferrer">
                    <FileDown className="h-4 w-4" />
                    Download Official PDF
                  </a>
                </Button>
              </div>
            </div>

            {/* Privacy Policy content */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm prose prose-slate max-w-none space-y-8">
              <p className="text-slate-600 leading-relaxed text-lg">
                At Optimum Training Academy Pty Ltd (RTO 46534 | CRICOS Provider 04432K), we are committed to protecting your privacy and handling your personal information responsibly. This Privacy Policy explains how we collect, use, store, disclose, and protect your information in accordance with Australian privacy legislation.
              </p>

              <hr className="border-slate-100" />

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Who We Are</h2>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700 font-medium">
                  <div>
                    <p className="font-bold text-slate-900">Optimum Training Academy Pty Ltd</p>
                    <p>RTO: 46534</p>
                    <p>CRICOS Provider: 04432K</p>
                    <p>ABN: 80 660 726 483</p>
                  </div>
                  <div className="space-y-1">
                    <p className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                      <span>28B Anderson Walk, Smithfield Plains SA 5114</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>04 5923 4184</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>enquiries@optimumacademy.edu.au</span>
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Information We Collect</h2>
                <p className="text-slate-600 leading-relaxed">
                  Depending on your interaction with us, we may collect information including:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 text-sm list-disc pl-5 font-medium">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Residential address</li>
                  <li>Date of birth</li>
                  <li>Country of birth</li>
                  <li>Language spoken at home</li>
                  <li>Employment information</li>
                  <li>Education history</li>
                  <li>Disability information (where relevant)</li>
                  <li>Unique Student Identifier (USI)</li>
                  <li>Enrolment and course information</li>
                  <li>Website enquiry details</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  We only collect information that is necessary to provide our education, training, student support, and related services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">How We Collect Your Information</h2>
                <p className="text-slate-600 leading-relaxed">
                  We collect personal information when you:
                </p>
                <ul className="space-y-2 text-slate-700 text-sm list-disc pl-5 font-medium">
                  <li>Submit an enquiry form</li>
                  <li>Apply or enrol in a course</li>
                  <li>Download brochures or course information</li>
                  <li>Contact us by phone or email</li>
                  <li>Subscribe to newsletters</li>
                  <li>Complete surveys or feedback forms</li>
                  <li>Interact with our website</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">How We Use Your Information</h2>
                <p className="text-slate-600 leading-relaxed">
                  Your information may be used to:
                </p>
                <ul className="space-y-2 text-slate-700 text-sm list-disc pl-5 font-medium">
                  <li>Respond to enquiries</li>
                  <li>Process enrolments</li>
                  <li>Deliver training and assessment services</li>
                  <li>Provide student support</li>
                  <li>Issue qualifications and Statements of Attainment</li>
                  <li>Meet regulatory reporting obligations</li>
                  <li>Improve our services</li>
                  <li>Send important course information</li>
                  <li>Send marketing communications where you have consented or where permitted by law</li>
                </ul>
                <p className="text-slate-600 leading-relaxed font-semibold">
                  We will not use your information for unrelated purposes without your consent unless required or authorised by law.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Marketing Communications</h2>
                <p className="text-slate-600 leading-relaxed">
                  If you choose to receive updates from us, we may send information about:
                </p>
                <ul className="space-y-2 text-slate-700 text-sm list-disc pl-5 font-medium">
                  <li>New courses</li>
                  <li>Upcoming intakes</li>
                  <li>Events</li>
                  <li>Promotions</li>
                  <li>Newsletters</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  You may unsubscribe at any time using the unsubscribe link included in our emails or by contacting us directly.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Sharing Your Information</h2>
                <p className="text-slate-600 leading-relaxed">
                  We may disclose your information to:
                </p>
                <ul className="space-y-2 text-slate-700 text-sm list-disc pl-5 font-medium">
                  <li>Commonwealth and State Government agencies</li>
                  <li>National Centre for Vocational Education Research (NCVER)</li>
                  <li>Regulatory authorities</li>
                  <li>Service providers assisting us in delivering education services</li>
                  <li>Third-party providers where required to support your enrolment or learning experience</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  We will only disclose personal information where required by law, with your consent, or where reasonably necessary to provide our services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Unique Student Identifier (USI)</h2>
                <p className="text-slate-600 leading-relaxed">
                  Where we assist you in obtaining a Unique Student Identifier (USI), we will collect only the information required for that purpose and securely handle it in accordance with the Student Identifiers Act 2014. Information collected solely for a USI application will be securely destroyed when it is no longer required, unless we are legally required to retain it.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Website Cookies & Analytics</h2>
                <p className="text-slate-600 leading-relaxed">
                  Our website may use cookies and similar technologies to:
                </p>
                <ul className="space-y-2 text-slate-700 text-sm list-disc pl-5 font-medium">
                  <li>Improve website performance</li>
                  <li>Analyse website traffic</li>
                  <li>Remember user preferences</li>
                  <li>Support marketing and advertising activities</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  You can manage cookie preferences through your web browser settings.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Data Security</h2>
                <p className="text-slate-600 leading-relaxed">
                  We take reasonable steps to protect your personal information against:
                </p>
                <ul className="space-y-2 text-slate-700 text-sm list-disc pl-5 font-medium">
                  <li>Unauthorised access</li>
                  <li>Loss</li>
                  <li>Misuse</li>
                  <li>Interference</li>
                  <li>Modification</li>
                  <li>Disclosure</li>
                </ul>
                <p className="text-slate-600 leading-relaxed italic text-sm">
                  While we use appropriate security measures, no method of electronic transmission or storage can be guaranteed to be completely secure.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Accessing or Correcting Your Information</h2>
                <p className="text-slate-600 leading-relaxed">
                  You may request access to your personal information or request corrections if you believe it is inaccurate, incomplete, or out of date. Where appropriate, we will correct your information within a reasonable timeframe in accordance with Australian Privacy Principles.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Student Records</h2>
                <p className="text-slate-600 leading-relaxed">
                  Student records are maintained in accordance with Australian regulatory requirements. Optimum Training Academy retains sufficient student records to enable qualifications and Statements of Attainment to be reissued for at least 30 years, as required for Registered Training Organisations.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">International Students</h2>
                <p className="text-slate-600 leading-relaxed">
                  Where personal information is disclosed internationally, we take reasonable steps to ensure overseas recipients handle your information in accordance with Australian privacy obligations where applicable.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Complaints</h2>
                <p className="text-slate-600 leading-relaxed">
                  If you believe your privacy has been breached or you have concerns about how your personal information has been handled, please contact us first so we can investigate and resolve the matter.
                </p>
                <p className="text-slate-700 font-bold">
                  Email: <a href="mailto:enquiries@optimumacademy.edu.au" className="text-brand-purple-600 hover:underline">enquiries@optimumacademy.edu.au</a>
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Changes to This Policy</h2>
                <p className="text-slate-600 leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in legislation, regulatory requirements, or our business operations. The latest version will always be published on our website.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Contact Us</h2>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-slate-700 text-sm font-medium space-y-1">
                  <p className="font-bold text-slate-900">Optimum Training Academy Pty Ltd</p>
                  <p>28B Anderson Walk</p>
                  <p>Smithfield Plains SA 5114</p>
                  <p>Phone: 04 5923 4184</p>
                  <p>Email: <a href="mailto:enquiries@optimumacademy.edu.au" className="text-brand-purple-600 hover:underline">enquiries@optimumacademy.edu.au</a></p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
