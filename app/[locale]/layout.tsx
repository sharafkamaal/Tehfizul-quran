import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, isRtl, type Locale } from '@/i18n/routing';
import { fontVariables } from '@/lib/fonts';
import { buildMetadata } from '@/lib/metadata';
import { site, siteUrl } from '@/lib/site';
import { TopTicker } from '@/components/layout/TopTicker';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { WelcomeVideo } from '@/components/WelcomeVideo';
import { MotionProvider } from '@/components/MotionProvider';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  return buildMetadata(locale, 'home');
}

export const viewport: Viewport = {
  themeColor: '#0B5D3B',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations('common');
  const dir = isRtl(locale) ? 'rtl' : 'ltr';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: site.names.en,
    alternateName: [site.names.ar, site.names.ur],
    url: `${siteUrl}/${locale}`,
    logo: `${siteUrl}/images/logo.png`,
    foundingDate: '1994',
    founder: { '@type': 'Person', name: 'Hafiz Mohammed Abdul Ghani' },
    telephone: site.phones.map((p) => p.tel),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'H.No. 19-2-156/1/A/10, Adjacent to Masjid Sayyidina Umar Farooq-e-Azam, Tadban',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500064',
      addressCountry: 'IN',
    },
  };

  return (
    <html lang={locale} dir={dir} className={fontVariables}>
      <body>
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-deep px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {t('skipToContent')}
        </a>
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            <TopTicker />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <FloatingActions />
            <WelcomeVideo />
          </MotionProvider>
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
