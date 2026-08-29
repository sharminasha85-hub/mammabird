import React, { useState } from 'react';
import { Search, SlidersHorizontal, Grid, List, Sparkles, Feather, X, ShoppingBag } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import QuickViewModal from '../components/QuickViewModal';
import Footer from '../components/Footer';

export default function ShopPage({ onNavigate }) {
  const { products, loading, filters, updateFilter, resetFilters } = useProducts();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'compact'

  const activeFilterCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.ageGroup !== 'all' ? 1 : 0) +
    (filters.fabric !== 'all' ? 1 : 0) +
    (filters.minPrice || filters.maxPrice ? 1 : 0) +
    (filters.keyword ? 1 : 0);

  return (
    <div className="shop-page" style={{ paddingTop: '90px', minHeight: '100vh', backgroundColor: '#FAF7F2' }}>
      {/* 1. Header Banner */}
      <div
        style={{
          padding: '40px 0 32px',
          borderBottom: '1px solid var(--border-light)',
          background: 'linear-gradient(to bottom, #FFFFFF 0%, #FAF7F2 100%)',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '780px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge-nest" style={{ fontSize: '0.78rem' }}>
                <Feather size={14} />
                <span>100% Certified GOTS Organic</span>
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  backgroundColor: 'var(--color-pink-light)',
                  color: 'var(--color-pink-deep)',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                }}
              >
                VIP Coupon: NESTLING25 (25% Off)
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: 'var(--color-taupe-dark)',
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              Organic Kids Apparel Collection
            </h1>

            <p style={{ fontSize: '1rem', color: 'var(--color-taupe-muted)', margin: 0, lineHeight: 1.6 }}>
              Heirloom-quality clothing tailored for children aged <strong>0 to 10 years</strong> and matching <strong>Mommy & Me</strong> pairs. Handcrafted with breathable French linen, waffle knits, and botanical dyes.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Shop Area */}
      <div className="container" style={{ padding: '36px 20px 80px' }}>
        {/* Search & Sort Controls Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '28px',
            padding: '16px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid rgba(115, 90, 75, 0.08)',
          }}
        >
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '420px' }}>
            <Search
              size={16}
              style={{ position: 'absolute', left: '14px', top: '13px', color: 'var(--color-taupe-muted)' }}
            />
            <input
              type="text"
              placeholder="Search organic rompers, linen, dresses..."
              value={filters.keyword || ''}
              onChange={(e) => updateFilter('keyword', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-creme)',
                fontSize: '0.88rem',
              }}
            />
            {filters.keyword && (
              <button
                onClick={() => updateFilter('keyword', '')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '10px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-taupe-muted)',
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Right Controls: Sort & Mobile Filter Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="mobile-filter-trigger"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-creme)',
                border: '1px solid var(--border-light)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--color-taupe-dark)',
                cursor: 'pointer',
              }}
            >
              <SlidersHorizontal size={15} />
              <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </button>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-taupe-muted)' }}>
                Sort:
              </span>
              <select
                value={filters.sort || 'newest'}
                onChange={(e) => updateFilter('sort', e.target.value)}
                style={{
                  padding: '9px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-light)',
                  backgroundColor: 'var(--bg-creme)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-taupe-dark)',
                  cursor: 'pointer',
                }}
              >
                <option value="newest">✨ New Arrivals</option>
                <option value="popular">🔥 Most Popular</option>
                <option value="rating">⭐ Highest Rated</option>
                <option value="price-asc">💵 Price: Low to High</option>
                <option value="price-desc">💎 Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Chips */}
        {activeFilterCount > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-taupe-muted)', textTransform: 'uppercase' }}>
              Active Filters:
            </span>

            {filters.ageGroup !== 'all' && (
              <span className="filter-chip">
                <span>Age: {filters.ageGroup.toUpperCase()}</span>
                <button onClick={() => updateFilter('ageGroup', 'all')}><X size={12} /></button>
              </span>
            )}

            {filters.category !== 'all' && (
              <span className="filter-chip">
                <span>Category: {filters.category}</span>
                <button onClick={() => updateFilter('category', 'all')}><X size={12} /></button>
              </span>
            )}

            {filters.fabric !== 'all' && (
              <span className="filter-chip">
                <span>Fabric: {filters.fabric}</span>
                <button onClick={() => updateFilter('fabric', 'all')}><X size={12} /></button>
              </span>
            )}

            {(filters.minPrice || filters.maxPrice) && (
              <span className="filter-chip">
                <span>Price: ${filters.minPrice || 0} - ${filters.maxPrice || 'Any'}</span>
                <button onClick={() => { updateFilter('minPrice', ''); updateFilter('maxPrice', ''); }}><X size={12} /></button>
              </span>
            )}

            {filters.keyword && (
              <span className="filter-chip">
                <span>"{filters.keyword}"</span>
                <button onClick={() => updateFilter('keyword', '')}><X size={12} /></button>
              </span>
            )}

            <button
              onClick={resetFilters}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '0.78rem',
                color: 'var(--color-pink-deep)',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'underline',
                marginLeft: '6px',
              }}
            >
              Clear All
            </button>
          </div>
        )}

        {/* Layout Grid: Left Sidebar + Right Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px', alignItems: 'start' }} className="shop-grid-layout">
          {/* Desktop Filter Sidebar */}
          <div className="desktop-filter-col">
            <FilterSidebar />
          </div>

          {/* Products Grid Column */}
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--color-taupe)' }}>
                <div className="badge-nest" style={{ display: 'inline-flex', marginBottom: '14px' }}>
                  <Sparkles size={16} />
                  <span>Loading mammaBird Collection...</span>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  padding: '60px 30px',
                  textAlign: 'center',
                  border: '1px dashed var(--border-light)',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-pink-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: 'var(--color-pink-deep)',
                  }}
                >
                  <ShoppingBag size={28} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-taupe-dark)', marginBottom: '8px' }}>
                  No Products Match Your Filters
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-taupe-muted)', maxWidth: '420px', margin: '0 auto 24px' }}>
                  Try relaxing your search terms or clearing some filters to explore our full organic catalog.
                </p>
                <button
                  onClick={resetFilters}
                  style={{
                    backgroundColor: 'var(--color-pink-deep)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '12px 28px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div>
                {/* Result count */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-taupe-muted)', fontWeight: 500 }}>
                    Showing <strong style={{ color: 'var(--color-taupe-dark)' }}>{products.length}</strong> organic heirloom pieces
                  </span>
                </div>

                {/* Cards Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '24px',
                  }}
                >
                  {products.map((product) => (
                    <ProductCard
                      key={product._id || product.id}
                      product={product}
                      onNavigate={onNavigate}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal Drawer */}
      {mobileFilterOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(50, 35, 25, 0.6)',
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-start',
          }}
          onClick={() => setMobileFilterOpen(false)}
        >
          <div
            style={{
              width: '85%',
              maxWidth: '340px',
              height: '100%',
              backgroundColor: '#FFFFFF',
              overflowY: 'auto',
              padding: '16px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <FilterSidebar isMobile={true} onCloseMobile={() => setMobileFilterOpen(false)} />
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal onNavigate={onNavigate} />

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

      <style>{`
        .filter-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background-color: var(--color-pink-light);
          color: var(--color-pink-deep);
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 600;
        }
        .filter-chip button {
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          cursor: pointer;
          color: var(--color-pink-deep);
          padding: 0;
        }
        @media (max-width: 900px) {
          .shop-grid-layout {
            grid-template-columns: 1fr !important;
          }
          .desktop-filter-col {
            display: none !important;
          }
          .mobile-filter-trigger {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
}
