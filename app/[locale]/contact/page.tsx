import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { MapEmbed } from '@/components/MapEmbed';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { WhatsAppIcon } from '@/components/ui/Icon';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return buildMetadata(locale, 'contact');
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations();

  return (
    <>
      <PageHero title={t('contact.hero.title')} subtitle={t('contact.hero.subtitle')} />

      <section className="py-20 md:py-28">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="grid content-start gap-6">
            <Reveal className="card p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-deep">
                <Phone className="h-5 w-5 text-gold-dark" aria-hidden="true" />
                {t('contact.callTitle')}
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {/* TODO: confirm the second number from the brochure in content/site.json → phones */}
                {site.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="btn-green">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span dir="ltr" className="font-latin">{p.number}</span>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal className="card p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-deep">
                <WhatsAppIcon className="h-5 w-5 text-[#1DA851]" />
                {t('contact.whatsappTitle')}
              </h2>
              <p className="mt-2 text-sm text-ink-muted">{t('contact.whatsappText')}</p>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-4 !bg-[#1DA851] text-white hover:!bg-[#178a43]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t('common.chatOnWhatsapp')}
              </a>
            </Reveal>

            <Reveal className="card p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-deep">
                <MapPin className="h-5 w-5 text-gold-dark" aria-hidden="true" />
                {t('contact.addressTitle')}
              </h2>
              <address className="mt-3 not-italic text-ink/90">
                {t('address.line1')}
                <br />
                {t('address.line2')}
                <br />
                {t('address.line3')}
              </address>
              <a href={site.map.linkUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:underline">
                {t('contact.openMap')}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </Reveal>

            <Reveal className="card p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-deep">
                <Mail className="h-5 w-5 text-gold-dark" aria-hidden="true" />
                {t('contact.emailTitle')}
              </h2>
              {/* TODO: replace the placeholder e-mail in content/site.json */}
              <a href={`mailto:${site.email}`} dir="ltr" className="mt-2 inline-block break-all text-primary-700 hover:underline">
                {site.email}
              </a>
            </Reveal>
          </div>

          <Reveal className="card p-6 md:p-10">
            <h2 className="text-2xl font-bold text-deep">{t('contact.formTitle')}</h2>
            <p className="mb-8 mt-2 text-ink-muted">{t('contact.visitText')}</p>
            <EnquiryForm kind="contact" />
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container">
          <MapEmbed title={t('contact.mapTitle')} className="h-[420px]" />
        </div>
      </section>
    </>
  );
}
