'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { formatNumber } from '@/lib/format';

interface Props {
  value: number | null;
  suffix?: string;
  /** Show without thousands separators (e.g. a year) */
  plain?: boolean;
  /** Text to show instead of a number, e.g. "Thousands" */
  text?: string;
  label: string;
}

export function StatCounter({ value, suffix = '', plain, text, label }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const start = plain && value ? value - 60 : 0;
  const [display, setDisplay] = useState(value === null ? 0 : start);

  useEffect(() => {
    if (!inView || value === null) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(start, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce, start]);

  return (
    <div className="flex flex-col items-center text-center">
      <p ref={ref} className="font-latin text-4xl font-bold text-gold-light md:text-5xl" dir="ltr">
        {value === null ? (
          <span className="font-sans text-3xl md:text-4xl">{text}</span>
        ) : (
          <>
            {/* Screen readers get the final value straight away */}
            <span className="sr-only">
              {formatNumber(value, !plain)}
              {suffix}
            </span>
            <span aria-hidden="true" className="tabular-nums">
              {formatNumber(display, !plain)}
              {suffix}
            </span>
          </>
        )}
      </p>
      <p className="mt-2 max-w-[12rem] text-sm text-cream/85 md:text-base">{label}</p>
    </div>
  );
}
