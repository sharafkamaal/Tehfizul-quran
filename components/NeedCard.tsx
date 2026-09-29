import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { Need } from '@/lib/site';
import { formatINR, percent } from '@/lib/format';
import { Icon } from './ui/Icon';
import { ProgressBar } from './ProgressBar';

/**
 * Goal / raised amounts come from content/site.json → needs.
 * Update `raised` there as donations come in.
 */
export function NeedCard({ need, index }: { need: Need; index: number }) {
  const t = useTranslations();
  const pct = percent(need.raised, need.goal);
  const title = t(`donate.needs.items.${need.id}.title`);
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden">
      <div className="relative flex items-center gap-4 bg-deep px-6 py-5 text-cream">
        <div className="bg-pattern absolute inset-0 opacity-10" aria-hidden="true" />
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold text-deep-900">
          <Icon name={need.icon} className="h-6 w-6" strokeWidth={1.8} />
        </span>
        <div className="relative min-w-0">
          <p className="font-latin text-xs text-gold-light" dir="ltr">
            #{String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="text-lg font-bold leading-snug">{title}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex-1 text-sm text-ink-muted">{t(`donate.needs.items.${need.id}.description`)}</p>

        <div className="mt-6">
          <div className="mb-2 flex items-end justify-between gap-2">
            <div>
              <p className="text-xs text-ink-muted">{t('common.goal')}</p>
              <p className="font-latin text-2xl font-bold text-deep" dir="ltr">
                {formatINR(need.goal)}
              </p>
            </div>
            <p className="text-sm font-semibold text-primary-700">{t('common.funded', { percent: pct })}</p>
          </div>
          <ProgressBar value={pct} label={`${title}: ${t('common.funded', { percent: pct })}`} />
          <p className="mt-2 text-xs text-ink-muted">
            {t('common.raised')}: <span dir="ltr" className="font-latin font-semibold text-ink">{formatINR(need.raised)}</span>
          </p>
        </div>

        <Link href={`/donate#bank`} className="btn-green mt-6 w-full">
          {t('common.contribute')}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
