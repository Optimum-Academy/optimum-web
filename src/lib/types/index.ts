export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  categories?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  author?: {
    node: {
      name: string;
      avatar?: {
        url: string;
      };
    };
  };
}

export interface CourseUnit {
  code: string;
  title: string;
  type: 'CORE' | 'ELECTIVE';
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  content?: string;
  courseFields: {
    qualificationCode: string;
    cricosCode?: string;
    audience: 'Domestic' | 'International';
    duration: string;
    deliveryMode: string;
    careerOutcomes: string[];
    entryRequirements: string[];
    externalEnrolmentLink: string;
    brochureLink?: string;
    price?: string;
    level?: string;
    totalHours?: string;
    vocationalPlacement?: string;
    whyStudy?: string[];
    whatYouWillLearn?: string[];
    units?: CourseUnit[];
    faqs?: CourseFAQ[];
    structure?: string;
    resources?: {
      provided: string[];
      required: string[];
    };
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export interface Testimonial {
  id: string;
  title: string;
  testimonialFields: {
    studentName: string;
    courseGraduated: string;
    quoteContent: string;
    avatar?: {
      sourceUrl: string;
    };
  };
}

export interface PageMetadata {
  title: string;
  description: string;
  ogImage?: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export interface SiteSettings {
  siteSettingsFields: {
    contactEmail?: string;
    phoneNumber?: string;
    address?: string;
    socialLinks?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      twitter?: string;
    };
    ctaLabels?: {
      primaryCta?: string;
      secondaryCta?: string;
    };
    footerText?: string;
    businessInformation?: {
      rtoCode?: string;
      abn?: string;
    };
  };
}

export interface CareerPathway {
  id: string;
  title: string;
  slug: string;
  careerPathwayFields: {
    description?: string;
    outcomes?: string[];
    salaryRange?: string;
    jobGrowth?: string;
    icon?: {
      sourceUrl: string;
    };
  };
}
