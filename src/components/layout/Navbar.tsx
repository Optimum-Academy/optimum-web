import { getSiteSettings, getCourses } from '@/lib/api/cms';
import { NavbarClient } from './NavbarClient';

export async function Navbar() {
  const [settings, courses] = await Promise.all([
    getSiteSettings(),
    getCourses(),
  ]);

  return <NavbarClient courses={courses} siteSettings={settings} />;
}
