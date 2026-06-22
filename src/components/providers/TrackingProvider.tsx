'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { captureTrackingParams } from '@/lib/utils/tracking';

const TrackingContext = createContext<null>(null);

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    captureTrackingParams();
  }, []);

  return (
    <TrackingContext.Provider value={null}>
      {children}
    </TrackingContext.Provider>
  );
}

export const useTracking = () => useContext(TrackingContext);
