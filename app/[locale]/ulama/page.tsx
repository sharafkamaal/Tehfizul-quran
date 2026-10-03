import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { SectionTitle } from '@/components/SectionTitle';
import { Reveal } from '@/components/Reveal';
import { UlamaGallery } from '@/components/gallery/UlamaGallery';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata(locale, 'ulama');
}

export default function UlamaPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations();
  const [a, b] = [site.ulama[1], site.ulama[7]];

  return (
    <>
      <PageHero title={t('ulama.hero.title')} subtitle={t('ulama.hero.subtitle')} image="/images/hero/hero-3.jpg" />

      {/* Intro with overlapping photos */}
      <section className="py-16 md:py-24">
        <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle eyebrow={t('ulama.intro.eyebrow')} title={t('ulama.intro.title')} align="start" className="!mb-6" />
            <Reveal>
              <p className="text-lg text-ink-muted">{t('ulama.intro.text')}</p>
              <Link href="/donate" className="btn-green mt-8">
                {t('common.donateNow')}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <Reveal className="relative mx-auto h-[22rem] w-full max-w-lg sm:h-[26rem]">
            <div className="absolute start-0 top-0 h-[75%] w-[72%] overflow-hidden rounded-[2rem] shadow-soft ring-4 ring-white">
              <Image src={a.src} alt="" fill sizes="(min-width: 1024px) 22rem, 70vw" className="object-cover" />
            </div>
            <div className="arch absolute bottom-0 end-0 h-[78%] w-[50%] overflow-hidden shadow-gold ring-4 ring-gold/60">
              <Image src={b.src} alt="" fill sizes="(min-width: 1024px) 14rem, 45vw" className="object-cover object-top" />
            </div>
            <div className="absolute -bottom-3 start-6 rounded-full border border-gold/50 bg-cream px-5 py-2 text-sm font-semibold text-deep shadow-card">
              {t('ulama.album.title')}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Photo album */}
      <section className="bg-white pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="container">
          <SectionTitle eyebrow={t('ulama.album.eyebrow')} title={t('ulama.album.title')} subtitle={t('ulama.album.subtitle')} />
          <UlamaGallery photos={site.ulama} variant="album" />
        </div>
      </section>

      {/* Newspaper tributes */}
      <section className="relative overflow-hidden bg-deep py-20 text-cream md:py-28">
        <div className="bg-pattern absolute inset-0 opacity-10" aria-hidden="true" />
        <div className="container relative">
          <SectionTitle eyebrow={t('ulama.press.eyebrow')} title={t('ulama.press.title')} subtitle={t('ulama.press.subtitle')} tone="light" />
          <UlamaGallery photos={site.clippings} variant="press" />
        </div>
      </section>
    </>
  );
}
