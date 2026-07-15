import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { OrderTracker } from './OrderTracker';

interface OrderPageProps {
  params: Promise<{ orderId: string }>;
}

export async function generateMetadata({ params }: OrderPageProps): Promise<Metadata> {
  const { orderId } = await params;
  return { title: `Order ${orderId}` };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { orderId } = await params;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', url: 'https://aprilihasingh.com' },
          { label: 'Account', url: 'https://aprilihasingh.com/account/orders' },
          { label: `Order ${orderId}`, url: `https://aprilihasingh.com/account/orders/${orderId}` },
        ]}
      />
      <Header />
      <main id="main-content" className="pt-[60px] min-h-screen">
        <section className="py-32 px-responsive">
          <div className="max-w-[800px] mx-auto">
            <OrderTracker orderId={orderId} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
