import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';
import { Star8 } from '../ui/Ornament';

const order = ['en', 'ur', 'ar'] as const;

/** Scrolling "Donate Now" ribbon, always showing all three languages. */
export function TopTicker() {
  const t = useTranslations('common');
  const items = [...order, ...order, ...order];
  const Track = ({ hidden }: { hidden?: boolean }) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((l, i) => (
        <span key={`${l}-${i}`} className="flex items-center">
          <span lang={l} dir={l === 'en' ? 'ltr' : 'rtl'} className={`script-${l} whitespace-nowrap px-6 text-sm`}>
            {site.ticker[l]}
          </span>
          <Star8 className="h-3 w-3 text-gold" />
        </span>
      ))}
    </div>
  );

  return (
    <Link
      href="/donate"
      className="group relative block overflow-hidden bg-deep-900 text-cream focus-visible:ring-inset"
      aria-label={`${site.ticker.en} – ${t('donateNow')}`}
    >
      {/* The track is always laid out LTR so the loop is seamless in every language */}
      <div dir="ltr" className="flex h-9 w-max animate-ticker items-center group-hover:[animation-play-state:paused]">
        <Track />
        <Track hidden />
      </div>
    </Link>
  );
}
