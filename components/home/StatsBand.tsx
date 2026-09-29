import { useTranslations } from 'next-intl';
import { site } from '@/lib/site';
import { StatCounter } from '../StatCounter';
import { Star8 } from '../ui/Ornament';

export function StatsBand() {
  const t = useTranslations('stats');
  return (
    <section aria-labelledby="stats-title" className="relative z-10 -mt-14 px-4 md:-mt-20">
      <div className="container relative overflow-hidden rounded-[2rem] bg-deep px-6 py-10 shadow-soft ring-1 ring-gold/30 md:px-10 md:py-12">
        <div className="bg-pattern absolute inset-0 opacity-10" aria-hidden="true" />
        <div className="relative">
          <p className="flex items-center justify-center gap-2 text-center text-sm font-medium text-gold-light">
            <Star8 className="h-3 w-3" /> {t('eyebrow')} <Star8 className="h-3 w-3" />
          </p>
          <h2 id="stats-title" className="sr-only">
            {t('title')}
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
            {site.stats.map((s) => (
              <li key={s.id} className="last:col-span-2 md:last:col-span-1">
                <StatCounter
                  value={s.value}
                  suffix={s.suffix}
                  plain={s.plain}
                  text={t('thousands')}
                  label={t(`items.${s.id}`)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
