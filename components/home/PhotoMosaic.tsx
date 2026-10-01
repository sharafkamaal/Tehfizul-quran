import Image from 'next/image';
import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Reveal } from '../Reveal';

const tiles = [
  { src: '/images/gallery/dastarbandi-16.jpg', category: 'dastarbandi', cls: 'col-span-2 row-span-2' },
  { src: '/images/gallery/classes-2.jpg', category: 'classes', cls: '' },
  { src: '/images/gallery/events-1.jpg', category: 'events', cls: '' },
  { src: '/images/gallery/dastarbandi-9.jpg', category: 'dastarbandi', cls: 'row-span-2' },
  { src: '/images/gallery/campus-5.jpg', category: 'campus', cls: 'col-span-2' },
  { src: '/images/gallery/events-22.jpg', category: 'events', cls: 'col-span-2 md:col-span-1' },
] as const;

/** Bento-style photo mosaic linking to the full gallery. */
export function PhotoMosaic() {
  const t = useTranslations('gallery');
  return (
    <ul className="grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[13rem]">
      {tiles.map((tile, i) => (
        <Reveal as="li" key={tile.src} delay={i * 0.06} className={clsx('relative overflow-hidden rounded-3xl shadow-card', tile.cls)}>
          <Link href="/gallery" className="group absolute inset-0 block">
            <Image
              src={tile.src}
              alt={t('imageAlt', { category: t(`filters.${tile.category}`), n: i + 1 })}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-deep-900/80 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" aria-hidden="true" />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-sm font-medium text-cream">
              {t(`filters.${tile.category}`)}
              <ArrowUpRight className="h-5 w-5 text-gold-light transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" aria-hidden="true" />
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
