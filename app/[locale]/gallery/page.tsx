import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/PageHero';
import { SectionTitle } from '@/components/SectionTitle';
import { Gallery } from '@/components/gallery/Gallery';
import { VideoGrid } from '@/components/gallery/VideoGrid';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata(locale, 'gallery');
}

export default function GalleryPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('gallery');
  return (
    <>
      <PageHero title={t('hero.title')} subtitle={t('hero.subtitle')} />
      <section className="py-16 md:py-24">
        <div className="container">
          <Gallery />
        </div>
      </section>
      <section className="bg-white py-20 md:py-28">
        <div className="container">
          <SectionTitle eyebrow={t('videos.eyebrow')} title={t('videos.title')} subtitle={t('videos.subtitle')} />
          <VideoGrid />
        </div>
      </section>
    </>
  );
}
