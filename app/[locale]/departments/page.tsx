import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { DepartmentCard } from '@/components/DepartmentCard';
import { Reveal } from '@/components/Reveal';
import { Ornament } from '@/components/ui/Ornament';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata(locale, 'departments');
}

export default function DepartmentsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('departments');
  const [hifz, ...rest] = site.departments;

  return (
    <>
      <PageHero title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="py-20 md:py-28">
        <div className="container">
          {/* Hifz – the central department – gets a wide card */}
          <Reveal className="mb-8">
            <DepartmentCard department={hifz} variant="full" featured />
          </Reveal>
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((d, i) => (
              <Reveal as="li" key={d.id} delay={(i % 3) * 0.08}>
                <DepartmentCard department={d} variant="full" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-deep px-6 py-12 text-center text-cream md:px-12">
            <div className="bg-pattern absolute inset-0 opacity-10" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-balance text-3xl font-bold">{t('cta.title')}</h2>
              <Ornament tone="light" className="mx-auto my-4" />
              <p className="mx-auto max-w-xl text-cream/85">{t('cta.text')}</p>
              <Link href="/admissions" className="btn-gold mt-8">
                {t('cta.button')}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
