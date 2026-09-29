import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import type { Department } from '@/lib/site';
import { Icon } from './ui/Icon';

interface Props {
  department: Department;
  /** "summary" for previews, "full" for the departments page */
  variant?: 'summary' | 'full';
  featured?: boolean;
}

const scripts = ['en', 'ur', 'ar'] as const;

export function DepartmentCard({ department, variant = 'summary', featured }: Props) {
  const t = useTranslations('departments');
  const { id, icon, names } = department;
  return (
    <article
      id={variant === 'full' ? id : undefined}
      className={clsx(
        'card group relative flex h-full scroll-mt-32 flex-col overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:shadow-soft md:p-8',
        featured && 'ring-2 ring-gold/60',
      )}
    >
      <div className="bg-pattern pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full opacity-20 transition group-hover:opacity-40" aria-hidden="true" />
      <div className="flex items-start justify-between gap-4">
        <span className="arch relative flex h-16 w-14 shrink-0 items-center justify-center bg-deep text-gold-light shadow-soft">
          <Icon name={icon} className="h-7 w-7" />
        </span>
        {featured && (
          <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold-dark">{t('central')}</span>
        )}
      </div>

      <h3 className="mt-5 text-xl font-bold text-deep">{t(`items.${id}.title`)}</h3>
      {/* Title in all three languages */}
      <p className="mt-1 flex flex-wrap items-baseline gap-x-3 text-sm text-gold-dark">
        {scripts.map((s) => (
          <span key={s} lang={s} dir={s === 'en' ? 'ltr' : 'rtl'} className={`script-${s}`}>
            {names[s]}
          </span>
        ))}
      </p>

      <p className="mt-4 flex-1 text-ink-muted">
        {variant === 'full' ? t(`items.${id}.description`) : t(`items.${id}.summary`)}
      </p>
    </article>
  );
}
