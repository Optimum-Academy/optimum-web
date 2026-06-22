'use client';

import React, { useEffect, useState } from 'react';
import { appendTrackingToUrl } from '@/lib/utils/tracking';

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function TrackedLink({ href, children, ...props }: TrackedLinkProps) {
  const [trackedHref, setTrackedHref] = useState(href);

  useEffect(() => {
    // We do this in useEffect to avoid hydration mismatch
    // since cookies are only available on the client
    setTrackedHref(appendTrackingToUrl(href));
  }, [href]);

  return (
    <a href={trackedHref} {...props}>
      {children}
    </a>
  );
}
