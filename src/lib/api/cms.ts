import { Course, Post } from '../types';

/**
 * Mock data for development until CMS is connected
 */

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Certificate III in Individual Support',
    slug: 'cert-iii-individual-support',
    courseFields: {
      duration: '6 Months',
      deliveryMode: 'Blended',
      careerOutcomes: [
        'Personal Care Assistant',
        'Support Worker',
        'In-home Respite Caregiver',
      ],
      entryRequirements: 'Year 10 or equivalent',
      externalEnrolmentLink: '#',
      level: 'Certificate III',
    },
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070',
        altText: 'Care worker assisting an elderly person',
      },
    },
  },
  {
    id: '2',
    title: 'Certificate IV in Disability Support',
    slug: 'cert-iv-disability-support',
    courseFields: {
      duration: '9 Months',
      deliveryMode: 'On-campus',
      careerOutcomes: [
        'Disability Officer',
        'Social Educator',
        'Behavioural Support Officer',
      ],
      entryRequirements: 'Certificate III in Individual Support',
      externalEnrolmentLink: '#',
      level: 'Certificate IV',
    },
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932',
        altText: 'Healthcare professionals in discussion',
      },
    },
  },
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    title: 'Building a Career in Australia’s Care Sector',
    slug: 'career-in-australia-care-sector',
    excerpt: 'Discover why the care and support sector is one of Australia’s fastest-growing industries.',
    date: '2024-03-20',
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070',
        altText: 'A nursing student practicing',
      },
    },
    categories: {
      nodes: [{ name: 'Career Advice', slug: 'career-advice' }],
    },
  },
];

export const getCourses = async (): Promise<Course[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockCourses;
};

export const getCourseBySlug = async (slug: string): Promise<Course | null> => {
  return mockCourses.find((c) => c.slug === slug) || null;
};

export const getPosts = async (): Promise<Post[]> => {
  return mockPosts;
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  return mockPosts.find((p) => p.slug === slug) || null;
};
