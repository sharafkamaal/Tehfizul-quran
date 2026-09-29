import clsx from 'clsx';
import { Ornament } from './ui/Ornament';
import { Reveal } from './Reveal';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'start';
  tone?: 'dark' | 'light';
  as?: 'h1' | 'h2';
  className?: string;
}

/** Section heading with a small eyebrow, the title and a gold ornament. */
export function SectionTitle({ eyebrow, title, subtitle, align = 'center', tone = 'dark', as: Tag = 'h2', className }: Props) {
  const light = tone === 'light';
  return (
    <Reveal
      className={clsx(
        'mb-10 flex flex-col gap-3 md:mb-14',
        align === 'center' ? 'items-center text-center' : 'items-start text-start',
        className,
      )}
    >
      {eyebrow && <p className={clsx('eyebrow', light && '!text-gold-light')}>{eyebrow}</p>}
      <Tag
        className={clsx(
          'max-w-3xl text-balance text-3xl font-bold md:text-4xl',
          light ? 'text-cream' : 'text-deep',
        )}
      >
        {title}
      </Tag>
      <Ornament tone={light ? 'light' : 'gold'} className={align === 'start' ? '-ms-12' : undefined} />
      {subtitle && (
        <p className={clsx('max-w-2xl text-pretty text-base md:text-lg', light ? 'text-cream/85' : 'text-ink-muted')}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
