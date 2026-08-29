import React from 'react';
import { Filter, X, RotateCcw, Sparkles } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export default function FilterSidebar({ isMobile = false, onCloseMobile = null }) {
  const { filters, updateFilter, resetFilters } = useProducts();

  const ageGroups = [
    { id: 'all', label: 'All Ages (0–10Y)' },
    { id: 'baby', label: '0 – 12M (Baby)' },
    { id: 'toddler', label: '1 – 3Y (Toddler)' },
    { id: 'little', label: '4 – 6Y (Little Kids)' },
    { id: 'junior', label: '7 – 10Y (Juniors)' },
    { id: 'mommy-me', label: 'Mommy & Me Sets' },
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'rompers', label: 'Rompers & Onesies' },
    { id: 'dresses', label: 'Botanical Dresses' },
    { id: 'dungarees', label: 'Linen Dungarees' },
    { id: 'knitwear', label: 'Chunky Knits' },
    { id: 'sets', label: 'Matching Sets' },
    { id: 'accessories', label: 'Swaddles & Bonnets' },
  ];

  const fabrics = [
    { id: 'all', label: 'All Natural Fabrics' },
    { id: 'Cotton', label: '100% GOTS Organic Cotton' },
    { id: 'Linen', label: 'Pure French Washed Linen' },
    { id: 'Waffle', label: 'Organic Thermal Waffle' },
    { id: 'Muslin', label: 'Quad-Layer Muslin Gauze' },
  ];

  const pricePresets = [
    { label: 'All Prices', min: '', max: '' },
    { label: 'Under $50', min: '', max: '50' },
    { label: '$50 – $80', min: '50', max: '80' },
    { label: '$80 – $150', min: '80', max: '150' },
  ];

  return (
    <aside
      className="filter-sidebar"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        border: '1px solid rgba(115, 90, 75, 0.08)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '14px', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} color="var(--color-pink-deep)" />
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: 0, color: 'var(--color-taupe-dark)' }}>
            Filter Collection
          </h4>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={resetFilters}
            title="Reset Filters"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-taupe-muted)',
              fontSize: '0.78rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>

          {isMobile && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              style={{
                background: 'var(--bg-creme)',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* 1. Age Group Filter */}
      <div>
        <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-taupe)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Age Group
        </h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {ageGroups.map((ag) => (
            <button
              key={ag.id}
              onClick={() => updateFilter('ageGroup', ag.id)}
              style={{
                textAlign: 'left',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.84rem',
                fontWeight: filters.ageGroup === ag.id ? 700 : 500,
                backgroundColor: filters.ageGroup === ag.id ? 'var(--color-pink-light)' : 'transparent',
                color: filters.ageGroup === ag.id ? 'var(--color-pink-deep)' : 'var(--color-taupe)',
                border: 'none',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{ag.label}</span>
              {filters.ageGroup === ag.id && <span style={{ fontSize: '0.75rem' }}>✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Category Filter */}
      <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
        <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-taupe)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Category
        </h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilter('category', cat.id)}
              style={{
                textAlign: 'left',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.84rem',
                fontWeight: filters.category === cat.id ? 700 : 500,
                backgroundColor: filters.category === cat.id ? 'var(--bg-creme)' : 'transparent',
                color: filters.category === cat.id ? 'var(--color-taupe-dark)' : 'var(--color-taupe)',
                border: filters.category === cat.id ? '1px solid var(--border-light)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Fabric Filter */}
      <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
        <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-taupe)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Organic Fabric
        </h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {fabrics.map((f) => (
            <button
              key={f.id}
              onClick={() => updateFilter('fabric', f.id)}
              style={{
                textAlign: 'left',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.84rem',
                fontWeight: filters.fabric === f.id ? 700 : 500,
                backgroundColor: filters.fabric === f.id ? 'rgba(138, 151, 123, 0.15)' : 'transparent',
                color: filters.fabric === f.id ? 'var(--color-sage-deep)' : 'var(--color-taupe)',
                border: 'none',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Price Filter */}
      <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
        <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-taupe)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Price Range
        </h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {pricePresets.map((p, idx) => {
            const isSelected = filters.minPrice === p.min && filters.maxPrice === p.max;
            return (
              <button
                key={idx}
                onClick={() => {
                  updateFilter('minPrice', p.min);
                  updateFilter('maxPrice', p.max);
                }}
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.84rem',
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected ? 'var(--color-pink-light)' : 'transparent',
                  color: isSelected ? 'var(--color-pink-deep)' : 'var(--color-taupe)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* VIP Discount Reminder */}
      <div
        style={{
          marginTop: 'auto',
          backgroundColor: 'var(--bg-creme)',
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--color-pink)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-pink-deep)' }}>
          <Sparkles size={13} />
          <span>VIP Early Access Promo</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--color-taupe-dark)' }}>
          Use code <strong>NESTLING25</strong> for 25% off all organic items at checkout!
        </div>
      </div>
    </aside>
  );
}
