'use client';

import Link from 'next/link';
import { useState } from 'react';
import { socialLinks } from '@/lib/data';
import { img } from '@/lib/images';

const storeImages = [
  { href: '/appointment', alt: 'Apriliha Singh Atelier — Jaipur', src: img.atelierPreview, label: 'JAIPUR' },
  { href: '/appointment', alt: 'Apriliha Singh Studio', src: img.homeHero, label: 'STUDIO' },
  { href: '/contact', alt: 'Book an appointment', src: img.zenanaThumb, label: 'VISIT' },
];

const footerMenus = [
  {
    title: 'INFO',
    links: [
      { label: 'NEWS', href: '/journal' },
      { label: 'STOCKISTS', href: '/contact' },
      { label: 'CONTACT', href: '/contact' },
      { label: 'COMPANY', href: '/atelier' },
    ],
  },
  {
    title: 'CARE',
    links: [
      { label: 'CUSTOMER SERVICE', href: '/contact' },
      { label: 'CARE INSTRUCTIONS', href: '/care-guide' },
      { label: 'SHIPPING & RETURNS', href: '/shipping-returns' },
      { label: 'REPAIR', href: '/repair' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'PRIVACY', href: '/care-guide' },
      { label: 'TERMS', href: '/shipping-returns' },
    ],
  },
];

function AccordionColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-inverse md:border-none">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 md:pointer-events-none md:py-0 md:mb-6"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span
          className="uppercase text-text-inverse"
          style={{ fontSize: '12px', letterSpacing: '0.13em', fontWeight: 400 }}
        >
          {title}
        </span>
        <span className="md:hidden" style={{ fontSize: '14px', color: 'rgba(251, 247, 241, 0.45)' }}>
          {open ? '−' : '+'}
        </span>
      </button>
      <div className={open ? 'block pb-4' : 'hidden md:block'}>
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="uppercase transition-opacity hover:opacity-70"
                style={{ fontSize: '10px', letterSpacing: '0.13em', color: 'rgba(251, 247, 241, 0.7)' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-dark-aubergine text-text-inverse mt-[100px]" role="contentinfo">
      {/* Stores + Newsletter */}
      <div
        className="flex flex-col lg:flex-row gap-12 lg:gap-0 border-t border-inverse"
        style={{ padding: '80px 0 100px' }}
      >
        <div className="px-[7.8vw] lg:mr-[10vw] shrink-0">
          <div
            className="uppercase whitespace-nowrap text-text-inverse"
            style={{ fontSize: '12px', letterSpacing: '0.13em', fontWeight: 400 }}
          >
            STORES / BOOK AN APPOINTMENT
          </div>
          <ul className="flex gap-[3px] mt-10 md:mt-[46px]">
            {storeImages.map((store) => (
              <li key={store.alt} className="w-[28vw] md:w-[9.06vw]">
                <Link href={store.href} className="block u-hover-fade overflow-hidden">
                  <img
                    src={store.src}
                    alt={store.alt}
                    className="w-full aspect-square object-cover"
                  />
                  <span className="footer-store-label" style={{ color: 'rgba(251, 247, 241, 0.55)' }}>{store.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-[7.8vw] lg:px-0 lg:w-[37vw]">
          <div
            className="uppercase text-text-inverse"
            style={{ fontSize: '12px', letterSpacing: '0.13em', fontWeight: 400 }}
          >
            NEWSLETTER
          </div>
          <form
            className="relative mt-8 md:mt-[35px] border-b border-inverse w-full max-w-[320px] lg:w-[81%]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL ADDRESS"
              className="w-full border-none bg-transparent outline-none text-text-inverse uppercase placeholder:text-text-inverse/40"
              style={{ fontSize: '9px', letterSpacing: '0.18em', lineHeight: '35px' }}
              aria-label="Email address"
            />
            <button
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2 border border-inverse bg-transparent px-2 uppercase transition-colors hover:bg-accent-gold hover:border-accent-gold hover:text-text-inverse"
              style={{ fontSize: '9px', lineHeight: '19px', letterSpacing: '0.13em' }}
            >
              SUBSCRIBE
            </button>
          </form>
          <p
            className="mt-8 md:mt-12 max-w-[320px] lg:w-[81%]"
            style={{ fontSize: '8px', lineHeight: 1.75, letterSpacing: '0.13em', color: 'rgba(251, 247, 241, 0.45)' }}
          >
            I agree to receive the Apriliha Singh newsletter to be the first to know about new
            collections, exclusive product launches, events and services available. By subscribing,
            I agree to the{' '}
            <Link href="/care-guide" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Link columns */}
      <div
        className="flex flex-col md:flex-row gap-0 md:gap-16 border-t border-inverse px-[5.2vw]"
        style={{ paddingTop: '40px', paddingBottom: '60px' }}
      >
        <div className="flex flex-col md:flex-row gap-0 md:gap-16 flex-1">
          {footerMenus.map((menu) => (
            <AccordionColumn key={menu.title} title={menu.title} links={menu.links} />
          ))}
        </div>

        <div className="pt-6 md:pt-0 md:ml-auto">
          {socialLinks
            .filter((s) => s.platform === 'instagram')
            .map((link) => (
              <a
                key={link.platform}
                href={link.url}
                className="uppercase text-text-inverse transition-opacity hover:opacity-70"
                style={{ fontSize: '10px', letterSpacing: '0.13em' }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                INSTAGRAM
              </a>
            ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-inverse px-[5.2vw]"
        style={{ paddingTop: '30px', paddingBottom: '30px' }}
      >
        <p className="uppercase" style={{ fontSize: '9px', letterSpacing: '0.13em', color: 'rgba(251, 247, 241, 0.45)' }}>
          © {new Date().getFullYear()} APRILIHA SINGH
        </p>
        <div className="flex gap-6">
          <Link href="/shipping-returns" className="uppercase hover:opacity-70" style={{ fontSize: '9px', letterSpacing: '0.13em', color: 'rgba(251, 247, 241, 0.45)' }}>
            PRIVACY
          </Link>
          <Link href="/shipping-returns" className="uppercase hover:opacity-70" style={{ fontSize: '9px', letterSpacing: '0.13em', color: 'rgba(251, 247, 241, 0.45)' }}>
            TERMS
          </Link>
        </div>
      </div>
    </footer>
  );
}
