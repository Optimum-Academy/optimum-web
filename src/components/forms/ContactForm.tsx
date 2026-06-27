'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { TRACKING_PARAMS, getCookie, trackEvent } from '@/lib/utils/tracking';

export function ContactForm() {
  const [tracking, setTracking] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiry_type: '',
    course_of_interest: '',
    message: '',
    _honey: ''
  });

  useEffect(() => {
    const stored: Record<string, string> = {};
    const searchParams = new URLSearchParams(window.location.search);

    TRACKING_PARAMS.forEach(param => {
      // Priority: Search Params > Cookies
      const val = searchParams.get(param) || getCookie(param);
      if (val) stored[param] = val;
    });
    setTracking(stored);

    // Track Form Viewed
    trackEvent('Contact Form Viewed');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/.test(formData.phone.replace(/\s/g, ''))) {
      // Basic Aus phone validation
      newErrors.phone = 'Please enter a valid Australian phone number';
    }

    if (!formData.enquiry_type) newErrors.enquiry_type = 'Please select an enquiry type';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    if (!validate()) return;
    setStatus('loading');
    trackEvent('Contact Form Submitted', {
      enquiry_type: formData.enquiry_type,
      course: formData.course_of_interest
    });

    try {
      const response = await fetch("https://formsubmit.co/ajax/enquiries@optimumacademy.edu.au", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          ...tracking,
          _subject: "New Website Enquiry – Optimum Academy",
          _template: "table",
          _captcha: "false"
        })
      });

      if (response.ok) {
        setStatus('success');
        trackEvent('Contact Form Submission Successful');
      } else {
        setStatus('error');
        trackEvent('Contact Form Submission Failed', { reason: 'Response not OK' });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
      trackEvent('Contact Form Submission Failed', { reason: 'Exception occurred' });
    }
  };

  const selectClassName = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      enquiry_type: '',
      course_of_interest: '',
      message: '',
      _honey: ''
    });
    setErrors({});
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border shadow-sm text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-slate-900">Thank You!</h2>
        <p className="text-slate-600 mb-8">
          Your enquiry has been successfully sent. Our team will get back to you shortly.
        </p>
        <Button onClick={handleReset} variant="outline">Send Another Message</Button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border shadow-sm">
      <h2 className="text-2xl font-bold mb-8 text-slate-900">Send an Enquiry</h2>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Hidden UTM Fields */}
        {TRACKING_PARAMS.map(param => (
          <input
            key={param}
            type="hidden"
            name={param}
            value={tracking[param] || ''}
          />
        ))}

        {/* Honeypot Field */}
        <input
          type="text"
          name="_honey"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          value={formData._honey}
          onChange={handleChange}
        />

        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="name"
            placeholder="Jane Doe"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="0400 000 000"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="enquiryType">Enquiry Type</Label>
            <select
              id="enquiryType"
              name="enquiry_type"
              className={`${selectClassName} ${errors.enquiry_type ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              value={formData.enquiry_type}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="General Enquiry">General Enquiry</option>
              <option value="Course Information">Course Information</option>
              <option value="Enrolment Support">Enrolment Support</option>
              <option value="Partnership Enquiry">Partnership Enquiry</option>
              <option value="Student Support">Student Support</option>
            </select>
            {errors.enquiry_type && <p className="text-xs text-red-500 font-medium">{errors.enquiry_type}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Course of Interest</Label>
            <select
              id="course"
              name="course_of_interest"
              className={selectClassName}
              value={formData.course_of_interest}
              onChange={handleChange}
            >
              <option value="">Select a course (if applicable)</option>
              <option value="Diploma of Community Services">Diploma of Community Services</option>
              <option value="Diploma of Community Services (International)">Diploma of Community Services (International)</option>
              <option value="Certificate III in Individual Support">Certificate III in Individual Support</option>
              <option value="Certificate III in Individual Support (International)">Certificate III in Individual Support (International)</option>
              <option value="Provide CPR (HLTAID009)">Provide CPR (HLTAID009)</option>
              <option value="Provide First Aid (HLTAID011)">Provide First Aid (HLTAID011)</option>
              <option value="Conduct manual tasks safely (HLTWHS005)">Conduct manual tasks safely (HLTWHS005)</option>
              <option value="Other / General Enquiry">Other / General Enquiry</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Your Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="How can we help you?"
            className={`min-h-[150px] ${errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <p className="text-xs text-red-500 font-medium">{errors.message}</p>}
        </div>

        {status === 'error' && (
          <p className="text-sm text-red-600 font-medium bg-red-50 p-4 rounded-lg">
            There was an error submitting your enquiry. Please try again or contact us directly.
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Submit Enquiry'}
        </Button>
      </form>
    </div>
  );
}
