import Link from 'next/link';

const COLLECTION_LINKS = [
  { href: '/collections/necklaces', label: 'Necklaces' },
  { href: '/collections/bracelets', label: 'Bracelets' },
  { href: '/collections/malas', label: 'Malas' },
  { href: '/collections/rings', label: 'Rings' },
  { href: '/collections/earrings', label: 'Earrings' },
];

const INFO_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/craftsmanship', label: 'Craftsmanship' },
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
];

const LEGAL_LINKS = [
  { href: '/legal/shipping-returns', label: 'Shipping & Returns' },
  { href: '/legal/privacy', label: 'Privacy' },
  { href: '/legal/terms', label: 'Terms' },
];

export default function Footer() {
  return (
    <footer className="bg-aubergine text-sand/80 mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-subhead text-sand mb-4">Apriliha Singh</h3>
            <p className="text-body text-sand/60 max-w-xs leading-relaxed">
              Fine jewelry, bespoke and ready-to-wear. Handcrafted in Jaipur with quiet luxury and enduring craft.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-label uppercase tracking-widest text-sand/40 mb-5">Collections</h4>
            <nav className="flex flex-col gap-3">
              {COLLECTION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-body text-sand/70 hover:text-sand transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/build/necklace"
                className="text-body text-saffron hover:text-sand transition-colors duration-300"
              >
                Bespoke Builder
              </Link>
            </nav>
          </div>

          {/* About */}
          <div>
            <h4 className="text-label uppercase tracking-widest text-sand/40 mb-5">About</h4>
            <nav className="flex flex-col gap-3">
              {INFO_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-body text-sand/70 hover:text-sand transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-label uppercase tracking-widest text-sand/40 mb-5">Stay Connected</h4>
            <p className="text-body text-sand/60 mb-4">
              Stories from the atelier, new collections, and the world of Apriliha Singh.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 h-10 px-3 bg-transparent border border-sand/20 text-sand text-body placeholder:text-sand/30 focus:outline-none focus:border-sand/50"
              />
              <button
                type="submit"
                className="h-10 px-4 bg-terracotta text-sand-light text-label uppercase tracking-widest hover:bg-saffron transition-colors duration-300"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-sand/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-caption text-sand/40">
            © {new Date().getFullYear()} Apriliha Singh. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-caption text-sand/40 hover:text-sand/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
