'use client';

import clsx from 'clsx';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastState {
  type: 'success' | 'error';
  message: string;
}

export function Toast({ toast, onClose, closeLabel }: { toast: ToastState | null; onClose: () => void; closeLabel: string }) {
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(onClose, 7000);
    return () => clearTimeout(id);
  }, [toast, onClose]);

  return (
    <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 md:bottom-8">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            className={clsx(
              'pointer-events-auto flex max-w-md items-start gap-3 rounded-2xl border px-5 py-4 shadow-soft',
              toast.type === 'success' ? 'border-primary/30 bg-white text-deep' : 'border-red-300 bg-red-50 text-red-900',
            )}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
            ) : (
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-700" aria-hidden="true" />
            )}
            <p className="text-sm">{toast.message}</p>
            <button type="button" onClick={onClose} aria-label={closeLabel} className="ms-2 rounded-full p-1 hover:bg-black/5">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
