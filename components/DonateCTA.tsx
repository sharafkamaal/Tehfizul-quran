import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';
import { Reveal } from './Reveal';
import { CopyButton } from './ui/CopyButton';
import { Ornament } from './ui/Ornament';

/** Donation banner with the key bank details, used on the home page. */
export function DonateCTA() {
  const t = useTranslations();
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <Reveal className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-deep-900 via-deep to-primary-700 px-6 py-12 text-cream shadow-soft md:px-14 md:py-16">
          <div className="bg-pattern absolute inset-0 -z-10 opacity-[0.12]" aria-hidden="true" />
          <div className="absolute -end-24 -top-24 -z-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-gold-light">{t('cta.eyebrow')}</p>
              <h2 className="mt-3 text-balance text-3xl font-bold md:text-4xl">{t('cta.title')}</h2>
              <Ornament tone="light" className="-ms-12 my-5" />
              <p className="text-cream/85">{t('cta.text')}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/donate" className="btn-gold">
                  {t('common.donateNow')}
                </Link>
                <Link href="/donate#ways" className="btn-outline-light">
                  {t('cta.button')}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-gold/40 bg-deep-900/50 p-6 backdrop-blur md:p-8">
              <p className="text-sm font-semibold text-gold-light">{t('cta.bankTitle')}</p>
              <dl className="mt-4 grid gap-4">
                <div>
                  <dt className="text-xs text-cream/70">{t('donate.bank.accountName')}</dt>
                  <dd className="mt-1 font-semibold" dir="ltr">
                    {site.bank.accountName}
                  </dd>
                </div>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <dt className="text-xs text-cream/70">{t('donate.bank.accountNumber')}</dt>
                    <dd className="font-latin mt-1 text-2xl font-bold tracking-wider text-gold-light" dir="ltr">
                      {site.bank.accountNumber}
                    </dd>
                  </div>
                  <CopyButton
                    value={site.bank.accountNumber}
                    label={t('donate.bank.accountNumber')}
                    className="!border-gold/60 !text-cream hover:!bg-gold/20"
                  />
                </div>
                <div>
                  <dt className="text-xs text-cream/70">{t('donate.bank.bank')}</dt>
                  <dd className="mt-1" dir="ltr">
                    {site.bank.bankName}, {site.bank.branch}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-cream/70">{t('donate.bank.ifsc')}</dt>
                  <dd className="mt-1" dir={site.bank.ifsc ? 'ltr' : undefined}>
                    {site.bank.ifsc || <span className="italic text-cream/60">{t('donate.bank.pending')}</span>}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
