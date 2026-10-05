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

const BROCHURE_CERT_III_INDIV_SUPPORT_INT = 'https://cms.optimumacademy.edu.au/wp-content/uploads/2026/07/OTA-Brochure-CHC33021-CRICOS231.pdf';
const BROCHURE_CERT_III_INDIV_SUPPORT_DOM = 'https://cms.optimumacademy.edu.au/wp-content/uploads/2026/07/OTA-Brochure-CHC33021-Domestic-211.pdf';
const BROCHURE_DIP_COMM_SERVICES_INT = 'https://cms.optimumacademy.edu.au/wp-content/uploads/2026/07/OTA-Brochure-CHC52025-CRICOS-11.pdf';
const BROCHURE_DIP_COMM_SERVICES_DOM = 'https://cms.optimumacademy.edu.au/wp-content/uploads/2026/07/OTA-Brochure-CHC52025-Domestic-21-1.pdf';
const BROCHURE_FIRST_AID = 'https://cms.optimumacademy.edu.au/wp-content/uploads/2026/07/OTA-Brochure-HLTAID011-v11.pdf';
const BROCHURE_MANUAL_TASKS = 'https://cms.optimumacademy.edu.au/wp-content/uploads/2026/07/OTA-Brochure-HLTWHS005-v1.1.pdf';
const BROCHURE_CPR = 'https://cms.optimumacademy.edu.au/wp-content/uploads/2026/07/OTA-Brochure-HLTAID009-v11.pdf';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Diploma of Community Services',
    slug: 'chc52025-diploma-community-services',
    courseFields: {
      qualificationCode: 'CHC52025',
      audience: 'Domestic',
      duration: 'Up to 52 Weeks',
      deliveryMode: 'Online, Face-to-Face, Blended',
      level: 'Diploma',
      totalHours: 'Approx. 1230 hours',
      price: '$7,000.00',
      paymentPlan: '$500.00/mo',
      externalEnrolmentLink: 'https://optimumtrainingacademy.rto.net.au/Form/Index?formType=1&directLink=true&id=optimumtrainingacademy&del=52986&courseCode=CHC52025',
      brochureLink: BROCHURE_DIP_COMM_SERVICES_DOM,
      careerOutcomes: [
        'Community Care Manager',
        'Support Facilitator',
        'Community Development Worker',
        'Case Coordinator',
        'Social Educator',
        'Disability Officer',
      ],
      entryRequirements: [
        'Living or working in Australia',
        'Successful completion of Australian Year 10 or equivalent',
        'Sound Language, Literacy, and Numeracy (LLN) skills',
        'Basic computer skills',
        'Must hold or be eligible to complete HLTAID011 – Provide First Aid prior to placement (can be completed through Optimum Academy or another registered provider)',
      ],
      whyStudy: [
        'Nationally recognised qualification accredited within the Australian Qualifications Framework (AQF).',
        'Flexible learning model combining online theory with hands-on vocational placement.',
        'May support progression towards relevant coordination or management roles in the community services sector.',
        'Expert support from industry-experienced trainers throughout your 52-week journey.',
      ],
      description: 'The CHC52025 Diploma of Community Services reflects the role of community services workers involved in the delivery, management, and coordination of person-centred services to individuals, groups, and communities.',
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
          'HLTAID011 Provide First Aid certificate (not included in tuition; can be completed through Optimum Academy or another registered provider prior to placement)',
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
          answer: 'Optimum Academy provides direct support for vocational placement. You can also source your own provider (subject to suitability check), and our team will assist you in ensuring it meets all training requirements.'
        },
        {
          question: 'What happens if I don\'t meet the LLN requirements?',
          answer: 'You may still be able to enrol if your trainer endorses your application and we can implement specific support strategies to help you succeed.'
        },
        {
          question: 'Is First Aid included in the course?',
          answer: 'HLTAID011 – Provide First Aid is not included in the Diploma tuition fee. Students may complete it separately through Optimum Academy or another appropriately registered provider before commencing vocational placement.'
        },
        {
          question: 'Are there payment plans available?',
          answer: 'Yes. After an initial deposit of $1,500, you can pay the remainder through 11 scheduled monthly payments of $500.00.'
        }
      ]
    },
    featuredImage: {
      node: {
        sourceUrl: '/images/CHC52025 Dip Community Service Domestic.png',
        altText: 'Professional group of care workers collaborating in a community service environment',
      },
    },
  },
  {
    id: '3',
    title: 'Diploma of Community Services (International) 120037M',
    slug: 'chc52025-diploma-community-services-international',
    courseFields: {
      qualificationCode: 'CHC52025',
      cricosCode: '120037M',
      audience: 'International',
      duration: 'Up to 104 Weeks (including holidays)',
      deliveryMode: 'Face-to-Face, Vocational Placement',
      level: 'Diploma',
      totalHours: 'Approx. 2110 hours',
      price: '$18,000.00',
      externalEnrolmentLink: '#',
      brochureLink: BROCHURE_DIP_COMM_SERVICES_INT,
      careerOutcomes: [
        'Community Care Manager',
        'Disability Services Officer',
        'Housing & Homelessness Support Worker',
        'Community Development Worker',
        'Case Coordinator',
      ],
      entryRequirements: [
        'Must be 18 years of age or older',
        "International applicants must meet the Academy's admission requirements. A valid student visa permitting study in Australia is required before commencing the course in Australia.",
        "Optimum Academy does not provide immigration advice. Applicants should refer to the Australian Department of Home Affairs or a registered migration agent for visa advice.",
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
      description: 'The CHC52025 Diploma of Community Services reflects the role of community services workers involved in the delivery, management, and coordination of person-centred services to individuals, groups, and communities.',
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
          question: 'Are there English language requirements?',
          answer: 'Yes, you need an IELTS total band score of at least 5.5 (no band less than 5.0) or equivalent from providers like PTE, TOEFL, or CAE.'
        },
        {
          question: 'Is vocational placement mandatory?',
          answer: 'Yes, 400 hours of vocational placement is mandatory. Optimum Academy provides direct support to help you secure a suitable placement.'
        }
      ]
    },
    featuredImage: {
      node: {
        sourceUrl: '/images/CHC52025 Diploma Community Service INternational.png',
        altText: 'International students engaged in a professional community support training session',
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
      duration: '18 weeks',
      deliveryMode: 'Online, Face-to-Face, Blended',
      paymentPlan: '$136.36/mo',
      level: 'Certificate III',
      totalHours: 'Approx. 1223 hours',
      price: '$3,000.00',
      externalEnrolmentLink: 'https://optimumtrainingacademy.rto.net.au/Form/Index?formType=1&directLink=true&id=optimumtrainingacademy&del=7260&courseCode=CHC33021',
      brochureLink: BROCHURE_CERT_III_INDIV_SUPPORT_DOM,
      careerOutcomes: [
        'Disability Support Worker',
        'Aged Care Carer',
        'Home Care Assistant',
        'Personal Care Assistant',
      ],
      entryRequirements: [
        'Have sound language, literacy, and numeracy skills (at least Year 10 English, or equivalent)',
        'Have basic computer skills',
        'Must have completed or be eligible to complete HLTAID011 – Provide First Aid',
      ],
      whyStudy: [
        'Nationally recognised qualification (Release 1) aimed at endowing individuals with requisite skills.',
        'Quality content and robust training programs by Optimum Training Academy (RTO#46534).',
        'Flexible delivery model via Online Training combined with hands-on Vocational Placement.',
        'Career-focused training for roles in community, home, or residential care settings.',
      ],
      description: 'The CHC33021 Certificate III in Individual Support reflects the role of workers in the community and/or residential setting who follow an individualised plan to provide person-centred support to people who may require support due to ageing, disability or some other reason.',
      whatYouWillLearn: [
        'Provide Individualised Support using a Person-centred Approach',
        'Promote Independence and Empowerment for Your Clients',
        'Work Legally, Ethically, and with Diverse People',
        'Work and Communicate Effectively in the Care Sector',
        'Prioritise Health, Safety, and Infection Control',
      ],
      vocationalPlacement: '',
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
        { code: 'CHCCCS040', title: 'Support independence and wellbeing', type: 'CORE' },
        { code: 'CHCCCS041', title: 'Recognise healthy body systems', type: 'CORE' },
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
          answer: 'Optimum Academy provides direct support for vocational placement. You can also source your own provider, and our team will assist you in ensuring it meets all training requirements.'
        }
      ]
    },
    featuredImage: {
      node: {
        sourceUrl: '/images/CHC33021 Cert III Individual Support Domestic.png',
        altText: 'Dedicated support worker providing person-centred care to an elderly individual',
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
      paymentPlan: 'Full payment required',
      deliveryMode: 'Online, Face-to-Face, Blended',
      level: 'Unit of Competency',
      totalHours: '7.25 – 9.25 hours',
      price: '$30.00',
      discount: '10% Discount Available',
      externalEnrolmentLink: 'https://optimumtrainingacademy.rto.net.au/Form/Index?formType=1&directLink=true&id=optimumtrainingacademy&del=61508&courseCode=HLTAID009',
      brochureLink: BROCHURE_CPR,
      careerOutcomes: [],
      entryRequirements: [
        'Must have physical capacity to perform 2 minutes of uninterrupted single rescuer CPR on an adult manikin on the floor',
        'Must have physical capacity to perform 2 minutes of uninterrupted single rescuer CPR on an infant manikin on a firm surface',
        'Ability to perform manual handling tasks safely',
      ],
      whyStudy: [
        'Nationally recognised unit (Release 1) in line with Australian Resuscitation Council (ARC) guidelines.',
        'Essential for First Aid Officers and WHS Representatives.',
        'Quality content and robust training programs by Optimum Training Academy.',
        'Half-day intensive session for rapid skill acquisition.',
      ],
      description: 'The HLTAID009 Provide cardiopulmonary resuscitation unit describes the skills and knowledge required to perform cardiopulmonary resuscitation (CPR) in line with the Australian Resuscitation Council (ARC) guidelines.',
       whatYouWillLearn: [
        'Respond to an emergency situation',
        'Perform CPR procedure',
        'Communicate details of the incident',
        'Review the incident',
      ],
      vocationalPlacement: '',
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
        sourceUrl: '/images/hltaid009-provide-cpr.png',
        altText: 'A diverse group of students practicing CPR techniques in a professional training environment',
      },
    },
  },
  {
    id: '6',
    title: 'Certificate III in Individual Support (International) 120036A',
    slug: 'chc33021-certificate-iii-individual-support-international',
    courseFields: {
      qualificationCode: 'CHC33021',
      cricosCode: '120036A',
      audience: 'International',
      duration: 'Up to 52 Weeks',
      deliveryMode: 'Face-to-Face, Vocational Placement',
      level: 'Certificate III',
      totalHours: 'Approx. 1204 hours',
      price: '$8,000.00',
      externalEnrolmentLink: '#',
      brochureLink: BROCHURE_CERT_III_INDIV_SUPPORT_INT,
      careerOutcomes: [
        'Disability Support Worker',
        'Aged Care Carer',
        'Home Care Assistant',
        'Personal Care Assistant',
      ],
      entryRequirements: [
        'Must be 18 years of age or older',
        "International applicants must meet the Academy's admission requirements. A valid student visa permitting study in Australia is required before commencing the course in Australia.",
        "Optimum Academy does not provide immigration advice. Applicants should refer to the Australian Department of Home Affairs or a registered migration agent for visa advice.",
        'Sound language, literacy, and numeracy skills (at least Year 10 English, or equivalent)',
        'Basic computer skills',
        'English Proficiency: IELTS 5.5 (no band < 5.0) or equivalent (PTE 43, TOEFL 46)',
      ],
      whyStudy: [
        'Nationally recognised qualification (Release 1) for international students.',
        'Comprehensive 52-week program designed for rapid industry entry.',
        'Includes 120 hours of mandatory vocational placement for real-world experience.',
        'Blended learning model combining face-to-face and online distance education.',
      ],
      description: 'The CHC33021 Certificate III in Individual Support reflects the role of workers in the community and/or residential setting who follow an individualised plan to provide person-centred support to people who may require support due to ageing, disability or some other reason.',
      whatYouWillLearn: [
        'Provide Individualised Support using a Person-centred Approach',
        'Promote Independence and Empowerment for Your Clients',
        'Work Legally, Ethically, and with Diverse People',
        'Work and Communicate Effectively in the Care Sector',
        'Prioritise Health, Safety, and Infection Control',
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
        { code: 'CHCCCS040', title: 'Support independence and wellbeing', type: 'CORE' },
        { code: 'CHCCCS041', title: 'Recognise healthy body systems', type: 'CORE' },
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
          question: 'Is Recognition of Prior Learning (RPL) available?',
          answer: 'Yes, Optimum Academy has an RPL Policy to recognise your prior learning through formal/informal training or work experience.'
        },
        {
          question: 'What are the vocational placement options?',
          answer: 'Optimum Academy provides direct support for vocational placement. You can also source your own provider, and our team will assist you in ensuring it meets all training requirements.'
        }
      ]
    },
    featuredImage: {
      node: {
        sourceUrl: '/images/CRICOS 04432K Cert III Individual Support International.png',
        altText: 'Supportive care interaction between a professional worker and a client in a healthcare setting',
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
      paymentPlan: 'Full payment required',
      deliveryMode: 'Blended',
      level: 'Unit of Competency',
      totalHours: 'Approx. 10 hours',
      price: '$97.00',
      discount: '10% Discount Available',
      externalEnrolmentLink: 'https://optimumtrainingacademy.rto.net.au/Form/Index?formType=1&directLink=true&id=optimumtrainingacademy&del=61509&courseCode=HLTAID011',
      brochureLink: BROCHURE_FIRST_AID,
      careerOutcomes: [],
      entryRequirements: [
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
      description: 'The HLTAID011 Provide First Aid unit describes the skills and knowledge required to provide a first aid response to a casualty in line with first aid guidelines determined by the Australian Resuscitation Council (ARC) and other Australian national peak clinical bodies.',
      whatYouWillLearn: [
        'Respond to an emergency situation',
        'Apply appropriate first aid procedures',
        'Communicate details of the incident',
        'Review the incident',
      ],
      vocationalPlacement: '',
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
        sourceUrl: '/images/hltaid011-provide-first-aid.png',
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
      paymentPlan: 'Full payment required',
      deliveryMode: 'Face-to-face',
      level: 'Unit of Competency',
      totalHours: 'Approx. 8 hours',
      price: '$125.00',
      discount: '10% Discount Available',
      externalEnrolmentLink: 'https://optimumtrainingacademy.rto.net.au/Form/Index?formType=1&directLink=true&id=optimumtrainingacademy&del=61510&courseCode=HLTWHS005',
      brochureLink: BROCHURE_MANUAL_TASKS,
      careerOutcomes: [],
      entryRequirements: [
        'Must be able to perform manual handling tasks safely',
        'Physical capacity to use appropriate equipment, posture and handling techniques',
      ],
      whyStudy: [
        'Nationally Recognised Unit of Competency (Release 1) describing skills to recognise potentially hazardous manual tasks.',
        'Quality content and robust training programs by Optimum Training Academy (RTO#46534).',
        'Essential for workers in a broad range of industries and professions.',
        'Develops requisite skills to prepare for and complete manual tasks in a safe manner.',
      ],
      description: 'The HLTWHS005 Conduct manual tasks safely unit describes the skills and knowledge required to recognise potentially hazardous manual tasks, and then to prepare for and complete those tasks in a safe manner.',
      whatYouWillLearn: [
        'Identify manual tasks involving risk',
        'Prepare for manual tasks',
        'Complete manual tasks',
        'Contribute to safe work practices',
      ],
      vocationalPlacement: '',
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
        sourceUrl: '/images/HLTWHS005 Manual Tasks.png',
        altText: 'Care professionals demonstrating safe manual handling and workplace safety techniques',
      },
    },
  },
];

