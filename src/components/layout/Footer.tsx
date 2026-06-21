import Link from 'next/link';
import { Mail, MapPin, Phone, Globe } from 'lucide-react';

const footerNavigation = {
  courses: [
    { name: 'Individual Support', href: '/courses/cert-iii-individual-support' },
    { name: 'Disability Support', href: '/courses/cert-iv-disability-support' },
    { name: 'Community Services', href: '/courses' },
    { name: 'Aged Care', href: '/courses' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: Globe },
    { name: 'Instagram', href: '#', icon: Globe },
    { name: 'LinkedIn', href: '#', icon: Globe },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">O</span>
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                Optimum Academy
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Empowering the next generation of care and support professionals in Australia with industry-focused vocational training.
            </p>
            <div className="flex space-x-5">
              {footerNavigation.social.map((item) => (
                <Link key={item.name} href={item.href} className="text-slate-400 hover:text-white">
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
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact Us</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary shrink-0" />
                <span className="text-sm text-slate-400">Melbourne, Victoria, Australia</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary shrink-0" />
                <span className="text-sm text-slate-400">+61 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary shrink-0" />
                <span className="text-sm text-slate-400">info@optimumacademy.edu.au</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Optimum Academy. All rights reserved. RTO Code: [XXXXX]
          </p>
          <p className="text-sm text-slate-500">
            We acknowledge the Traditional Owners of the land on which we work.
          </p>
        </div>
      </div>
    </footer>
  );
}
