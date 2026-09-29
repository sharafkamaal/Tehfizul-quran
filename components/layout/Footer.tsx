import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { navItems } from '@/lib/nav';
import { site } from '@/lib/site';
import type { Locale } from '@/i18n/routing';
import { MapEmbed } from '../MapEmbed';
import { Ornament } from '../ui/Ornament';

const socials = [
  { key: 'facebook', label: 'Facebook', Icon: Facebook },
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
  { key: 'youtube', label: 'YouTube', Icon: Youtube },
] as const;

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-deep-900 pb-20 text-cream md:pb-0">
      <div className="bg-pattern-light pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
      <div className="container relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="rounded-2xl bg-cream p-2">
              <Image src="/images/logo.png" alt={t('common.logoAlt')} width={64} height={57} className="h-14 w-auto" />
            </span>
            <p className="text-lg font-bold leading-snug">{t('common.shortName')}<br /><span className="text-sm font-normal text-gold-light">{t('common.subName')}</span></p>
          </div>
          <p className="mt-5 text-sm text-cream/80">{t('footer.about')}</p>
          <p lang="ar" dir="rtl" className="script-ar mt-5 w-fit text-xl text-gold-light">{site.hadith}</p>

          <h2 className="mt-8 text-sm font-semibold text-gold-light">{t('footer.follow')}</h2>
          <ul className="mt-3 flex gap-3">
            {socials.map(({ key, label, Icon }) => {
              const href = site.social[key];
              return (
                <li key={key}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 transition hover:border-gold hover:bg-gold hover:text-deep-900"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <span
                      role="img"
                      aria-label={t('footer.comingSoon', { network: label })}
                      title={t('footer.comingSoon', { network: label })}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/40"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label={t('footer.quickLinks')} className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-gold-light">{t('footer.quickLinks')}</h2>
          <ul className="mt-4 grid gap-2 text-sm">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="text-cream/80 transition hover:text-gold-light">
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-gold-light">{t('footer.contact')}</h2>
          <ul className="mt-4 grid gap-4 text-sm text-cream/85">
            <li className="flex gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <address className="not-italic">
                {t('address.line1')}
                <br />
                {t('address.line2')}
                <br />
                {t('address.line3')}
              </address>
            </li>
            {site.phones.map((p) => (
              <li key={p.tel} className="flex gap-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`tel:${p.tel}`} dir="ltr" className="font-latin hover:text-gold-light">
                  {p.number}
                </a>
              </li>
            ))}
            <li className="flex gap-3">
              <Mail className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              {/* TODO: replace the placeholder e-mail in content/site.json */}
              <a href={`mailto:${site.email}`} dir="ltr" className="break-all hover:text-gold-light">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <MapEmbed title={t('footer.mapTitle')} className="h-56 lg:h-full" />
        </div>
      </div>

      <div className="relative border-t border-cream/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-center text-xs text-cream/70 md:flex-row">
          <p>
            © {year} <span lang={locale}>{site.names[locale]}</span>. {t('footer.rights')}
          </p>
          <Ornament tone="light" className="h-4 w-32" />
        </div>
      </div>
    </footer>
  );
}
