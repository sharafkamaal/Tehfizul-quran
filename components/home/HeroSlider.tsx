'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, HeartHandshake, CirclePlay } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, isRtl, type Locale } from '@/i18n/routing';
import { site } from '@/lib/site';
import { OPEN_WELCOME_VIDEO } from '../WelcomeVideo';

const INTERVAL = 7000;
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Full-bleed photo hero. Photos keep their natural colours – only a soft dark
 * gradient at the bottom carries the (deliberately short) text.
 */
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
  const script = locale === 'en' ? 'en' : locale;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={site.names[locale]}
      className="relative isolate flex min-h-[600px] items-end overflow-hidden bg-deep-900 md:min-h-[90vh]"
    >
      {/* Slides: each new photo is revealed with a rising wipe while slowly zooming out */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0 -z-20"
          initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ opacity: 1, transition: { duration: 1.4 } }}
          transition={{ duration: 1.3, ease }}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} / ${images.length}`}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.18 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: INTERVAL / 1000 + 2, ease: 'linear' }}
          >
            <Image
              src={images[index]}
              alt={alts[index] ?? ''}
              fill
              priority={index === 0}
              sizes="100vw"
              quality={78}
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Fetch the next slide in the background (same srcset as the visible slide, so the browser reuses it) */}
      <Image
        src={images[(index + 1) % images.length]}
        alt=""
        width={1920}
        height={1080}
        sizes="100vw"
        quality={78}
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px opacity-0"
      />

      {/* Only a soft shade at the bottom for legibility – no colour tint */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[75%] bg-gradient-to-t from-black/80 via-black/45 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/25 to-transparent" aria-hidden="true" />

      <div className="container relative pb-40 pt-28 text-white md:pb-32 md:pt-40">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-start">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 72 }}
              transition={{ duration: 0.9, delay: 0.3, ease }}
              className="mx-auto mb-5 h-1 rounded-full bg-gold lg:mx-0"
              aria-hidden="true"
            />
            <h1
              lang={script}
              dir={rtl ? 'rtl' : 'ltr'}
              className={clsx(
                'text-balance font-bold leading-[1.15] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]',
                locale === 'en' ? 'text-3xl sm:text-4xl lg:text-5xl' : `script-${locale} text-2xl sm:text-4xl lg:text-5xl`,
              )}
            >
              {site.names[locale]}
            </h1>

            {/* Caption changes with every slide */}
            <div className="mx-auto mt-5 min-h-[3.5rem] lg:mx-0">
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease }}
                  className="mx-auto max-w-xl text-base text-white/90 md:text-lg lg:mx-0"
                >
                  {alts[index]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
              <Link href="/donate" className="btn-gold !px-6 !py-3 text-sm sm:!px-8 sm:!py-3.5 sm:text-base">
                <HeartHandshake className="h-5 w-5" aria-hidden="true" />
                {t('common.donateNow')}
              </Link>
              <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_WELCOME_VIDEO))} className="btn-outline-light !px-6 !py-3 text-sm sm:!px-8 sm:!py-3.5 sm:text-base">
                <CirclePlay className="h-5 w-5" aria-hidden="true" />
                {t('welcome.watch')}
              </button>
            </div>
          </div>

          {/* Slide counter */}
          <p className="hidden select-none font-latin text-white/80 lg:block" dir="ltr" aria-hidden="true">
            <span className="text-6xl font-light text-white">{String(index + 1).padStart(2, '0')}</span>
            <span className="ms-2 text-lg">/ {String(images.length).padStart(2, '0')}</span>
          </p>
        </div>
      </div>

      {/* Controls with a progress bar on the active dot */}
      <div className="absolute inset-x-0 bottom-24 flex items-center justify-center gap-3 md:bottom-24">
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
                className="flex h-6 items-center"
              >
                <span className={clsx('relative block h-1.5 overflow-hidden rounded-full bg-white/40 transition-all duration-500', i === index ? 'w-12' : 'w-3')}>
                  {i === index && (
                    <motion.span
                      key={`${index}-${playing}`}
                      className="absolute inset-y-0 start-0 block rounded-full bg-gold"
                      initial={{ width: reduce || !playing ? '100%' : '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: reduce || !playing ? 0 : INTERVAL / 1000, ease: 'linear' }}
                    />
                  )}
                </span>
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
