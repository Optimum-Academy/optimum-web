'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { TRACKING_PARAMS, getCookie } from '@/lib/utils/tracking';

export function ContactForm() {
  const [tracking, setTracking] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored: Record<string, string> = {};
    const searchParams = new URLSearchParams(window.location.search);

    TRACKING_PARAMS.forEach(param => {
      // Priority: Search Params > Cookies
      const val = searchParams.get(param) || getCookie(param);
      if (val) stored[param] = val;
    });
    setTracking(stored);
  }, []);

  return (
    <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border shadow-sm">
      <h2 className="text-2xl font-bold mb-8 text-slate-900">Send an Enquiry</h2>
      <form className="space-y-6">
        {/* Hidden UTM Fields */}
        {TRACKING_PARAMS.map(param => (
          <input
            key={param}
            type="hidden"
            name={param}
            value={tracking[param] || ''}
          />
        ))}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="Jane" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Doe" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="jane@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="course">Interested Course</Label>
          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
             <option>Select a course</option>
             <option>Certificate III in Individual Support</option>
             <option>Certificate IV in Disability Support</option>
             <option>Other / General Enquiry</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Your Message</Label>
          <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" />
        </div>
        <Button type="submit" size="lg" className="w-full">Submit Enquiry</Button>
      </form>
    </div>
  );
}
