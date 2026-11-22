import React from 'react';

export const BRAND_LOGOS: Record<string, string> = {
  fatshark: '/images/brands/fatshark.png?v=2',
  dji: '/images/brands/dji.svg?v=2',
  walksnail: '/images/brands/walksnail.png?v=2',
  hdzero: '/images/brands/hdzero.png?v=2',
  skyzone: '/images/brands/skyzone.png?v=2',
  radiomaster: '/images/brands/radiomaster.png?v=2',
  tbs: '/images/brands/tbs.svg?v=2',
  jumper: '/images/brands/jumper.png?v=2',
  frsky: '/images/brands/frsky.png?v=2',
  betaflight: '/images/brands/betaflight.svg?v=2',
  inav: '/images/brands/inav.png?v=2',
  kiss: '/images/brands/kiss.svg?v=2',
  emuflight: '/images/brands/emuflight.svg?v=2',
  ardupilot: '/images/brands/ardupilot.png?v=2',
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
