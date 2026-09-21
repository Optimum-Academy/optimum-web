'use client';

import React, { useEffect, useState } from 'react';
import { appendTrackingToUrl, trackEvent } from '@/lib/utils/tracking';

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  eventName?: string;
  eventParams?: Record<string, string | number | boolean>;
}

export function TrackedLink({ href, children, eventName, eventParams, onClick, ...props }: TrackedLinkProps) {
  const [trackedHref, setTrackedHref] = useState(href);

  useEffect(() => {
    // We do this in useEffect to avoid hydration mismatch
    // since cookies are only available on the client
    setTrackedHref(appendTrackingToUrl(href));
  }, [href]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (eventName) {
      trackEvent(eventName, eventParams);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a href={trackedHref} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
