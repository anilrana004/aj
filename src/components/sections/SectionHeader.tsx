import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  exploreHref?: string;
  exploreLabel?: string;
}

export function SectionHeader({ title, exploreHref, exploreLabel = 'EXPLORE' }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h2 className="section-label">{title}</h2>
      {exploreHref && (
        <Link href={exploreHref} className="section-header__explore">
          {exploreLabel}
        </Link>
      )}
    </div>
  );
}
