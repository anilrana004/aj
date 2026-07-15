'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HERO_SLIDES = [
  {
    image: '/images/hero-1.jpg',
    text: 'Crafted slowly, worn forever.',
    cta: 'Explore the Collection',
    href: '/collections',
  },
  {
    image: '/images/hero-2.jpg',
    text: 'Your design, our craft.',
    cta: 'Begin Bespoke',
    href: '/build/necklace',
  },
  {
    image: '/images/hero-3.jpg',
    text: 'The art of adornment.',
    cta: 'Our Craftsmanship',
    href: '/craftsmanship',
  },
];

export default function HomeHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative h-[80vh] min-h-[500px] max-h-[900px] overflow-hidden">
      {/* Background Images with Crossfade */}
      {HERO_SLIDES.map((s, i) => (
        <motion.div
          key={s.image}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-aubergine/40 via-aubergine/20 to-aubergine/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-aubergine/80 via-transparent to-transparent" />
          {/* Placeholder gradient — replace with <img> or next/image */}
          <div className="absolute inset-0 bg-gradient-to-br from-terracotta/40 via-bronze/30 to-aubergine/70" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          key={slide.text}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-headline md:text-display text-sand max-w-3xl leading-tight"
        >
          {slide.text}
        </motion.h1>
        <motion.div
          key={slide.href}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={slide.href}
            className="inline-block mt-8 h-12 px-8 border border-sand/40 text-sand text-label uppercase tracking-widest hover:bg-sand hover:text-aubergine transition-all duration-300"
          >
            {slide.cta}
          </Link>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 transition-all duration-300 ${
              i === current ? 'bg-sand w-8' : 'bg-sand/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
