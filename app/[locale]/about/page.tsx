import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { SectionTitle } from '@/components/SectionTitle';
import { MemorialCard } from '@/components/MemorialCard';
import { StatCounter } from '@/components/StatCounter';
import { Reveal } from '@/components/Reveal';
import { Star8 } from '@/components/ui/Ornament';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata(locale, 'about');
}

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations();
  const paragraphs = t.raw('about.story.paragraphs') as string[];

  return (
    <>
      <PageHero title={t('about.hero.title')} subtitle={t('about.hero.subtitle')} image="/images/hero/hero-2.jpg" />

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="container grid gap-14 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div>
            <SectionTitle eyebrow={t('about.story.eyebrow')} title={t('about.story.title')} align="start" />
            <div className="space-y-6 text-lg text-ink/90">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className={i === 0 && locale === 'en' ? 'first-letter:text-5xl first-letter:font-bold first-letter:text-gold-dark' : undefined}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="grid gap-6 lg:sticky lg:top-32">
            <Reveal className="arch relative aspect-[4/5] overflow-hidden bg-deep shadow-soft ring-4 ring-gold/30">
              {/* TODO: replace /public/images/girls-section.jpg with a real (faceless) photo of Madrasatut Tayyibaat */}
              <Image src="/images/girls-section.jpg" alt={t('gallery.filters.girls')} fill sizes="22rem" className="object-cover" />
            </Reveal>
            <Reveal className="card p-6">
              <h2 className="text-lg font-bold text-deep">{t('about.leadership.title')}</h2>
              <ul className="mt-4 grid gap-4">
                <li className="flex gap-3">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-gold">
                    <Image src="/images/founder-sm.jpg" alt={t('about.memorial.name')} fill sizes="3.5rem" className="object-cover" />
                  </span>
                  <div>
                    <p className="text-xs text-ink-muted">{t('about.leadership.founderRole')}</p>
                    <p className="font-semibold text-deep">{t('about.leadership.founderName')}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-primary-700/60">
                    <Image src="/images/principal-sm.jpg" alt={t('about.leadership.headName')} fill sizes="3.5rem" className="object-cover" />
                  </span>
                  <div>
                    <p className="text-xs text-ink-muted">{t('about.leadership.headRole')}</p>
                    <p className="font-semibold text-deep">{t('about.leadership.headName')}</p>
                  </div>
                </li>
              </ul>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Photo band */}
      <section aria-hidden="true" className="pb-20 md:pb-28">
        <div className="container grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[
            ['/images/gallery/classes-2.jpg', 'md:col-span-2 md:row-span-2'],
            ['/images/gallery/events-1.jpg', ''],
            ['/images/gallery/dastarbandi-9.jpg', ''],
            ['/images/gallery/campus-5.jpg', 'col-span-2'],
          ].map(([src, cls], i) => (
            <Reveal key={src} delay={i * 0.07} className={`relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card ${cls}`}>
              <Image src={src} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition duration-700 hover:scale-105" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Today */}
      <section className="relative overflow-hidden bg-deep py-20 text-cream md:py-28">
        <div className="bg-pattern absolute inset-0 opacity-10" aria-hidden="true" />
        <div className="container relative">
          <SectionTitle eyebrow={t('about.today.eyebrow')} title={t('about.today.title')} tone="light" />
          <Reveal>
            <p className="mx-auto max-w-3xl text-center text-lg text-cream/90">{t('about.today.text')}</p>
          </Reveal>
          <ul className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-4">
            {site.stats
              .filter((s) => s.id !== 'founded')
              .map((s) => (
                <li key={s.id}>
                  <StatCounter
                    value={s.value}
                    suffix={s.suffix}
                    plain={s.plain}
                    text={t('stats.thousands')}
                    label={t(`stats.items.${s.id}`)}
                  />
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* Memorial */}
      <section className="py-20 md:py-28" aria-label={t('about.memorial.eyebrow')}>
        <div className="container">
          <div className="mb-10 flex justify-center text-gold" aria-hidden="true">
            <Star8 className="h-6 w-6" />
          </div>
          <Reveal>
            <MemorialCard />
          </Reveal>
        </div>
      </section>
    </>
  );
}
