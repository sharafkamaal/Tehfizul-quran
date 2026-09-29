'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Expand, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { galleryCategories, site, type GalleryCategory, type GalleryImage } from '@/lib/site';
import { Lightbox } from './Lightbox';

type Filter = 'all' | GalleryCategory;

interface Props {
  showFilters?: boolean;
  limit?: number;
}

/**
 * Masonry photo grid with category filters and a lightbox.
 * Images are listed in content/site.json → gallery.
 */
export function Gallery({ showFilters = true, limit }: Props) {
  const t = useTranslations('gallery');
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<number | null>(null);

  // Give each image a stable, human-friendly alt text: "Classes – photo 2"
  const withAlt = useMemo(() => {
    const counters: Record<string, number> = {};
    return site.gallery.map((img) => {
      counters[img.category] = (counters[img.category] ?? 0) + 1;
      return { ...img, alt: t('imageAlt', { category: t(`filters.${img.category}`), n: counters[img.category] }) };
    });
  }, [t]);

  const items: (GalleryImage & { alt: string })[] = useMemo(() => {
    const list = filter === 'all' ? withAlt : withAlt.filter((i) => i.category === filter);
    return limit ? list.slice(0, limit) : list;
  }, [withAlt, filter, limit]);

  const filters: Filter[] = ['all', ...galleryCategories];

  return (
    <div>
      {showFilters && (
        <div role="group" aria-label={t('filterLabel')} className="mb-8 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={clsx(
                'rounded-full border px-4 py-2 text-sm font-medium transition',
                filter === f
                  ? 'border-deep bg-deep text-cream shadow-soft'
                  : 'border-gold/40 bg-white text-deep hover:border-gold hover:bg-gold/10',
              )}
            >
              {t(`filters.${f}`)}
            </button>
          ))}
        </div>
      )}

      {(filter === 'girls' || (showFilters && filter === 'all')) && (
        <p className="mx-auto mb-8 flex max-w-xl items-center justify-center gap-2 rounded-2xl bg-gold/15 px-4 py-3 text-center text-sm text-gold-dark">
          <EyeOff className="h-4 w-4 shrink-0" aria-hidden="true" />
          {t('girlsNote')}
        </p>
      )}

      <AnimatePresence mode="wait">
        <motion.ul
          key={filter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="columns-1 gap-4 sm:columns-2 lg:columns-3"
        >
          {items.map((img, i) => (
            <li key={img.src} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={t('open', { alt: img.alt })}
                className="group relative block w-full overflow-hidden rounded-3xl bg-cream-dark shadow-card"
              >
                {/* TODO: replace placeholder files in /public/images/gallery with real photos */}
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  loading="lazy"
                  className="h-auto w-full transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-deep-900/80 via-transparent to-transparent p-4 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="text-sm font-medium text-cream">{t(`filters.${img.category}`)}</span>
                  <Expand className="h-5 w-5 text-gold-light" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>

      <Lightbox
        images={items}
        index={open}
        onClose={() => setOpen(null)}
        onChange={setOpen}
      />
    </div>
  );
}
