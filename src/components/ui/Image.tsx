'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  caption?: string;
}

export const Image = forwardRef<HTMLDivElement, ImageProps>(
  ({ src, alt, fill = false, priority = false, sizes, className, caption, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
        {fill ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            sizes={sizes}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          />
        ) : (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            sizes={sizes}
            className="w-full h-auto block transition-opacity duration-700"
          />
        )}
        {caption && (
          <figcaption className="image-caption mt-4 text-center">
            {caption}
          </figcaption>
        )}
      </div>
    );
  }
);

Image.displayName = 'Image';

export const ImageGallery = ({ images, className }: { images: Array<{ src: string; alt: string; caption?: string }>; className?: string }) => (
  <div className={cn('grid gap-8', className)} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
    {images.map((image, index) => (
      <figure key={index} className="relative">
        <Image src={image.src} alt={image.alt} caption={image.caption} />
      </figure>
    ))}
  </div>
);