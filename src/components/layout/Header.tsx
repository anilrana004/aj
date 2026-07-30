'use client';

import { useState, useEffect, useMemo, useCallback, useRef, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { collections, storeLocations, products } from '@/lib/data';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CollectionsMenu, StoresMenu } from '@/components/layout/MenuModal';
import { useCart } from '@/hooks/useCart';

const announcements = [
  { text: 'FREE SHIPPING OVER ₹50,000', href: '/shipping-returns' },
  { text: 'NEW: THE ZENANA EDIT', href: '/collections/zenana-edit' },
  { text: 'BOOK AN ATELIER APPOINTMENT', href: '/appointment' },
  { text: 'DESIGN YOUR OWN — NOW AVAILABLE', href: '/design-your-own' },
  { text: 'THE MAHARANI SUITE — BY APPOINTMENT', href: '/collections/maharani-suite' },
];

const jewelryLinks = [
  { label: 'VIEW ALL', href: '/collections' },
  { label: 'NEW IN', href: '/gallery?filter=new' },
  { label: 'EARRINGS', href: '/gallery?filter=earrings', break: true },
  { label: 'RINGS', href: '/gallery?filter=rings' },
  { label: 'NECKLACES', href: '/gallery?filter=necklaces' },
  { label: 'BRACELETS', href: '/gallery?filter=bracelets' },
  { label: 'PINS', href: '/gallery?filter=pins' },
  { label: 'OBJECTS', href: '/gallery?filter=objects' },
  { label: 'GALLERY VIEW', href: '/gallery', break: true },
];

const collectionLinks = collections.filter((c) => c.isActive);

type MobilePanel = 'root' | 'jewelry' | 'collections' | 'stores';
type DesktopModal = 'collections' | 'stores' | null;

