import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { journalArticles } from '@/lib/data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/sections/Hero';
import { format } from 'date-fns';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = journalArticles.find((a) => a.slug === slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.title,
    description: article.dek,
    openGraph: {
      title: `${article.title} | Apriliha Singh Journal`,
      description: article.dek,
      images: [article.heroImage],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
  };
}

interface ArticleBlock {
  type: 'paragraph' | 'heading' | 'image' | 'pull-quote' | 'gallery' | 'divider';
  content?: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
  level?: 2 | 3;
  alignment?: 'left' | 'center' | 'full-bleed';
}

interface JournalArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function JournalArticlePage({ params }: JournalArticlePageProps) {
  const { slug } = await params;
  const article = journalArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-[60px]">
        <nav className="max-w-[1440px] mx-auto px-responsive py-6 border-b border-border" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-ui text-caption text-text-primary/60">
            <li><Link href="/" className="hover:text-accent-primary">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/journal" className="hover:text-accent-primary">Journal</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-text-primary truncate max-w-[300px]">{article.title}</li>
          </ol>
        </nav>

        <article className="max-w-[1440px] mx-auto px-responsive pb-32">
          <header className="max-w-[700px] mb-16">
            <div className="flex flex-wrap items-center gap-3 font-ui text-caption mb-6 text-accent-primary">
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.publishedAt}>{format(new Date(article.publishedAt), 'MMMM d, yyyy')}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readTime} min read</span>
            </div>
            <h1 className="font-display text-hero mb-6">{article.title}</h1>
            <p className="font-display italic text-h2 text-text-primary/80">{article.dek}</p>
            <div className="mt-8 flex items-center gap-4 font-ui text-caption text-text-primary/60">
              <span>By {article.author}</span>
              <span aria-hidden="true">·</span>
              <span>{article.authorRole}</span>
            </div>
          </header>

          <figure className="mb-16 aspect-[16/9] relative overflow-hidden">
            <Image
              src={article.heroImage}
              alt={article.heroImageAlt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </figure>

          <div className="max-w-[700px] mx-auto space-y-12 font-ui text-body leading-relaxed">
            {article.content.map((block, index) => {
              switch (block.type) {
                case 'paragraph':
                  return <p key={index}>{block.content}</p>;
                case 'heading':
                  return (
                    <h2 key={index} className={block.level === 2 ? 'font-display text-h2 mt-8' : 'font-display text-h3 mt-6'}>
                      {block.content}
                    </h2>
                  );
                case 'image':
                  return (
                    <figure key={index} className={`my-12 ${block.alignment === 'full-bleed' ? 'max-w-[1440px] -mx-[80px]' : 'mx-auto'}`}>
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img
                          src={block.image}
                          alt={block.imageAlt || ''}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      {block.caption && (
                        <figcaption className="image-caption text-center">{block.caption}</figcaption>
                      )}
                    </figure>
                  );
                case 'pull-quote':
                  return (
                    <blockquote key={index} className="quote-block my-12 border-y border-accent-gold/30 py-8">
                      <p className="font-display italic text-h3">{block.content}</p>
                    </blockquote>
                  );
                case 'gallery':
                  return (
                    <div key={index} className="grid md:grid-cols-2 gap-8 my-12">
                      {(block.content || '').split(',').map((img, i) => (
                        <figure key={i}>
                          <div className="aspect-[4/3] relative overflow-hidden">
                            <img src={img.trim()} alt="" className="w-full h-full object-cover" loading="lazy" />
                          </div>
                        </figure>
                      ))}
                    </div>
                  );
                case 'divider':
                  return <hr key={index} className="divider-gold my-16" />;
                default:
                  return null;
              }
            })}

            <footer className="pt-16 border-t border-border mt-16">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="font-ui text-caption text-text-primary/60">
                  Tags: {article.tags.join(', ')}
                </div>
                <div className="flex gap-4">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://aprilihasingh.com/journal/${article.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary/50 hover:text-accent-gold transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://aprilihasingh.com/journal/${article.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary/50 hover:text-accent-gold transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`Read this: https://aprilihasingh.com/journal/${article.slug}`)}`}
                    className="text-text-primary/50 hover:text-accent-gold transition-colors"
                    aria-label="Share via email"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}