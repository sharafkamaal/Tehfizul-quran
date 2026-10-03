'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Expand, Newspaper } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Photo } from '@/lib/site';
import { Reveal } from '../Reveal';
import { Lightbox } from './Lightbox';

interface Props {
  photos: Photo[];
  /** "album" = masonry of photos, "press" = newspaper clippings carousel/grid */
  variant: 'album' | 'press';
  limit?: number;
}

export function UlamaGallery({ photos, variant, limit }: Props) {
  const t = useTranslations('ulama');
  const [open, setOpen] = useState<number | null>(null);
  const list = limit ? photos.slice(0, limit) : photos;
  const items = useMemo(
    () => list.map((p, i) => ({ ...p, alt: t(variant === 'album' ? 'imageAlt' : 'clippingAlt', { n: i + 1 }) })),
    [list, t, variant],
  );

  return (
    <>
      {variant === 'album' ? (
        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((img, i) => (
            <Reveal as="li" key={img.src} delay={(i % 3) * 0.06} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={img.alt}
                className="group relative block w-full overflow-hidden rounded-3xl bg-cream-dark shadow-card"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  loading="lazy"
                  className="h-auto w-full transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="h-5 w-5 text-gold-light" aria-hidden="true" />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      ) : (
        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {items.map((img, i) => (
            <li key={img.src} className="w-[78%] shrink-0 snap-center sm:w-auto">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={img.alt}
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-gold/40 transition duration-300 hover:-translate-y-1 hover:shadow-gold"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 78vw"
                  className="object-cover object-top"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-deep-900/90 to-transparent px-3 pb-3 pt-10 text-sm font-medium text-cream">
                  <Newspaper className="h-4 w-4 text-gold-light" aria-hidden="true" />
                  {t('tapToRead')}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <Lightbox images={items} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </>
  );
}
