import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Crown, UserRound } from 'lucide-react';
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
      <PageHero title={t('about.hero.title')} subtitle={t('about.hero.subtitle')} />

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
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-dark">
                    <Crown className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs text-ink-muted">{t('about.leadership.founderRole')}</p>
                    <p className="font-semibold text-deep">{t('about.leadership.founderName')}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                    <UserRound className="h-5 w-5" aria-hidden="true" />
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
