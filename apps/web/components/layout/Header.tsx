'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import MobileNav from './MobileNav';

const NAV_LINKS = [
  { href: '/collections', label: 'Collections' },
  { href: '/build/necklace', label: 'Bespoke' },
  { href: '/craftsmanship', label: 'Craftsmanship' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-default',
          isScrolled
            ? 'bg-cream/95 backdrop-blur-md border-b border-stone/20'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[var(--header-height)] lg:h-[var(--header-height)]">
            {/* Mobile: Hamburger + Logo */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileNavOpen(true)}
                className="p-2 -ml-2 text-aubergine"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>

            {/* Desktop: Left Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-label uppercase tracking-widest transition-colors duration-300',
                    pathname?.startsWith(link.href)
                      ? 'text-terracotta'
                      : 'text-bronze hover:text-aubergine'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo — centered on all breakpoints */}
            <Link
              href="/"
              className={cn(
                'absolute left-1/2 -translate-x-1/2 flex items-center',
                'lg:static lg:translate-x-0'
              )}
            >
              <svg
                viewBox="0 0 180 60"
                className="h-10 lg:h-12 w-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Arc text: APRILIHA SINGH */}
                <defs>
                  <path
                    id="arc"
                    d="M 20,50 A 50,50 0 0,1 160,50"
                    fill="none"
                  />
                </defs>
                <text
                  fill="#2E1B24"
                  fontSize="9"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="3"
                >
                  <textPath href="#arc" startOffset="50%" textAnchor="middle">
                    APRILIHA SINGH
                  </textPath>
                </text>
                {/* AS Monogram */}
                <text
                  x="90"
                  y="48"
                  textAnchor="middle"
                  fill="#2E1B24"
                  fontSize="22"
                  fontFamily="Georgia, serif"
                  fontWeight="normal"
                >
                  AS
                </text>
              </svg>
            </Link>

            {/* Desktop: Right Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-label uppercase tracking-widest transition-colors duration-300',
                    pathname?.startsWith(link.href)
                      ? 'text-terracotta'
                      : 'text-bronze hover:text-aubergine'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/search"
                className="p-2 text-aubergine hover:text-terracotta transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </Link>
              <Link
                href="/account"
                className="p-2 text-aubergine hover:text-terracotta transition-colors hidden sm:block"
                aria-label="Account"
              >
                <User size={20} />
              </Link>
              <Link
                href="/cart"
                className="p-2 text-aubergine hover:text-terracotta transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-terracotta text-sand-light text-[9px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* Spacer for fixed header */}
      <div className="h-[var(--mobile-header-height)] lg:h-[var(--header-height)]" />
    </>
  );
}
