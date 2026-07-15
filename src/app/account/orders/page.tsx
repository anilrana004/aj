import { Metadata } from 'next';
import Link from 'next/link';
import { EmptyState } from '@/components/ui/EmptyState';

export const metadata: Metadata = {
  title: 'My Orders',
};

const mockOrders = [
  {
    id: 'ASH-2026-001',
    status: 'cast',
    items: ['Bespoke Necklace — Jaipur Link Chain, Rudra Stone'],
    total: 78000,
    createdAt: '2026-07-10',
    estimatedShip: '2026-08-05',
  },
];

const statusLabels: Record<string, string> = {
  placed: 'Order Placed',
  confirmed: 'Design Confirmed',
  sketched: 'Sketch Approved',
  cast: 'In Production',
  set: 'Stones Being Set',
  polished: 'Polishing',
  quality_checked: 'Quality Check',
  shipped: 'Shipped',
  delivered: 'Delivered',
};

export default function OrdersPage() {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  if (mockOrders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="When you place an order, it will appear here with real-time production tracking."
        action={
          <Link href="/design-your-own" className="btn-primary">
            Design Your First Piece
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <h2 className="font-display text-h2 mb-8">My Orders</h2>
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <Link
            key={order.id}
            href={`/account/orders/${order.id}`}
            className="block p-6 border border-border rounded-sm hover:border-accent-gold/30 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-ui text-caption text-text-primary/50">{order.id}</p>
                <h3 className="font-display text-h3 mt-1">{order.items[0]}</h3>
              </div>
              <span className="font-ui text-caption px-3 py-1 bg-bg-secondary rounded-sm">
                {statusLabels[order.status] || order.status}
              </span>
            </div>
            <div className="flex items-center gap-6 mt-4 font-ui text-caption text-text-primary/60">
              <span>Placed {order.createdAt}</span>
              <span>{formatPrice(order.total)}</span>
              <span>Ships by {order.estimatedShip}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
