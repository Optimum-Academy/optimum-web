'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { TRACKING_PARAMS, getCookie, trackEvent } from '@/lib/utils/tracking';
import { CheckCircle2, ChevronRight, ChevronLeft, Upload, AlertCircle, ShieldCheck, Info } from 'lucide-react';

interface FormProps {
  initialCourseSlug?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export function InternationalApplicationForm({ initialCourseSlug }: FormProps) {
  // Use initialCourseSlug if provided or log/track if needed
  useEffect(() => {
    if (initialCourseSlug) {
      trackEvent('International Form Pre-selected Course', { courseSlug: initialCourseSlug });
    }
  }, [initialCourseSlug]);
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tracking, setTracking] = useState<Record<string, string>>({});

  // File states (storing filename and status, plus file object if needed)
  const [fileData, setFileData] = useState<Record<string, { name: string; size: number; base64?: string }>>({});

  // Form State
  const [formData, setFormData] = useState({
    // Course Details (Fixed/Pre-selected)
    courseCode: 'CHC52025',
    courseTitle: 'Diploma of Community Services',
    courseRelease: 'Release 1',
    cricosCode: '120037M',
    courseDelivery: 'Face-to-face training + Online distance + Vocational Placement',
    courseDuration: '80 weeks',

    // STEP 1: Personal Details
    applicationDate: new Date().toISOString().split('T')[0],
    title: '',
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    homeAddress: '',
    suburb: '',
    state: '',
    postcode: '',
    countryOfResidence: '',
    postalSameAsHome: 'Yes',
    postalAddress: '',
    postalSuburb: '',
    postalState: '',
    postalPostcode: '',
    postalCountry: '',
    phonePrimary: '',
    phoneWork: '',
    email: '',
    countryOfBirth: '',
    cityOfBirth: '',

    // STEP 2: Language, Cultural Diversity & Support
    mainLanguageAtHome: '',
    otherLanguageAtHome: 'No',
    otherLanguageName: '',
    indigenousStatus: 'No',
    hasDisability: 'No',
    disabilities: [] as string[],
    additionalSupportNeeded: '',

    // STEP 3: Education & Training
    englishLiteracySelfAssessment: 'Yes',
    englishTestTaken: 'None',
    englishTestScore: '',
    highestCompletedSchoolLevel: '',
    secondaryStatus: 'Completed',
    yearSchoolCompleted: '',
    hasCompletedQualifications: 'No',
    previousQualifications: [] as string[],
    previousQualificationDetails: '',

    // STEP 4: Employment & Experience
    employmentStatus: '',
    employerName: '',
    employerContactPerson: '',
    employerPhone: '',
    employerEmail: '',
    mainReasonForStudy: '',
    relatedWorkExperience: '',

    // STEP 5: Course Application & RPL
    applyForRPL: 'No',
    rplDetails: '',
    applyForCreditTransfer: 'No',
    relevantSkillsExperience: '',
    hasComputerAndInternet: 'Yes',
    computerLiteracy: 'Intermediate',
    numeracySelfAssessment: 'Yes',

    // STEP 6: Additional Information & Support
    oshcAssistanceRequired: 'No',
    oshcProviderName: '',
    oshcMembershipNumber: '',
    oshcType: 'Single',
    airportPickupRequired: 'No',
    homestayRequired: 'No',
    under18OnArrival: 'No',
    studyFundingSource: 'Self-funded',
    financialCapacityAcknowledgement: 'Yes',
    gteAwarenessAcknowledgement: 'Yes',

    // STEP 7: USI & Passport Details
    usiNumber: '',
    usiPermissionToCreate: 'No',
    passportNumber: '',
    passportCountry: '',
    currentAustralianVisaStatus: 'Not in Australia',
    visaExpiryDate: '',

    // STEP 9: Privacy, Declarations & eSignature
    privacyConsent: false,
    esosConsent: false,
    financialDeclaration: false,
    truthfulDeclaration: false,
    applicantPrintedName: '',
    eSignatureText: '',
    declarationDate: new Date().toISOString().split('T')[0],

    _honey: ''
  });

  useEffect(() => {
    const stored: Record<string, string> = {};
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      TRACKING_PARAMS.forEach(param => {
        const val = searchParams.get(param) || getCookie(param);
        if (val) stored[param] = val;
      });
    }
    setTracking(stored);
    trackEvent('International Application Form Viewed');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxArrayChange = (field: 'disabilities' | 'previousQualifications', itemValue: string, checked: boolean) => {
    setFormData(prev => {
      const currentList = prev[field];
      if (checked) {
        return { ...prev, [field]: [...currentList, itemValue] };
      } else {
        return { ...prev, [field]: currentList.filter(v => v !== itemValue) };
      }
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [docType]: 'Invalid file type. Allowed: PDF, JPG, PNG, DOC, DOCX'
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors(prev => ({
        ...prev,
        [docType]: 'File size exceeds maximum limit of 5MB'
      }));
      return;
    }

    // Clear error
    if (errors[docType]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[docType];
        return newErrors;
      });
    }

    // Store file info
    setFileData(prev => ({
      ...prev,
      [docType]: {
        name: file.name,
        size: file.size
      }
    }));
  };

  const handleRemoveFile = (docType: string) => {
    setFileData(prev => {
      const copy = { ...prev };
      delete copy[docType];
      return copy;
    });
  };

