'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { navItems, socialLinks } from '@/lib/data';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useCart } from '@/hooks/useCart';

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

const popularSearches = ['Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Bespoke'];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount } = useCart();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen, isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-nav transition-all duration-300',
          isScrolled
            ? 'bg-bg-primary border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
            : 'bg-bg-primary'
        )}
        role="banner"
      >
        <nav className="nav-container" aria-label="Main navigation">
          <div className="flex items-center gap-10">
            <Link href="/" className="font-display text-h3 text-gold-gradient leading-none" aria-label="Apriliha Singh - Home">
              AS
            </Link>
            <div className="hidden lg:flex items-center gap-7">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-ui text-caption text-text-primary/70 hover:text-text-primary transition-colors duration-200 underline-gold"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-text-primary/60 hover:text-text-primary transition-colors duration-200"
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            <Link
              href="/account/orders"
              className="hidden md:flex p-2.5 text-text-primary/60 hover:text-text-primary transition-colors duration-200"
              aria-label="Account"
            >
              <UserIcon />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-text-primary/60 hover:text-text-primary transition-colors duration-200"
              aria-label={`Cart (${itemCount} items)`}
            >
              <BagIcon />
              {itemCount > 0 && (
                <span className="absolute top-1 right-0.5 min-w-[16px] h-4 px-1 bg-text-primary text-text-inverse rounded-full flex items-center justify-center font-ui text-[9px] font-medium leading-none">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            <Link
              href="/appointment"
              className="hidden lg:inline-flex font-ui text-caption font-medium text-text-primary/60 hover:text-text-primary px-3 py-2 transition-colors duration-200"
            >
              Book
            </Link>

            <button
              className="lg:hidden p-2.5 text-text-primary/60 hover:text-text-primary transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </header>

      {/* Search Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-modal bg-bg-primary transition-all duration-300',
          isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="nav-container">
          <div className="flex items-center justify-between min-h-[60px]">
            <Link href="/" className="font-display text-h3 text-gold-gradient leading-none" aria-label="Apriliha Singh - Home">
              AS
            </Link>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2.5 text-text-primary/60 hover:text-text-primary transition-colors duration-200"
              aria-label="Close search"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="px-responsive max-w-[640px] mx-auto mt-16">
          <div className="relative">
            <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-text-primary/30" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search jewelry..."
              className="w-full pl-8 pr-4 py-4 bg-transparent border-b-2 border-text-primary/20 font-display text-h3 text-text-primary placeholder:text-text-primary/20 focus:outline-none focus:border-text-primary transition-colors duration-200"
            />
          </div>
          <div className="mt-10">
            <p className="font-ui text-micro text-text-primary/40 mb-4">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  className="px-4 py-2 border border-border rounded-full font-ui text-caption text-text-primary/60 hover:border-text-primary hover:text-text-primary transition-all duration-200"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-[calc(var(--z-nav)-1)] bg-bg-primary transition-all duration-300',
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-display text-h2 text-text-primary hover:text-accent-primary transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/appointment"
            className="btn-outline mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book Appointment
          </Link>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-5">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              className="text-text-primary/20 hover:text-accent-primary transition-colors duration-200"
              aria-label={link.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.platform === 'instagram' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              )}
              {link.platform === 'pinterest' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 3.01 8.17 7.11 9.5.5.09.68-.22.68-.48l-.01-1.69c-2.39.5-3.12-1.13-3.12-2.2 0-1.81 1.22-2.9 22-2.9" />
                </svg>
              )}
              {link.platform === 'email' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              )}
              {link.platform === 'whatsapp' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
