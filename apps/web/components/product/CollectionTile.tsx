'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CollectionTileProps {
  slug: string;
  name: string;
  image: string;
  description: string;
}

export default function CollectionTile({ slug, name, image, description }: CollectionTileProps) {
  return (
    <Link href={`/collections/${slug}`} className="group block">
      <div className="aspect-[4/3] relative overflow-hidden bg-stone">
        {/* Placeholder — replace with next/image */}
        <div className="absolute inset-0 bg-gradient-to-br from-sand/80 to-stone/90 transition-transform duration-500 ease-default group-hover:scale-105" />
        <div className="absolute inset-0 bg-aubergine/0 group-hover:bg-aubergine/10 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
          <h3 className="font-serif text-subhead text-aubergine">{name}</h3>
          <p className="mt-1 text-body text-bronze/80">{description}</p>
        </div>
      </div>
    </Link>
  );
}