export const mockPosts: Post[] = [
  {
    id: 'post-international-student-life-in-australia',
    title: 'International Student Life in Australia: A Practical Guide',
    slug: 'international-student-life-in-australia',
    excerpt: 'Get practical guidance on costs, housing, social connections, support services, and pre-arrival planning for international student life in Australia.',
    date: '2025-02-23',
    featuredImage: {
      node: {
        sourceUrl: '/images/international-student-life.jpg',
        altText: 'International students studying and collaborating together in Australia',
      },
    },
    categories: {
      nodes: [
        { name: 'International Students', slug: 'international-students' },
        { name: 'Student Life', slug: 'student-life' },
      ],
    },
    author: {
      node: {
        name: 'Optimum Academy Team',
        avatar: {
          url: '/images/avatar-placeholder.svg',
        },
      },
    },
    content: `
      <p class="text-xl text-slate-600 leading-relaxed mb-8 italic">
        Moving to Australia as an international student is one of those decisions that reshapes how you see the world. You get access to globally ranked institutions, cities that feel alive around the clock, and a multicultural community that genuinely welcomes newcomers. But daily life here comes with its own learning curve, from navigating rental markets to figuring out how far a part-time wage actually stretches.
      </p>

      <p class="mb-8 text-slate-700 leading-relaxed">
        This guide covers every practical angle of international student life in Australia: costs, accommodation, social connections, support services, and the steps worth taking before you even board your flight. No vague promises, just real details you can plan around.
      </p>

      <div class="my-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
        <h2 class="text-xl font-bold text-slate-900 mt-0 mb-4">Key takeaways</h2>
        <ul class="space-y-2 mb-0 list-disc pl-5 text-slate-700">
          <li>Most international students in Australia spend between $1,800 and $3,200 per month, depending on their city and lifestyle choices.</li>
          <li>Shared housing and purpose-built student accommodation are the two most popular options for balancing cost with comfort.</li>
          <li>Orientation Week events, student clubs, and part-time work are the fastest ways to build a social circle in a new city.</li>
          <li>Every Australian institution offers dedicated international student advisors, counselling, career services, and language support at no extra cost.</li>
          <li>Sorting out your accommodation, banking, and health cover before arrival removes most of the stress from your first two weeks.</li>
        </ul>
      </div>

      <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-6">What Is International Student Life in Australia Really Like?</h2>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">What Changes in Your First Few Weeks?</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">The first two weeks are a blur of logistics. You will open a bank account, activate your phone plan, collect your student ID, and learn how public transport works in your city. Most institutions run structured orientation programs that guide you through each of these steps, so you will rarely have to figure things out alone.</p>
      <p class="mb-4 text-slate-700 leading-relaxed">Time zones, weather, and food all shift at once. If you arrive from the Northern Hemisphere, expect the seasons to be reversed. Summer runs from December to February, and the academic year typically begins in late February or early March. Adjusting your body clock and meal routine usually takes about a week.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">The pace of campus life picks up quickly. Lectures, tutorials, and group assignments start within the first fortnight, and most students find that having a set academic schedule gives their week structure and purpose right away.</p>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">What Surprises Most New Students?</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Australians use a lot of slang, and it can catch you off guard. Words like "arvo" (afternoon), "brekkie" (breakfast), and "uni" (university) are used in everyday conversation, including by lecturers and support staff. You will pick them up fast.</p>
      <p class="mb-4 text-slate-700 leading-relaxed">The café culture here is a genuine part of daily life. Coffee shops double as study spaces, meeting points, and places to decompress between classes. Budgeting for a few coffees a week is realistic, and learning to make your own saves a surprising amount over a semester.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">Public transport reliability varies by city. Melbourne and Sydney have extensive train and tram networks. Brisbane and Perth rely more on buses. Adelaide is compact enough that cycling covers most student commutes. Planning your accommodation close to a transit line makes a real difference.</p>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">How Does Culture at Australian Institutions Differ from Other Countries?</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Australian institutions place a strong emphasis on independent learning. Lecturers set expectations and provide materials, but you are responsible for managing your own study time, completing readings before tutorials, and meeting assignment deadlines without repeated reminders.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">Class participation is valued and sometimes assessed. Tutorials and seminars often involve small-group discussions, presentations, and peer feedback. If you come from an education system where listening quietly is the norm, this shift builds confidence quickly.</p>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">What Should You Know About Academic Integrity and Staff Access?</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Academic integrity rules are strict. Universities use plagiarism detection software and take breaches seriously. Proper referencing, original thinking, and clear citation of sources are expected in every assignment. Most institutions offer free workshops on academic writing and referencing styles during orientation.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">The relationship between students and lecturers tends to be more informal than in many countries. You can usually address teaching staff by their first name, visit them during office hours with questions, and expect prompt email replies. This accessibility makes it easier to seek help early when you need it.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-6">How Much Does Student Life in Australia Cost?</h2>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">Which Costs Matter Most Each Month?</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Rent is usually your largest single expense, and it varies dramatically by city, suburb, and housing type. Students in larger cities often pay more than those in smaller cities, especially when they want to live close to campus or public transport.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">Groceries are usually the next major cost. Students who cook at home and meal-prep regularly often spend far less than students who buy meals on campus or eat out several times a week.</p>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">What About Transport, Utilities, and Health Cover?</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Transport, phone plans, and shared utilities are recurring costs worth planning for early. In many cities, eligible students can access transport concessions, which can reduce day-to-day travel costs.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">Overseas Student Health Cover (OSHC) is mandatory for your entire visa duration. It covers doctor visits, hospital stays, and some prescriptions. Premiums are typically paid upfront for the full course length, so factor that into your pre-departure budget.</p>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">Why Do Costs Vary by City and Lifestyle?</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Sydney and Melbourne are the most expensive cities for students, primarily because of higher rents and transport fares. Brisbane, Perth, and Adelaide offer noticeably lower living costs while still providing strong university programs and active student communities.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">Your lifestyle choices create the biggest variation. Students who cook at home, share accommodation, and use public transport usually spend much less than students who eat out regularly and rent private studios.</p>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">How to Create a Realistic Student Budget</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Start by listing your fixed costs: rent, OSHC, phone plan, and transport pass. These are predictable and rarely change month to month. Subtract them from your total available funds (family support, savings, and expected part-time income) to see what remains for groceries, social life, and unexpected expenses.</p>
      <p class="mb-4 text-slate-700 leading-relaxed">Set a weekly grocery target and track your spending for the first month. Apps like your bank's own budgeting tool or a simple spreadsheet make this easy. Most students find their spending patterns stabilise by the end of their second month.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">Keep an emergency buffer if you can. Medical costs not fully covered, damaged devices, or unexpected study expenses can put pressure on a tight budget, so having extra funds available gives you more flexibility.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-6">Where Do International Students Live in Australia?</h2>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">What Are the Pros and Trade-offs of Campus and Student Housing?</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">University residential colleges are often the easiest option for your first semester. They usually include meals, utilities, internet, and organised social activities. The trade-off is that they can cost more and offer less independence than a private rental.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">Purpose-built student accommodation is designed specifically for students and typically includes furnished rooms, Wi-Fi, and communal spaces. These buildings are often near campuses or public transport hubs, which can make the daily commute easier.</p>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">How Do Share Houses, Homestays, and Private Rentals Compare?</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Shared apartments are a common choice among students who have been in Australia for at least one semester. You handle your own groceries and bills, but the lower rent compared with private accommodation can give you more financial flexibility.</p>
      <p class="mb-4 text-slate-700 leading-relaxed">Homestay places you with an Australian family and usually includes meals. This option works well for students who want to practise English daily and prefer a built-in support network, though it comes with house rules and less social freedom.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">Private studios offer the most independence and privacy, but they usually cost more than shared options. They suit students who value quiet study time, though they can feel isolating if you do not actively build social connections elsewhere.</p>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">Tips for Securing Accommodation from Overseas</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Start searching two to three months before your course begins. University accommodation portals and purpose-built providers accept online applications, and many guarantee a room if you apply before the deadline. This removes the stress of arriving without a place to live.</p>
      <p class="mb-4 text-slate-700 leading-relaxed">Be cautious with private rental listings that ask for money before you have seen the property or signed a lease. Scams targeting international students are common. Stick to verified platforms and your university's official accommodation partners for your first booking.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">If you plan to move into a share house after arriving, book a short-term stay for your first two to four weeks. Hostels, temporary student housing, and Airbnb rentals give you time to inspect share houses in person and meet potential housemates before committing to a lease.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-6">How Do Students Build a Routine and Social Life?</h2>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">How Do You Make Friends and Feel at Home Faster?</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Orientation Week is the single best opportunity to meet people. Universities organise campus tours, welcome barbecues, club sign-up fairs, and social events specifically designed for new students. Attend as many as your schedule allows, even the ones that seem optional.</p>
      <p class="mb-4 text-slate-700 leading-relaxed">Student clubs and societies are where most lasting friendships form. Australian universities typically offer 100 or more clubs, covering everything from sport and cultural groups to cooking, photography, and debate. Joining a club that meets weekly creates the kind of repeated, low-pressure interaction that turns acquaintances into friends.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">Part-time work also expands your social circle. Many international students work in hospitality, retail, or on-campus roles, and colleagues often become close friends. Working alongside Australians is one of the fastest ways to pick up local slang, cultural norms, and weekend plans.</p>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">How Do You Balance Study, Work, and Wellbeing?</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">International students on a Student visa (subclass 500) can work up to 48 hours per fortnight during study periods, with no limit during official course breaks. Building your work shifts around your class timetable rather than the other way around protects your academic performance.</p>
      <p class="mb-4 text-slate-700 leading-relaxed">Consistent routines matter more than perfect ones. Students who set regular sleep and study hours, even loosely, report lower stress and higher grades than those who cram and pull late nights. Find a rhythm that includes breaks, exercise, and at least one social activity per week.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">Many institutions have free gyms, meditation rooms, or outdoor recreation spaces. Using them costs nothing and gives you a mental reset between study sessions. Walking or cycling to campus instead of taking the bus is another small habit that adds up for both fitness and savings.</p>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">Understanding Australian Culture and Social Norms</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Australians value directness and a sense of humour in daily conversation. People say what they mean, and friendly teasing is a common way of showing warmth. If someone jokes with you, it usually means they feel comfortable around you.</p>
      <p class="mb-4 text-slate-700 leading-relaxed">Punctuality matters in academic and professional settings. Arriving on time for lectures, tutorials, and part-time shifts is expected. Social gatherings, on the other hand, tend to be more relaxed about timing.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">Tipping is not expected in Australia. Hospitality workers are paid a minimum wage that is significantly higher than in many other countries. You might leave a small tip at a restaurant for exceptional service, but it is entirely optional and no one will expect it.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-6">What Support Can International Students Access?</h2>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">What Help Is Available on Campus?</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Every Australian institution has a dedicated International Student Services team. These advisors help with visa questions, enrolment issues, accommodation referrals, and personal challenges. Most offer drop-in hours on weekdays and some provide 24/7 emergency phone lines.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">Counselling services are free and confidential at many Australian institutions. Trained counsellors are available for in-person and online sessions covering homesickness, academic pressure, and personal wellbeing. Many universities also offer peer mentoring programs that pair you with a senior student from a similar background.</p>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">What Academic and Career Support Can You Access?</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Language and academic support is available through specialised centres on most campuses. These centres help with essay writing, presentation skills, academic English, and exam preparation. Sessions are usually free and available by appointment or on a drop-in basis.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">Career services help you build employability skills while you study. Resume workshops, mock interviews, job boards, and industry networking events are standard offerings. Some universities also run internship placement programs specifically for international students, connecting classroom learning with real workplace experience.</p>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">Community and Government Support Outside Campus</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Beyond your university, local councils and community organisations run free events, language exchanges, and volunteer programs. These are open to everyone and provide another way to connect with people outside student circles.</p>
      <p class="mb-4 text-slate-700 leading-relaxed">The Australian Government's Study Australia website offers a centralised hub of resources covering visas, rights, safety, and regional information. It also includes a cost of living calculator that lets you estimate expenses based on your chosen city and lifestyle preferences.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">If you experience workplace issues such as underpayment, the Fair Work Ombudsman provides free advice and complaints services. International students have the same workplace rights as Australian workers, and these protections are enforced regardless of visa status.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-6">What Should Students Know Before They Arrive?</h2>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">Which Steps Make the Biggest Difference Before Day One?</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Secure at least temporary accommodation before you fly. Even a few weeks in a hostel or short-term rental removes the pressure of house-hunting while jet-lagged. Many students book purpose-built student accommodation from overseas, since applications can be completed entirely online.</p>
      <p class="mb-4 text-slate-700 leading-relaxed">Open an Australian bank account before you arrive. Several major banks allow international students to set up accounts remotely, so your card is ready when you land. This avoids currency conversion fees on everyday purchases during your first week.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">Purchase your Overseas Student Health Cover (OSHC) as part of your visa application. Your education provider will usually give you a list of approved OSHC providers. Having your health cover sorted before departure means one less thing to organise on arrival.</p>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">What Should You Pack and Prepare in Your Final Week?</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Pack for the season you are arriving in, not the one you are leaving. Australian weather varies enormously by region and time of year. Check your destination city's forecast for the month you land and pack layers, as mornings and evenings can be significantly cooler than midday.</p>
      <p class="mb-4 text-slate-700 leading-relaxed">Download your university's student app and check for any pre-arrival tasks. Many institutions require you to complete online modules, upload documents, or register for orientation before classes begin. Completing these tasks early gives you a smoother first week on campus.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">Keep digital and physical copies of your passport, visa grant letter, Confirmation of Enrolment (CoE), OSHC policy, and accommodation booking. Store the digital copies in a cloud drive you can access from any device. Having backups prevents delays if any original document goes missing.</p>

      <h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">Financial Preparation Checklist</h3>
      <p class="mb-4 text-slate-700 leading-relaxed">Confirm that your savings or family support will cover at least your first few months of living expenses. Your actual needs will depend on your city, accommodation choice, and day-to-day habits, so it helps to build a budget based on your own likely routine.</p>
      <p class="mb-4 text-slate-700 leading-relaxed">Research currency transfer options before you leave. International transfer services often offer better exchange rates and lower fees than traditional banks. Setting up a transfer account in advance means you can move money to your Australian account quickly when you need it.</p>
      <p class="mb-6 text-slate-700 leading-relaxed">Check whether your home country's driver's licence is valid in your Australian state. If you plan to drive, you may need an International Driving Permit. For most students, public transport and cycling are more practical and far less expensive than owning a car.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-6">Making the Most of Your Time as an International Student in Australia</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">International student life in Australia rewards people who prepare well and stay open to new experiences. The practical foundations covered here, including budgeting, accommodation, social connections, university support, and pre-arrival planning, all connect to one idea: the more you understand before you arrive, the faster you settle in and start enjoying your time.</p>
      <p class="mb-8 text-slate-700 leading-relaxed">Australia's combination of strong academic programs, diverse communities, and structured student support creates an environment where you can study, work, and build lasting friendships. Take advantage of the resources available to you, both on campus and in the wider community, and approach each challenge as part of the experience rather than an obstacle to it.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-6">FAQs About International Student Life in Australia</h2>
      <div class="space-y-6 my-8">
        <div class="border-b border-slate-200 pb-4">
          <h3 class="text-lg font-bold text-slate-900 mb-2">How much money do international students need per month in Australia?</h3>
          <p class="text-slate-700">Monthly costs vary widely depending on your city, accommodation type, and lifestyle. Rent, groceries, transport, phone bills, and social spending usually make up the largest share of a student's budget.</p>
        </div>
        <div class="border-b border-slate-200 pb-4">
          <h3 class="text-lg font-bold text-slate-900 mb-2">Can international students work while studying in Australia?</h3>
          <p class="text-slate-700">Yes. Students on a subclass 500 visa can work up to 48 hours per fortnight during study periods. During scheduled course breaks, there is no hour limit. Many students work in hospitality, retail, or on-campus roles to supplement their income.</p>
        </div>
        <div class="border-b border-slate-200 pb-4">
          <h3 class="text-lg font-bold text-slate-900 mb-2">What is the cheapest city for international students in Australia?</h3>
          <p class="text-slate-700">Adelaide is generally the most affordable major student city, with lower rents and daily expenses compared to Sydney or Melbourne. Perth and Brisbane also offer competitive living costs while hosting well-regarded universities and active student communities.</p>
        </div>
        <div class="border-b border-slate-200 pb-4">
          <h3 class="text-lg font-bold text-slate-900 mb-2">How do international students find accommodation in Australia?</h3>
          <p class="text-slate-700">The most common methods include applying directly to purpose-built student accommodation providers, using sharehouse websites like Flatmates.com.au, or contacting your university's accommodation service. Starting your search two to three months before arrival gives you the widest range of options.</p>
        </div>
        <div class="border-b border-slate-200 pb-4">
          <h3 class="text-lg font-bold text-slate-900 mb-2">What health cover do international students need in Australia?</h3>
          <p class="text-slate-700">All international students must hold Overseas Student Health Cover (OSHC) for their entire visa period. OSHC covers doctor visits, hospital treatment, and some prescription medications. Your education provider will typically recommend approved insurers during the enrolment process.</p>
        </div>
        <div class="border-b border-slate-200 pb-4">
          <h3 class="text-lg font-bold text-slate-900 mb-2">Is it easy to make friends as an international student in Australia?</h3>
          <p class="text-slate-700">Most students find it straightforward once they join structured social settings. Orientation Week events, student clubs, sport teams, and part-time work are the most effective ways to build friendships. Universities also run peer mentoring and buddy programs designed to help new arrivals connect quickly.</p>
        </div>
        <div class="border-b border-slate-200 pb-4">
          <h3 class="text-lg font-bold text-slate-900 mb-2">What support services do Australian universities offer international students?</h3>
          <p class="text-slate-700">Australian institutions provide international student advisors, free counselling, language and academic support, career services, and emergency assistance lines. Many also offer peer mentoring, cultural events, and financial advice workshops tailored specifically for international students.</p>
        </div>
      </div>
    `,
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
