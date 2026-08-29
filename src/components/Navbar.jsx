import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Feather } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Story', href: '#story' },
    { name: 'Ages (0–10Y)', href: '#ages' },
    { name: 'Capsule Preview', href: '#lookbook' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`navbar-wrapper ${isScrolled ? 'is-scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'var(--transition-smooth)',
        padding: isScrolled ? '10px 0' : '18px 0',
        backgroundColor: isScrolled ? 'rgba(250, 247, 242, 0.94)' : 'rgba(250, 247, 242, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled ? '1px solid rgba(115, 90, 75, 0.1)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 4px 20px rgba(115, 90, 75, 0.05)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a href="#" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <BrandLogo size="small" />
          <span className="badge-sage desktop-only" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
            Ages 0–10Y
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: '0.92rem',
                fontWeight: 500,
                color: 'var(--color-taupe)',
                letterSpacing: '0.3px',
                position: 'relative',
              }}
              className="nav-link-hover"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="badge-nest desktop-only" style={{ padding: '6px 16px', fontSize: '0.78rem' }}>
            <Feather size={14} className="feather-glow" />
            <span>Landing Autumn 2026</span>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              display: 'none',
              color: 'var(--color-taupe)',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(250, 247, 242, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border-light)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--color-taupe)',
                padding: '8px 0',
                borderBottom: '1px dashed rgba(115, 90, 75, 0.1)',
              }}
            >
              {link.name}
            </a>
          ))}
          <div className="badge-nest" style={{ marginTop: '8px', alignSelf: 'flex-start' }}>
            <Feather size={14} />
            <span>Online Store Landing Soon (Ages 0–10)</span>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav, .desktop-only {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        .nav-link-hover {
          position: relative;
        }
        .nav-link-hover::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--color-pink);
          transition: var(--transition-smooth);
          transform: translateX(-50%);
          border-radius: 2px;
        }
        .nav-link-hover:hover {
          color: var(--color-pink-deep);
        }
        .nav-link-hover:hover::after {
          width: 100%;
        }
      `}</style>
    </header>
  );
}
