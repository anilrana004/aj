'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { OrderStatus } from '@/types/order';

interface OrderData {
  id: string;
  status: OrderStatus;
  items: {
    name: string;
    productType: string;
    partsSummary: string[];
    storyNarrative: string;
    totalPrice: number;
    estimatedShipDate: string;
  }[];
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
  createdAt: string;
}

const statusLabels: Record<OrderStatus, string> = {
  placed: 'Order Placed',
  confirmed: 'Design Confirmed',
  sketched: 'Sketch Approved',
  cast: 'Gold Cast',
  set: 'Stones Set',
  polished: 'Polished',
  quality_checked: 'Quality Checked',
  shipped: 'Shipped',
  delivered: 'Delivered',
};

const statusSteps: OrderStatus[] = ['placed', 'confirmed', 'sketched', 'cast', 'set', 'polished', 'quality_checked', 'shipped', 'delivered'];

const mockOrder: OrderData = {
  id: 'ASH-2026-001',
  status: 'cast',
  items: [
    {
      name: 'Bespoke Necklace',
      productType: 'necklace',
      partsSummary: ['Jaipur Link Chain', 'Rudra Stone', 'Kadi Clasp', 'Princess Length'],
      storyNarrative: 'Your piece begins with a 18k gold vermeil jaipur link chain from Jaipur, Rajasthan — forged where the goldsmiths still gather.',
      totalPrice: 78000,
      estimatedShipDate: '2026-08-05',
    },
  ],
  statusHistory: [
    { status: 'placed', timestamp: '2026-07-10T10:00:00Z', note: 'Order received' },
    { status: 'confirmed', timestamp: '2026-07-11T14:30:00Z', note: 'Design confirmed by creative director' },
    { status: 'sketched', timestamp: '2026-07-13T09:15:00Z', note: 'Final sketch approved' },
    { status: 'cast', timestamp: '2026-07-15T08:00:00Z', note: 'Gold casting in progress' },
  ],
  createdAt: '2026-07-10T10:00:00Z',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function OrderTracker({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOrder({ ...mockOrder, id: orderId });
      setIsLoading(false);
    }, 500);
  }, [orderId]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  if (isLoading) {
    return <div className="text-center py-20"><p className="font-ui text-body text-text-primary/50">Loading order...</p></div>;
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <h1 className="font-display text-h2 mb-6">Order Not Found</h1>
        <Link href="/account/orders" className="underline-gold font-ui text-caption">Back to Orders</Link>
      </div>
    );
  }

  const currentIdx = statusSteps.indexOf(order.status);

  return (
    <>
      <div className="mb-12">
        <Link href="/account/orders" className="font-ui text-caption underline-gold mb-4 inline-block">← All Orders</Link>
        <h1 className="font-display text-h1 mb-2">{order.id}</h1>
        <p className="font-ui text-body text-text-primary/60">Placed on {formatDate(order.createdAt)}</p>
      </div>

      <div className="p-8 border border-border rounded-sm mb-12">
        <h2 className="font-display text-h3 mb-8">Production Status</h2>
        <div className="space-y-0">
          {statusSteps.map((step, index) => {
            const isComplete = index <= currentIdx;
            const isCurrent = index === currentIdx;
            const entry = order.statusHistory.find((h) => h.status === step);
            return (
              <div key={step} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'w-4 h-4 rounded-full shrink-0 border-2 transition-all',
isCurrent ? 'bg-accent-gold border-accent-gold'
                       : isComplete ? 'bg-accent-gold/40 border-accent-gold/40'
                      : 'bg-transparent border-text-primary/20'
                  )} />
                  {index < statusSteps.length - 1 && (
                    <div className={cn('w-0.5 flex-1 min-h-[2rem]', index < currentIdx ? 'bg-accent-gold/30' : 'bg-text-primary/10')} />
                  )}
                </div>
                <div className="pb-8">
                  <p className={cn('font-ui text-body font-medium', isCurrent && 'text-accent-gold', !isComplete && 'opacity-30')}>
                    {statusLabels[step]}
                  </p>
                  {entry && (
                    <div className="mt-1">
                      <p className="font-ui text-caption text-text-primary/50">{formatDate(entry.timestamp)}</p>
                      {entry.note && <p className="font-ui text-caption mt-1 text-text-primary/60">{entry.note}</p>}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {order.items.map((item, i) => (
        <div key={i} className="p-8 border border-border rounded-sm mb-4">
          <div className="flex justify-between mb-2">
            <h3 className="font-display text-h3">{item.name}</h3>
            <span className="font-ui text-body font-medium">{formatPrice(item.totalPrice)}</span>
          </div>
          {item.storyNarrative && (
            <p className="font-ui text-body italic mt-3 border-t divider-ink pt-3 text-text-primary/60">
              &ldquo;{item.storyNarrative}&rdquo;
            </p>
          )}
          {item.estimatedShipDate && (
            <p className="font-ui text-caption mt-3 text-accent-gold">
              Estimated ship date: {formatDate(item.estimatedShipDate)}
            </p>
          )}
        </div>
      ))}

      <div className="mt-12 text-center">
        <a href="mailto:care@aprilihasingh.com" className="font-ui text-caption underline-gold">
          Need help? Contact Care Team
        </a>
      </div>
    </>
  );
}
