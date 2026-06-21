import { Course, Post } from '../types';

/**
 * Mock data for development until CMS is connected
 */

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Diploma of Community Services',
    slug: 'chc52025-diploma-community-services',
    courseFields: {
      qualificationCode: 'CHC52025',
      duration: 'Up to 52 Weeks',
      deliveryMode: 'Online + Vocational Placement',
      level: 'Diploma',
      totalHours: 'Approx. 1230 hours',
      price: '$7,000.00',
      externalEnrolmentLink: '#',
      careerOutcomes: [
        'Community Care Manager',
        'Support Facilitator',
        'Community Development Worker',
        'Case Coordinator',
        'Social Educator',
        'Disability Officer',
      ],
      entryRequirements: [
        'Must be 18 years of age or older',
        'Living or working in Australia',
        'Successful completion of Australian Year 10 or equivalent',
        'Sound Language, Literacy, and Numeracy (LLN) skills',
        'Basic computer skills',
        'Must hold or be eligible to complete HLTAID011 - Provide First Aid prior to placement',
      ],
      whyStudy: [
        'Nationally recognised qualification accredited within the Australian Qualifications Framework (AQF).',
        'Flexible learning model combining online theory with hands-on vocational placement.',
        'Direct pathways to management and coordination roles in the fast-growing community services sector.',
        'Expert support from industry-experienced trainers throughout your 52-week journey.',
      ],
      whatYouWillLearn: [
        'Develop and implement comprehensive service programs for diverse communities.',
        'Facilitate workplace debriefing and professional support processes.',
        'Recognise and respond effectively to complex crisis situations and domestic violence.',
        'Analyse the impacts of sociological factors on community work and service delivery.',
        'Provide high-level advocacy and representation services for clients.',
      ],
      vocationalPlacement: 'A minimum of 400 hours of vocational placement is required within a registered community service centre. This provides real-world experience after completing theoretical units.',
      structure: 'Assessment includes observations (on-the-job or simulation), written questioning, projects, case studies, and third-party reports.',
      resources: {
        provided: [
          'Learner Guides and Assessment Workbooks',
          'Templates for projects and activities',
          'Simulated resources for assessment pathways',
          'Vocational Placement Pack',
        ],
        required: [
          'Computer/laptop with reliable internet access',
          'Microsoft Word and PowerPoint',
          'Adobe Acrobat Reader',
          'HLTAID011 Provide First Aid certificate (obtained externally)',
        ],
      },
      units: [
        { code: 'CHCCCS004', title: 'Assess co-existing needs', type: 'CORE' },
        { code: 'CHCCCS007', title: 'Develop and implement service programs', type: 'CORE' },
        { code: 'CHCCCS019', title: 'Recognise and respond to crisis situations', type: 'CORE' },
        { code: 'CHCCSM013', title: 'Facilitate and review case management', type: 'CORE' },
        { code: 'CHCDEV005', title: 'Analyse impacts of sociological factors on people in community work and services', type: 'CORE' },
        { code: 'CHCDFV001', title: 'Recognise and respond appropriately to domestic and family violence', type: 'CORE' },
        { code: 'CHCDIV001', title: 'Work with diverse people', type: 'CORE' },
        { code: 'CHCDIV002', title: 'Promote Aboriginal and/or Torres Strait Islander cultural safety', type: 'CORE' },
        { code: 'CHCLEG003', title: 'Manage legal and ethical compliance', type: 'CORE' },
        { code: 'CHCMGT005', title: 'Facilitate workplace debriefing and support processes', type: 'CORE' },
        { code: 'CHCPRP003', title: 'Reflect on and improve own professional practice', type: 'CORE' },
        { code: 'HLTWHS003', title: 'Maintain work health and safety', type: 'CORE' },
        { code: 'CHCCSM012', title: 'Coordinate complex case requirements', type: 'ELECTIVE' },
        { code: 'CHCADV002', title: 'Provide advocacy and representation services', type: 'ELECTIVE' },
        { code: 'CHCADV005', title: 'Provide systems advocacy services', type: 'ELECTIVE' },
        { code: 'CHCCCS009', title: 'Facilitate responsible behaviour', type: 'ELECTIVE' },
        { code: 'CHCCOM003', title: 'Develop workplace communication strategies', type: 'ELECTIVE' },
        { code: 'CHCMGT003', title: 'Lead the work team', type: 'ELECTIVE' },
        { code: 'CHCPRP001', title: 'Develop and maintain networks and collaborative partnerships', type: 'ELECTIVE' },
        { code: 'CHCCDE027', title: 'Implement community development strategies', type: 'ELECTIVE' },
      ],
      faqs: [
        {
          question: 'Do I need to find my own vocational placement?',
          answer: 'You have options: you can source your own provider (subject to suitability check), ask Optimum Training Academy for assistance, or use our established network of partners including Spry Support Services and Dynamic Care.'
        },
        {
          question: 'What happens if I don\'t meet the LLN requirements?',
          answer: 'You may still be able to enrol if your trainer endorses your application and we can implement specific support strategies to help you succeed.'
        },
        {
          question: 'Is First Aid included in the course?',
          answer: 'Optimum Training Academy does not currently deliver HLTAID011 - Provide First Aid. You must obtain this unit from an external provider before starting your vocational placement.'
        },
        {
          question: 'Are there payment plans available?',
          answer: 'Yes. After an initial deposit of $1,500, you can pay the remainder through 11 scheduled monthly payments of $500.00.'
        }
      ]
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
      qualificationCode: 'CHC43121',
      duration: '9 Months',
      deliveryMode: 'On-campus',
      careerOutcomes: [
        'Disability Officer',
        'Social Educator',
        'Behavioural Support Officer',
      ],
      entryRequirements: ['Certificate III in Individual Support'],
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
