import { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { cn, formatPrice, ORDER_STATUS_LABELS, ORDER_STATUS_TIMELINE } from '@/lib/utils';

interface OrderDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: OrderDetailPageProps): Promise<Metadata> {
  return buildMetadata({
    title: `Order ${params.id}`,
    description: `Order details for ${params.id}`,
    path: `/account/orders/${params.id}`,
  });
}

// In production, this would fetch from the database
async function getOrder(orderNumber: string) {
  return {
    id: '1',
    orderNumber,
    status: 'IN_PRODUCTION',
    email: 'customer@example.com',
    subtotal: 18500,
    shippingCost: 0,
    tax: 0,
    total: 18500,
    createdAt: '2024-12-20T10:00:00Z',
    estimatedDelivery: '2025-01-15T00:00:00Z',
    shippingAddress: {
      name: 'Priya Sharma',
      line1: '42 Civil Lines',
      city: 'Jaipur',
      state: 'Rajasthan',
      postalCode: '302006',
      country: 'IN',
    },
    items: [
      {
        name: 'Oxidized Bronze Chain Necklace',
        quantity: 1,
        unitPrice: 8000,
        totalPrice: 8000,
        isBespoke: true,
        bespokeConfig: {
          parts: [
            { partTypeName: 'Chain / Base', partName: 'Oxidized Bronze Chain', price: 8000, quantity: 1 },
            { partTypeName: 'Centerpiece', partName: 'Lotus Medallion', price: 5000, quantity: 1 },
            { partTypeName: 'Accent Stone', partName: 'Moonstone', price: 2500, quantity: 1 },
            { partTypeName: 'Length', partName: '18 inches — Classic', price: 1000, quantity: 1 },
            { partTypeName: 'Clasp', partName: 'Lobster Clasp', price: 0, quantity: 1 },
            { partTypeName: 'Finish', partName: 'Oxidized (Dark Patina)', price: 0, quantity: 1 },
          ],
          total: 16500,
        },
      },
    ],
    statusHistory: [
      { status: 'PENDING_PAYMENT', date: '2024-12-20T10:00:00Z', note: 'Order placed' },
      { status: 'PAID', date: '2024-12-20T10:05:00Z', note: 'Payment confirmed via Stripe' },
      { status: 'IN_PRODUCTION', date: '2024-12-22T09:00:00Z', note: 'Your piece has entered our atelier' },
    ],
  };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const order = await getOrder(params.id);
  const isBespoke = order.items.some((i) => i.isBespoke);
  const timeline = isBespoke ? ORDER_STATUS_TIMELINE.bespoke : ORDER_STATUS_TIMELINE.readyMade;

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <Link href="/account" className="text-label uppercase tracking-widest text-terracotta hover:text-bronze transition-colors mb-4 inline-block">
            ← Back to Account
          </Link>
          <h1 className="font-serif text-headline text-aubergine">Order {order.orderNumber}</h1>
          <p className="text-body text-bronze/60 mt-1">
            Placed on{' '}
            {new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Status Timeline */}
        <div className="bg-stone/10 p-6 mb-10">
          <h2 className="text-label uppercase tracking-widest text-bronze/60 mb-4">Order Status</h2>
          <div className="flex items-center gap-0">
            {timeline.map((status, i) => {
              const currentIdx = timeline.indexOf(order.status as any);
              const isActive = i <= currentIdx;
              const isCurrent = i === currentIdx;
              return (
                <div key={status} className="flex-1 flex flex-col items-center">
                  <div
                    className={cn(
                      'w-3 h-3 rounded-full transition-all',
                      isCurrent
                        ? 'bg-terracotta ring-4 ring-terracotta/20'
                        : isActive
                        ? 'bg-terracotta'
                        : 'bg-stone/30'
                    )}
                  />
                  <p className={cn(
                    'mt-2 text-caption text-center',
                    isActive ? 'text-aubergine' : 'text-bronze/30'
                  )}>
                    {ORDER_STATUS_LABELS[status]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Items */}
        <div className="mb-10">
          <h2 className="text-label uppercase tracking-widest text-bronze/60 mb-4">Items</h2>
          {order.items.map((item, i) => (
            <div key={i} className="border border-stone/20 p-4 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-20 bg-stone/20 shrink-0" />
                <div className="flex-1">
                  <p className="font-serif text-body-lg text-aubergine">{item.name}</p>
                  <p className="text-body text-bronze mt-1">{formatPrice(item.totalPrice)}</p>

                  {/* Bespoke breakdown */}
                  {item.isBespoke && item.bespokeConfig && (
                    <div className="mt-3 pl-3 border-l border-stone/20 space-y-1">
                      {item.bespokeConfig.parts.map((p, j) => (
                        <div key={j} className="flex justify-between text-caption text-bronze/60">
                          <span>{p.partTypeName}: {p.partName}</span>
                          <span>{p.price > 0 ? formatPrice(p.price) : 'Included'}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-label uppercase tracking-widest text-bronze/60 mb-3">Shipping Address</h2>
            <p className="text-body text-aubergine leading-relaxed">
              {order.shippingAddress.name}<br />
              {order.shippingAddress.line1}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country}
            </p>
          </div>
          <div>
            <h2 className="text-label uppercase tracking-widest text-bronze/60 mb-3">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-body">
                <span className="text-bronze/60">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-body">
                <span className="text-bronze/60">Shipping</span>
                <span>{order.shippingCost === 0 ? 'Free' : formatPrice(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between font-serif text-subhead pt-2 border-t border-stone/20">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
            {order.estimatedDelivery && (
              <p className="mt-4 text-caption text-bronze/50">
                Estimated delivery:{' '}
                {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
