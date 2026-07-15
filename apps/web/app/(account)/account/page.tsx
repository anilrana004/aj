'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { cn, formatPrice, ORDER_STATUS_LABELS } from '@/lib/utils';
import Button from '@/components/ui/Button';

const SAMPLE_ORDERS = [
  {
    id: '1',
    orderNumber: 'AS-M1K4-X7P2',
    status: 'IN_PRODUCTION',
    total: 22000,
    createdAt: '2024-12-20',
    items: [{ name: 'Oxidized Bronze Necklace — Bespoke', quantity: 1, isBespoke: true }],
  },
  {
    id: '2',
    orderNumber: 'AS-L2N8-Y3Q9',
    status: 'DELIVERED',
    total: 15000,
    createdAt: '2024-11-15',
    items: [{ name: 'Oxidized Jhumka Earrings', quantity: 1, isBespoke: false }],
  },
];

const TABS = ['Orders', 'Saved Designs', 'Addresses', 'Account Details'] as const;

export default function AccountPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Orders');

  const user = session?.user || { name: 'Guest', email: 'guest@example.com' };

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-[1000px] mx-auto px-6">
        <h1 className="font-serif text-headline text-aubergine mb-2">My Account</h1>
        <p className="text-body text-bronze/60 mb-10">
          Welcome back, {user.name || user.email}.
        </p>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-stone/20 mb-10 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-5 py-3 text-label uppercase tracking-widest whitespace-nowrap transition-all border-b-2 -mb-px',
                activeTab === tab
                  ? 'border-terracotta text-terracotta'
                  : 'border-transparent text-bronze/50 hover:text-aubergine'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders */}
        {activeTab === 'Orders' && (
          <div className="space-y-6">
            {SAMPLE_ORDERS.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-body text-bronze/60 mb-4">No orders yet.</p>
                <Link href="/collections">
                  <Button variant="outline">Start Shopping</Button>
                </Link>
              </div>
            ) : (
              SAMPLE_ORDERS.map((order) => (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.orderNumber}`}
                  className="block border border-stone/20 p-6 hover:border-stone/40 transition-colors"
                >
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-label uppercase tracking-widest text-bronze/50 mb-1">
                        {order.orderNumber}
                      </p>
                      <p className="font-serif text-body-lg text-aubergine">
                        {order.items.map((i) => i.name).join(', ')}
                      </p>
                      <p className="text-caption text-bronze/40 mt-1">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={cn(
                        'inline-block px-3 py-1 text-label uppercase tracking-widest mb-2',
                        order.status === 'DELIVERED' ? 'bg-stone/20 text-bronze/60' : 'bg-terracotta/10 text-terracotta'
                      )}>
                        {ORDER_STATUS_LABELS[order.status] || order.status}
                      </span>
                      <p className="text-body text-aubergine font-medium">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        {/* Saved Designs */}
        {activeTab === 'Saved Designs' && (
          <div className="text-center py-16">
            <p className="text-body text-bronze/60 mb-4">No saved designs yet.</p>
            <Link href="/build/necklace">
              <Button>Design Something Bespoke</Button>
            </Link>
          </div>
        )}

        {/* Addresses */}
        {activeTab === 'Addresses' && (
          <div className="text-center py-16">
            <p className="text-body text-bronze/60 mb-4">No saved addresses.</p>
            <Button variant="outline">Add Address</Button>
          </div>
        )}

        {/* Account Details */}
        {activeTab === 'Account Details' && (
          <div className="max-w-md space-y-6">
            <div>
              <p className="text-label uppercase tracking-widest text-bronze/50 mb-1">Name</p>
              <p className="text-body text-aubergine">{user.name || '—'}</p>
            </div>
            <div>
              <p className="text-label uppercase tracking-widest text-bronze/50 mb-1">Email</p>
              <p className="text-body text-aubergine">{user.email}</p>
            </div>
            <div>
              <p className="text-label uppercase tracking-widest text-bronze/50 mb-1">Phone</p>
              <p className="text-body text-aubergine">—</p>
            </div>
            <Button variant="outline">Edit Details</Button>
          </div>
        )}
      </div>
    </section>
  );
}
