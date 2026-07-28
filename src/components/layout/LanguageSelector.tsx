'use client';

import { useState } from 'react';

const languages = [
  { code: 'EN', label: 'EN' },
  { code: 'HI', label: 'HI' },
] as const;

export function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<(typeof languages)[number]['code']>('EN');

  return (
    <div className={`c-language ${compact ? 'c-language--compact' : ''}`} role="group" aria-label="Language">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          className={`c-language__btn ${active === lang.code ? 'is-active' : ''}`}
          onClick={() => setActive(lang.code)}
          aria-pressed={active === lang.code}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
