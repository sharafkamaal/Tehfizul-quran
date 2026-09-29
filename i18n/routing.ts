import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'ur', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const rtlLocales: readonly Locale[] = ['ur', 'ar'];
export const isRtl = (locale: string) => (rtlLocales as readonly string[]).includes(locale);

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
