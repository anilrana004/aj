'use client';

import Link from 'next/link';
import { Collection, StoreLocation } from '@/lib/types';
import { img } from '@/lib/images';

interface CollectionsMenuProps {
  collections: Collection[];
  onNavigate?: () => void;
}

export function CollectionsMenu({ collections, onNavigate }: CollectionsMenuProps) {
  return (
    <div className="l-menu-panel">
      <div className="l-menu-panel__showcase">
        <Link href="/collections" className="l-menu-panel__showcase-link u-hover-fade" onClick={onNavigate}>
          <img
            src={img.collectionsHero}
            alt="View all collections"
            className="l-menu-panel__showcase-image"
          />
          <span className="l-menu-panel__showcase-title">VIEW ALL</span>
        </Link>
      </div>
      <nav className="l-menu-panel__nav" aria-label="Collections">
        <p className="l-menu-panel__nav-title">COLLECTIONS</p>
        <ul className="l-menu-panel__items">
          {collections.map((collection, index) => (
            <li
              key={collection.id}
              className={index === 2 ? 'l-menu-panel__item l-menu-panel__item--break' : 'l-menu-panel__item'}
            >
              <Link href={`/collections/${collection.slug}`} onClick={onNavigate}>
                {collection.name.toUpperCase()}
              </Link>
            </li>
          ))}
          <li className="l-menu-panel__item l-menu-panel__item--break">
            <Link href="/gallery" onClick={onNavigate}>GALLERY VIEW</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

interface StoresMenuProps {
  stores: StoreLocation[];
  onNavigate?: () => void;
}

/** SHIHARA visit modal layout — store thumbs + STORE APPOINTMENT + VISIT */
export function StoresMenu({ stores, onNavigate }: StoresMenuProps) {
  return (
    <div className="l-menu-panel l-menu-panel--visit">
      <div className="l-menu-panel__visit-nav">
        <p className="l-menu-panel__nav-title l-menu-panel__nav-title--visit">VISIT</p>
        <ul className="l-menu-panel__visit-links">
          <li>
            <Link href="/atelier" onClick={onNavigate}>BRAND</Link>
          </li>
          <li>
            <Link href="/appointment" onClick={onNavigate}>STORE / APPOINTMENT</Link>
          </li>
          <li className="l-menu-panel__item--break">
            <Link href="/atelier" onClick={onNavigate}>ABOUT</Link>
          </li>
        </ul>
      </div>

      <div className="l-menu-panel__visit-main">
        <ul className="l-menu-panel__store-grid">
          {stores.map((store) => (
            <li key={store.id} className="l-menu-panel__store-card">
              <Link
                href={store.href}
                className="l-menu-panel__store-card-link u-hover-fade"
                onClick={onNavigate}
              >
                <div className="l-menu-panel__store-card-media">
                  <img
                    src={store.image}
                    alt={store.imageAlt}
                    className="l-menu-panel__showcase-image"
                  />
                </div>
                <p className="l-menu-panel__showcase-title">{store.name}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="l-menu-panel__store-cta">
          <Link href="/appointment" className="l-menu-panel__store-cta-link" onClick={onNavigate}>
            STORE APPOINTMENT
          </Link>
        </div>
      </div>
    </div>
  );
}
