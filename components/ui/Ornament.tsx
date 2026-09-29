import clsx from 'clsx';

/** Gold divider: two tapered lines with an 8-point star in the centre. */
export function Ornament({ className, tone = 'gold' }: { className?: string; tone?: 'gold' | 'light' }) {
  const color = tone === 'gold' ? '#C1A062' : '#E3CC98';
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 24"
      className={clsx('h-6 w-48', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`orn-l-${tone}`} x1="0" x2="1">
          <stop offset="0" stopColor={color} stopOpacity="0" />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <linearGradient id={`orn-r-${tone}`} x1="1" x2="0">
          <stop offset="0" stopColor={color} stopOpacity="0" />
          <stop offset="1" stopColor={color} />
        </linearGradient>
      </defs>
      <rect x="0" y="11.25" width="96" height="1.5" rx="0.75" fill={`url(#orn-l-${tone})`} />
      <rect x="144" y="11.25" width="96" height="1.5" rx="0.75" fill={`url(#orn-r-${tone})`} />
      <g transform="translate(120 12)" stroke={color} strokeWidth="1.3">
        <rect x="-7" y="-7" width="14" height="14" />
        <rect x="-7" y="-7" width="14" height="14" transform="rotate(45)" />
        <circle r="2.4" fill={color} />
      </g>
      <circle cx="102" cy="12" r="1.6" fill={color} />
      <circle cx="138" cy="12" r="1.6" fill={color} />
    </svg>
  );
}

/** A single 8-point star (Rub el Hizb style) used as a bullet or badge. */
export function Star8({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="-12 -12 24 24" className={clsx('h-4 w-4', className)} fill="currentColor">
      <rect x="-7.5" y="-7.5" width="15" height="15" />
      <rect x="-7.5" y="-7.5" width="15" height="15" transform="rotate(45)" />
    </svg>
  );
}
