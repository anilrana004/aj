import Link from 'next/link';
import { projects } from '@/lib/data';
import { SectionHeader } from './SectionHeader';

export function ProjectsSection() {
  return (
    <section className="section-gap" aria-labelledby="projects-title">
      <SectionHeader title="PROJECTS" exploreHref="/projects" exploreLabel="EXPLORE" />
      <div className="projects-list">
        {projects.map((project) => (
          <Link key={project.id} href={project.href} className="projects-list__item u-hover-fade">
            <div className="projects-list__image-wrap">
              <img src={project.image} alt={project.imageAlt} className="projects-list__image" />
            </div>
            <p className="projects-list__title">{project.title}</p>
            <p className="projects-list__text">{project.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