  // Step Validation
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First Name / Given Names is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last Name / Family Name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender selection is required';
      if (!formData.homeAddress.trim()) newErrors.homeAddress = 'Home address is required';
      if (!formData.suburb.trim()) newErrors.suburb = 'Suburb/City is required';
      if (!formData.state.trim()) newErrors.state = 'State/Province is required';
      if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required';
      if (!formData.countryOfResidence.trim()) newErrors.countryOfResidence = 'Country of residence is required';
      if (!formData.phonePrimary.trim()) newErrors.phonePrimary = 'Primary phone number is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.countryOfBirth.trim()) newErrors.countryOfBirth = 'Country of birth is required';
      if (!formData.cityOfBirth.trim()) newErrors.cityOfBirth = 'City of birth is required';
    }

    if (step === 2) {
      if (!formData.mainLanguageAtHome.trim()) newErrors.mainLanguageAtHome = 'Main language is required';
    }

    if (step === 3) {
      if (!formData.highestCompletedSchoolLevel) newErrors.highestCompletedSchoolLevel = 'Highest school level is required';
    }

    if (step === 4) {
      if (!formData.employmentStatus) newErrors.employmentStatus = 'Employment status is required';
      if (!formData.mainReasonForStudy) newErrors.mainReasonForStudy = 'Main reason for study is required';
    }

    if (step === 5) {
      if (formData.applyForRPL === 'Yes' && !formData.rplDetails.trim()) {
        newErrors.rplDetails = 'Please provide details about your RPL request';
      }
    }

    if (step === 6) {
      if (formData.under18OnArrival === 'Yes') {
        newErrors.under18OnArrival = 'Applicants must be 18 years or older on arrival for CRICOS enrolment.';
      }
    }

    if (step === 7) {
      if (!formData.passportNumber.trim()) newErrors.passportNumber = 'Passport number is required';
      if (!formData.passportCountry.trim()) newErrors.passportCountry = 'Passport country is required';
    }

    if (step === 8) {
      // Passport copy is strongly recommended/required for international application
      if (!fileData['passportCopy']) {
        newErrors['passportCopy'] = 'Passport copy upload is required for international application assessment';
      }
    }

    if (step === 9) {
      if (!formData.privacyConsent) newErrors.privacyConsent = 'You must acknowledge and agree to the Privacy Notice';
      if (!formData.esosConsent) newErrors.esosConsent = 'You must acknowledge the ESOS Framework';
      if (!formData.financialDeclaration) newErrors.financialDeclaration = 'You must confirm financial capacity';
      if (!formData.truthfulDeclaration) newErrors.truthfulDeclaration = 'You must confirm that all provided information is true and correct';
      if (!formData.applicantPrintedName.trim()) newErrors.applicantPrintedName = 'Printed name is required';
      if (!formData.eSignatureText.trim()) newErrors.eSignatureText = 'Digital signature / typed name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 9));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    if (!validateStep(9)) return;

    setStatus('loading');
    setErrorMessage('');

    trackEvent('International Application Submitted', {
      course: `${formData.courseCode} ${formData.courseTitle}`
    });

    try {
      const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
      const referrer = typeof document !== 'undefined' ? document.referrer : '';

      // Prepare attached document summary text
      const attachedDocsSummary = Object.entries(fileData)
        .map(([type, file]) => `${type}: ${file.name} (${Math.round(file.size / 1024)} KB)`)
        .join('; ');

      const payload = {
        _subject: `New International Student Application – ${formData.courseCode} – ${formData.firstName} ${formData.lastName}`,
        _template: 'table',
        _captcha: 'false',
        submitted_at: new Date().toISOString(),
        page_url: pageUrl,
        referrer_url: referrer,

        // Course Info
        course_code: formData.courseCode,
        course_title: formData.courseTitle,
        cricos_code: formData.cricosCode,
        course_duration: formData.courseDuration,

        // Step 1: Personal
        application_date: formData.applicationDate,
        title: formData.title,
        applicant_first_name: formData.firstName,
        applicant_last_name: formData.lastName,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        home_address: `${formData.homeAddress}, ${formData.suburb}, ${formData.state} ${formData.postcode}, ${formData.countryOfResidence}`,
        postal_address: formData.postalSameAsHome === 'Yes' ? 'Same as home address' : `${formData.postalAddress}, ${formData.postalSuburb}, ${formData.postalState} ${formData.postalPostcode}, ${formData.postalCountry}`,
        primary_phone: formData.phonePrimary,
        work_phone: formData.phoneWork || 'N/A',
        email: formData.email,
        country_of_birth: formData.countryOfBirth,
        city_of_birth: formData.cityOfBirth,

        // Step 2: Cultural
        main_language_at_home: formData.mainLanguageAtHome,
        speaks_other_language_at_home: formData.otherLanguageAtHome === 'Yes' ? formData.otherLanguageName : 'No',
        indigenous_status: formData.indigenousStatus,
        has_disability: formData.hasDisability,
        disabilities_selected: formData.disabilities.join(', ') || 'None',
        additional_support_needed: formData.additionalSupportNeeded || 'None',

        // Step 3: Education
        english_literacy_self_assessment: formData.englishLiteracySelfAssessment,
        english_test_taken: formData.englishTestTaken,
        english_test_score: formData.englishTestScore || 'N/A',
        highest_completed_school_level: formData.highestCompletedSchoolLevel,
        secondary_status: formData.secondaryStatus,
        year_school_completed: formData.yearSchoolCompleted || 'N/A',
        has_completed_qualifications: formData.hasCompletedQualifications,
        previous_qualifications: formData.previousQualifications.join(', ') || 'None',
        previous_qualification_details: formData.previousQualificationDetails || 'N/A',

        // Step 4: Employment
        employment_status: formData.employmentStatus,
        employer_name: formData.employerName || 'N/A',
        employer_contact: formData.employerContactPerson || 'N/A',
        employer_phone: formData.employerPhone || 'N/A',
        employer_email: formData.employerEmail || 'N/A',
        main_reason_for_study: formData.mainReasonForStudy,
        related_work_experience: formData.relatedWorkExperience || 'None provided',

        // Step 5: RPL & Skills
        rpl_requested: formData.applyForRPL,
        rpl_details: formData.rplDetails || 'N/A',
        credit_transfer_requested: formData.applyForCreditTransfer,
        relevant_skills_experience: formData.relevantSkillsExperience || 'None provided',
        computer_and_internet_access: formData.hasComputerAndInternet,
        computer_literacy: formData.computerLiteracy,
        numeracy_self_assessment: formData.numeracySelfAssessment,

        // Step 6: OSHC & Additional
        oshc_assistance_required: formData.oshcAssistanceRequired,
        oshc_details: formData.oshcAssistanceRequired === 'Already have OSHC' ? `${formData.oshcProviderName} (Member ID: ${formData.oshcMembershipNumber}) - ${formData.oshcType}` : 'N/A',
        airport_pickup_required: formData.airportPickupRequired,
        homestay_required: formData.homestayRequired,
        under_18_on_arrival: formData.under18OnArrival,
        study_funding_source: formData.studyFundingSource,
        financial_capacity_acknowledged: formData.financialCapacityAcknowledgement,
        gte_awareness_acknowledged: formData.gteAwarenessAcknowledgement,

        // Step 7: USI & Visa
        usi_number: formData.usiNumber || 'Not provided',
        usi_permission_to_create: formData.usiPermissionToCreate,
        passport_number: formData.passportNumber,
        passport_country: formData.passportCountry,
        current_australian_visa_status: formData.currentAustralianVisaStatus,
        visa_expiry_date: formData.visaExpiryDate || 'N/A',

        // Step 8: Attached Files
        attached_documents: attachedDocsSummary || 'No documents attached',

        // Step 9: Declarations
        privacy_agreed: 'Yes',
        esos_agreed: 'Yes',
        financial_declaration_agreed: 'Yes',
        truthful_declaration_agreed: 'Yes',
        printed_name: formData.applicantPrintedName,
        e_signature_text: formData.eSignatureText,
        declaration_date: formData.declarationDate,

        ...tracking,
        _honey: formData._honey
      };

      const response = await fetch('https://formsubmit.co/ajax/enquiries@optimumacademy.com.au', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('success');
        trackEvent('International Application Submission Successful');
      } else {
        setStatus('error');
        setErrorMessage('Submission failed. Please check your information or try again later.');
        trackEvent('International Application Submission Failed', { reason: 'Response not OK' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage('A network error occurred. Please try submitting again.');
      trackEvent('International Application Submission Failed', { reason: 'Exception occurred' });
    }
  };

  const selectClassName = "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

  if (status === 'success') {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border shadow-lg max-w-3xl mx-auto my-8 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 text-xs font-bold px-3 py-1 uppercase tracking-wider">
            Application Submitted
          </Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 font-heading">Application Received</h2>
        </div>
        <p className="text-slate-600 text-lg max-w-xl mx-auto leading-relaxed">
          Thank you for submitting your application to Optimum Training Academy. Our Student Services team will review the information provided and contact you regarding the next steps.
        </p>

        <div className="bg-slate-50 p-6 rounded-2xl border text-left text-sm space-y-3 text-slate-700">
          <p className="font-bold text-slate-900 border-b pb-2">Important Notice Regarding Your Application:</p>
          <ul className="space-y-2 list-disc list-inside text-slate-600">
            <li>Your application is now undergoing review by OTA Student Services.</li>
            <li>No payment has been charged at this stage.</li>
            <li>Submission of this application does <strong>not</strong> guarantee automatic admission, course enrolment, visa approval, or acceptance.</li>
            <li>Our team will reach out to you via email (<strong>{formData.email}</strong>) or phone regarding assessment outcomes and official enrolment instructions.</li>
          </ul>
        </div>

        <div className="pt-4 flex justify-center">
          <Button variant="outline" size="lg" className="rounded-full px-8" onClick={() => window.location.href = '/courses'}>
            Return to Courses
          </Button>
        </div>
      </div>
    );
  }

  const stepsHeader = [
    '1. Personal',
    '2. Language & Support',
    '3. Education',
    '4. Employment',
    '5. Course & RPL',
    '6. Additional & OSHC',
    '7. USI & Visa',
    '8. Documents',
    '9. Declaration'
  ];

  return (
    <div className="bg-white rounded-3xl border shadow-xl overflow-hidden max-w-4xl mx-auto my-6">
      {/* Course Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <Badge variant="outline" className="text-brand-purple-300 border-brand-purple-400 px-3 py-1 text-xs">
            International Application Form (CRICOS)
          </Badge>
          <span className="text-slate-400 font-mono text-xs">CRICOS Code: {formData.cricosCode}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading">{formData.courseCode} {formData.courseTitle}</h1>
        <p className="text-slate-400 text-sm mt-1">{formData.courseRelease} | Delivery: {formData.courseDelivery} | Duration: {formData.courseDuration}</p>
      </div>

      {/* Progress Navigation */}
      <div className="bg-slate-50 border-b p-4 sm:p-6 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[600px] mb-2 text-xs font-bold text-slate-500">
          {stepsHeader.map((stepTitle, idx) => {
            const stepNum = idx + 1;
            const isCurrent = stepNum === currentStep;
            const isDone = stepNum < currentStep;
            return (
              <div
                key={stepNum}
                className={`flex items-center gap-1.5 cursor-pointer ${
                  isCurrent ? 'text-brand-purple-600 font-bold' : isDone ? 'text-slate-900' : 'text-slate-400'
                }`}
                onClick={() => {
                  if (stepNum < currentStep) setCurrentStep(stepNum);
                }}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isCurrent ? 'bg-brand-purple-600 text-white' : isDone ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {isDone ? '✓' : stepNum}
                </span>
                <span className="whitespace-nowrap">{stepTitle}</span>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-brand-purple-600 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 9) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8" noValidate>
        {/* Honeypot */}
        <input
          type="text"
          name="_honey"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          value={formData._honey}
          onChange={handleChange}
        />

        {/* STEP 1: PERSONAL DETAILS */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-slate-900">STEP 1 — Personal Details</h2>
              <p className="text-sm text-slate-500">Please provide your official legal personal information as shown on your passport.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2 sm:col-span-1">
                <Label htmlFor="title">Title</Label>
                <select
                  id="title"
                  name="title"
                  className={selectClassName}
                  value={formData.title}
                  onChange={handleChange}
                >
                  <option value="">Select Title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Miss">Miss</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>

              <div className="space-y-2 sm:col-span-1">
                <Label htmlFor="firstName">First Name / Given Names *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Official Given Name(s)"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && <p className="text-xs text-red-500 font-medium">{errors.firstName}</p>}
              </div>

              <div className="space-y-2 sm:col-span-1">
                <Label htmlFor="lastName">Last Name / Family Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Official Family Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && <p className="text-xs text-red-500 font-medium">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={errors.dateOfBirth ? 'border-red-500' : ''}
                />
                {errors.dateOfBirth && <p className="text-xs text-red-500 font-medium">{errors.dateOfBirth}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <select
                  id="gender"
                  name="gender"
                  className={`${selectClassName} ${errors.gender ? 'border-red-500' : ''}`}
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Indeterminate/Intersex/Unspecified">Indeterminate / Intersex / Unspecified</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                {errors.gender && <p className="text-xs text-red-500 font-medium">{errors.gender}</p>}
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <h3 className="font-bold text-slate-800">Home Address (Permanent Residence)</h3>
              <div className="space-y-2">
                <Label htmlFor="homeAddress">Street Address *</Label>
                <Input
                  id="homeAddress"
                  name="homeAddress"
                  placeholder="Building/House No., Street Name"
                  value={formData.homeAddress}
                  onChange={handleChange}
                  className={errors.homeAddress ? 'border-red-500' : ''}
                />
                {errors.homeAddress && <p className="text-xs text-red-500 font-medium">{errors.homeAddress}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="suburb">Suburb / City *</Label>
                  <Input
                    id="suburb"
                    name="suburb"
                    placeholder="Suburb or City"
                    value={formData.suburb}
                    onChange={handleChange}
                    className={errors.suburb ? 'border-red-500' : ''}
                  />
                  {errors.suburb && <p className="text-xs text-red-500 font-medium">{errors.suburb}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State / Province *</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="State or Region"
                    value={formData.state}
                    onChange={handleChange}
                    className={errors.state ? 'border-red-500' : ''}
                  />
                  {errors.state && <p className="text-xs text-red-500 font-medium">{errors.state}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postcode">Postcode / Zip *</Label>
                  <Input
                    id="postcode"
                    name="postcode"
                    placeholder="Postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    className={errors.postcode ? 'border-red-500' : ''}
                  />
                  {errors.postcode && <p className="text-xs text-red-500 font-medium">{errors.postcode}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="countryOfResidence">Country of Residence *</Label>
                <Input
                  id="countryOfResidence"
                  name="countryOfResidence"
                  placeholder="Country"
                  value={formData.countryOfResidence}
                  onChange={handleChange}
                  className={errors.countryOfResidence ? 'border-red-500' : ''}
                />
                {errors.countryOfResidence && <p className="text-xs text-red-500 font-medium">{errors.countryOfResidence}</p>}
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="postalSameAsHome"
                  name="postalSameAsHome"
                  checked={formData.postalSameAsHome === 'Yes'}
                  onChange={(e) => setFormData(prev => ({ ...prev, postalSameAsHome: e.target.checked ? 'Yes' : 'No' }))}
                  className="h-4 w-4 rounded border-gray-300 text-brand-purple-600 focus:ring-brand-purple-500"
                />
                <Label htmlFor="postalSameAsHome" className="font-medium cursor-pointer">Postal address is same as Home Address</Label>
              </div>

              {formData.postalSameAsHome === 'No' && (
                <div className="space-y-4 bg-slate-50 p-4 rounded-xl border">
                  <h4 className="font-bold text-slate-800 text-sm">Postal Address</h4>
                  <div className="space-y-2">
                    <Label htmlFor="postalAddress">Street / PO Box</Label>
                    <Input
                      id="postalAddress"
                      name="postalAddress"
                      value={formData.postalAddress}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Input id="postalSuburb" name="postalSuburb" placeholder="Suburb" value={formData.postalSuburb} onChange={handleChange} />
                    <Input id="postalState" name="postalState" placeholder="State" value={formData.postalState} onChange={handleChange} />
                    <Input id="postalPostcode" name="postalPostcode" placeholder="Postcode" value={formData.postalPostcode} onChange={handleChange} />
                    <Input id="postalCountry" name="postalCountry" placeholder="Country" value={formData.postalCountry} onChange={handleChange} />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phonePrimary">Primary Mobile / Phone Number *</Label>
                <Input
                  id="phonePrimary"
                  name="phonePrimary"
                  placeholder="+61 400 000 000 or country code"
                  value={formData.phonePrimary}
                  onChange={handleChange}
                  className={errors.phonePrimary ? 'border-red-500' : ''}
                />
                {errors.phonePrimary && <p className="text-xs text-red-500 font-medium">{errors.phonePrimary}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneWork">Work Phone (Optional)</Label>
                <Input
                  id="phoneWork"
                  name="phoneWork"
                  placeholder="Work phone number"
                  value={formData.phoneWork}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="applicant@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="countryOfBirth">Country of Birth *</Label>
                <Input
                  id="countryOfBirth"
                  name="countryOfBirth"
                  placeholder="Country of birth"
                  value={formData.countryOfBirth}
                  onChange={handleChange}
                  className={errors.countryOfBirth ? 'border-red-500' : ''}
                />
                {errors.countryOfBirth && <p className="text-xs text-red-500 font-medium">{errors.countryOfBirth}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cityOfBirth">City of Birth *</Label>
                <Input
                  id="cityOfBirth"
                  name="cityOfBirth"
                  placeholder="City of birth"
                  value={formData.cityOfBirth}
                  onChange={handleChange}
                  className={errors.cityOfBirth ? 'border-red-500' : ''}
                />
                {errors.cityOfBirth && <p className="text-xs text-red-500 font-medium">{errors.cityOfBirth}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: LANGUAGE, CULTURAL DIVERSITY & SUPPORT */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-slate-900">STEP 2 — Language, Cultural Diversity & Support</h2>
              <p className="text-sm text-slate-500">Information required under Australian VET statistical reporting standards.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainLanguageAtHome">Main Language Spoken at Home *</Label>
              <Input
                id="mainLanguageAtHome"
                name="mainLanguageAtHome"
                placeholder="e.g. English, Mandarin, Hindi, Nepali, Spanish"
                value={formData.mainLanguageAtHome}
                onChange={handleChange}
                className={errors.mainLanguageAtHome ? 'border-red-500' : ''}
              />
              {errors.mainLanguageAtHome && <p className="text-xs text-red-500 font-medium">{errors.mainLanguageAtHome}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="otherLanguageAtHome">Do you speak a language other than English at home?</Label>
                <select
                  id="otherLanguageAtHome"
                  name="otherLanguageAtHome"
                  className={selectClassName}
                  value={formData.otherLanguageAtHome}
                  onChange={handleChange}
                >
                  <option value="No">No, English only</option>
                  <option value="Yes">Yes, speak another language</option>
                </select>
              </div>

              {formData.otherLanguageAtHome === 'Yes' && (
                <div className="space-y-2">
                  <Label htmlFor="otherLanguageName">Specify Other Language</Label>
                  <Input
                    id="otherLanguageName"
                    name="otherLanguageName"
                    placeholder="Language name"
                    value={formData.otherLanguageName}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="indigenousStatus">Are you of Australian Aboriginal or Torres Strait Islander origin?</Label>
              <select
                id="indigenousStatus"
                name="indigenousStatus"
                className={selectClassName}
                value={formData.indigenousStatus}
                onChange={handleChange}
              >
                <option value="No">No</option>
                <option value="Yes, Aboriginal">Yes, Aboriginal</option>
                <option value="Yes, Torres Strait Islander">Yes, Torres Strait Islander</option>
                <option value="Yes, both Aboriginal and Torres Strait Islander">Yes, both Aboriginal and Torres Strait Islander</option>
              </select>
            </div>

            <div className="border-t pt-4 space-y-4">
              <Label htmlFor="hasDisability">Do you consider yourself to have a disability, impairment or long-term medical condition?</Label>
              <select
                id="hasDisability"
                name="hasDisability"
                className={selectClassName}
                value={formData.hasDisability}
                onChange={handleChange}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>

              {formData.hasDisability === 'Yes' && (
                <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                  <p className="text-xs font-bold text-slate-700">Please select all applicable areas:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {[
                      'Hearing / Deaf',
                      'Physical',
                      'Intellectual',
                      'Learning',
                      'Mental Illness',
                      'Medical Condition',
                      'Vision',
                      'Mobility',
                      'Other'
                    ].map(d => (
                      <label key={d} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.disabilities.includes(d)}
                          onChange={(e) => handleCheckboxArrayChange('disabilities', d, e.target.checked)}
                          className="rounded border-gray-300 text-brand-purple-600 focus:ring-brand-purple-500"
                        />
                        <span>{d}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalSupportNeeded">Additional Learning or Individual Support Requirements (Optional)</Label>
              <Textarea
                id="additionalSupportNeeded"
                name="additionalSupportNeeded"
                placeholder="Please describe any learning, language, or accessibility support you may require during your course."
                value={formData.additionalSupportNeeded}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* STEP 3: EDUCATION & TRAINING */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-slate-900">STEP 3 — Education & Training</h2>
              <p className="text-sm text-slate-500">Your educational history and English proficiency details.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="englishLiteracySelfAssessment">Do you consider yourself to have adequate English literacy skills to complete this qualification?</Label>
                <select
                  id="englishLiteracySelfAssessment"
                  name="englishLiteracySelfAssessment"
                  className={selectClassName}
                  value={formData.englishLiteracySelfAssessment}
                  onChange={handleChange}
                >
                  <option value="Yes">Yes, confident in reading, writing and speaking English</option>
                  <option value="No">No, need support</option>
                  <option value="Need Assessment">Request LLN / English Assessment</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="englishTestTaken">English Language Qualification / Test Taken</Label>
                <select
                  id="englishTestTaken"
                  name="englishTestTaken"
                  className={selectClassName}
                  value={formData.englishTestTaken}
                  onChange={handleChange}
                >
                  <option value="None">None / Secondary Education in English</option>
                  <option value="IELTS">IELTS</option>
                  <option value="PTE Academic">PTE Academic</option>
                  <option value="TOEFL iBT">TOEFL iBT</option>
                  <option value="Cambridge English">Cambridge English</option>
                  <option value="Other">Other Equivalent Qualification</option>
                </select>
              </div>

              {formData.englishTestTaken !== 'None' && (
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="englishTestScore">Overall Test Score / Qualification Result</Label>
                  <Input
                    id="englishTestScore"
                    name="englishTestScore"
                    placeholder="e.g. IELTS 6.0 / PTE 50"
                    value={formData.englishTestScore}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            <div className="border-t pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2 sm:col-span-1">
                <Label htmlFor="highestCompletedSchoolLevel">Highest Completed School Level *</Label>
                <select
                  id="highestCompletedSchoolLevel"
                  name="highestCompletedSchoolLevel"
                  className={`${selectClassName} ${errors.highestCompletedSchoolLevel ? 'border-red-500' : ''}`}
                  value={formData.highestCompletedSchoolLevel}
                  onChange={handleChange}
                >
                  <option value="">Select Level</option>
                  <option value="Year 12 or equivalent">Year 12 or equivalent</option>
                  <option value="Year 11 or equivalent">Year 11 or equivalent</option>
                  <option value="Year 10 or equivalent">Year 10 or equivalent</option>
                  <option value="Year 9 or equivalent">Year 9 or equivalent</option>
                  <option value="Year 8 or below">Year 8 or below</option>
                  <option value="Did not attend school">Did not attend school</option>
                </select>
                {errors.highestCompletedSchoolLevel && <p className="text-xs text-red-500 font-medium">{errors.highestCompletedSchoolLevel}</p>}
              </div>

              <div className="space-y-2 sm:col-span-1">
                <Label htmlFor="secondaryStatus">Secondary School Status</Label>
                <select
                  id="secondaryStatus"
                  name="secondaryStatus"
                  className={selectClassName}
                  value={formData.secondaryStatus}
                  onChange={handleChange}
                >
                  <option value="Completed">Completed</option>
                  <option value="In progress">In progress</option>
                </select>
              </div>

              <div className="space-y-2 sm:col-span-1">
                <Label htmlFor="yearSchoolCompleted">Year School Completed</Label>
                <Input
                  id="yearSchoolCompleted"
                  name="yearSchoolCompleted"
                  placeholder="e.g. 2021"
                  value={formData.yearSchoolCompleted}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <Label htmlFor="hasCompletedQualifications">Have you successfully completed any tertiary or vocational qualifications?</Label>
              <select
                id="hasCompletedQualifications"
                name="hasCompletedQualifications"
                className={selectClassName}
                value={formData.hasCompletedQualifications}
                onChange={handleChange}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>

              {formData.hasCompletedQualifications === 'Yes' && (
                <div className="bg-slate-50 p-4 rounded-xl border space-y-4">
                  <p className="text-xs font-bold text-slate-700">Select qualification level(s) achieved:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {[
                      'Bachelor Degree or Higher',
                      'Advanced Diploma or Associate Degree',
                      'Diploma or Associate Diploma',
                      'Certificate IV',
                      'Certificate III',
                      'Certificate II',
                      'Certificate I',
                      'Certificates other than above'
                    ].map(q => (
                      <label key={q} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.previousQualifications.includes(q)}
                          onChange={(e) => handleCheckboxArrayChange('previousQualifications', q, e.target.checked)}
                          className="rounded border-gray-300 text-brand-purple-600 focus:ring-brand-purple-500"
                        />
                        <span>{q}</span>
                      </label>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label htmlFor="previousQualificationDetails">Qualification Details (Title, Institution, Country, Year)</Label>
                    <Textarea
                      id="previousQualificationDetails"
                      name="previousQualificationDetails"
                      placeholder="e.g. Bachelor of Social Work, University of Delhi, India (2022)"
                      value={formData.previousQualificationDetails}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: EMPLOYMENT & EXPERIENCE */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-slate-900">STEP 4 — Employment & Experience</h2>
              <p className="text-sm text-slate-500">Your current employment status and motivation for taking this course.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentStatus">Current Employment Status *</Label>
              <select
                id="employmentStatus"
                name="employmentStatus"
                className={`${selectClassName} ${errors.employmentStatus ? 'border-red-500' : ''}`}
                value={formData.employmentStatus}
                onChange={handleChange}
              >
                <option value="">Select Employment Status</option>
                <option value="Full-time employee">Full-time employee</option>
                <option value="Part-time employee">Part-time employee</option>
                <option value="Self-employed - not employing others">Self-employed - not employing others</option>
                <option value="Employer">Employer</option>
                <option value="Employed - unpaid family worker">Employed - unpaid family worker</option>
                <option value="Unemployed - seeking full-time work">Unemployed - seeking full-time work</option>
                <option value="Unemployed - seeking part-time work">Unemployed - seeking part-time work</option>
                <option value="Not employed - not seeking employment">Not employed - not seeking employment</option>
              </select>
              {errors.employmentStatus && <p className="text-xs text-red-500 font-medium">{errors.employmentStatus}</p>}
            </div>

            {formData.employmentStatus && !formData.employmentStatus.includes('Unemployed') && !formData.employmentStatus.includes('Not employed') && (
              <div className="bg-slate-50 p-4 rounded-xl border space-y-4">
                <h4 className="font-bold text-slate-800 text-sm">Employer Details (If applicable)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input id="employerName" name="employerName" placeholder="Employer / Company Name" value={formData.employerName} onChange={handleChange} />
                  <Input id="employerContactPerson" name="employerContactPerson" placeholder="Contact Person / Manager" value={formData.employerContactPerson} onChange={handleChange} />
                  <Input id="employerPhone" name="employerPhone" placeholder="Employer Phone" value={formData.employerPhone} onChange={handleChange} />
                  <Input id="employerEmail" name="employerEmail" placeholder="Employer Email" value={formData.employerEmail} onChange={handleChange} />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="mainReasonForStudy">Main Reason for Study *</Label>
              <select
                id="mainReasonForStudy"
                name="mainReasonForStudy"
                className={`${selectClassName} ${errors.mainReasonForStudy ? 'border-red-500' : ''}`}
                value={formData.mainReasonForStudy}
                onChange={handleChange}
              >
                <option value="">Select Main Reason</option>
                <option value="To get a job">To get a job</option>
                <option value="To develop my existing business">To develop my existing business</option>
                <option value="To start my own business">To start my own business</option>
                <option value="To try for a different career">To try for a different career</option>
                <option value="To get a better job or promotion">To get a better job or promotion</option>
                <option value="It was a requirement of my job">It was a requirement of my job</option>
                <option value="I wanted extra skills for my job">I wanted extra skills for my job</option>
                <option value="To get into another course of study">To get into another course of study</option>
                <option value="For personal interest or self-development">For personal interest or self-development</option>
                <option value="Other reasons">Other reasons</option>
              </select>
              {errors.mainReasonForStudy && <p className="text-xs text-red-500 font-medium">{errors.mainReasonForStudy}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="relatedWorkExperience">Related Work or Industry Experience (Optional)</Label>
              <Textarea
                id="relatedWorkExperience"
                name="relatedWorkExperience"
                placeholder="Briefly describe any previous employment, volunteering, or community care experience relevant to this diploma course."
                value={formData.relatedWorkExperience}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* STEP 5: COURSE APPLICATION & RPL */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-slate-900">STEP 5 — Course Application & RPL</h2>
              <p className="text-sm text-slate-500">Recognition of Prior Learning (RPL), Credit Transfer, and technical readiness.</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="applyForRPL" className="text-base font-bold text-slate-900">Do you want to apply for Recognition of Prior Learning (RPL)? *</Label>
                <p className="text-xs text-slate-600">RPL is an assessment process that assesses your formal and informal learning to determine the extent to which you have achieved the required learning outcomes.</p>
                <select
                  id="applyForRPL"
                  name="applyForRPL"
                  className={selectClassName}
                  value={formData.applyForRPL}
                  onChange={handleChange}
                >
                  <option value="No">No, I do not wish to apply for RPL</option>
                  <option value="Yes">Yes, I want to apply for RPL</option>
                </select>
              </div>

              {formData.applyForRPL === 'Yes' && (
                <div className="space-y-2 pt-2 border-t border-purple-200">
                  <Label htmlFor="rplDetails" className="font-bold text-slate-900">RPL Explanation & Relevant Experience *</Label>
                  <Textarea
                    id="rplDetails"
                    name="rplDetails"
                    placeholder="Please specify which units or areas you are seeking RPL for and summarize your relevant experience/qualifications."
                    value={formData.rplDetails}
                    onChange={handleChange}
                    className={errors.rplDetails ? 'border-red-500' : ''}
                  />
                  {errors.rplDetails && <p className="text-xs text-red-500 font-medium">{errors.rplDetails}</p>}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="applyForCreditTransfer">Do you want to apply for Credit Transfer for previous formal VET study?</Label>
              <select
                id="applyForCreditTransfer"
                name="applyForCreditTransfer"
                className={selectClassName}
                value={formData.applyForCreditTransfer}
                onChange={handleChange}
              >
                <option value="No">No</option>
                <option value="Yes">Yes (Statement of Attainments / Transcripts required in Step 8)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="relevantSkillsExperience">Relevant Skills and Industry Experience</Label>
              <Textarea
                id="relevantSkillsExperience"
                name="relevantSkillsExperience"
                placeholder="Outline any key skills, competencies, or experiences that support your enrolment in this Community Services program."
                value={formData.relevantSkillsExperience}
                onChange={handleChange}
              />
            </div>

            <div className="border-t pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="hasComputerAndInternet">Computer & Internet Access</Label>
                <select
                  id="hasComputerAndInternet"
                  name="hasComputerAndInternet"
                  className={selectClassName}
                  value={formData.hasComputerAndInternet}
                  onChange={handleChange}
                >
                  <option value="Yes">Yes, regular access</option>
                  <option value="No">No access</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="computerLiteracy">Computer Literacy Level</Label>
                <select
                  id="computerLiteracy"
                  name="computerLiteracy"
                  className={selectClassName}
                  value={formData.computerLiteracy}
                  onChange={handleChange}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numeracySelfAssessment">Numeracy & Basic Maths Confidence</Label>
                <select
                  id="numeracySelfAssessment"
                  name="numeracySelfAssessment"
                  className={selectClassName}
                  value={formData.numeracySelfAssessment}
                  onChange={handleChange}
                >
                  <option value="Yes">Confident</option>
                  <option value="No">Need support</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: ADDITIONAL INFORMATION & SUPPORT */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-slate-900">STEP 6 — Additional Information & Support</h2>
              <p className="text-sm text-slate-500">Overseas Student Health Cover (OSHC), arrival support, and financial capacity acknowledgement.</p>
            </div>

            <div className="space-y-4">
              <Label htmlFor="oshcAssistanceRequired">Overseas Student Health Cover (OSHC) Assistance</Label>
              <select
                id="oshcAssistanceRequired"
                name="oshcAssistanceRequired"
                className={selectClassName}
                value={formData.oshcAssistanceRequired}
                onChange={handleChange}
              >
                <option value="No">No, I will arrange my own OSHC</option>
                <option value="Yes, please arrange OSHC for me">Yes, please arrange OSHC on my behalf</option>
                <option value="Already have OSHC">Already have valid OSHC</option>
              </select>

              {formData.oshcAssistanceRequired === 'Already have OSHC' && (
                <div className="bg-slate-50 p-4 rounded-xl border grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input id="oshcProviderName" name="oshcProviderName" placeholder="OSHC Provider (e.g. Bupa, Medibank)" value={formData.oshcProviderName} onChange={handleChange} />
                  <Input id="oshcMembershipNumber" name="oshcMembershipNumber" placeholder="Membership Number" value={formData.oshcMembershipNumber} onChange={handleChange} />
                  <select id="oshcType" name="oshcType" className={selectClassName} value={formData.oshcType} onChange={handleChange}>
                    <option value="Single">Single Cover</option>
                    <option value="Dual Family">Dual Family</option>
                    <option value="Multi Family">Multi Family</option>
                  </select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="airportPickupRequired">Airport Pickup Assistance</Label>
                <select
                  id="airportPickupRequired"
                  name="airportPickupRequired"
                  className={selectClassName}
                  value={formData.airportPickupRequired}
                  onChange={handleChange}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes, require airport pickup details</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="homestayRequired">Homestay / Accommodation Assistance</Label>
                <select
                  id="homestayRequired"
                  name="homestayRequired"
                  className={selectClassName}
                  value={formData.homestayRequired}
                  onChange={handleChange}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes, require accommodation advice</option>
                </select>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <Label htmlFor="under18OnArrival">Will you be under 18 years of age upon arrival in Australia? *</Label>
              <select
                id="under18OnArrival"
                name="under18OnArrival"
                className={`${selectClassName} ${errors.under18OnArrival ? 'border-red-500' : ''}`}
                value={formData.under18OnArrival}
                onChange={handleChange}
              >
                <option value="No">No, I am 18 years or older</option>
                <option value="Yes">Yes, I will be under 18</option>
              </select>
              {errors.under18OnArrival && (
                <p className="text-xs text-red-500 font-medium bg-red-50 p-2 rounded border border-red-200">
                  {errors.under18OnArrival}
                </p>
              )}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studyFundingSource">Primary Source of Study Funding</Label>
                <select
                  id="studyFundingSource"
                  name="studyFundingSource"
                  className={selectClassName}
                  value={formData.studyFundingSource}
                  onChange={handleChange}
                >
                  <option value="Self-funded">Self-funded</option>
                  <option value="Family support">Family / Parent support</option>
                  <option value="Employer sponsorship">Employer sponsorship</option>
                  <option value="Home government scholarship">Home government scholarship</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-purple-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700 space-y-1">
                    <p className="font-bold text-slate-900">Financial Capacity & Genuine Student (GS) Acknowledgement</p>
                    <p>International applicants must have access to sufficient funds to pay for tuition fees, OSHC, living expenses, and travel costs for the duration of study in Australia.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: USI & PASSPORT DETAILS */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-slate-900">STEP 7 — USI & Student Information</h2>
              <p className="text-sm text-slate-500">Unique Student Identifier (USI) and Passport/Visa identification details.</p>
            </div>

            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-brand-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-bold text-slate-900">What is a USI?</p>
                  <p>A Unique Student Identifier (USI) is a reference number made up of ten numbers and letters. All students in Australia require a USI to receive an accredited qualification.</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="usiNumber">USI Number (If already created)</Label>
                <Input
                  id="usiNumber"
                  name="usiNumber"
                  placeholder="10-character code (e.g. 3A88FE992A)"
                  value={formData.usiNumber}
                  onChange={handleChange}
                  maxLength={10}
                  className="font-mono"
                />
              </div>

              <div className="space-y-2 pt-2">
                <Label htmlFor="usiPermissionToCreate">Do you authorize Optimum Training Academy to apply for/verify a USI on your behalf if required?</Label>
                <select
                  id="usiPermissionToCreate"
                  name="usiPermissionToCreate"
                  className={selectClassName}
                  value={formData.usiPermissionToCreate}
                  onChange={handleChange}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes, I authorize OTA to apply for or verify my USI</option>
                </select>
              </div>
            </div>

            <div className="border-t pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="passportNumber">Passport Number *</Label>
                <Input
                  id="passportNumber"
                  name="passportNumber"
                  placeholder="Official Passport Number"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  className={errors.passportNumber ? 'border-red-500 font-mono' : 'font-mono'}
                />
                {errors.passportNumber && <p className="text-xs text-red-500 font-medium">{errors.passportNumber}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="passportCountry">Country of Passport *</Label>
                <Input
                  id="passportCountry"
                  name="passportCountry"
                  placeholder="Country issuing passport"
                  value={formData.passportCountry}
                  onChange={handleChange}
                  className={errors.passportCountry ? 'border-red-500' : ''}
                />
                {errors.passportCountry && <p className="text-xs text-red-500 font-medium">{errors.passportCountry}</p>}
              </div>
            </div>

            <div className="border-t pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="currentAustralianVisaStatus">Current Australian Visa Status</Label>
                <select
                  id="currentAustralianVisaStatus"
                  name="currentAustralianVisaStatus"
                  className={selectClassName}
                  value={formData.currentAustralianVisaStatus}
                  onChange={handleChange}
                >
                  <option value="Not in Australia">Not currently in Australia (Offshore Applicant)</option>
                  <option value="Student Visa (Subclass 500)">Student Visa (Subclass 500)</option>
                  <option value="Visitor Visa">Visitor Visa</option>
                  <option value="Working Holiday Visa">Working Holiday Visa</option>
                  <option value="Temporary Graduate Visa (Subclass 485)">Temporary Graduate Visa (Subclass 485)</option>
                  <option value="Other Visa">Other Visa Type</option>
                </select>
              </div>

              {formData.currentAustralianVisaStatus !== 'Not in Australia' && (
                <div className="space-y-2">
                  <Label htmlFor="visaExpiryDate">Current Visa Expiry Date</Label>
                  <Input
                    id="visaExpiryDate"
                    name="visaExpiryDate"
                    type="date"
                    value={formData.visaExpiryDate}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 8: SUPPORTING DOCUMENTS */}
        {currentStep === 8 && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-slate-900">STEP 8 — Supporting Documents</h2>
              <p className="text-sm text-slate-500">Upload official supporting documentation for application assessment (Max file size: 5MB per document. Formats: PDF, JPG, PNG, DOCX).</p>
            </div>

            <div className="space-y-4">
              {[
                { id: 'passportCopy', label: '1. Current Passport (Bio Page)', required: true },
                { id: 'englishCert', label: '2. English Language Proficiency Qualification (IELTS/PTE/TOEFL)', required: false },
                { id: 'qualificationCert', label: '3. Highest Academic Qualification Certificate & Transcripts', required: false },
                { id: 'currentVisa', label: '4. Current Australian Visa Document (if currently in Australia)', required: false },
                { id: 'employmentEvidence', label: '5. Relevant Employment Evidence / Curriculum Vitae (CV)', required: false },
                { id: 'releaseLetter', label: '6. Release Letter / Transfer Documentation (if studying with another AU provider)', required: false },
                { id: 'gteStatement', label: '7. Genuine Student (GS/GTE) Statement / Purpose Letter', required: false },
                { id: 'otherDocs', label: '8. Other Supporting Document (Optional)', required: false }
              ].map((doc) => {
                const uploaded = fileData[doc.id];
                const hasError = errors[doc.id];
                return (
                  <div key={doc.id} className="p-4 rounded-xl border bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <span>{doc.label}</span>
                        {doc.required && <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-[10px]">Required</Badge>}
                        {!doc.required && <span className="text-xs text-slate-400 font-normal">(if applicable)</span>}
                      </p>
                      {uploaded ? (
                        <p className="text-xs text-green-700 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {uploaded.name} ({(uploaded.size / 1024).toFixed(0)} KB)
                        </p>
                      ) : (
                        <p className="text-xs text-slate-500">No file selected</p>
                      )}
                      {hasError && <p className="text-xs text-red-500 font-medium">{hasError}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                      {uploaded ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleRemoveFile(doc.id)}
                        >
                          Remove
                        </Button>
                      ) : (
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Choose File</span>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            onChange={(e) => handleFileUpload(e, doc.id)}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 9: PRIVACY, DECLARATION & SUBMISSION */}
        {currentStep === 9 && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-slate-900">STEP 9 — Privacy, Declaration & Submission</h2>
              <p className="text-sm text-slate-500">Please review the required regulatory notices and complete your applicant declaration.</p>
            </div>

            {/* Privacy Notice Box */}
            <div className="bg-slate-50 p-5 rounded-2xl border text-xs text-slate-700 space-y-3 max-h-60 overflow-y-auto">
              <p className="font-bold text-slate-900 text-sm">Privacy Notice & National VET Data Policy</p>
              <p>
                Under the Data Provision Requirements 2012, Optimum Training Academy is required to collect personal information about you and to disclose that personal information to the National Centre for Vocational Education Research Ltd (NCVER).
              </p>
              <p>
                Your personal information (including the personal information contained on this enrolment form) may be used or disclosed by Optimum Training Academy for statistical, administrative, regulatory and research purposes.
              </p>
              <p>
                NCVER will collect, hold, use and disclose your personal information in accordance with the Privacy Act 1988 (Cth), the National VET Data Policy and all NCVER policies and protocols published on NCVER’s website at www.ncver.edu.au.
              </p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-purple-600 focus:ring-brand-purple-500"
                />
                <span className="text-sm text-slate-700">
                  <strong>Privacy Notice Acknowledgement:</strong> I have read and agree to the Privacy Notice and understand how my personal information will be collected, used, and disclosed under Australian VET legislation. *
                </span>
              </label>
              {errors.privacyConsent && <p className="text-xs text-red-500 font-medium pl-7">{errors.privacyConsent}</p>}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="esosConsent"
                  checked={formData.esosConsent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-purple-600 focus:ring-brand-purple-500"
                />
                <span className="text-sm text-slate-700">
                  <strong>ESOS Framework Acknowledgement:</strong> I understand my rights and responsibilities as an international student under the Education Services for Overseas Students (ESOS) framework. *
                </span>
              </label>
              {errors.esosConsent && <p className="text-xs text-red-500 font-medium pl-7">{errors.esosConsent}</p>}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="financialDeclaration"
                  checked={formData.financialDeclaration}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-purple-600 focus:ring-brand-purple-500"
                />
                <span className="text-sm text-slate-700">
                  <strong>Financial Obligations & Capacity:</strong> I confirm that I have access to sufficient funds to cover my tuition fees, living expenses, and health cover for the duration of my study at Optimum Training Academy. *
                </span>
              </label>
              {errors.financialDeclaration && <p className="text-xs text-red-500 font-medium pl-7">{errors.financialDeclaration}</p>}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="truthfulDeclaration"
                  checked={formData.truthfulDeclaration}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-purple-600 focus:ring-brand-purple-500"
                />
                <span className="text-sm text-slate-700">
                  <strong>Truthfulness Declaration:</strong> I declare that all information provided in this application is true, accurate, and complete to the best of my knowledge. *
                </span>
              </label>
              {errors.truthfulDeclaration && <p className="text-xs text-red-500 font-medium pl-7">{errors.truthfulDeclaration}</p>}
            </div>

            {/* Signature fields */}
            <div className="border-t pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl">
              <div className="space-y-2">
                <Label htmlFor="applicantPrintedName">Applicant Full Printed Name *</Label>
                <Input
                  id="applicantPrintedName"
                  name="applicantPrintedName"
                  placeholder="Full Legal Name"
                  value={formData.applicantPrintedName}
                  onChange={handleChange}
                  className={errors.applicantPrintedName ? 'border-red-500' : ''}
                />
                {errors.applicantPrintedName && <p className="text-xs text-red-500 font-medium">{errors.applicantPrintedName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="eSignatureText">Applicant Digital Signature (Typed Full Name) *</Label>
                <Input
                  id="eSignatureText"
                  name="eSignatureText"
                  placeholder="Type your full legal name as digital signature"
                  value={formData.eSignatureText}
                  onChange={handleChange}
                  className={errors.eSignatureText ? 'border-red-500 font-serif italic' : 'font-serif italic'}
                />
                {errors.eSignatureText && <p className="text-xs text-red-500 font-medium">{errors.eSignatureText}</p>}
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="declarationDate">Date of Submission</Label>
                <Input
                  id="declarationDate"
                  name="declarationDate"
                  type="date"
                  value={formData.declarationDate}
                  readOnly
                  className="bg-slate-100 text-slate-600"
                />
              </div>
            </div>

            {status === 'error' && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage || 'An error occurred while submitting your application. Please try again.'}</span>
              </div>
            )}
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="border-t pt-6 flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="rounded-full px-6 flex items-center gap-2"
              onClick={prevStep}
              disabled={status === 'loading'}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 9 ? (
            <Button
              type="button"
              size="lg"
              className="bg-brand-purple-600 hover:bg-brand-purple-700 text-white rounded-full px-8 flex items-center gap-2 ml-auto"
              onClick={nextStep}
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-10 text-base font-bold ml-auto"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Submitting Application...' : 'Submit Application to OTA'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
