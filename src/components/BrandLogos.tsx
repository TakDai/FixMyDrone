import React from 'react';

interface BrandLogoProps {
  brandId: string;
  className?: string;
  size?: number;
}

export function BrandLogo({ brandId, className = '', size = 24 }: BrandLogoProps) {
  switch (brandId) {
    // --- LUNETTES FPV ---
    case 'fatshark':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <path
            d="M4 14C8 10 14 8 20 8C26 8 29 11 28 14C27 17 24 20 19 21C14 22 8 20 4 14Z"
            fill="#18181b"
          />
          <path d="M12 8L16 2L18 8" fill="#ff5757" />
          <circle cx="10" cy="14" r="2.5" fill="#ffffff" />
          <circle cx="22" cy="14" r="2.5" fill="#ffffff" />
        </svg>
      );
    case 'dji':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <rect width="32" height="32" rx="6" fill="#18181b" />
          <path
            d="M7 11H12C14.5 11 16 12.5 16 15V17C16 19.5 14.5 21 12 21H7V11ZM10 13.5V18.5H12C13 18.5 13.5 18 13.5 17V15C13.5 14 13 13.5 12 13.5H10ZM17 11H25V13.5H22V21H19.5V13.5H17V11Z"
            fill="#ffffff"
          />
        </svg>
      );
    case 'walksnail':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <circle cx="16" cy="16" r="14" fill="#18181b" />
          <path
            d="M8 20L16 10L24 20L16 16L8 20Z"
            fill="#ff5757"
          />
          <circle cx="16" cy="14" r="2" fill="#ffffff" />
        </svg>
      );
    case 'hdzero':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <rect width="32" height="32" rx="6" fill="#0f172a" />
          <text x="16" y="21" textAnchor="middle" fontSize="11" fontWeight="900" fontFamily="sans-serif" fill="#38bdf8" letterSpacing="0.05em">
            HD0
          </text>
        </svg>
      );
    case 'skyzone':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <circle cx="16" cy="16" r="14" fill="#18181b" />
          <path d="M6 14C11 11 15 15 26 12C21 17 17 14 6 20Z" fill="#38bdf8" />
        </svg>
      );

    // --- RADIOCOMMANDES ---
    case 'radiomaster':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <rect width="32" height="32" rx="6" fill="#18181b" stroke="#ff5757" strokeWidth="1.5" />
          <path d="M10 22L16 8L22 22H18L16 16L14 22H10Z" fill="#ff5757" />
        </svg>
      );
    case 'tbs':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <rect width="32" height="32" rx="6" fill="#000000" />
          <circle cx="16" cy="16" r="10" stroke="#ffffff" strokeWidth="2" fill="none" />
          <path d="M16 6V26M6 16H26" stroke="#ff5757" strokeWidth="2.5" />
          <circle cx="16" cy="16" r="3" fill="#ffffff" />
        </svg>
      );
    case 'jumper':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <circle cx="16" cy="16" r="14" fill="#1e293b" />
          <path d="M18 9V18C18 20.5 16 22 13.5 22C11 22 9.5 20.5 9.5 19H12C12 19.5 12.5 20 13.5 20C14.5 20 15.5 19.5 15.5 18V9H18Z" fill="#f59e0b" />
          <circle cx="18" cy="7" r="1.5" fill="#f59e0b" />
        </svg>
      );
    case 'frsky':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <rect width="32" height="32" rx="6" fill="#0284c7" />
          <path d="M8 20C12 12 18 10 24 10C20 16 16 18 8 20Z" fill="#ffffff" />
        </svg>
      );

    // --- CONFIGURATEURS & FIRMWARES ---
    case 'betaflight':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <circle cx="16" cy="16" r="14" fill="#eab308" />
          <path d="M10 13Q16 10 22 14Q18 19 14 19Q11 18 10 13Z" fill="#18181b" />
          <line x1="22" y1="14" x2="25" y2="15" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'inav':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <circle cx="16" cy="16" r="14" fill="#0284c7" />
          <polygon points="16,8 19,16 16,14 13,16" fill="#ef4444" />
          <polygon points="16,24 19,16 16,14 13,16" fill="#ffffff" />
        </svg>
      );
    case 'kiss':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <rect width="32" height="32" rx="6" fill="#06b6d4" />
          <text x="16" y="21" textAnchor="middle" fontSize="10" fontWeight="900" fontFamily="sans-serif" fill="#ffffff">
            KISS
          </text>
        </svg>
      );
    case 'emuflight':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <circle cx="16" cy="16" r="14" fill="#8b5cf6" />
          <path d="M10 18Q16 11 22 18" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'ardupilot':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
          <polygon points="16,6 25,11 25,21 16,26 7,21 7,11" fill="#ea580c" />
          <text x="16" y="19" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#ffffff">
            APM
          </text>
        </svg>
      );

    default:
      return (
        <div className={`w-[${size}px] h-[${size}px] rounded-full bg-zinc-800 flex items-center justify-center text-white text-[10px] font-bold ${className}`}>
          {brandId.substring(0, 2).toUpperCase()}
        </div>
      );
  }
}
