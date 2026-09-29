import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Ornament } from '@/components/ui/Ornament';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-7xl font-bold text-gold">404</p>
      <h1 className="mt-4 text-3xl font-bold text-deep">{t('title')}</h1>
      <Ornament className="my-4" />
      <p className="max-w-md text-ink-muted">{t('text')}</p>
      <Link href="/" className="btn-green mt-8">
        {t('home')}
      </Link>
    </section>
  );
}
