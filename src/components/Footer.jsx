import React from 'react';
import { Heart, Mail, ShieldCheck, Feather, Sparkles } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer({ onNavigate }) {
  const handleNav = (page, param = null) => {
    if (onNavigate) {
      onNavigate(page, param);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#F5EFEB',
        borderTop: '1px solid rgba(115, 90, 75, 0.12)',
        paddingTop: '80px',
        paddingBottom: '40px',
        position: 'relative',
      }}
    >
      <div className="container">
        
        {/* Main Footer Grid */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 0.8fr 0.8fr 1.1fr',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ marginBottom: '18px' }}>
              <BrandLogo size="medium" showSubtitle={true} />
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-taupe-muted)', lineHeight: 1.7, maxWidth: '320px' }}>
              Gentle organic clothing & heirloom pairings for kids aged 0 to 10. 
              Nesting pure comfort, sustainable fabrics, and everlasting memories into every stitch.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-taupe-dark)', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--color-taupe)', padding: 0 }}>
              <li>
                <button onClick={() => handleNav('shop')} style={{ background: 'transparent', border: 'none', color: 'var(--color-pink-deep)', fontWeight: 700, cursor: 'pointer', padding: 0 }}>
                  🛍️ Shop All Collection
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('home')} style={{ background: 'transparent', border: 'none', color: 'var(--color-taupe)', cursor: 'pointer', padding: 0 }}>
                  Our Story & Craft
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('account')} style={{ background: 'transparent', border: 'none', color: 'var(--color-taupe)', cursor: 'pointer', padding: 0 }}>
                  My Account & Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Age Collections */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-taupe-dark)', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Shop by Age
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--color-taupe)', padding: 0 }}>
              <li><button onClick={() => handleNav('shop')} style={{ background: 'transparent', border: 'none', color: 'var(--color-taupe)', cursor: 'pointer', padding: 0 }}>0–12M Nestling Baby</button></li>
              <li><button onClick={() => handleNav('shop')} style={{ background: 'transparent', border: 'none', color: 'var(--color-taupe)', cursor: 'pointer', padding: 0 }}>1–3Y Toddler Explorer</button></li>
              <li><button onClick={() => handleNav('shop')} style={{ background: 'transparent', border: 'none', color: 'var(--color-taupe)', cursor: 'pointer', padding: 0 }}>4–6Y Little Chirps</button></li>
              <li><button onClick={() => handleNav('shop')} style={{ background: 'transparent', border: 'none', color: 'var(--color-taupe)', cursor: 'pointer', padding: 0 }}>7–10Y Junior Aviator</button></li>
              <li><button onClick={() => handleNav('shop')} style={{ background: 'transparent', border: 'none', color: 'var(--color-taupe)', cursor: 'pointer', padding: 0 }}>Mommy & Me Sets</button></li>
            </ul>
          </div>

          {/* Sustainable Promise & Contact */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-taupe-dark)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Our Nest Promise
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe-muted)', marginBottom: '16px', lineHeight: 1.6 }}>
              Crafted ethically in small batches with 100% GOTS certified organic cotton, French linen, and safe botanical dyes.
            </p>

            <div
              style={{
                background: '#FFFFFF',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <ShieldCheck size={18} color="var(--color-sage)" />
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-taupe-dark)' }}>
                100% Certified Organic & Non-Toxic
              </span>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-taupe)',
                  transition: 'var(--transition-smooth)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="mailto:hello@mammabird.com"
                aria-label="Email"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-taupe)',
                  transition: 'var(--transition-smooth)',
                }}
              >
                <Mail size={16} />
              </a>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-taupe-muted)' }}>
                hello@mammabird.com
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright and Love Signature */}
        <div
          style={{
            borderTop: '1px solid rgba(115, 90, 75, 0.1)',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.82rem',
            color: 'var(--color-taupe-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>© {new Date().getFullYear()} mammaBird Kids Fashion. All Rights Reserved.</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Founded by Sharmina (Mom of 2 girls) with</span>
            <Heart size={14} fill="var(--color-pink)" color="var(--color-pink)" />
            <span>for little birds everywhere (Ages 0–10).</span>
          </div>
        </div>

      </div>

      <style>{`
        .footer-link:hover {
          color: var(--color-pink-deep);
          padding-left: 4px;
        }
        @media (max-width: 960px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 30px !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
