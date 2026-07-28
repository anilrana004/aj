import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProjectsSection } from '@/components/sections/ProjectsSection';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Projects from the Apriliha Singh atelier — bespoke studios, bridal archives, and karigar residencies.',
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="site-main">
        <h1 className="page-title">Projects</h1>
        <div className="mb-[100px]">
          <ProjectsSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
