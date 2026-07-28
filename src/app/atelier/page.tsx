import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { atelierContent } from '@/lib/data';
import { img } from '@/lib/images';

export const metadata: Metadata = {
  title: 'About',
  description: 'Apriliha Singh — fine bespoke jewelry from Jaipur. Jewelry you can live in.',
};

export default function AtelierPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="site-main">
        <section className="collection-hero" aria-labelledby="about-hero">
          <div className="collection-hero__media">
            <img src={img.atelierHero} alt="Apriliha Singh atelier" className="collection-hero__image" />
          </div>
          <h1 id="about-hero" className="collection-hero__title">ABOUT</h1>
        </section>

        <article className="about-page">
          <h2 className="about-page__title">Jewelry you can live in.</h2>
          <p className="about-page__lead">
            Fine bespoke jewelry from Jaipur. Apple&apos;s restraint meets India&apos;s richness —
            every piece handcrafted by master karigars.
          </p>
          <p className="about-page__body">
            {atelierContent.founderStory.biography[0]}
          </p>
          <img
            src={atelierContent.founderStory.portrait}
            alt={atelierContent.founderStory.portraitAlt}
            className="about-page__image"
          />
          <p className="about-page__body">
            {atelierContent.founderStory.biography[1]}
          </p>
          <img
            src={img.gallery1}
            alt="Karigar at the bench"
            className="about-page__image"
          />
          <p className="about-page__body">
            {atelierContent.founderStory.biography[2]}
          </p>

          <div className="about-page__links">
            <Link href="/collections">COLLECTIONS</Link>
            <Link href="/appointment">BOOK AN APPOINTMENT</Link>
            <Link href="/design-your-own">DESIGN YOUR OWN</Link>
            <Link href="/journal">NOTES</Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
