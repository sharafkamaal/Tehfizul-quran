import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Phone, Quote } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';
import { formatINR } from '@/lib/format';
import { PageHero } from '@/components/PageHero';
import { SectionTitle } from '@/components/SectionTitle';
import { NeedCard } from '@/components/NeedCard';
import { BankDetails } from '@/components/BankDetails';
import { Reveal } from '@/components/Reveal';
import { Icon, WhatsAppIcon } from '@/components/ui/Icon';
import { Ornament } from '@/components/ui/Ornament';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata(locale, 'donate');
}

interface Highlight { value: string; label: string }
interface Way { icon: string; title: string; text: string }

export default function DonatePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations();
  const highlights = t.raw('donate.intro.highlights') as Highlight[];
  const ways = t.raw('donate.ways.items') as Way[];
  const totalGoal = site.needs.reduce((sum, n) => sum + n.goal, 0);

  return (
    <>
      <PageHero title={t('donate.hero.title')} subtitle={t('donate.hero.subtitle')} />

      {/* Ayah */}
      <section className="py-14 md:py-20">
        <Reveal className="container max-w-4xl text-center">
          <p lang="ar" dir="rtl" className="script-ar text-2xl leading-loose text-deep md:text-4xl">
            {t('donate.ayah')}
          </p>
          <p className="mt-4 text-ink-muted">{t('donate.ayahTranslation')}</p>
        </Reveal>
      </section>

      {/* Intro & appeal */}
      <section className="bg-white py-20 md:py-28">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionTitle eyebrow={t('donate.intro.eyebrow')} title={t('donate.intro.title')} align="start" className="!mb-6" />
            <Reveal className="space-y-5 text-lg text-ink/90">
              {(t.raw('donate.intro.paragraphs') as string[]).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          </div>
          <div className="grid gap-6">
            <Reveal className="relative overflow-hidden rounded-[2rem] bg-deep p-8 text-cream shadow-soft">
              <div className="bg-pattern absolute inset-0 opacity-10" aria-hidden="true" />
              <Quote className="relative h-8 w-8 text-gold rtl:-scale-x-100" aria-hidden="true" />
              <p className="relative mt-3 text-xl font-medium leading-relaxed">{t('donate.intro.appeal')}</p>
            </Reveal>
            <ul className="grid gap-4 sm:grid-cols-3">
              {highlights.map((h, i) => (
                <Reveal as="li" key={i} delay={i * 0.08} className="card p-5 text-center">
                  <p className="text-2xl font-bold text-primary-700">{h.value}</p>
                  <p className="mt-1 text-sm text-ink-muted">{h.label}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Urgent needs */}
      <section className="py-20 md:py-28" id="needs">
        <div className="container">
          <SectionTitle
            eyebrow={t('donate.needs.eyebrow')}
            title={t('donate.needs.title')}
            subtitle={t('donate.needs.subtitle')}
          />
          <Reveal className="mx-auto mb-12 flex max-w-md flex-col items-center rounded-3xl border border-gold/40 bg-gold-50 px-6 py-5 text-center">
            <p className="text-sm text-gold-dark">{t('donate.needs.total')}</p>
            <p className="font-latin mt-1 text-3xl font-bold text-deep" dir="ltr">
              {formatINR(totalGoal)}
            </p>
          </Reveal>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {site.needs.map((n, i) => (
              <Reveal as="li" key={n.id} delay={(i % 3) * 0.08}>
                <NeedCard need={n} index={i} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Ways to help */}
      <section id="ways" className="relative scroll-mt-28 overflow-hidden bg-deep py-20 text-cream md:py-28">
        <div className="bg-pattern absolute inset-0 opacity-10" aria-hidden="true" />
        <div className="container relative">
          <SectionTitle eyebrow={t('donate.ways.eyebrow')} title={t('donate.ways.title')} tone="light" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ways.map((w, i) => (
              <Reveal
                as="li"
                key={w.title}
                delay={(i % 3) * 0.08}
                className="group rounded-3xl border border-gold/25 bg-deep-900/40 p-6 backdrop-blur transition hover:border-gold/60 hover:bg-deep-900/60"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-deep-900 transition group-hover:scale-105">
                  <Icon name={w.icon} className="h-7 w-7" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-sm text-cream/80">{w.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Bank details */}
      <section id="bank" className="scroll-mt-28 py-20 md:py-28">
        <div className="container max-w-4xl">
          <SectionTitle eyebrow={t('donate.bank.eyebrow')} title={t('donate.bank.title')} />
          <Reveal>
            <BankDetails />
          </Reveal>
          <Reveal className="mt-8 flex flex-col items-center gap-4 text-center">
            <p className="max-w-xl text-sm text-ink-muted">{t('donate.bank.receiptNote')}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn !bg-[#1DA851] text-white hover:!bg-[#178a43]">
                <WhatsAppIcon className="h-5 w-5" />
                {t('common.whatsapp')}
              </a>
              {site.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="btn-outline">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span dir="ltr" className="font-latin">{p.number}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing dua */}
      <section className="pb-20 md:pb-28">
        <Reveal className="container max-w-3xl text-center">
          <Ornament className="mx-auto" />
          <p className="mt-6 text-balance text-2xl font-semibold text-deep md:text-3xl">{t('donate.closing')}</p>
          <p lang={locale === 'ur' ? 'ur' : 'ar'} className="script-ar mt-3 text-2xl text-gold-dark">
            {t('donate.closingDua')}
          </p>
        </Reveal>
      </section>
    </>
  );
}
