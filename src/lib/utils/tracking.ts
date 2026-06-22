
export const TRACKING_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'msclkid'
];

export const COOKIE_EXPIRY_DAYS = 90;

export function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

export function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function getStoredTracking() {
  const tracking: Record<string, string> = {};
  TRACKING_PARAMS.forEach(param => {
    const value = getCookie(param);
    if (value) {
      tracking[param] = value;
    }
  });
  return tracking;
}

export function captureTrackingParams() {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  TRACKING_PARAMS.forEach(param => {
    const value = urlParams.get(param);
    if (value) {
      setCookie(param, value, COOKIE_EXPIRY_DAYS);
    }
  });
}

export function appendTrackingToUrl(url: string) {
  // Only append tracking to external conversion links.
  // Internal links and anchors do not need URL parameters as tracking is persisted via cookies.
  if (!url || url.startsWith('/') || url.startsWith('#')) return url;

  try {
    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const tracking = getStoredTracking();

    // Use current URL params as fallback to ensure immediate tracking on landing page before cookies settle
    TRACKING_PARAMS.forEach(param => {
      const val = searchParams.get(param);
      if (val) tracking[param] = val;
    });

    if (Object.keys(tracking).length === 0) return url;

    const urlObj = new URL(url);

    Object.entries(tracking).forEach(([key, value]) => {
      // Only append if not already present in the URL
      if (!urlObj.searchParams.has(key)) {
        urlObj.searchParams.append(key, value);
      }
    });

    return urlObj.toString();
  } catch {
    // If invalid URL, return as is
    return url;
  }
}
