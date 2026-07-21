'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TRACKING_PARAMS, getCookie, trackEvent } from '@/lib/utils/tracking';
import { FileText, CheckCircle2 } from 'lucide-react';

interface BrochureDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  brochureLink: string;
}

export function BrochureDownloadModal({
  isOpen,
  onClose,
  courseTitle,
  brochureLink,
}: BrochureDownloadModalProps) {
  const [tracking, setTracking] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    _honey: ''
  });

  useEffect(() => {
    if (isOpen) {
      const stored: Record<string, string> = {};
      const searchParams = new URLSearchParams(window.location.search);

      TRACKING_PARAMS.forEach(param => {
        const val = searchParams.get(param) || getCookie(param);
        if (val) stored[param] = val;
      });
      setTracking(stored);
      trackEvent('Brochure Modal Viewed', { course: courseTitle });
    }
  }, [isOpen, courseTitle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      newErrors.phone = 'Please enter a valid Australian phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    if (!validate()) return;
    setStatus('loading');

    trackEvent('Brochure Form Submitted', { course: courseTitle });

    try {
      const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
      const referrer = typeof document !== 'undefined' ? document.referrer : '';

      const response = await fetch("https://formsubmit.co/ajax/enquiries@optimumacademy.edu.au", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          ...tracking,
          course_of_interest: courseTitle,
          enquiry_type: "Brochure Download",
          _subject: `Brochure Download Lead – ${courseTitle}`,
          _template: "table",
          _captcha: "false",
          page_url: pageUrl,
          referrer_url: referrer
        })
      });

      if (response.ok) {
        setStatus('success');
        trackEvent('Brochure Download Successful', { course: courseTitle });
        // Trigger download
        try {
          const downloadWin = window.open(brochureLink, '_blank');
          if (!downloadWin || downloadWin.closed || typeof downloadWin.closed === 'undefined') {
            console.warn("Download window was blocked by browser popup blocker.")
          }
        } catch (e) {
          console.error("Failed to automatically open brochure link:", e);
        }
      } else {
        setStatus('error');
        trackEvent('Brochure Download Failed', { reason: 'Response not OK' });
      }
    } catch (error) {
      console.error("Brochure form submission error:", error);
      setStatus('error');
      trackEvent('Brochure Download Failed', { reason: 'Exception occurred' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        {status === 'success' ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-bold mb-2">Download Started!</DialogTitle>
            <DialogDescription className="text-slate-600 mb-4">
              Thank you for your interest. Your brochure for <strong>{courseTitle}</strong> should have started downloading or opened in a new tab.
            </DialogDescription>
            <div className="mb-6 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <p className="text-sm text-slate-600 font-medium">
                Your brochure is ready. <a href={brochureLink} target="_blank" rel="noopener noreferrer" className="text-brand-purple-600 hover:text-brand-purple-800 underline font-semibold">Click here if your download doesn&apos;t start automatically.</a>
              </p>
            </div>
            <Button onClick={onClose} className="w-full rounded-full">Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="w-12 h-12 bg-brand-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-brand-purple-600" />
              </div>
              <DialogTitle className="text-2xl font-bold">Download Brochure</DialogTitle>
              <DialogDescription>
                Get the full course details for <strong>{courseTitle}</strong>. We&apos;ll send it to your inbox and you can download it immediately.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {/* Hidden UTM Fields */}
              {TRACKING_PARAMS.map(param => (
                <input
                  key={param}
                  type="hidden"
                  name={param}
                  value={tracking[param] || ''}
                />
              ))}

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

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

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
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
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
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              {status === 'error' && (
                <p className="text-xs text-red-600 font-medium bg-red-50 p-3 rounded-lg">
                  Failed to process request. Please try again or contact us.
                </p>
              )}

              <Button type="submit" className="w-full h-12 rounded-full" disabled={status === 'loading'}>
                {status === 'loading' ? 'Processing...' : 'Download Now'}
              </Button>
              <p className="text-[10px] text-center text-slate-400">
                By clicking download, you agree to receive course information and marketing updates from Optimum Academy.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
