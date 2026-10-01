import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Ornament, Star8 } from './ui/Ornament';

/** Respectful memorial for the founder, Hafiz Mohammed Abdul Ghani Sahab (R.A). */
export function MemorialCard() {
  const t = useTranslations('about.memorial');
  const locale = useLocale();
  return (
    <article
      aria-labelledby="memorial-name"
      className="relative mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] bg-deep-900 p-2 shadow-soft"
    >
      <div className="relative overflow-hidden rounded-[2.1rem] border border-gold/50 px-6 py-12 text-center text-cream md:px-14 md:py-16">
        <div className="bg-pattern absolute inset-0 opacity-[0.08]" aria-hidden="true" />
        {/* Arch outline */}
        <div className="arch pointer-events-none absolute inset-x-6 bottom-6 top-6 border border-gold/25 md:inset-x-10" aria-hidden="true" />

        <div className="relative">
          <p className="flex items-center justify-center gap-2 text-sm text-gold-light">
            <Star8 className="h-3 w-3" /> {t('eyebrow')} <Star8 className="h-3 w-3" />
          </p>
          <div className="relative mx-auto mt-8 w-48 md:w-56">
            <div className="arch absolute -inset-2 border border-gold/60" aria-hidden="true" />
            <div className="arch relative aspect-[4/5] overflow-hidden bg-deep shadow-gold ring-4 ring-gold/40">
              <Image src="/images/founder.jpg" alt={t('name')} fill sizes="14rem" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-900/50 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </div>
          <h2 id="memorial-name" className="mt-8 text-3xl font-bold md:text-4xl">
            {t('name')}
          </h2>
          <p className="mt-1 text-gold-light">{t('honorific')}</p>
          <p className="mt-2 text-sm text-cream/70">{t('title')}</p>

          <Ornament tone="light" className="mx-auto my-6" />

          <p className="mx-auto max-w-xl text-pretty text-cream/90">{t('text')}</p>

          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-gold/40 px-5 py-2 text-sm text-gold-light">
            <time>{t('hijri')}</time>
            <span aria-hidden="true">·</span>
            <time dateTime="2025-07-13">{t('gregorian')}</time>
          </div>

          <p lang="ar" dir="rtl" className="script-ar mt-8 text-2xl text-gold-light md:text-3xl">
            {t('inna')}
          </p>
          {locale !== 'ar' && t('innaTranslation') && (
            <p className="mt-2 text-sm text-cream/70">{t('innaTranslation')}</p>
          )}
          <p className="mt-4 text-sm text-cream/80">{t('dua')}</p>
        </div>
      </div>
    </article>
  );
}
