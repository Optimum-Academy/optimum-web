import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, Globe, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { getSiteSettings } from '@/lib/api/cms';

const footerNavigation = {
  courses: [
    { name: 'Diploma of Community Services', href: '/courses/chc52025-diploma-community-services' },
    { name: 'Diploma of Community Services (International)', href: '/courses/chc52025-diploma-community-services-international' },
    { name: 'Certificate III in Individual Support', href: '/courses/chc33021-certificate-iii-individual-support' },
    { name: 'Certificate III in Individual Support (International)', href: '/courses/chc33021-certificate-iii-individual-support-international' },
    { name: 'Provide First Aid', href: '/courses/hltaid011-provide-first-aid' },
    { name: 'Conduct manual tasks safely', href: '/courses/hltwhs005-manual-tasks-safely' },
    { name: 'Provide CPR', href: '/courses/hltaid009-provide-cardiopulmonary-resuscitation' },
  ],
  company: [
    { name: 'Student Portal', href: 'https://optimumtrainingacademy.rto.net.au/Account/Index', external: true },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ],
};

export async function Footer() {
  const settings = await getSiteSettings();
  const fields = settings?.siteSettingsFields;

  const socialLinks = [
    { name: 'Facebook', href: fields?.socialLinks?.facebook, icon: Facebook },
    { name: 'Instagram', href: fields?.socialLinks?.instagram, icon: Instagram },
    { name: 'LinkedIn', href: fields?.socialLinks?.linkedin, icon: Linkedin },
    { name: 'Twitter', href: fields?.socialLinks?.twitter, icon: Twitter },
  ].filter(link => link.href);

  // Default social links if none in CMS
  const finalSocialLinks = socialLinks.length > 0 ? socialLinks : [
    { name: 'Facebook', href: '#', icon: Globe },
    { name: 'Instagram', href: '#', icon: Globe },
    { name: 'LinkedIn', href: '#', icon: Globe },
  ];

  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-12 w-40">
                <Image
                  src="/logo.png"
                  alt="Optimum Academy Logo"
                  fill
                  className="object-contain object-left brightness-0 invert"
                />
              </div>
            </Link>
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-slate-400">
                {fields?.footerText || 'Empowering the next generation of care and support professionals in Australia with industry-focused vocational training.'}
              </p>
              <div className="relative h-16 w-32 grayscale brightness-200 opacity-80 transition-all hover:grayscale-0 hover:opacity-100">
                <Image
                  src="/nrt-logo.webp"
                  alt="Nationally Recognised Training"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <div className="flex space-x-5">
              {finalSocialLinks.map((item) => (
                <Link key={item.name} href={item.href || '#'} className="text-slate-400 hover:text-white">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Top Courses</h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.courses.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact Us</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary shrink-0" />
                <span className="text-sm text-slate-400 text-balance">
                  {fields?.address ? (
                    <span dangerouslySetInnerHTML={{ __html: fields.address.replace(/\n/g, '<br />') }} />
                  ) : (
                    <>
                      28B Anderson Walk<br />
                      Smithfield Plains SA 5114<br />
                      Australia
                    </>
                  )}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary shrink-0" />
                <span className="text-sm text-slate-400">{fields?.phoneNumber || '08 7095 9486'}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary shrink-0" />
                <span className="text-sm text-slate-400">{fields?.contactEmail || 'enquiries@optimumacademy.edu.au'}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Optimum Academy. All rights reserved. RTO Code: {fields?.businessInformation?.rtoCode || '46534'}
          </p>
          <p className="text-sm text-slate-500">
            We acknowledge the Traditional Owners of the land on which we work.
          </p>
        </div>
      </div>
    </footer>
  );
}
