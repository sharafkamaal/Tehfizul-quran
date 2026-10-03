import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';
import { Reveal } from '../Reveal';

const picks = [0, 6, 7, 12] as const;

/** Photo strip: swipeable on phones, 4 columns on laptops. Links to the Ulama page. */
export function UlamaStrip() {
  const t = useTranslations('ulama');
  return (
    <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
      {picks.map((idx, i) => {
        const p = site.ulama[idx];
        if (!p) return null;
        return (
          <Reveal as="li" key={p.src} delay={i * 0.07} className="w-[78%] shrink-0 snap-center sm:w-auto">
            <Link href="/ulama" className="group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-card">
              <Image
                src={p.src}
                alt={t('imageAlt', { n: idx + 1 })}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 78vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />
              <span className="absolute inset-x-3 bottom-3 h-0.5 ltr:origin-left rtl:origin-right scale-x-0 rounded-full bg-gold transition duration-500 group-hover:scale-x-100" aria-hidden="true" />
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
