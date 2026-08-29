import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, User, Menu, X, Feather, Sparkles, LogOut, ShieldCheck, ChevronDown } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ currentPage, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { itemsCount, openCartDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout, openAuthModal } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page, param = null) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    if (onNavigate) {
      onNavigate(page, param);
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
        padding: isScrolled ? '10px 0' : '16px 0',
        backgroundColor: isScrolled ? 'rgba(250, 247, 242, 0.96)' : 'rgba(250, 247, 242, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled ? '1px solid rgba(115, 90, 75, 0.1)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 4px 20px rgba(115, 90, 75, 0.06)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left: Brand Logo */}
        <button
          onClick={() => handleNav('home')}
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
          className="nav-brand"
        >
          <BrandLogo size="small" />
          <span className="badge-sage desktop-only" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
            Ages 0–10Y
          </span>
        </button>

        {/* Center: Desktop Navigation */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <button
            onClick={() => handleNav('home')}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '0.92rem',
              fontWeight: currentPage === 'home' ? 700 : 500,
              color: currentPage === 'home' ? 'var(--color-pink-deep)' : 'var(--color-taupe)',
              cursor: 'pointer',
              padding: '6px 0',
            }}
            className="nav-link-hover"
          >
            Home & Story
          </button>

          <button
            onClick={() => handleNav('shop')}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '0.92rem',
              fontWeight: currentPage === 'shop' ? 700 : 600,
              color: currentPage === 'shop' ? 'var(--color-pink-deep)' : 'var(--color-taupe-dark)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 0',
            }}
            className="nav-link-hover"
          >
            <span>Shop Collection</span>
            <span
              style={{
                fontSize: '0.68rem',
                backgroundColor: 'var(--color-pink-light)',
                color: 'var(--color-pink-deep)',
                padding: '2px 6px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
              }}
            >
              VIP 25%
            </span>
          </button>

          <button
            onClick={() => {
              if (currentPage !== 'home') handleNav('home');
              setTimeout(() => {
                const el = document.getElementById('ages');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '0.92rem',
              fontWeight: 500,
              color: 'var(--color-taupe)',
              cursor: 'pointer',
              padding: '6px 0',
            }}
            className="nav-link-hover"
          >
            Ages (0–10Y) Guide
          </button>

          <button
            onClick={() => {
              if (currentPage !== 'home') handleNav('home');
              setTimeout(() => {
                const el = document.getElementById('lookbook');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '0.92rem',
              fontWeight: 500,
              color: 'var(--color-taupe)',
              cursor: 'pointer',
              padding: '6px 0',
            }}
            className="nav-link-hover"
          >
            Capsule Lookbook
          </button>

          {isAdmin && (
            <button
              onClick={() => handleNav('admin')}
              style={{
                background: 'var(--color-taupe-dark)',
                color: '#FFFFFF',
                border: 'none',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <ShieldCheck size={13} />
              <span>Admin Portal</span>
            </button>
          )}
        </nav>

        {/* Right Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Wishlist Button */}
          <button
            onClick={() => handleNav('account', 'wishlist')}
            title="Wishlist"
            style={{
              position: 'relative',
              background: 'transparent',
              border: 'none',
              color: 'var(--color-taupe)',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  backgroundColor: 'var(--color-pink-deep)',
                  color: '#FFFFFF',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {wishlistCount}
              </span>
            )}
          </button>

          {/* User Account / Auth Dropdown */}
          <div style={{ position: 'relative' }}>
            {isAuthenticated ? (
              <div>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'var(--bg-creme)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-full)',
                    padding: '6px 12px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--color-taupe-dark)',
                    cursor: 'pointer',
                  }}
                >
                  <User size={15} color="var(--color-pink-deep)" />
                  <span className="desktop-only">{user?.name?.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </button>

                {userDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '110%',
                      right: 0,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-lg)',
                      border: '1px solid var(--border-light)',
                      padding: '8px 0',
                      minWidth: '190px',
                      zIndex: 100,
                    }}
                  >
                    <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border-light)', fontSize: '0.8rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-taupe-dark)' }}>{user?.name}</div>
                      <div style={{ color: 'var(--color-taupe-muted)', fontSize: '0.72rem' }}>{user?.email}</div>
                    </div>

                    <button
                      onClick={() => handleNav('account')}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 16px',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '0.85rem',
                        color: 'var(--color-taupe)',
                        cursor: 'pointer',
                      }}
                    >
                      👤 My Account & Orders
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => handleNav('admin')}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          background: 'transparent',
                          border: 'none',
                          fontSize: '0.85rem',
                          color: 'var(--color-taupe)',
                          cursor: 'pointer',
                        }}
                      >
                        ⚡ Admin Dashboard
                      </button>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 16px',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '0.85rem',
                        color: '#b84444',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        borderTop: '1px solid var(--border-light)',
                      }}
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-taupe)',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                }}
              >
                <User size={19} />
                <span className="desktop-only">Sign In</span>
              </button>
            )}
          </div>

          {/* Cart Bag Drawer Trigger */}
          <button
            onClick={openCartDrawer}
            style={{
              backgroundColor: 'var(--color-pink-deep)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 3px 12px rgba(184, 114, 108, 0.28)',
              transition: 'var(--transition-fast)',
            }}
            className="cart-nav-btn"
          >
            <ShoppingBag size={17} />
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
              {itemsCount}
            </span>
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'none',
              color: 'var(--color-taupe)',
              padding: '6px',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
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
            gap: '14px',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <button
            onClick={() => handleNav('home')}
            style={{
              textAlign: 'left',
              background: 'transparent',
              border: 'none',
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'var(--color-taupe-dark)',
              padding: '8px 0',
              borderBottom: '1px dashed rgba(115, 90, 75, 0.1)',
            }}
          >
            Home & Brand Story
          </button>

          <button
            onClick={() => handleNav('shop')}
            style={{
              textAlign: 'left',
              background: 'transparent',
              border: 'none',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--color-pink-deep)',
              padding: '8px 0',
              borderBottom: '1px dashed rgba(115, 90, 75, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>🛍️ Shop Organic Collection</span>
            <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--color-pink-light)', padding: '2px 8px', borderRadius: '10px' }}>
              25% Off
            </span>
          </button>

          <button
            onClick={() => handleNav('account')}
            style={{
              textAlign: 'left',
              background: 'transparent',
              border: 'none',
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'var(--color-taupe-dark)',
              padding: '8px 0',
              borderBottom: '1px dashed rgba(115, 90, 75, 0.1)',
            }}
          >
            👤 My Account & Order History
          </button>

          {isAdmin && (
            <button
              onClick={() => handleNav('admin')}
              style={{
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--color-taupe-dark)',
                padding: '8px 0',
                borderBottom: '1px dashed rgba(115, 90, 75, 0.1)',
              }}
            >
              ⚡ Admin Management Dashboard
            </button>
          )}

          <div
            style={{
              marginTop: '10px',
              padding: '12px',
              backgroundColor: 'var(--bg-creme)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8rem',
              color: 'var(--color-taupe)',
            }}
          >
            <Sparkles size={14} color="var(--color-pink-deep)" />
            <span>Use VIP coupon code <strong>NESTLING25</strong></span>
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
          transition: var(--transition-fast);
        }
        .nav-link-hover::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--color-pink-deep);
          transition: var(--transition-smooth);
          transform: translateX(-50%);
          border-radius: 2px;
        }
        .nav-link-hover:hover {
          color: var(--color-pink-deep) !important;
        }
        .nav-link-hover:hover::after {
          width: 100%;
        }
      `}</style>
    </header>
  );
}
