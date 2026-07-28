'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { heroSlides } from '@/lib/data';

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <section className="hero-carousel" aria-label="Featured highlights" aria-roledescription="carousel">
      <div className="hero-carousel__track">
        {heroSlides.map((slide, index) => (
          <Link
            key={slide.id}
            href={slide.href}
            id={`hero-slide-${index}`}
            className={`hero-carousel__slide u-hover-fade ${index === activeIndex ? 'is-active' : ''}`}
            aria-hidden={index !== activeIndex}
            tabIndex={index === activeIndex ? 0 : -1}
          >
            <div className="hero-carousel__media">
              <img src={slide.image} alt={slide.imageAlt} className="hero-carousel__image" />
            </div>
            <h1 className="hero-carousel__title">{slide.title}</h1>
          </Link>
        ))}
      </div>

      <div className="hero-carousel__dots" role="tablist" aria-label="Slides">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`hero-slide-${index}`}
            className={`hero-carousel__dot ${index === activeIndex ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
