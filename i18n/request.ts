import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    // All visible text lives in /content/{en,ur,ar}.json
    messages: (await import(`../content/${locale}.json`)).default,
    timeZone: 'Asia/Kolkata',
  };
});
