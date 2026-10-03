import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { siteUrl } from './site';

export type PageKey = 'home' | 'about' | 'departments' | 'donate' | 'gallery' | 'ulama' | 'admissions' | 'contact';

export const pagePaths: Record<PageKey, string> = {
  home: '',
  about: '/about',
  departments: '/departments',
  donate: '/donate',
  gallery: '/gallery',
  ulama: '/ulama',
  admissions: '/admissions',
  contact: '/contact',
};

const ogLocale: Record<Locale, string> = { en: 'en_IN', ur: 'ur_IN', ar: 'ar_SA' };

export async function buildMetadata(locale: Locale, page: PageKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  const siteName = t('siteName');
  const title = page === 'home' ? siteName : `${t(`pages.${page}.title`)} | ${siteName}`;
  const description = page === 'home' ? t('description') : t(`pages.${page}.description`);
  const path = pagePaths[page];
  const url = `${siteUrl}/${locale}${path}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: t('keywords'),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])),
        'x-default': `${siteUrl}/en${path}`,
      },
    },
    openGraph: {
      type: 'website',
      url,
      siteName,
      title,
      description,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: siteName }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/images/og.jpg'] },
  };
}
