import { fetchGraphQL } from '../graphql/client';
import { GET_COURSES, GET_COURSE_BY_SLUG } from '../graphql/queries/courses';
import { GET_POSTS, GET_POST_BY_SLUG } from '../graphql/queries/posts';
import { GET_TESTIMONIALS } from '../graphql/queries/testimonials';
import { GET_SITE_SETTINGS } from '../graphql/queries/siteSettings';
import { GET_PAGE_BY_SLUG } from '../graphql/queries/pages';
import { GET_CAREER_PATHWAYS } from '../graphql/queries/careerPathways';
import { Course, Post, Testimonial, SiteSettings, Page, CareerPathway } from '../types';

/**
 * Mock data for development until CMS is connected
 */

const DOMESTIC_BROCHURE = 'https://clients.360rto.com.au/OptimumTrainingAcademy/wp-content/uploads/2026/03/OTA-Student-Handbook-v1.0.pdf';
const INTERNATIONAL_BROCHURE = 'https://clients.360rto.com.au/OptimumTrainingAcademy/wp-content/uploads/2026/03/OTA-CRICOS-Student-Handbook-v1.0.pdf';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Diploma of Community Services',
    slug: 'chc52025-diploma-community-services',
    courseFields: {
      qualificationCode: 'CHC52025',
      audience: 'Domestic',
      duration: 'Up to 52 Weeks',
      deliveryMode: 'Online + Vocational Placement',
      level: 'Diploma',
      totalHours: 'Approx. 1230 hours',
      price: '$7,000.00',
      externalEnrolmentLink: 'https://optimumtrainingacademy.rto.net.au/Form/Index?formType=1&directLink=true&id=optimumtrainingacademy&del=52986&courseCode=CHC52025',
      brochureLink: DOMESTIC_BROCHURE,
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
        sourceUrl: '/images/[CHC52025] group-different-people-volunteering-foodbank.jpg',
        altText: 'A professional group of diverse people volunteering at a foodbank, representing community service outcomes',
      },
    },
  },
  {
    id: '3',
    title: 'Diploma of Community Services (International)',
    slug: 'chc52025-diploma-community-services-international',
    courseFields: {
      qualificationCode: 'CHC52025',
      cricosCode: '04432K',
      audience: 'International',
      duration: 'Up to 104 Weeks (including holidays)',
      deliveryMode: 'Blended + Vocational Placement',
      level: 'Diploma',
      totalHours: 'Approx. 2110 hours',
      price: '$15,000.00',
      externalEnrolmentLink: '#',
      brochureLink: INTERNATIONAL_BROCHURE,
      careerOutcomes: [
        'Community Care Manager',
        'Support Facilitator',
        'Community Development Worker',
        'Case Coordinator',
      ],
      entryRequirements: [
        'Must be 18 years of age or older',
        'Must hold a current Student Visa',
        'Sound language, literacy, and numeracy skills (at least Year 10 English, or equivalent)',
        'Basic computer skills',
        'English Proficiency: IELTS 5.5 (no band < 5.0) or equivalent (PTE 43, TOEFL 46)',
      ],
      whyStudy: [
        'Nationally recognised qualification for international students.',
        'Comprehensive 104-week program designed for deep industry immersion.',
        'Includes mandatory vocational placement to build practical skills in Australian settings.',
        'Tailored support for international learners adapting to the Australian care sector.',
      ],
      whatYouWillLearn: [
        'Develop and implement service programs',
        'Facilitate workplace debriefing and support processes',
        'Recognise and respond to crisis situations',
        'Analyse impacts of sociological factors on people in community work and services',
        'Provide advocacy and representation services',
      ],
      vocationalPlacement: 'A minimum of 400 hours of vocational placement within a registered community service centre. This includes specific requirements for CHCCSM013 and CHCDEV005 (100 hours each).',
      structure: 'Assessment includes observations, questioning (verbal/written), projects, case studies, and third-party reports.',
      resources: {
        provided: [
          'Learner Guides and Assessment Workbooks',
          'Templates for projects and activities',
          'Simulated resources for assessment pathways',
          'Vocational Placement Pack',
        ],
        required: [
          'Computer/laptop with internet access (Google Chrome preferred)',
          'MS Word and PowerPoint',
          'Adobe Acrobat Reader',
          'Vocational Placement access',
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
          question: 'What are the payment terms for international students?',
          answer: 'The total fee is $15,000.00. This requires an initial deposit of $7,500 followed by 11 scheduled monthly payments of $681.82.'
        },
        {
          question: 'Are there English language requirements?',
          answer: 'Yes, you need an IELTS total band score of at least 5.5 (no band less than 5.0) or equivalent from providers like PTE, TOEFL, or CAE.'
        },
        {
          question: 'Is vocational placement mandatory?',
          answer: 'Yes, 400 hours of vocational placement is mandatory. Optimum Training Academy can assist you in finding placement through our partner network.'
        }
      ]
    },
    featuredImage: {
      node: {
        sourceUrl: '/images/[CHC52025 International] different-people-doing-volunteer-work-foodbank.jpg',
        altText: 'International students and professionals engaged in community support and volunteer work',
      },
    },
  },
  {
    id: '4',
    title: 'Certificate III in Individual Support',
    slug: 'chc33021-certificate-iii-individual-support',
    courseFields: {
      qualificationCode: 'CHC33021',
      audience: 'Domestic',
      duration: 'Up to 52 weeks',
      deliveryMode: 'Online Training + Vocational Placement',
      level: 'Certificate III',
      totalHours: 'Approx. 1223 hours',
      price: '$3,000.00',
      externalEnrolmentLink: 'https://optimumtrainingacademy.rto.net.au/Form/Index?formType=1&directLink=true&id=optimumtrainingacademy&del=7260&courseCode=CHC33021',
      brochureLink: DOMESTIC_BROCHURE,
      careerOutcomes: [
        'Home Care Assistant',
        'Family Support Worker',
        'Nurse’s Assistant',
        'Respite Care Worker',
      ],
      entryRequirements: [
        'Must be 18 years of age or older',
        'Have sound language, literacy, and numeracy skills (at least Year 10 English, or equivalent)',
        'Have basic computer skills',
        'Must have completed or be eligible to complete HLTAID011 – Provide First Aid',
      ],
      whyStudy: [
        'Nationally recognised qualification (Release 1) aimed at endowing individuals with requisite skills.',
        'Quality content and robust training programs by Optimum Training Academy (RTO#46534).',
        'Flexible delivery model via Online Training combined with hands-on Vocational Placement.',
        'Direct pathway to roles in community, home, or residential care settings.',
      ],
      whatYouWillLearn: [
        'Provide individualised support',
        'Communicate and work in health or community services',
        'Apply basic principles and practices of infection prevention and control',
        'Contribute to ongoing skills development using a strengths-based approach',
        'Recognise health body systems',
      ],
      vocationalPlacement: 'Learners are required to undertake a minimum of 120 hours of vocational placement within a registered and approved care centre. This must occur after the student has satisfactorily completed all the other units/subjects in this qualification. During this time, the learners are required to complete a skills workbook.',
      structure: 'Assessment includes observation (on-the-job or role play/simulation), questioning (self-assessment, verbal, written, activity modules), and structured activities (projects, case studies, presentations).',
      resources: {
        provided: [
          'CHC33021 learning and assessment suite (Learner Guides, Assessment Workbooks, Templates)',
          'Simulated resources for assessment pathways',
          'Additional course readings and resources recommended by trainers',
          'Vocational Placement Pack',
        ],
        required: [
          'Computer/laptop with internet access (Google Chrome preferred)',
          'Microsoft Word and PowerPoint',
          'Adobe Acrobat Reader',
          'Webcam, headset, and microphone',
        ],
      },
      units: [
        { code: 'CHCCCS031', title: 'Provide individualised support', type: 'CORE' },
        { code: 'CHCCCS038', title: 'Facilitate the empowerment of people receiving support', type: 'CORE' },
        { code: 'CHCCCS040', title: 'Support independence and well being', type: 'CORE' },
        { code: 'CHCCCS041', title: 'Recognise health body systems', type: 'CORE' },
        { code: 'CHCCOM005', title: 'Communicate and work in health or community services', type: 'CORE' },
        { code: 'CHCDIV001', title: 'Work with diverse people', type: 'CORE' },
        { code: 'HLTWHS002', title: 'Follow safe work practices for direct client care', type: 'CORE' },
        { code: 'CHCLEG001', title: 'Work legally and ethically', type: 'CORE' },
        { code: 'HLTINF006', title: 'Apply basic principles and practices of infection prevention and control', type: 'CORE' },
        { code: 'CHCAGE011', title: 'Provide support to people living with dementia', type: 'ELECTIVE' },
        { code: 'CHCAGE013', title: 'Work effectively in aged care', type: 'ELECTIVE' },
        { code: 'CHCPAL003', title: 'Deliver care services using a palliative approach', type: 'ELECTIVE' },
        { code: 'CHCDIS011', title: 'Contribute to ongoing skills development using a strengths-based approach', type: 'ELECTIVE' },
        { code: 'CHCDIS012', title: 'Support community participation and social inclusion', type: 'ELECTIVE' },
        { code: 'CHCDIS020', title: 'Work effectively in disability support', type: 'ELECTIVE' },
      ],
      faqs: [
        {
          question: 'Are there payment plans available?',
          answer: 'Yes. After an initial deposit of $1,500, you can pay the remainder through 11 scheduled monthly payments of $136.36.'
        },
        {
          question: 'Is Recognition of Prior Learning (RPL) available?',
          answer: 'Yes, Optimum Academy has an RPL Policy to recognise your prior learning through formal/informal training or work experience.'
        },
        {
          question: 'What are the vocational placement options?',
          answer: 'You can source your own provider, ask Optimum Academy for assistance, or use our established network including Spry Support Services and Dynamic Care.'
        }
      ]
    },
    featuredImage: {
      node: {
        sourceUrl: '/images/[CHC33021 International] medical-assistant-giving-assistance-disabled-old-woman.jpg',
        altText: 'A support worker providing dedicated assistance to an elderly client in a home setting',
      },
    },
  },
  {
    id: '7',
    title: 'Provide cardiopulmonary resuscitation',
    slug: 'hltaid009-provide-cardiopulmonary-resuscitation',
    courseFields: {
      qualificationCode: 'HLTAID009',
      audience: 'Domestic',
      duration: 'Half-day training and assessment session',
      deliveryMode: 'Face-to-face',
      level: 'Unit of Competency',
      totalHours: '7.25 – 9.25 hours',
      price: '$100.00',
      externalEnrolmentLink: '/contact',
      brochureLink: DOMESTIC_BROCHURE,
      careerOutcomes: [
        'First Aid Officer',
        'WHS Representative',
      ],
      entryRequirements: [
        'Must have physical capacity to perform 2 minutes of uninterrupted single rescuer CPR on an adult manikin on the floor',
        'Must have physical capacity to perform 2 minutes of uninterrupted single rescuer CPR on an infant manikin on a firm surface',
        'Ability to perform manual handling tasks safely',
        'Must be 18 years of age or older',
      ],
      whyStudy: [
        'Nationally recognised unit (Release 1) in line with Australian Resuscitation Council (ARC) guidelines.',
        'Essential for First Aid Officers and WHS Representatives.',
        'Quality content and robust training programs by Optimum Training Academy.',
        'Half-day intensive session for rapid skill acquisition.',
      ],
       whatYouWillLearn: [
        'Respond to an emergency situation',
        'Perform CPR procedure',
        'Communicate details of the incident',
        'Review the incident',
      ],
      vocationalPlacement: 'Not required for this unit.',
      structure: 'Assessment includes scenario-based assessments, practical skills demonstration, and written or verbal questioning.',
      resources: {
        provided: [
          'Reading Materials and Assessment Workbook',
          'Adult and infant resuscitation manikins',
          'AED training devices',
          'Personal protective equipment (PPE)',
        ],
        required: [
          'Computer/laptop with internet access (Google Chrome preferred)',
          'Microsoft Word and PowerPoint',
          'Adobe Acrobat Reader',
        ],
      },
      units: [
        { code: 'HLTAID009', title: 'Provide cardiopulmonary resuscitation', type: 'CORE' },
      ],
      faqs: [
        {
          question: 'How often should I refresh my CPR training?',
          answer: 'Refresher training in CPR must be carried out annually according to relevant national/state/territory Work Health and Safety Regulatory Authorities.'
        },
        {
          question: 'Is RPL available for this unit?',
          answer: 'Due to the requirement for annual retraining, Recognition of Prior Learning (RPL) is not offered for this unit.'
        },
        {
          question: 'What are the physical requirements?',
          answer: 'You must be able to perform at least 2 minutes of uninterrupted single rescuer CPR on an adult manikin on the floor and an infant manikin on a firm surface.'
        }
      ]
    },
    featuredImage: {
      node: {
        sourceUrl: '/images/[HLTAID009] group-diverse-people-cpr-training-class.jpg',
        altText: 'A diverse group of students practicing CPR techniques in a professional training environment',
      },
    },
  },
  {
    id: '6',
    title: 'Certificate III in Individual Support (International)',
    slug: 'chc33021-certificate-iii-individual-support-international',
    courseFields: {
      qualificationCode: 'CHC33021',
      cricosCode: '04432K',
      audience: 'International',
      duration: 'Up to 52 Weeks',
      deliveryMode: 'Face-to-face + Online distance + Vocational Placement',
      level: 'Certificate III',
      totalHours: 'Approx. 1204 hours',
      price: '$8,000.00',
      externalEnrolmentLink: '#',
      brochureLink: INTERNATIONAL_BROCHURE,
      careerOutcomes: [
        'Home Care Assistant',
        'Family Support Worker',
        'Nurse’s Assistant',
        'Respite Care Worker',
      ],
      entryRequirements: [
        'Must be 18 years of age or older',
        'Must hold a current Student Visa',
        'Sound language, literacy, and numeracy skills (at least Year 10 English, or equivalent)',
        'Basic computer skills',
        'English Proficiency: IELTS 5.5 (no band < 5.0) or equivalent (PTE 43, TOEFL 46)',
        'Must have completed or be eligible to complete HLTAID011 – Provide First Aid',
      ],
      whyStudy: [
        'Nationally recognised qualification (Release 1) for international students.',
        'Comprehensive 52-week program designed for rapid industry entry.',
        'Includes 120 hours of mandatory vocational placement for real-world experience.',
        'Blended learning model combining face-to-face and online distance education.',
      ],
      whatYouWillLearn: [
        'Provide individualised support',
        'Communicate and work in health or community services',
        'Apply basic principles and practices of infection prevention and control',
        'Contribute to ongoing skills development using a strengths-based approach',
        'Recognise health body systems',
      ],
      vocationalPlacement: 'Learners are required to undertake a minimum of 120 hours of vocational placement within a registered and approved care centre. This must occur after the student has satisfactorily completed all the other units/subjects in this qualification. During this time, the learners are required to complete a skills workbook.',
      structure: 'Assessment includes observation (on-the-job or role play/simulation), questioning (self-assessment, verbal, written, activity modules), and structured activities (projects, case studies, presentations).',
      resources: {
        provided: [
          'CHC33021 learning and assessment suite (Learner Guides, Assessment Workbooks, Templates)',
          'Simulated resources for assessment pathways',
          'Additional course readings and resources recommended by trainers',
          'Vocational Placement Pack',
        ],
        required: [
          'Computer/laptop with internet access (Google Chrome preferred)',
          'Microsoft Word and PowerPoint',
          'Adobe Acrobat Reader',
          'Webcam, headset, and microphone',
        ],
      },
      units: [
        { code: 'CHCCCS031', title: 'Provide individualised support', type: 'CORE' },
        { code: 'CHCCCS038', title: 'Facilitate the empowerment of people receiving support', type: 'CORE' },
        { code: 'CHCCCS040', title: 'Support independence and well being', type: 'CORE' },
        { code: 'CHCCCS041', title: 'Recognise health body systems', type: 'CORE' },
        { code: 'CHCCOM005', title: 'Communicate and work in health or community services', type: 'CORE' },
        { code: 'CHCDIV001', title: 'Work with diverse people', type: 'CORE' },
        { code: 'HLTWHS002', title: 'Follow safe work practices for direct client care', type: 'CORE' },
        { code: 'CHCLEG001', title: 'Work legally and ethically', type: 'CORE' },
        { code: 'HLTINF006', title: 'Apply basic principles and practices of infection prevention and control', type: 'CORE' },
        { code: 'CHCAGE011', title: 'Provide support to people living with dementia', type: 'ELECTIVE' },
        { code: 'CHCAGE013', title: 'Work effectively in aged care', type: 'ELECTIVE' },
        { code: 'CHCPAL003', title: 'Deliver care services using a palliative approach', type: 'ELECTIVE' },
        { code: 'CHCDIS011', title: 'Contribute to ongoing skills development using a strengths-based approach', type: 'ELECTIVE' },
        { code: 'CHCDIS012', title: 'Support community participation and social inclusion', type: 'ELECTIVE' },
        { code: 'CHCDIS020', title: 'Work effectively in disability support', type: 'ELECTIVE' },
      ],
      faqs: [
        {
          question: 'Are there payment plans available?',
          answer: 'Yes. After an initial deposit of $4,000, you can pay the remainder through 11 scheduled monthly payments of $363.64.'
        },
        {
          question: 'Is Recognition of Prior Learning (RPL) available?',
          answer: 'Yes, Optimum Academy has an RPL Policy to recognise your prior learning through formal/informal training or work experience.'
        },
        {
          question: 'What are the vocational placement options?',
          answer: 'You can source your own provider, ask Optimum Academy for assistance, or use our established network including Spry Support Services and Dynamic Care.'
        }
      ]
    },
    featuredImage: {
      node: {
        sourceUrl: '/images/[CHC33021] side-view-smiley-nurse-patient.jpg',
        altText: 'A professional and supportive care interaction representing career-ready skills',
      },
    },
  },
  {
    id: '8',
    title: 'Provide First Aid',
    slug: 'hltaid011-provide-first-aid',
    courseFields: {
      qualificationCode: 'HLTAID011',
      audience: 'Domestic',
      duration: '1 day training and assessment session',
      deliveryMode: 'Blended (Distance + Face-to-face)',
      level: 'Unit of Competency',
      totalHours: 'Approx. 10 hours',
      price: '$200.00',
      externalEnrolmentLink: '/contact',
      brochureLink: DOMESTIC_BROCHURE,
      careerOutcomes: [
        'First Aid Officer',
        'WHS Representative',
      ],
      entryRequirements: [
        'Must be 18 years of age or older',
        'Sound Language, Literacy, and Numeracy (LLN) skills',
        'Physical capacity to perform 2 minutes of uninterrupted CPR on the floor',
        'Basic computer skills (for pre-course learning activities)',
      ],
      whyStudy: [
        'Nationally recognised unit (Release 1) in line with Australian Resuscitation Council (ARC) guidelines.',
        'Quality content and robust training programs by Optimum Training Academy (RTO#46534).',
        'Essential for First Aid Officers and Workplace Health & Safety (WHS) Representatives.',
        'Combines self-paced distance learning with hands-on intensive training.',
      ],
      whatYouWillLearn: [
        'Respond to an emergency situation',
        'Apply appropriate first aid procedures',
        'Communicate details of the incident',
        'Review the incident',
      ],
      vocationalPlacement: 'Not required for this unit.',
      structure: 'Assessment includes observation during role play/simulation, questioning (verbal/written), and structured activities like projects and case studies.',
      resources: {
        provided: [
          'Learner Guide and Assessment Workbook',
          'Templates and forms for assessment',
          'Medical equipment (Adult/Infant manikins, AED, Adrenaline auto-injector)',
          'Personal protective equipment (PPE)',
        ],
        required: [
          'Computer with internet access (Google Chrome preferred)',
          'MS Word, MS PowerPoint, and Adobe Acrobat Reader',
        ],
      },
      units: [
        { code: 'HLTAID011', title: 'Provide First Aid', type: 'CORE' },
      ],
      faqs: [
        {
          question: 'How often should I refresh my First Aid training?',
          answer: 'ARC guidelines require first aid certification to be renewed every three (3) years.'
        },
        {
          question: 'Is RPL available for this unit?',
          answer: 'Due to the high-risk nature of the course and certificate requirements, RPL is not offered for this unit of competency.'
        },
        {
          question: 'What are the physical requirements?',
          answer: 'You must be able to perform 2 minutes of uninterrupted single rescuer CPR on an adult manikin on the floor and an infant manikin on a firm surface.'
        }
      ]
    },
    featuredImage: {
      node: {
        sourceUrl: '/images/cpr-first-aid-training-concept.jpg',
        altText: 'Professional first aid training session showing CPR practice on a manikin',
      },
    },
  },
  {
    id: '9',
    title: 'Conduct manual tasks safely',
    slug: 'hltwhs005-conduct-manual-tasks-safely',
    courseFields: {
      qualificationCode: 'HLTWHS005',
      audience: 'Domestic',
      duration: 'Half-day training and assessment session',
      deliveryMode: 'Face-to-face',
      level: 'Unit of Competency',
      totalHours: 'Approx. 8 hours',
      price: '$250.00',
      externalEnrolmentLink: '/contact',
      brochureLink: DOMESTIC_BROCHURE,
      careerOutcomes: [
        'Individual support workers',
        'Health care workers',
        'Retail workers',
        'Tradesmen',
      ],
      entryRequirements: [
        'Must be able to perform manual handling tasks safely',
        'Physical capacity to use appropriate equipment, posture and handling techniques',
        'Must be 18 years of age or older (recommended)',
      ],
      whyStudy: [
        'Nationally accredited unit (Release 1) describing skills to recognise potentially hazardous manual tasks.',
        'Quality content and robust training programs by Optimum Training Academy (RTO#46534).',
        'Essential for workers in individual support, health care, retail, and trades.',
        'Develops requisite skills to prepare for and complete manual tasks in a safe manner.',
      ],
      whatYouWillLearn: [
        'Identify manual tasks involving risk',
        'Prepare for manual tasks',
        'Complete manual tasks',
        'Contribute to safe work practices',
      ],
      vocationalPlacement: 'Not required for this unit.',
      structure: 'Assessment includes scenario-based assessments, practical skills demonstration assessments, and written or verbal questioning.',
      resources: {
        provided: [
          'Reading Materials and Assessment Workbook',
          'Access to suitable facilities and compliant workplace procedures',
          'Manual handling equipment (Mobile hoists, Slide sheets, Stretchers)',
        ],
        required: [
          'Computer/laptop with internet access (Google Chrome preferred)',
          'MS Word and PowerPoint',
          'Adobe Acrobat Reader',
        ],
      },
      units: [
        { code: 'HLTWHS005', title: 'Conduct manual tasks safely', type: 'CORE' },
      ],
      faqs: [
        {
          question: 'Is Recognition of Prior Learning (RPL) available?',
          answer: 'Due to the requirement for annual retraining in the competencies contained within this unit, RPL will not be offered.'
        },
        {
          question: 'How often should I refresh my manual handling training?',
          answer: 'Industry standards recommend that manual handling training be conducted every two years.'
        },
        {
          question: 'What are the physical requirements?',
          answer: 'Students must have the physical capacity to use appropriate equipment, posture and handling techniques to conduct a manual move and/or lift safely.'
        }
      ]
    },
    featuredImage: {
      node: {
        sourceUrl: '/images/[HLTWHS005] people-with-physical-health-condition-doing-teamwork-startup-office-dealing-with-chronic-disability-job-business-partners-with-impairment-working-project-using-wheelchair-crutches.jpg',
        altText: 'Professionals with diverse physical health conditions collaborating in a modern workplace',
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
        sourceUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070',
        altText: 'A successful professional in the care sector environment',
      },
    },
    categories: {
      nodes: [{ name: 'Career Advice', slug: 'career-advice' }],
    },
  },
  {
    id: 'p2',
    title: 'Understanding the New NDIS Guidelines for 2024',
    slug: 'understanding-ndis-guidelines-2024',
    excerpt: 'Key changes in the National Disability Insurance Scheme and how they affect support workers and participants.',
    date: '2024-04-15',
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2070',
        altText: 'Care professionals discussing support strategies in a modern office',
      },
    },
    categories: {
      nodes: [{ name: 'Industry News', slug: 'industry-news' }],
    },
  },
  {
    id: 'p3',
    title: '5 Essential Skills for Every Community Service Worker',
    slug: 'essential-skills-community-service-worker',
    excerpt: 'Beyond qualifications, these core competencies will help you excel in providing support to those in need.',
    date: '2024-05-10',
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1543269664-76bc3997d9ea?q=80&w=2070',
        altText: 'Authentic interaction between diverse people in a community setting',
      },
    },
    categories: {
      nodes: [{ name: 'Skills & Development', slug: 'skills-development' }],
    },
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 't1',
    title: 'Sarah Johnson',
    testimonialFields: {
      studentName: 'Sarah Johnson',
      courseGraduated: 'Individual Support Graduate',
      quoteContent: 'Optimum Academy gave me the confidence and skills to start my career in aged care. The trainers were incredibly supportive and the practical training was exactly what I needed.',
    },
  },
  {
    id: 't2',
    title: 'Michael Chen',
    testimonialFields: {
      studentName: 'Michael Chen',
      courseGraduated: 'Disability Support Worker',
      quoteContent: 'I transitioned from a completely different industry. The flexible learning options at Optimum Academy allowed me to study while working. I had a job offer before I even finished my course!',
    },
  },
  {
    id: 't3',
    title: 'Emma Thompson',
    testimonialFields: {
      studentName: 'Emma Thompson',
      courseGraduated: 'Community Services Student',
      quoteContent: 'The facilities are top-notch and simulate real-world environments perfectly. I feel truly prepared for my placement and future career. Highly recommend to anyone looking to enter the care sector.',
    },
  },
];

