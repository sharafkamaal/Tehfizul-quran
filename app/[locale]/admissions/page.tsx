import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Clock } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { SectionTitle } from '@/components/SectionTitle';
import { Reveal } from '@/components/Reveal';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { Icon } from '@/components/ui/Icon';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata(locale, 'admissions');
}

export default function AdmissionsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations();
  const timings = t.raw('admissions.timings.items') as { label: string; time: string }[];
  const steps = t.raw('admissions.steps.items') as string[];

  return (
    <>
      <PageHero title={t('admissions.hero.title')} subtitle={t('admissions.hero.subtitle')} image="/images/gallery/classes-9.jpg" />

      <section className="py-20 md:py-28">
        <div className="container">
          <SectionTitle eyebrow={t('admissions.depts.eyebrow')} title={t('admissions.depts.title')} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {site.departments.map((d, i) => (
              <Reveal as="li" key={d.id} delay={(i % 4) * 0.05} className="card flex items-start gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-deep text-gold-light">
                  <Icon name={d.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-deep">{t(`departments.items.${d.id}.title`)}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{t(`departments.items.${d.id}.summary`)}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="grid content-start gap-8">
            <Reveal className="relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-soft">
              <Image src="/images/gallery/classes-2.jpg" alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
            </Reveal>
            <Reveal className="relative overflow-hidden rounded-[2rem] bg-deep p-8 text-cream">
              <div className="bg-pattern absolute inset-0 opacity-10" aria-hidden="true" />
              <div className="relative">
                <p className="text-sm text-gold-light">{t('admissions.timings.eyebrow')}</p>
                <h2 className="mt-1 text-2xl font-bold">{t('admissions.timings.title')}</h2>
                <ul className="mt-6 grid gap-4">
                  {timings.map((row) => (
                    <li key={row.label} className="flex gap-3 border-b border-cream/10 pb-4 last:border-0 last:pb-0">
                      <Clock className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                      <div>
                        <p className="font-semibold">{row.label}</p>
                        <p className="text-sm text-cream/80">{row.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-cream/70">{t('admissions.timings.note')}</p>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-bold text-deep">{t('admissions.steps.title')}</h2>
              <ol className="mt-6 grid gap-5">
                {steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="arch flex h-10 w-9 shrink-0 items-center justify-center bg-gold font-bold text-deep-900" dir="ltr">
                      {i + 1}
                    </span>
                    <p className="pt-1.5">{s}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal className="card p-6 md:p-10">
            <h2 className="text-2xl font-bold text-deep">{t('admissions.form.title')}</h2>
            <p className="mb-8 mt-2 text-ink-muted">{t('admissions.form.subtitle')}</p>
            <EnquiryForm kind="admission" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
