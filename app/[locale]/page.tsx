import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight, Check, HeartHandshake } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';
import { HeroSlider } from '@/components/home/HeroSlider';
import { StatsBand } from '@/components/home/StatsBand';
import { SectionTitle } from '@/components/SectionTitle';
import { DepartmentCard } from '@/components/DepartmentCard';
import { NeedCard } from '@/components/NeedCard';
import { Gallery } from '@/components/gallery/Gallery';
import { DonateCTA } from '@/components/DonateCTA';
import { Reveal } from '@/components/Reveal';
import { Ornament } from '@/components/ui/Ornament';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations();
  const years = new Date().getFullYear() - 1994;

  return (
    <>
      <HeroSlider />
      <StatsBand />

      {/* About preview */}
      <section className="py-20 md:py-28">
        <div className="container grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative mx-auto w-full max-w-md">
            <div className="arch absolute -inset-3 border-2 border-gold/40" aria-hidden="true" />
            <div className="arch relative aspect-[4/5] overflow-hidden bg-deep shadow-soft">
              {/* TODO: replace /public/images/about.jpg with a real photo of the madrasa */}
              <Image
                src="/images/about.jpg"
                alt={(t.raw('hero.slides') as string[])[0]}
                fill
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 end-0 rounded-3xl bg-gold px-6 py-4 text-center text-deep-900 shadow-gold md:-end-6">
              <p className="font-latin text-4xl font-bold" dir="ltr">
                {years}+
              </p>
              <p className="max-w-[8rem] text-xs font-medium">{t('home.about.badge')}</p>
            </div>
          </Reveal>

          <div>
            <SectionTitle eyebrow={t('home.about.eyebrow')} title={t('home.about.title')} align="start" className="!mb-6" />
            <Reveal>
              <p className="text-lg text-ink-muted">{t('home.about.text')}</p>
              <ul className="mt-6 grid gap-3">
                {(t.raw('home.about.points') as string[]).map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Link href="/about" className="btn-green mt-8">
                {t('common.readMore')}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Departments preview */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="bg-pattern absolute inset-0 opacity-[0.06]" aria-hidden="true" />
        <div className="container relative">
          <SectionTitle
            eyebrow={t('home.departments.eyebrow')}
            title={t('home.departments.title')}
            subtitle={t('home.departments.subtitle')}
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.departments.map((d, i) => (
              <Reveal as="li" key={d.id} delay={i * 0.05}>
                <DepartmentCard department={d} featured={d.id === 'hifz'} />
              </Reveal>
            ))}
            <Reveal as="li" delay={0.35}>
              <Link
                href="/departments"
                className="group flex h-full min-h-[14rem] flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-gold/50 p-6 text-center text-deep transition hover:border-gold hover:bg-gold/10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-deep text-gold-light transition group-hover:scale-110">
                  <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
                </span>
                <span className="font-semibold">{t('common.viewAll')}</span>
              </Link>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* Urgent needs */}
      <section className="py-20 md:py-28">
        <div className="container">
          <SectionTitle eyebrow={t('home.needs.eyebrow')} title={t('home.needs.title')} subtitle={t('home.needs.subtitle')} />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {site.needs.map((n, i) => (
              <Reveal as="li" key={n.id} delay={i * 0.06}>
                <NeedCard need={n} index={i} />
              </Reveal>
            ))}
            <Reveal as="li" delay={0.3}>
              <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-deep p-8 text-center text-cream">
                <div className="bg-pattern absolute inset-0 opacity-15" aria-hidden="true" />
                <HeartHandshake className="relative h-12 w-12 text-gold-light" aria-hidden="true" />
                <p className="relative mt-4 text-xl font-bold">{t('donate.ways.title')}</p>
                <Ornament tone="light" className="relative my-4" />
                <Link href="/donate" className="btn-gold relative">
                  {t('common.donateNow')}
                </Link>
              </div>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="bg-white py-20 md:py-28">
        <div className="container">
          <SectionTitle eyebrow={t('home.gallery.eyebrow')} title={t('home.gallery.title')} subtitle={t('home.gallery.subtitle')} />
          <Gallery showFilters={false} limit={6} />
          <div className="mt-10 text-center">
            <Link href="/gallery" className="btn-outline">
              {t('common.viewAll')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <DonateCTA />
    </>
  );
}
