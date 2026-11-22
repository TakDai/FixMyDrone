import React from 'react';

export const BRAND_LOGOS: Record<string, string> = {
  fatshark: '/images/brands/fatshark.png',
  dji: '/images/brands/dji.svg',
  walksnail: '/images/brands/walksnail.png',
  hdzero: '/images/brands/hdzero.png',
  skyzone: '/images/brands/skyzone.png',
  radiomaster: '/images/brands/radiomaster.png',
  tbs: '/images/brands/tbs.svg',
  jumper: '/images/brands/jumper.png',
  frsky: '/images/brands/frsky.png',
  betaflight: '/images/brands/betaflight.svg',
  inav: '/images/brands/inav.png',
  kiss: '/images/brands/kiss.svg',
  emuflight: '/images/brands/emuflight.svg',
  ardupilot: '/images/brands/ardupilot.png',
};

interface BrandLogoProps {
  brandId: string;
  className?: string;
  size?: number;
  width?: number | string;
  height?: number | string;
}

export function BrandLogo({ brandId, className = '', size = 36, width, height }: BrandLogoProps) {
  const src = BRAND_LOGOS[brandId];
  if (!src) return null;

  const w = width ?? size;
  const h = height ?? size;

  return (
    <div
      className={`flex items-center justify-center overflow-hidden shrink-0 ${className}`}
      style={{
        width: typeof w === 'number' ? `${w}px` : w,
        height: typeof h === 'number' ? `${h}px` : h,
      }}
    >
      <img
        src={src}
        alt={brandId}
        className="max-w-full max-h-full object-contain select-none pointer-events-none"
      />
    </div>
  );
}
