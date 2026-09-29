'use client';

import { motion } from 'framer-motion';

export function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-label={label}
      className="h-2.5 w-full overflow-hidden rounded-full bg-gold/20"
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-primary-700 to-primary rtl:bg-gradient-to-l"
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.max(value, 2)}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
