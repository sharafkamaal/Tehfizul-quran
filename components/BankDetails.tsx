import Image from 'next/image';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { Landmark } from 'lucide-react';
import { site } from '@/lib/site';
import { CopyButton } from './ui/CopyButton';
import { Ornament } from './ui/Ornament';

/** Bank account card with copy-to-clipboard buttons and the UPI QR code. */
export function BankDetails({ showQr = true, className }: { showQr?: boolean; className?: string }) {
  const t = useTranslations('donate.bank');
  const { bank } = site;

  const rows: { label: string; value: string; copy?: boolean }[] = [
    { label: t('accountName'), value: bank.accountName, copy: true },
    { label: t('accountNumber'), value: bank.accountNumber, copy: true },
    { label: t('bank'), value: `${bank.bankName}, ${bank.branch}` },
    // TODO: add the IFSC code in content/site.json → bank.ifsc
    { label: t('ifsc'), value: bank.ifsc, copy: true },
  ];
  if (bank.upiId) rows.push({ label: t('upi'), value: bank.upiId, copy: true });

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-[2rem] border border-gold/40 bg-white p-6 shadow-soft md:p-8',
        className,
      )}
    >
      <div className="bg-pattern pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true" />
      <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-deep text-gold-light">
              <Landmark className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-lg font-bold text-deep">{t('title')}</p>
          </div>
          <Ornament className="-ms-12 mt-2" />
          <dl className="mt-4 divide-y divide-gold/20">
            {rows.map((r) => (
              <div key={r.label} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3">
                <dt className="text-sm text-ink-muted">{r.label}</dt>
                <dd className="flex items-center gap-3">
                  {r.value ? (
                    <>
                      <span dir="ltr" className="font-latin font-semibold text-ink">
                        {r.value}
                      </span>
                      {r.copy && <CopyButton value={r.value} label={r.label} />}
                    </>
                  ) : (
                    <span className="text-sm italic text-ink-muted">{t('pending')}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-ink-muted">{t('chequeNote')}</p>
        </div>

        {showQr && (
          <figure className="mx-auto flex w-48 flex-col items-center text-center">
            <div className="rounded-3xl border-2 border-gold/50 bg-white p-3">
              {/* TODO: replace /public/images/upi-qr-placeholder.png with the real UPI QR code */}
              <Image src={bank.upiQr} alt={t('scan')} width={176} height={176} className="h-40 w-40" />
            </div>
            <figcaption className="mt-3 text-xs text-ink-muted">{t('scan')}</figcaption>
          </figure>
        )}
      </div>
    </div>
  );
}
