import Link from 'next/link';
import { fontVariables } from '@/lib/fonts';

// Fallback for URLs outside any locale (rare – the middleware normally adds /en).
export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body className="flex min-h-screen items-center justify-center bg-cream p-6 text-center">
        <div>
          <h1 className="text-3xl font-bold text-deep">Page not found</h1>
          <p className="mt-3 text-ink-muted">The page you are looking for does not exist.</p>
          <Link href="/en" className="btn-green mt-6">
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
