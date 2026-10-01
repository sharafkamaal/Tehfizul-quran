import Image from 'next/image';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Ornament } from './ui/Ornament';

/** Banner at the top of inner pages, with breadcrumb. */
export function PageHero({ title, subtitle, image }: { title: string; subtitle?: string; image?: string }) {
  const t = useTranslations('nav');
  return (
    <section className="relative isolate overflow-hidden bg-deep text-cream">
      {image ? (
        <>
          <div className="absolute inset-0 -z-20 animate-[hero-zoom_20s_ease-out_forwards]">
            <Image src={image} alt="" fill priority sizes="100vw" quality={75} className="object-cover" />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/55 to-black/80" aria-hidden="true" />
        </>
      ) : (
        <>
          <div className="bg-pattern absolute inset-0 -z-10 opacity-[0.14]" aria-hidden="true" />
          <div className="absolute -bottom-40 left-1/2 -z-10 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
        </>
      )}
      <div className={clsx('container flex flex-col items-center text-center', image ? 'py-14 md:py-36' : 'py-12 md:py-24')}>
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-cream/70">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-gold-light">
                {t('home')}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </li>
            <li aria-current="page" className="text-gold-light">
              {title}
            </li>
          </ol>
        </nav>
        <h1 className={clsx("text-balance text-4xl font-bold md:text-5xl", image && "drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]")}>{title}</h1>
        <Ornament tone="light" className="my-5" />
        {subtitle && <p className="max-w-2xl text-pretty text-lg text-cream/85">{subtitle}</p>}
      </div>
      {/* Scalloped arch edge */}
      <svg aria-hidden="true" viewBox="0 0 1440 40" preserveAspectRatio="none" className="-mb-px block h-6 w-full text-cream md:h-10">
        <path
          fill="currentColor"
          d="M0 40V20c40 0 40-20 80-20s40 20 80 20 40-20 80-20 40 20 80 20 40-20 80-20 40 20 80 20 40-20 80-20 40 20 80 20 40-20 80-20 40 20 80 20 40-20 80-20 40 20 80 20 40-20 80-20 40 20 80 20 40-20 80-20 40 20 80 20 40-20 80-20 40 20 80 20 40-20 80-20 40 20 80 20v20z"
        />
      </svg>
    </section>
  );
}