function Logo({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      onNavigate?.();
      if (pathname === '/') {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [onNavigate, pathname]
  );

  return (
    <div className="l-header__logo">
      <Link
        href="/"
        className="l-header__logo-link"
        aria-label="Apriliha Singh home"
        title="Apriliha Singh"
        onClick={handleClick}
      >
        <span className="l-header__logo-text" aria-hidden="true">
          APRILIHA SINGH
        </span>
      </Link>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg className="l-header__item-image" width="17" height="8" viewBox="0 0 17 8" aria-hidden>
      <rect className="l-header__item-icon-path" width="17" height="1" />
      <rect className="l-header__item-icon-path" y="7" width="17" height="1" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15.37 15.33" aria-hidden>
      <rect x="7.21" y="-2.67" width="1" height="20.68" transform="translate(-3.16 7.69) rotate(-45)" fill="#515151" />
      <rect x="-2.67" y="7.17" width="20.68" height="1" transform="translate(-3.18 7.66) rotate(-45)" fill="#515151" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg className="l-header__item-image" width="17" height="16" viewBox="0 0 17.04 16" aria-hidden>
      <path className="l-header__item-icon-path" d="M8.52,7c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5,3.5,1.57,3.5,3.5-1.57,3.5-3.5,3.5ZM8.52,1c-1.38,0-2.5,1.12-2.5,2.5s1.12,2.5,2.5,2.5,2.5-1.12,2.5-2.5-1.12-2.5-2.5-2.5Z" />
      <path className="l-header__item-icon-path" fillRule="evenodd" d="M17.04,16h-8.46c-5.17,0-5.71-.02-5.88-.02-.18,0-.28,0-1.07,0l-1.62.02.04-.54c.3-4.18,4.02-7.46,8.48-7.46s8.19,3.28,8.48,7.46l.04.54ZM2.51,14.98c.06,0,.09,0,.12,0,.55.02,2.5.02,5.89.02h7.42c-.52-3.4-3.68-6-7.42-6S1.63,11.59,1.1,14.99h.51c.56-.01.78-.01.9-.01Z" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M1 1h6v10L4 9 1 11V1z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function LanguageToggle() {
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  return (
    <div className="c-language" role="group" aria-label="Language">
      <button
        type="button"
        className={cn('c-language__btn', lang === 'EN' && 'is-active')}
        aria-current={lang === 'EN' ? 'true' : undefined}
        onClick={() => setLang('EN')}
      >
        EN
      </button>
      <button
        type="button"
        className={cn('c-language__btn', lang === 'HI' && 'is-active')}
        aria-current={lang === 'HI' ? 'true' : undefined}
        onClick={() => setLang('HI')}
      >
        HI
      </button>
    </div>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>('root');
  const [desktopModal, setDesktopModal] = useState<DesktopModal>(null);
  const [jewelryOpen, setJewelryOpen] = useState(false);
  const [announceIndex, setAnnounceIndex] = useState(0);
  const { itemCount } = useCart();
  const modalCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const jewelryCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearModalCloseTimer = useCallback(() => {
    if (modalCloseTimer.current) {
      clearTimeout(modalCloseTimer.current);
      modalCloseTimer.current = null;
    }
  }, []);

  const clearJewelryCloseTimer = useCallback(() => {
    if (jewelryCloseTimer.current) {
      clearTimeout(jewelryCloseTimer.current);
      jewelryCloseTimer.current = null;
    }
  }, []);

  const openDesktopModal = useCallback(
    (type: Exclude<DesktopModal, null>) => {
      clearModalCloseTimer();
      clearJewelryCloseTimer();
      setJewelryOpen(false);
      setDesktopModal(type);
    },
    [clearModalCloseTimer, clearJewelryCloseTimer]
  );

  const scheduleCloseDesktopModal = useCallback(() => {
    clearModalCloseTimer();
    modalCloseTimer.current = setTimeout(() => {
      setDesktopModal(null);
      modalCloseTimer.current = null;
    }, 320);
  }, [clearModalCloseTimer]);

  const closeDesktopModal = useCallback(() => {
    clearModalCloseTimer();
    setDesktopModal(null);
  }, [clearModalCloseTimer]);

  const openJewelry = useCallback(() => {
    clearJewelryCloseTimer();
    clearModalCloseTimer();
    setDesktopModal(null);
    setJewelryOpen(true);
  }, [clearJewelryCloseTimer, clearModalCloseTimer]);

  const scheduleCloseJewelry = useCallback(() => {
    clearJewelryCloseTimer();
    jewelryCloseTimer.current = setTimeout(() => {
      setJewelryOpen(false);
      jewelryCloseTimer.current = null;
    }, 280);
  }, [clearJewelryCloseTimer]);

  const closeJewelry = useCallback(() => {
    clearJewelryCloseTimer();
    setJewelryOpen(false);
  }, [clearJewelryCloseTimer]);

  const closeMobile = useCallback(() => {
    setIsMobileMenuOpen(false);
    setMobilePanel('root');
  }, []);

  const goHomeFromLogo = useCallback(() => {
    closeDesktopModal();
    closeJewelry();
    closeMobile();
    setIsSearchOpen(false);
  }, [closeDesktopModal, closeJewelry, closeMobile]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.metal.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [searchQuery]);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnounceIndex((i) => (i + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen || desktopModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isSearchOpen, desktopModal]);

  useEffect(() => {
    if (!isSearchOpen) setSearchQuery('');
  }, [isSearchOpen]);

  useEffect(() => () => {
    clearModalCloseTimer();
    clearJewelryCloseTimer();
  }, [clearModalCloseTimer, clearJewelryCloseTimer]);

  useEffect(() => {
    if (!desktopModal && !jewelryOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDesktopModal();
        closeJewelry();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [desktopModal, jewelryOpen, closeDesktopModal, closeJewelry]);

  return (
    <>
      {/* Announcement — SHIHARA slick-style rotating bar */}
      <div className="l-announcement-bar" aria-label="Announcements">
        <div className="l-announcement-bar__text-box">
          {announcements.map((item, i) => (
            <div
              key={item.text}
              className={cn(
                'l-announcement-bar__slide',
                i === announceIndex && 'is-active'
              )}
              aria-hidden={i !== announceIndex}
            >
              <Link
                href={item.href}
                className="l-announcement-bar__link-box l-announcement-bar__link-box--link"
              >
                <span className="l-announcement-bar__text">
                  <span className="l-announcement-bar__link">{item.text}</span>
                </span>
              </Link>
            </div>
          ))}
          <div className="l-announcement-bar__dots" role="tablist" aria-label="Announcement slides">
            {announcements.map((item, i) => (
              <button
                key={item.text}
                type="button"
                role="tab"
                aria-selected={i === announceIndex}
                className={cn('l-announcement-bar__dot', i === announceIndex && 'is-active')}
                onClick={() => setAnnounceIndex(i)}
                aria-label={`Announcement ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop header — naked / transparent like SHIHARA */}
      <header
        className={cn('l-header l-header--pc', desktopModal && 'l-header--menu-open')}
        role="banner"
      >
        <ul className="l-header__list l-header__list--left">
          <li
            className="l-header__item"
            onMouseEnter={() => openDesktopModal('collections')}
            onMouseLeave={scheduleCloseDesktopModal}
          >
            <button
              type="button"
              className="l-header__item-link"
              aria-expanded={desktopModal === 'collections'}
              aria-controls="desktop-menu-modal"
              onClick={() =>
                desktopModal === 'collections' ? closeDesktopModal() : openDesktopModal('collections')
              }
            >
              COLLECTIONS
            </button>
          </li>

          <li
            className={cn('l-header__item l-header__item--jewelry', jewelryOpen && 'is-open')}
            onMouseEnter={openJewelry}
            onMouseLeave={scheduleCloseJewelry}
          >
            <button
              type="button"
              className="l-header__item-link l-header__item-link--menu"
              aria-haspopup="true"
              aria-expanded={jewelryOpen}
              aria-controls="jewelry-menu"
              onClick={() => (jewelryOpen ? closeJewelry() : openJewelry())}
            >
              JEWELRY
            </button>
            <ul
              id="jewelry-menu"
              role="menu"
              className={cn('l-header__item-menu-list', jewelryOpen && 'is-open')}
            >
              {jewelryLinks.map((sub) => (
                <li
                  key={sub.label}
                  role="none"
                  className={cn(
                    'l-header__item-menu-item',
                    sub.break && 'l-header__item-menu-item--break'
                  )}
                >
                  <Link
                    role="menuitem"
                    href={sub.href}
                    className="l-header__item-link l-header__item-link--sub"
                    onClick={closeJewelry}
                  >
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li
            className={cn(
              'l-header__item l-header__item--stores',
              desktopModal === 'stores' && 'is-open'
            )}
            onMouseEnter={() => openDesktopModal('stores')}
            onMouseLeave={scheduleCloseDesktopModal}
          >
            <button
              type="button"
              className="l-header__item-link"
              aria-expanded={desktopModal === 'stores'}
              aria-controls="desktop-menu-modal"
              onClick={() =>
                desktopModal === 'stores' ? closeDesktopModal() : openDesktopModal('stores')
              }
            >
              STORES
            </button>
          </li>
        </ul>

        <Logo onNavigate={goHomeFromLogo} />

        <ul
          className="l-header__list l-header__list--right"
          onMouseEnter={() => {
            closeDesktopModal();
            closeJewelry();
          }}
        >
          <li className="l-header__item">
            <Link href="/journal" className="l-header__item-link">NOTES</Link>
          </li>
          <li className="l-header__item">
            <Link href="/projects" className="l-header__item-link">PROJECTS</Link>
          </li>
          <li className="l-header__item">
            <Link href="/atelier" className="l-header__item-link">ABOUT</Link>
          </li>
          <li className="l-header__item l-header__item--lang">
            <LanguageToggle />
          </li>
          <li className="l-header__item">
            <Link href="/login" className="l-header__item-link">LOGIN</Link>
          </li>
          <li className="l-header__item">
            <button
              type="button"
              className="l-header__item-link l-header__item-link--cart"
              aria-label={`Cart (${itemCount} items)`}
              onClick={() => setIsCartOpen(true)}
            >
              ({itemCount})
            </button>
          </li>
          <li className="l-header__item l-header__item--icon l-header__item--icon_bookmark">
            <Link href="/selection" className="l-header__item-link l-header__item-link--bookmark" aria-label="Selection">
              <BookmarkIcon />
            </Link>
          </li>
          <li className="l-header__item l-header__item--icon l-header__item--icon_loupe">
            <button
              type="button"
              className="l-header__item-link"
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <SearchIcon />
            </button>
          </li>
        </ul>
      </header>

      {/* COLLECTIONS / STORES — solid white full-page modal (SHIHARA) */}
      <div
        id="desktop-menu-modal"
        className={cn(
          'l-menu-modal',
          desktopModal && 'l-menu-modal--open',
          desktopModal === 'stores' && 'l-menu-modal--stores',
          desktopModal === 'collections' && 'l-menu-modal--collections'
        )}
        aria-hidden={!desktopModal}
        onMouseEnter={clearModalCloseTimer}
        onMouseLeave={scheduleCloseDesktopModal}
      >
        <div className="l-menu-modal__container">
          <div className="l-menu-modal__content">
            {desktopModal === 'collections' && (
              <CollectionsMenu collections={collectionLinks} onNavigate={closeDesktopModal} />
            )}
            {desktopModal === 'stores' && (
              <StoresMenu stores={storeLocations} onNavigate={closeDesktopModal} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <header
        className={cn('l-header l-header--sp', isMobileMenuOpen && 'l-header--open')}
        role="banner"
      >
        <ul className="l-header__list l-header__list--sp-left">
          <li className="l-header__item">
            <button
              type="button"
              className="l-header__item-link l-header__item-link--menu"
              aria-label="Open menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <MenuIcon />
            </button>
          </li>
          <li className="l-header__item">
            <Link href="/login" className="l-header__item-link l-header__item-link--account" aria-label="Account">
              <AccountIcon />
            </Link>
          </li>
        </ul>

        <Logo onNavigate={goHomeFromLogo} />

        <ul className="l-header__list l-header__list--sp-right">
          <li className="l-header__item">
            <button
              type="button"
              className="l-header__item-link l-header__item-link--cart"
              aria-label={`Cart (${itemCount})`}
              onClick={() => setIsCartOpen(true)}
            >
              ({itemCount})
            </button>
          </li>
        </ul>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile full-screen nav — SHIHARA l-nav-sp */}
      <div
        className={cn('l-nav-sp', isMobileMenuOpen && 'l-nav-sp--open')}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="l-nav-sp__wrapper">
          <button type="button" className="l-nav-sp__close" onClick={closeMobile} aria-label="Close menu">
            <CloseIcon />
          </button>
          <Logo onNavigate={goHomeFromLogo} />

          <div className="l-nav-sp__lang">
            <LanguageToggle />
          </div>

          <div className="l-nav-sp__body">
            {mobilePanel === 'root' && (
              <ul className="l-nav-sp__list">
                <li className="l-nav-sp__item">
                  <button type="button" onClick={() => setMobilePanel('collections')}>COLLECTIONS</button>
                </li>
                <li className="l-nav-sp__item">
                  <button type="button" onClick={() => setMobilePanel('jewelry')}>JEWELRY</button>
                </li>
                <li className="l-nav-sp__item">
                  <button type="button" onClick={() => setMobilePanel('stores')}>STORES</button>
                </li>
                <li className="l-nav-sp__item l-nav-sp__item--muted l-nav-sp__item--section">
                  <Link href="/journal" onClick={closeMobile}>NOTES</Link>
                </li>
                <li className="l-nav-sp__item l-nav-sp__item--muted">
                  <Link href="/projects" onClick={closeMobile}>PROJECTS</Link>
                </li>
                <li className="l-nav-sp__item l-nav-sp__item--muted">
                  <Link href="/atelier" onClick={closeMobile}>ABOUT</Link>
                </li>
                <li className="l-nav-sp__item l-nav-sp__item--muted">
                  <Link href="/login" onClick={closeMobile}>LOGIN</Link>
                </li>
                <li className="l-nav-sp__item l-nav-sp__item--muted">
                  <Link href="/selection" onClick={closeMobile}>SELECTION</Link>
                </li>
                <li className="l-nav-sp__item l-nav-sp__item--muted l-nav-sp__item--section">
                  <button type="button" onClick={() => { closeMobile(); setIsSearchOpen(true); }}>SEARCH</button>
                </li>
              </ul>
            )}

            {mobilePanel === 'collections' && (
              <ul className="l-nav-sp__list">
                <li className="l-nav-sp__item l-nav-sp__item--muted">
                  <button type="button" onClick={() => setMobilePanel('root')}>RETURN</button>
                </li>
                <li className="l-nav-sp__item">
                  <Link href="/collections" onClick={closeMobile}>VIEW ALL</Link>
                </li>
                {collectionLinks.map((c) => (
                  <li key={c.id} className="l-nav-sp__item">
                    <Link href={`/collections/${c.slug}`} onClick={closeMobile}>{c.name.toUpperCase()}</Link>
                  </li>
                ))}
                <li className="l-nav-sp__item">
                  <Link href="/gallery" onClick={closeMobile}>GALLERY VIEW</Link>
                </li>
              </ul>
            )}

            {mobilePanel === 'jewelry' && (
              <ul className="l-nav-sp__list">
                <li className="l-nav-sp__item l-nav-sp__item--muted">
                  <button type="button" onClick={() => setMobilePanel('root')}>RETURN</button>
                </li>
                {jewelryLinks.map((link) => (
                  <li key={link.label} className="l-nav-sp__item">
                    <Link href={link.href} onClick={closeMobile}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            )}

            {mobilePanel === 'stores' && (
              <div className="l-nav-sp__stores">
                <button type="button" className="l-nav-sp__return" onClick={() => setMobilePanel('root')}>
                  RETURN
                </button>
                <StoresMenu stores={storeLocations} onNavigate={closeMobile} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search overlay */}
      <div
        className={cn('l-overlay', isSearchOpen && 'is-open')}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        aria-hidden={!isSearchOpen}
      >
        <div className="l-search__top">
          <Logo onNavigate={goHomeFromLogo} />
          <button type="button" onClick={() => setIsSearchOpen(false)} className="l-nav-sp__close" aria-label="Close search">
            <CloseIcon />
          </button>
        </div>
        <div className="l-search__input-wrap">
          <input
            type="search"
            placeholder="SEARCH"
            className="l-search__input"
            autoFocus={isSearchOpen}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                setIsSearchOpen(false);
                window.location.href = `/gallery?q=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
          />
        </div>
        <div className="l-search__results">
          {searchQuery.trim().length >= 2 && searchResults.length === 0 && (
            <p className="l-search__empty">No results for “{searchQuery}”</p>
          )}
          {searchResults.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="l-search__result u-hover-fade"
              onClick={() => setIsSearchOpen(false)}
            >
              <img src={product.images[0]?.url} alt="" className="l-search__result-img" />
              <span className="l-search__result-name">{product.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
