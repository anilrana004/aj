import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — Apriliha Singh',
  description: 'Internal admin panel for Apriliha Singh',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 text-white p-6 shrink-0">
            <h1 className="text-lg font-bold mb-8 tracking-wide">AS Admin</h1>
            <nav className="space-y-1">
              {[
                { href: '/dashboard', label: 'Dashboard' },
                { href: '/products', label: 'Products' },
                { href: '/builder-parts', label: 'Builder Parts' },
                { href: '/orders', label: 'Orders' },
                { href: '/customers', label: 'Customers' },
                { href: '/content', label: 'Content' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-sm rounded hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
