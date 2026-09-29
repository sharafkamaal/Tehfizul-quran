import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/routing';
import { pagePaths } from '@/lib/metadata';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return Object.entries(pagePaths).flatMap(([page, path]) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: page === 'home' ? 1 : page === 'donate' ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])),
      },
    })),
  );
}
