'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, HeartHandshake } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, isRtl, type Locale } from '@/i18n/routing';
import { site } from '@/lib/site';
import { Ornament } from '../ui/Ornament';

const INTERVAL = 6500;
const scripts = ['ar', 'ur', 'en'] as const;

export function HeroSlider() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const reduce = useReducedMotion();
  const images = site.heroImages;
  const alts = t.raw('hero.slides') as string[];
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const go = useCallback((n: number) => setIndex((n + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(id);
  }, [index, playing, reduce, go]);

  const rtl = isRtl(locale);
  const PrevIcon = rtl ? ChevronRight : ChevronLeft;
  const NextIcon = rtl ? ChevronLeft : ChevronRight;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={site.names[locale]}
      className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-deep-900 md:min-h-[88vh]"
    >
      {/* Slides */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0 -z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} / ${images.length}`}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: INTERVAL / 1000 + 1.5, ease: 'linear' }}
          >
            {/* TODO: replace /public/images/hero/*.jpg with real photographs (see content/site.json → heroImages) */}
            <Image
              src={images[index]}
              alt={alts[index] ?? ''}
              fill
              priority={index === 0}
              sizes="100vw"
              quality={70}
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Dark-green overlay + pattern */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-deep-900/85 via-deep/80 to-deep-900/95" aria-hidden="true" />
      <div className="bg-pattern absolute inset-0 -z-10 opacity-[0.12]" aria-hidden="true" />

      <div className="container relative pb-36 pt-16 text-center text-cream md:pb-44 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-4xl flex-col items-center"
        >
          <p className="rounded-full border border-gold/50 bg-deep-900/40 px-4 py-1.5 text-xs font-medium text-gold-light backdrop-blur-sm md:text-sm">
            {t('hero.eyebrow')}
          </p>

          <div className="mt-8 flex flex-col items-center gap-2">
            {scripts.map((s) => {
              const Tag = s === locale ? 'h1' : 'p';
              return (
                <Tag
                  key={s}
                  lang={s}
                  dir={s === 'en' ? 'ltr' : 'rtl'}
                  className={clsx(
                    `script-${s} text-balance`,
                    s === 'ar' && 'text-3xl font-bold text-cream sm:text-4xl md:text-5xl',
                    s === 'ur' && 'text-xl text-cream/90 sm:text-2xl md:text-3xl',
                    s === 'en' && 'max-w-3xl text-sm font-medium uppercase tracking-[0.18em] text-gold-light md:text-base',
                  )}
                >
                  {site.names[s]}
                </Tag>
              );
            })}
          </div>

          <Ornament tone="light" className="my-8 w-56" />

          <figure>
            <blockquote lang="ar" dir="rtl" className="script-ar text-2xl text-gold-light md:text-4xl">
              {site.hadith}
            </blockquote>
            {locale !== 'ar' && <p className="mt-3 text-base text-cream/90 md:text-lg">{t('hero.hadithTranslation')}</p>}
            <figcaption className="mt-1 text-sm text-cream/70">— {t('hero.hadithSource')}</figcaption>
          </figure>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/donate" className="btn-gold !px-8 !py-3.5 text-base">
              <HeartHandshake className="h-5 w-5" aria-hidden="true" />
              {t('common.donateNow')}
            </Link>
            <Link href="/about" className="btn-outline-light !px-8 !py-3.5 text-base">
              {t('common.learnMore')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-20 flex items-center justify-center gap-3 md:bottom-28">
        <button type="button" onClick={() => go(index - 1)} aria-label={t('hero.prev')} className="hero-ctrl">
          <PrevIcon className="h-4 w-4" aria-hidden="true" />
        </button>
        <ul className="flex items-center gap-2">
          {images.map((_, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={t('hero.goTo', { n: i + 1 })}
                aria-current={i === index ? 'true' : undefined}
                className="group flex h-6 items-center"
              >
                <span
                  className={clsx(
                    'block h-1.5 rounded-full transition-all duration-500',
                    i === index ? 'w-8 bg-gold' : 'w-3 bg-cream/50 group-hover:bg-cream',
                  )}
                />
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => go(index + 1)} aria-label={t('hero.next')} className="hero-ctrl">
          <NextIcon className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? t('hero.pause') : t('hero.play')}
          className="hero-ctrl"
        >
          {playing ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
        </button>
      </div>
    </section>
  );
}
