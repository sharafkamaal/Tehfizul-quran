'use client';

import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { locales } from '@/i18n/routing';

const labels = { en: 'EN', ur: 'اردو', ar: 'العربية' } as const;
const fonts = { en: 'script-en', ur: 'script-ur', ar: 'script-ar' } as const;

export function LanguageSwitcher({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t('language')} className={className}>
      <ul
        className={clsx(
          'flex items-center rounded-full border p-1',
          tone === 'dark' ? 'border-gold/40 bg-white/70' : 'border-cream/30 bg-white/10',
        )}
      >
        {locales.map((l) => {
          const active = l === locale;
          return (
            <li key={l}>
              <Link
                href={pathname}
                locale={l}
                hrefLang={l}
                lang={l}
                aria-current={active ? 'true' : undefined}
                className={clsx(
                  fonts[l],
                  'flex h-8 items-center rounded-full px-3 text-xs font-semibold leading-none transition',
                  active
                    ? 'bg-deep text-cream shadow'
                    : tone === 'dark'
                      ? 'text-deep hover:bg-gold/20'
                      : 'text-cream hover:bg-white/15',
                )}
              >
                {labels[l]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
