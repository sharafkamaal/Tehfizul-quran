import clsx from 'clsx';
import { site } from '@/lib/site';

export function MapEmbed({ title, className }: { title: string; className?: string }) {
  return (
    <div className={clsx('overflow-hidden rounded-3xl border border-gold/30 bg-cream-dark', className)}>
      <iframe
        title={title}
        src={site.map.embedUrl}
        className="h-full min-h-[240px] w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
