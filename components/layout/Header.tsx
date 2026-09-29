'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, HeartHandshake } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { navItems } from '@/lib/nav';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation and with Escape
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 border-b transition-all duration-300',
        scrolled ? 'border-gold/20 bg-cream/90 shadow-card backdrop-blur-md' : 'border-transparent bg-cream',
      )}
    >
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-3 rounded-xl" aria-label={t('nav.home')}>
          <Image
            src="/images/logo.png"
            alt={t('common.logoAlt')}
            width={64}
            height={57}
            priority
            className="h-12 w-auto shrink-0 md:h-14"
          />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-base font-bold leading-tight text-deep md:text-lg">
              {t('common.shortName')}
            </span>
            <span className="truncate text-xs leading-tight text-gold-dark md:text-sm">{t('common.subName')}</span>
          </span>
        </Link>

        <nav aria-label={t('common.mainNav')} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={clsx(
                    'relative rounded-full px-3 py-2 text-sm font-medium transition',
                    isActive(item.href) ? 'text-deep' : 'text-ink/80 hover:text-deep',
                  )}
                >
                  {t(`nav.${item.key}`)}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher className="hidden sm:block" />
          <Link href="/donate" className="btn-gold hidden !px-5 !py-2.5 md:inline-flex">
            <HeartHandshake className="h-4 w-4" aria-hidden="true" />
            {t('common.donateNow')}
          </Link>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('common.closeMenu') : t('common.openMenu')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-deep xl:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-gold/20 bg-cream xl:hidden"
          >
            <nav aria-label={t('common.mainNav')} className="container max-h-[calc(100dvh-8rem)] overflow-y-auto py-4">
              <ul className="grid gap-1">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={clsx(
                        'block rounded-2xl px-4 py-3 text-base font-medium',
                        isActive(item.href) ? 'bg-deep text-cream' : 'text-deep hover:bg-gold/15',
                      )}
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gold/20 pt-4">
                <LanguageSwitcher />
                <Link href="/donate" className="btn-gold">
                  {t('common.donateNow')}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
