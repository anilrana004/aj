import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { journalArticles } from '@/lib/data';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Essays on craft, culture, and the quiet life of making — from the Apriliha Singh atelier.',
};

export default function JournalPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="site-main">
        <h1 className="page-title">Notes</h1>

        <div className="flex flex-wrap gap-[10px] px-[0.78%] max-md:px-[3.8vw] pb-[100px]">
          {journalArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/journal/${article.slug}`}
              className="group block w-[calc(50%-5px)] max-md:w-full u-hover-fade mb-10"
            >
              <div className="overflow-hidden bg-bg-secondary" style={{ aspectRatio: '1.308 / 1' }}>
                <img
                  src={article.heroImage}
                  alt={article.heroImageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <p
                className="mt-3 px-2.5 text-text-primary uppercase group-hover:text-accent-primary transition-colors duration-300"
                style={{ fontSize: '11px', letterSpacing: '0.13em', lineHeight: 1.73 }}
              >
                {article.title}
              </p>
              <p
                className="mt-2 px-2.5 text-text-muted uppercase line-clamp-2"
                style={{ fontSize: '10px', letterSpacing: '0.13em', lineHeight: 1.67 }}
              >
                {article.dek}
              </p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
