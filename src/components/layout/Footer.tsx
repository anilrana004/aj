'use client';

import Link from 'next/link';
import { useState } from 'react';
import { footerColumns, socialLinks } from '@/lib/data';

export function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-bg-dark text-text-inverse" role="contentinfo">
      <div className="max-w-[1440px] mx-auto px-responsive">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 py-16">
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h3 className="font-ui text-micro text-text-inverse/40 mb-5">
                {column.heading}
              </h3>
              <ul className="space-y-2.5" role="list">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-ui text-small text-text-inverse/70 hover:text-accent-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter + Social */}
        <div className="border-t border-inverse py-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="font-display text-h3 mb-2">Become a Member</h3>
              <p className="font-ui text-small text-text-inverse/50 mb-6 max-w-sm">
                Early access to new pieces, artisan stories, and exclusive events.
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-bg-darker/50 text-text-inverse font-ui text-body border border-transparent rounded-sm placeholder:text-text-inverse/30 focus:outline-none focus:border-accent-gold transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent-gold text-bg-dark font-ui text-caption font-medium rounded-sm hover:brightness-110 transition-all duration-200"
                >
                  Join
                </button>
              </form>
            </div>
            <div className="flex md:justify-end gap-5">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  className="text-text-inverse/30 hover:text-accent-gold transition-colors duration-200"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.platform === 'instagram' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )}
                  {link.platform === 'pinterest' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 3.01 8.17 7.11 9.5.5.09.68-.22.68-.48l-.01-1.69c-2.39.5-3.12-1.13-3.12-2.2 0-1.81 1.22-2.9 22-2.9" />
                    </svg>
                  )}
                  {link.platform === 'email' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  )}
                  {link.platform === 'whatsapp' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-inverse py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-display text-h3 text-gold-gradient leading-none" aria-label="Apriliha Singh - Home">
              AS
            </Link>
            <p className="font-ui text-micro text-text-inverse/30">
              © {new Date().getFullYear()} Apriliha Singh. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-5 font-ui text-micro text-text-inverse/30">
            <Link href="/shipping-returns" className="hover:text-accent-gold transition-colors duration-200">Privacy</Link>
            <Link href="/shipping-returns" className="hover:text-accent-gold transition-colors duration-200">Terms</Link>
            <Link href="/care-guide" className="hover:text-accent-gold transition-colors duration-200">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
