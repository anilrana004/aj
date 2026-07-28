import { Metadata } from 'next';
import { Suspense } from 'react';
import GalleryPageClient from './GalleryPageClient';

export const metadata: Metadata = {
  title: 'Gallery View',
  description: 'Browse all Apriliha Singh jewelry in gallery view.',
};

export default function GalleryPage() {
  return (
    <Suspense fallback={null}>
      <GalleryPageClient />
    </Suspense>
  );
}
