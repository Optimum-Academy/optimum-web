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

export interface Course {
  id: string;
  title: string;
  slug: string;
  content?: string;
  courseFields: {
    duration: string;
    deliveryMode: string;
    careerOutcomes: string[];
    entryRequirements: string;
    externalEnrolmentLink: string;
    price?: string;
    level?: string;
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
