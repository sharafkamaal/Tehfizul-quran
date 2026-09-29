'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { isRtl } from '@/i18n/routing';

interface Props {
  images: { src: string; alt: string; width: number; height: number }[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
}

export function Lightbox({ images, index, onClose, onChange }: Props) {
  const t = useTranslations('gallery');
  const rtl = isRtl(useLocale());
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const open = index !== null;
  const total = images.length;

  const prev = () => index !== null && onChange((index - 1 + total) % total);
  const next = () => index !== null && onChange((index + 1) % total);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      lastFocus.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Arrow keys follow the reading direction
      if (e.key === 'ArrowRight') (rtl ? prev : next)();
      if (e.key === 'ArrowLeft') (rtl ? next : prev)();
      if (e.key === 'Tab') {
        // Keep focus inside the dialog
        const nodes = document.querySelectorAll<HTMLElement>('#lightbox button');
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const img = index !== null ? images[index] : null;
  const PrevIcon = rtl ? ChevronRight : ChevronLeft;
  const NextIcon = rtl ? ChevronLeft : ChevronRight;

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          id="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={img.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep-900/95 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <button ref={closeRef} type="button" onClick={onClose} aria-label={t('close')} className="hero-ctrl absolute end-4 top-4 !h-11 !w-11">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {total > 1 && (
            <button type="button" onClick={prev} aria-label={t('prev')} className="hero-ctrl absolute start-2 top-1/2 !h-11 !w-11 -translate-y-1/2 md:start-6">
              <PrevIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}

          <motion.figure
            key={img.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="flex max-h-full flex-col items-center"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="90vw"
              className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center text-sm text-cream/85">
              {img.alt} · <span>{t('counter', { current: (index ?? 0) + 1, total })}</span>
            </figcaption>
          </motion.figure>

          {total > 1 && (
            <button type="button" onClick={next} aria-label={t('next')} className="hero-ctrl absolute end-2 top-1/2 !h-11 !w-11 -translate-y-1/2 md:end-6">
              <NextIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
