import { useTranslations } from 'next-intl';
import { Phone, HeartHandshake } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { site } from '@/lib/site';
import { WhatsAppIcon } from '../ui/Icon';

/** Floating WhatsApp button + sticky Call / Donate bar on small screens. */
export function FloatingActions() {
  const t = useTranslations();
  const phone = site.phones[0];
  return (
    <>
      <a
        href={site.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('common.chatOnWhatsapp')}
        className="fixed bottom-[4.5rem] end-3 z-40 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-2 ring-white/70 md:ring-4 transition hover:scale-105 md:bottom-6 md:end-6"
      >
        <WhatsAppIcon className="h-6 w-6 md:h-7 md:w-7" />
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 motion-reduce:hidden" />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-gold/30 bg-deep-900/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        {phone && (
          <a
            href={`tel:${phone.tel}`}
            className="flex h-14 items-center justify-center gap-2 text-sm font-semibold text-cream"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {t('mobileBar.call')}
          </a>
        )}
        <Link
          href="/donate"
          className="flex h-14 items-center justify-center gap-2 bg-gold text-sm font-semibold text-deep-900"
        >
          <HeartHandshake className="h-4 w-4" aria-hidden="true" />
          {t('mobileBar.donate')}
        </Link>
      </div>
    </>
  );
}
