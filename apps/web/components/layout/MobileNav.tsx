'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, User, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/collections', label: 'Collections' },
  { href: '/build/necklace', label: 'Bespoke' },
  { href: '/craftsmanship', label: 'Craftsmanship' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 200 }}
            className="fixed inset-0 z-50 bg-aubergine/40"
            onClick={onClose}
          />
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 300, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 bottom-0 z-50 w-[300px] bg-cream"
          >
            <div className="flex items-center justify-between px-6 h-[var(--mobile-header-height)] border-b border-stone/20">
              <span className="text-label uppercase tracking-widest text-bronze">Menu</span>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-aubergine"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="px-6 py-8">
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      'font-serif text-headline transition-colors duration-300',
                      pathname?.startsWith(link.href)
                        ? 'text-terracotta'
                        : 'text-aubergine hover:text-terracotta'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-12 pt-8 border-t border-stone/20 flex flex-col gap-4">
                <Link
                  href="/search"
                  onClick={onClose}
                  className="flex items-center gap-3 text-bronze hover:text-aubergine transition-colors"
                >
                  <Search size={18} />
                  <span className="text-body">Search</span>
                </Link>
                <Link
                  href="/account"
                  onClick={onClose}
                  className="flex items-center gap-3 text-bronze hover:text-aubergine transition-colors"
                >
                  <User size={18} />
                  <span className="text-body">Account</span>
                </Link>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex items-center gap-3 text-bronze hover:text-aubergine transition-colors"
                >
                  <ShoppingBag size={18} />
                  <span className="text-body">Cart</span>
                </Link>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
