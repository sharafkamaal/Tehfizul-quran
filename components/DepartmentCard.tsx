import Image from 'next/image';
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

const photos: Record<string, string> = {
  hifz: '/images/gallery/classes-2.jpg',
  nazira: '/images/gallery/classes-9.jpg',
  diniyat: '/images/gallery/classes-6.jpg',
  parttime: '/images/gallery/classes-8.jpg',
  arabic: '/images/gallery/classes-1.jpg',
  oratory: '/images/gallery/events-11.jpg',
  tazkiyah: '/images/gallery/events-14.jpg',
};

const scripts = ['en', 'ur', 'ar'] as const;

export function DepartmentCard({ department, variant = 'summary', featured }: Props) {
  const t = useTranslations('departments');
  const { id, icon, names } = department;
  const wide = featured && variant === 'full';
  return (
    <article
      id={variant === 'full' ? id : undefined}
      className={clsx(
        'card group relative flex h-full scroll-mt-32 flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-soft',
        wide && 'md:flex-row',
        featured && 'ring-2 ring-gold/60',
      )}
    >
      {photos[id] && (
        <div className={clsx('relative aspect-[16/10] w-full shrink-0 overflow-hidden', wide && 'md:aspect-auto md:w-[42%]')}>
          <Image
            src={photos[id]}
            alt=""
            fill
            sizes={wide ? '(min-width: 768px) 42vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
          {featured && (
            <span className="absolute end-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-deep-900 shadow-gold">{t('central')}</span>
          )}
        </div>
      )}
      <div className="relative flex flex-1 flex-col p-6 md:p-8">
      <div className="bg-pattern pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full opacity-20 transition group-hover:opacity-40" aria-hidden="true" />
      <div className={clsx("-mt-14 flex items-start justify-between gap-4 md:-mt-16", wide && "md:mt-0")}>
        <span className="arch relative flex h-16 w-14 shrink-0 items-center justify-center bg-deep text-gold-light shadow-soft ring-4 ring-white">
          <Icon name={icon} className="h-7 w-7" />
        </span>
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
      </div>
    </article>
  );
}
