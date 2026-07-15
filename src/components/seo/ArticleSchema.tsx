import { JournalArticle } from '@/lib/types';

interface ArticleSchemaProps {
  article: JournalArticle;
  url: string;
}

export function ArticleSchema({ article, url }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.dek,
    image: article.heroImage,
    url,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: article.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Apriliha Singh',
      logo: {
        '@type': 'ImageObject',
        url: '/favicon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: article.tags,
    articleSection: article.category,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
