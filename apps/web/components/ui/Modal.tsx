'use client';

import { type ReactNode, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
}

export default function Modal({ isOpen, onClose, children, title, className }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 200 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-aubergine/60"
          onClick={(e) => e.target === overlayRef.current && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 300, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'bg-cream w-full max-w-lg max-h-[80vh] overflow-y-auto',
              className
            )}
          >
            <div className="flex items-center justify-between p-6 border-b border-stone/30">
              {title && (
                <h2 className="font-serif text-subhead text-aubergine">{title}</h2>
              )}
              <button
                onClick={onClose}
                className="p-2 text-bronze hover:text-aubergine transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
