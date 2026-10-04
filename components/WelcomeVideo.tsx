'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const OPEN_WELCOME_VIDEO = 'open-welcome-video';

/**
 * Welcome video. Opens on every full page load (open / reload) shortly after the page has loaded
 * (so it never delays first paint), and can be reopened from the hero "Watch video" button.
 * The file is only requested while the dialog is open.
 */
export function WelcomeVideo() {
  const t = useTranslations('welcome');
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const video = useRef<HTMLVideoElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    video.current?.pause();
    setOpen(false);
  }, []);

  // First visit of the session: open after the page is fully loaded and the browser is idle
  useEffect(() => {
    let timer: number | undefined;
    const schedule = () => {
      // Don't push a large video on visitors who asked to save data
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      if (conn?.saveData) return;
      timer = window.setTimeout(() => setOpen(true), 1200);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    const reopen = () => {
      setMuted(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_WELCOME_VIDEO, reopen);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', schedule);
      window.removeEventListener(OPEN_WELCOME_VIDEO, reopen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [open, close]);

  const toggleSound = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t('title')}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={close}
        >
          <motion.div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-black shadow-2xl ring-1 ring-gold/40"
            initial={{ scale: 0.92, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full bg-deep-900">
              <Image src="/video/welcome-poster-v2.jpg" alt="" fill sizes="(min-width: 896px) 56rem, 100vw" className="object-cover" priority />
              <video
                ref={video}
                className="absolute inset-0 h-full w-full object-contain"
                src="/video/welcome-v2.mp4"
                poster="/video/welcome-poster-v2.jpg"
                autoPlay
                muted={muted}
                playsInline
                controls
                controlsList="nodownload"
                preload="metadata"
                onEnded={close}
              />
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 bg-gradient-to-b from-black/70 to-transparent p-3 sm:p-4">
              <button
                type="button"
                onClick={toggleSound}
                className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-deep-900 shadow-gold transition hover:bg-gold-light"
              >
                {muted ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
                {muted ? t('unmute') : t('mute')}
              </button>
              <button
                ref={closeBtn}
                type="button"
                onClick={close}
                aria-label={t('close')}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white ring-1 ring-white/30 transition hover:bg-black/80"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={close}
            className="absolute bottom-4 start-1/2 -translate-x-1/2 rounded-full border border-white/30 bg-black/50 px-5 py-2 text-sm text-white/90 transition hover:bg-black/70 rtl:translate-x-1/2"
          >
            {t('skip')}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
