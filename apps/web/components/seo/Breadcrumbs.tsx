'use client';

import { usePathname } from 'next/navigation';
import JsonLd from './JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://aprilihasingh.com';

interface BreadcrumbItem {
  name: string;
  path: string;
}

const ROUTE_NAMES: Record<string, string> = {
  collections: 'Collections',
  product: 'Product',
  build: 'Bespoke Builder',
  craftsmanship: 'Craftsmanship',
  journal: 'Journal',
  about: 'About',
  cart: 'Cart',
  checkout: 'Checkout',
  account: 'Account',
  search: 'Search',
  contact: 'Contact',
  faq: 'FAQ',
  wishlist: 'Wishlist',
  login: 'Sign In',
  signup: 'Sign Up',
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (!pathname || pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [{ name: 'Home', path: '/' }];

  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const name = ROUTE_NAMES[segment] || segment.replace(/-/g, ' ');
    // Don't add IDs or dynamic slugs to breadcrumb
    if (!segment.startsWith('[') && isNaN(Number(segment))) {
      items.push({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        path: currentPath,
      });
    }
  });

  if (items.length <= 1) return null;

  const breadcrumbSchema = {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };

  return (
    <>
      <JsonLd type="BreadcrumbList" data={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4">
        <ol className="flex items-center gap-2 text-caption text-bronze/60">
          {items.map((item, index) => (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 && <span className="text-stone/40">/</span>}
              {index === items.length - 1 ? (
                <span className="text-aubergine">{item.name}</span>
              ) : (
                <a href={item.path} className="hover:text-aubergine transition-colors">
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