/**
 * API Methods with Fallback Logic
 */

export const getCourses = async (): Promise<Course[]> => {
  try {
    const data = await fetchGraphQL<{ courses: { nodes: Course[] } }>(GET_COURSES);
    if (data?.courses?.nodes && data.courses.nodes.length > 0) {
      return data.courses.nodes;
    }
  } catch (error) {
    console.error('Error fetching courses from CMS:', error);
  }
  return mockCourses;
};

export const getCourseBySlug = async (slug: string): Promise<Course | null> => {
  try {
    const data = await fetchGraphQL<{ course: Course | null }>(GET_COURSE_BY_SLUG, { slug });
    if (data?.course) {
      return data.course;
    }
  } catch (error) {
    console.error(`Error fetching course ${slug} from CMS:`, error);
  }
  return mockCourses.find((c) => c.slug === slug) || null;
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const data = await fetchGraphQL<{ posts: { nodes: Post[] } }>(GET_POSTS);
    if (data?.posts?.nodes && data.posts.nodes.length > 0) {
      return data.posts.nodes;
    }
  } catch (error) {
    console.error('Error fetching posts from CMS:', error);
  }
  return mockPosts;
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const data = await fetchGraphQL<{ post: Post | null }>(GET_POST_BY_SLUG, { slug });
    if (data?.post) {
      return data.post;
    }
  } catch (error) {
    console.error(`Error fetching post ${slug} from CMS:`, error);
  }
  return mockPosts.find((p) => p.slug === slug) || null;
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const data = await fetchGraphQL<{ testimonials: { nodes: Testimonial[] } }>(GET_TESTIMONIALS);
    if (data?.testimonials?.nodes && data.testimonials.nodes.length > 0) {
      return data.testimonials.nodes;
    }
  } catch (error) {
    console.error('Error fetching testimonials from CMS:', error);
  }
  return mockTestimonials;
};

export const getSiteSettings = async (): Promise<SiteSettings | null> => {
  try {
    const data = await fetchGraphQL<{ siteSettings: SiteSettings }>(GET_SITE_SETTINGS);
    if (data?.siteSettings) {
      return data.siteSettings;
    }
  } catch (error) {
    console.error('Error fetching site settings from CMS:', error);
  }
  return null;
};

export const getPageBySlug = async (slug: string): Promise<Page | null> => {
  try {
    const data = await fetchGraphQL<{ page: Page | null }>(GET_PAGE_BY_SLUG, { slug });
    if (data?.page) {
      return data.page;
    }
  } catch (error) {
    console.error(`Error fetching page ${slug} from CMS:`, error);
  }
  return null;
};

export const getCareerPathways = async (): Promise<CareerPathway[]> => {
  try {
    const data = await fetchGraphQL<{ careerPathways: { nodes: CareerPathway[] } }>(GET_CAREER_PATHWAYS);
    if (data?.careerPathways?.nodes && data.careerPathways.nodes.length > 0) {
      return data.careerPathways.nodes;
    }
  } catch (error) {
    console.error('Error fetching career pathways from CMS:', error);
  }
  return [];
};
