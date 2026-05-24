import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Projects', href: '#projects' },
  { label: 'Publications', href: '#publications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(9, 9, 11, 0.85)' : 'rgba(9, 9, 11, 0.4)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          transition: 'background 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 clamp(24px, 5vw, 80px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 60,
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#fafafa',
              textDecoration: 'none',
            }}
          >
            Abdul Wahid
          </a>

          {/* Desktop nav */}
          <div
            style={{ display: 'flex', gap: 32 }}
            className="hidden md:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 13,
                  fontWeight: 300,
                  color: '#a1a1aa',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fafafa')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#a1a1aa')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
            }}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fafafa" strokeWidth="1.5">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(9, 9, 11, 0.98)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'absolute',
              top: 16,
              right: 24,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
            }}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fafafa" strokeWidth="1.5">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: 24,
                fontWeight: 300,
                color: '#a1a1aa',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fafafa')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#a1a1aa')}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
