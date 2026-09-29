import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { enquirySchema, type EnquiryInput } from '@/lib/validation';

// Very small in-memory rate limit (per server instance) to slow down spam.
const hits = new Map<string, { count: number; reset: number }>();
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function toEmail(data: EnquiryInput) {
  const rows: [string, string][] =
    data.type === 'contact'
      ? [
          ['Name', data.name],
          ['Phone', data.phone],
          ['E-mail', data.email || '—'],
          ['Subject', data.subject],
          ['Message', data.message],
        ]
      : [
          ['Student name', data.studentName],
          ['Parent / guardian', data.parentName],
          ['Phone', data.phone],
          ['Department', data.department],
          ['Message', data.message || '—'],
        ];
  const subject =
    data.type === 'contact' ? `Website message: ${data.subject}` : `Admission enquiry: ${data.studentName}`;
  const html = `<h2>${escape(subject)}</h2><table cellpadding="6" style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="vertical-align:top">${escape(k)}</th><td style="white-space:pre-wrap">${escape(v)}</td></tr>`,
    )
    .join('')}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  return { subject, html, text };
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }
  // Honeypot filled in → silently accept and drop
  if (parsed.data.company) return NextResponse.json({ ok: true });

  const { subject, html, text } = toEmail(parsed.data);
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || 'Madrasa Website <onboarding@resend.dev>';

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[contact] Email not configured – submission logged instead:\n' + text);
      return NextResponse.json({ ok: true, delivered: false });
    }
    console.error('[contact] RESEND_API_KEY / CONTACT_TO_EMAIL are not set');
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const replyTo = parsed.data.type === 'contact' && parsed.data.email ? parsed.data.email : undefined;
    const { error } = await resend.emails.send({ from, to, subject, html, text, replyTo });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[contact] send failed', err);
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }
}
