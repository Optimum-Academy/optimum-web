'use client';

export default function CookieSettingsButton() {
  const handleClick = () => {
    const _hsp = (window as any)._hsp = (window as any)._hsp || [];
    _hsp.push(['showBanner']);
  };

  return (
    <button
      type="button"
      id="hs_show_banner_button"
      onClick={handleClick}
      className="text-sm text-slate-400 hover:text-white transition-colors text-left"
    >
      Cookie Settings
    </button>
  );
}
