import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AccountSidebar } from '@/components/account/AccountSidebar';

export const metadata: Metadata = {
  title: 'My Account',
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[60px] min-h-screen">
        <div className="max-w-[1440px] mx-auto px-responsive py-16">
          <div className="grid lg:grid-cols-12 gap-16">
            <aside className="lg:col-span-3">
              <AccountSidebar />
            </aside>
            <div className="lg:col-span-9">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
