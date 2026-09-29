'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Play, Clapperboard } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { site } from '@/lib/site';

/**
 * "Lite" YouTube embeds: only a thumbnail is loaded until the visitor clicks play,
 * which keeps the page fast. Add video IDs in content/site.json → videos.
 */
export function VideoGrid() {
  const t = useTranslations('gallery.videos');
  const titles = t.raw('titles') as string[];
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {site.videos.map((id, i) => {
        const title = titles[i] ?? '';
        return (
          <li key={`${id}-${i}`} className="card overflow-hidden">
            <div className="relative aspect-video bg-deep">
              {!id ? (
                <div className="bg-pattern flex h-full flex-col items-center justify-center gap-2 text-cream/80">
                  <Clapperboard className="h-8 w-8 text-gold-light" aria-hidden="true" />
                  <span className="text-sm">{t('comingSoon')}</span>
                </div>
              ) : playing === id ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(id)}
                  aria-label={t('play', { title })}
                  className="group absolute inset-0"
                >
                  <Image
                    src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute inset-0 bg-deep-900/30 transition group-hover:bg-deep-900/10" />
                  <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-deep-900 shadow-gold transition group-hover:scale-110">
                    <Play className="h-7 w-7 translate-x-0.5" aria-hidden="true" />
                  </span>
                </button>
              )}
            </div>
            <p className="p-4 font-medium text-deep">{title}</p>
          </li>
        );
      })}
    </ul>
  );
}
