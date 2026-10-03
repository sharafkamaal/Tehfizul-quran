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
import { UlamaStrip } from '@/components/home/UlamaStrip';
import { PhotoMosaic } from '@/components/home/PhotoMosaic';
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

      {/* Founder */}
      <section className="relative overflow-hidden bg-deep py-20 text-cream md:py-28" aria-labelledby="founder-name">
        <div className="bg-pattern absolute inset-0 opacity-10" aria-hidden="true" />
        <div className="container relative grid items-center gap-12 lg:grid-cols-[22rem_1fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-xs">
            <div className="arch absolute -inset-3 border-2 border-gold/50" aria-hidden="true" />
            <div className="arch relative aspect-[4/5] overflow-hidden bg-deep-900 shadow-gold ring-4 ring-gold/40">
              <Image src="/images/founder.jpg" alt={t('about.memorial.name')} fill sizes="20rem" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-900/60 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </Reveal>
          <Reveal className="text-center lg:text-start">
            <p className="eyebrow !text-gold-light">{t('about.leadership.founderRole')}</p>
            <h2 id="founder-name" className="mt-3 text-balance text-3xl font-bold md:text-4xl">{t('about.memorial.name')}</h2>
            <p className="mt-1 text-gold-light">{t('about.memorial.honorific')}</p>
            <p className="mt-1 text-sm text-cream/70">{t('about.memorial.title')}</p>
            <Ornament tone="light" className="my-6 mx-auto w-48 lg:mx-0" />
            <blockquote lang="ar" dir="rtl" className="script-ar text-2xl text-gold-light md:text-3xl">{site.hadith}</blockquote>
            <p className="mt-6 max-w-xl text-pretty text-cream/90 lg:max-w-none">{t('about.memorial.text')}</p>
            <Link href="/about" className="btn-gold mt-8">
              {t('common.readMore')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Principal */}
      <section className="py-16 md:py-20" aria-labelledby="principal-name">
        <div className="container">
          <Reveal className="card relative mx-auto flex max-w-3xl flex-col items-center gap-8 overflow-hidden p-8 text-center sm:flex-row sm:text-start md:p-10">
            <div className="relative shrink-0">
              <div className="absolute -inset-2 rounded-full border-2 border-gold/50" aria-hidden="true" />
              <div className="relative h-44 w-44 overflow-hidden rounded-full ring-4 ring-gold/40 shadow-soft">
                <Image src="/images/principal.jpg" alt={t('about.leadership.headName')} fill sizes="11rem" className="object-cover object-center" />
              </div>
            </div>
            <div>
              <p className="eyebrow">{t('about.leadership.headRole')}</p>
              <h2 id="principal-name" className="mt-2 text-2xl font-bold text-deep md:text-3xl">{t('about.leadership.headName')}</h2>
              <Ornament className="my-4 w-40 sm:mx-0" />
              <Link href="/about" className="btn-green">
                {t('common.readMore')}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
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
          <PhotoMosaic />
          <div className="mt-10 text-center">
            <Link href="/gallery" className="btn-outline">
              {t('common.viewAll')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ulama & guests */}
      <section className="py-20 md:py-28">
        <div className="container">
          <SectionTitle eyebrow={t('ulama.home.eyebrow')} title={t('ulama.home.title')} subtitle={t('ulama.home.subtitle')} />
          <UlamaStrip />
          <div className="mt-10 text-center">
            <Link href="/ulama" className="btn-outline">
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
