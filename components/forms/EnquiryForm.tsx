'use client';

import clsx from 'clsx';
import { useCallback, useId, useState, type FormEvent } from 'react';
import { Loader2, Send } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { admissionSchema, contactSchema } from '@/lib/validation';
import { site } from '@/lib/site';
import type { Locale } from '@/i18n/routing';
import { Toast, type ToastState } from './Toast';

type Kind = 'contact' | 'admission';

interface FieldDef {
  name: string;
  type?: 'text' | 'tel' | 'email' | 'textarea' | 'select';
  required?: boolean;
  autoComplete?: string;
  full?: boolean;
}

const fields: Record<Kind, FieldDef[]> = {
  contact: [
    { name: 'name', required: true, autoComplete: 'name' },
    { name: 'phone', type: 'tel', required: true, autoComplete: 'tel' },
    { name: 'email', type: 'email', autoComplete: 'email' },
    { name: 'subject', required: true },
    { name: 'message', type: 'textarea', required: true, full: true },
  ],
  admission: [
    { name: 'studentName', required: true },
    { name: 'parentName', required: true, autoComplete: 'name' },
    { name: 'phone', type: 'tel', required: true, autoComplete: 'tel' },
    { name: 'department', type: 'select', required: true },
    { name: 'message', type: 'textarea', full: true },
  ],
};

/** Contact form and admission enquiry form – both post to /api/contact. */
export function EnquiryForm({ kind }: { kind: Kind }) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const formId = useId();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form).entries()), type: kind } as Record<string, string>;
    const schema = kind === 'contact' ? contactSchema : admissionSchema;
    const result = schema.safeParse(data);

    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      // Move focus to the first invalid field
      const first = fields[kind].find((f) => next[f.name]);
      if (first) form.querySelector<HTMLElement>(`[name="${first.name}"]`)?.focus();
      return;
    }

    setErrors({});
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setToast({ type: 'success', message: t('form.success') });
    } catch {
      setToast({ type: 'error', message: t('form.error') });
    } finally {
      setSending(false);
    }
  }

  const errorText = (name: string) => {
    const key = errors[name];
    if (!key) return null;
    return t.has(`form.errors.${key}`) ? t(`form.errors.${key}`) : t('form.errors.required');
  };

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
        {fields[kind].map((f) => {
          const id = `${formId}-${f.name}`;
          const err = errorText(f.name);
          const errId = `${id}-error`;
          const common = {
            id,
            name: f.name,
            required: f.required,
            autoComplete: f.autoComplete,
            'aria-invalid': err ? true : undefined,
            'aria-describedby': err ? errId : undefined,
            className: 'field',
          };
          return (
            <div key={f.name} className={clsx(f.full && 'sm:col-span-2')}>
              <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-deep">
                {t(`form.${f.name}`)}
                {f.required ? (
                  <span className="text-red-700" aria-hidden="true">
                    {' '}*
                  </span>
                ) : (
                  <span className="text-xs font-normal text-ink-muted"> ({t('form.optional')})</span>
                )}
              </label>
              {f.type === 'textarea' ? (
                <textarea {...common} rows={5} />
              ) : f.type === 'select' ? (
                <select {...common} defaultValue="">
                  <option value="" disabled>
                    {t('form.selectDepartment')}
                  </option>
                  {site.departments.map((d) => (
                    <option key={d.id} value={d.names.en}>
                      {d.names[locale]}
                    </option>
                  ))}
                </select>
              ) : (
                <input {...common} type={f.type ?? 'text'} dir={f.type === 'tel' || f.type === 'email' ? 'ltr' : undefined} />
              )}
              {err && (
                <p id={errId} className="mt-1.5 text-sm text-red-700">
                  {err}
                </p>
              )}
            </div>
          );
        })}

        {/* Honeypot: hidden from people, tempting for bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="sm:col-span-2">
          <button type="submit" disabled={sending} className="btn-green w-full sm:w-auto">
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
            )}
            {sending ? t('form.sending') : kind === 'contact' ? t('form.submit') : t('form.submitEnquiry')}
          </button>
        </div>
      </form>
      <Toast toast={toast} onClose={closeToast} closeLabel={t('form.dismiss')} />
    </>
  );
}
