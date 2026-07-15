'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import Input from '@/components/ui/Input';
import ProductCard from '@/components/product/ProductCard';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQuery) doSearch(initialQuery);
  }, [initialQuery, doSearch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query) doSearch(query);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, doSearch]);

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-[900px] mx-auto px-6">
        <h1 className="font-serif text-headline text-aubergine text-center mb-10">Search</h1>

        <div className="relative max-w-lg mx-auto mb-12">
          <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-bronze/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for jewelry, materials, stories..."
            className="w-full h-12 pl-11 pr-4 bg-transparent border border-stone/40 text-aubergine placeholder:text-stone focus:outline-none focus:border-terracotta transition-colors"
          />
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="w-6 h-6 border-2 border-stone/30 border-t-terracotta animate-spin mx-auto" />
          </div>
        )}

        {!loading && results.length > 0 && (
          <div>
            <p className="text-caption text-bronze/50 mb-6">
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((result: any) => (
                <ProductCard key={result.slug} {...result} />
              ))}
            </div>
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-body text-bronze/60">No results found for &ldquo;{query}&rdquo;</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="w-6 h-6 border-2 border-stone/30 border-t-terracotta animate-spin" /></div>}>
      <SearchContent />
    </Suspense>
  );
}
