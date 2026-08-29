import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart, Eye, X, Check, ArrowRight, Feather } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CAPSULE_PRODUCTS = [
  {
    id: 'p1',
    name: 'The Nestling Cable Knit Romper',
    category: 'baby',
    ageRange: '0 – 12 Months',
    badge: 'Pure Organic Knit',
    image: `${import.meta.env.BASE_URL}images/baby.jpg`,
    fabric: '100% GOTS Organic Combed Cotton',
    colors: ['#D59691', '#FAF7F2', '#DFCEBE'],
    description: 'Charming cable-knit baby romper with natural coconut buttons, envelope neckline, and ultra-soft ribbed cuffs.',
    features: ['Diaper-friendly snap bottom', 'Hypoallergenic organic knit', 'Pre-washed against shrinkage'],
  },
  {
    id: 'p2',
    name: 'Wanderer Linen Dungarees & Henley',
    category: 'toddler',
    ageRange: '1 – 3 Years',
    badge: 'French Flax Linen',
    image: `${import.meta.env.BASE_URL}images/toddler.jpg`,
    fabric: 'Pure French Washed Linen + Organic Waffle',
    colors: ['#735A4B', '#FAF7F2', '#8A977B'],
    description: 'Durable yet breathable toddler overalls paired with an ultra-cozy waffle-knit top. Grow-with-me adjustable straps.',
    features: ['Adjustable shoulder buttons', 'Double knee protection', 'Deep explorer pockets'],
  },
  {
    id: 'p3',
    name: 'Songbird Botanical Embroidered Dress',
    category: 'little',
    ageRange: '4 – 6 Years',
    badge: 'Hand-Embroidered',
    image: `${import.meta.env.BASE_URL}images/little_kids.jpg`,
    fabric: 'Organic Slub Linen & Cotton Lace',
    colors: ['#D59691', '#8A977B', '#FAF7F2'],
    description: 'Hand-embroidered mama bird motif with delicate meadow blossoms. Ruffle flutter sleeves and breezy gathered skirt.',
    features: ['Mother bird heirloom embroidery', 'Back mother-of-pearl buttons', '100% breathable natural fiber'],
  },
  {
    id: 'p4',
    name: 'The Young Aviator Chunky Knit & Chinos',
    category: 'junior',
    ageRange: '7 – 10 Years',
    badge: 'Heirloom Edition',
    image: `${import.meta.env.BASE_URL}images/big_kids.jpg`,
    fabric: 'Heavyweight Ribbed Cotton & Relaxed Flax',
    colors: ['#DFCEBE', '#735A4B', '#8A977B'],
    description: 'Sophisticated relaxed sweater with tailored drawstring linen trousers. Effortless elegance for active young minds.',
    features: ['Sensory-friendly tagless design', 'Comfort-stretch elastic waist', 'Garment dyed with plant dyes'],
  },
  {
    id: 'p5',
    name: 'Mommy & Me Meadow Blossom Gown Set',
    category: 'mommy-me',
    ageRange: 'Mother & Child Set',
    badge: 'Matching Heirlooms',
    image: `${import.meta.env.BASE_URL}images/mommy_me.jpg`,
    fabric: 'Tiered Organic Washed Linen',
    colors: ['#D59691', '#FAF7F2'],
    description: 'Harmonious matching tiered silhouettes in dusty rose. Made for sunny picnics, timeless family keepsakes, and sweet cuddles.',
    features: ['Includes Mother + Child dress', 'Hidden nursing-friendly zipper for mom', 'Lightweight summer drape'],
  },
  {
    id: 'p6',
    name: 'The First Flight Swaddle & Cocoon Set',
    category: 'baby',
    ageRange: '0 – 6 Months',
    badge: 'Quad-Layer Muslin',
    image: `${import.meta.env.BASE_URL}images/baby.jpg`,
    fabric: 'Quad-Layer Organic Muslin',
    colors: ['#FAF7F2', '#D59691', '#8A977B'],
    description: 'Feather-light quadruple gauze organic muslin blanket featuring delicate bird branch prints and matching newborn bonnet.',
    features: ['Ultra-breathable weave', 'Generous 120x120cm size', 'Gets softer with every wash'],
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Capsules' },
  { id: 'baby', label: '0–12M (Baby)' },
  { id: 'toddler', label: '1–3Y (Toddler)' },
  { id: 'little', label: '4–6Y (Little Kids)' },
  { id: 'junior', label: '7–10Y (Juniors)' },
  { id: 'mommy-me', label: 'Mommy & Me' },
];

export default function LookbookShowcase({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lookbook-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filtered =
    activeCategory === 'all'
      ? CAPSULE_PRODUCTS
      : CAPSULE_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="lookbook"
      style={{
        paddingTop: '24px',
        paddingBottom: '70px',
        backgroundColor: '#FAF7F2',
      }}
    >
      <div className="container">
        
        {/* Header */}
        <div className="section-header lookbook-header" style={{ marginBottom: '32px' }}>
          <span className="section-tag">Sneak Peek Lookbook</span>
          <h2 className="section-title">The Inaugural Capsule Collection</h2>
          <p className="section-description">
            Get an exclusive preview of our upcoming clothing line for ages 0 to 10 and matching mommy-and-me pieces, 
            crafted with pure organic fabrics and timeless simplicity.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '42px',
            flexWrap: 'wrap',
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`btn-outline-pill ${activeCategory === cat.id ? 'active' : ''}`}
              style={{
                fontSize: '0.86rem',
                padding: '9px 18px',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid-3" style={{ gap: '30px', marginBottom: '50px' }}>
          {filtered.map((item) => {
            return (
              <div
                key={item.id}
                className="luxury-card product-card"
                onClick={() => setSelectedProduct(item)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                {/* Image Container */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '4/3',
                    overflow: 'hidden',
                    background: 'var(--bg-creme)',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className="product-img-hover"
                  />

                  {/* Age Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      background: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(6px)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--color-taupe)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    Ages {item.ageRange}
                  </div>

                  {/* Aesthetic Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      background: 'var(--color-pink)',
                      color: '#FFFFFF',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 2px 8px rgba(213, 150, 145, 0.4)',
                    }}
                  >
                    <Feather size={12} />
                    <span>{item.badge}</span>
                  </div>

                  {/* Quick View Hover Indicator */}
                  <div
                    className="quick-view-overlay"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(115, 90, 75, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'var(--transition-smooth)',
                    }}
                  >
                    <span
                      style={{
                        background: '#FFFFFF',
                        color: 'var(--color-taupe)',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: 'var(--shadow-md)',
                      }}
                    >
                      <Eye size={14} /> Quick Look
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe-muted)', marginBottom: '4px' }}>
                      {item.fabric}
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.25rem',
                        color: 'var(--color-taupe-dark)',
                        marginBottom: '10px',
                        lineHeight: 1.3,
                      }}
                    >
                      {item.name}
                    </h3>

                    {/* Color swatches */}
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
                      {item.colors.map((c, i) => (
                        <div
                          key={i}
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            backgroundColor: c,
                            border: '1px solid rgba(115, 90, 75, 0.2)',
                          }}
                        />
                      ))}
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-taupe-muted)', marginLeft: '4px' }}>
                        {item.colors.length} shades
                      </span>
                    </div>
                  </div>

                  {/* Status row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe-muted)' }}>
                      Inaugural Capsule
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-pink-deep)' }}>
                      Click for details →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            textAlign: 'center',
            background: 'var(--bg-creme-warm)',
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
          }}
        >
          <span style={{ fontSize: '0.95rem', color: 'var(--color-taupe)', marginRight: '16px' }}>
            Discover our tailored designs for each growth stage from 0 to 10 years:
          </span>
          <a href="#ages" className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.85rem', display: 'inline-flex' }}>
            <Sparkles size={14} /> Explore Age Guide (0–10Y)
          </a>
        </div>

      </div>

      {/* Quick Look Modal */}
      {selectedProduct && (
        <div
          className="product-modal-backdrop"
          onClick={() => setSelectedProduct(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(67, 51, 40, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            className="product-modal-content glass-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '820px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-pink)',
            }}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--bg-creme)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-taupe)',
                zIndex: 10,
              }}
            >
              <X size={18} />
            </button>

            <div className="modal-inner-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '32px', padding: '32px' }}>
              <div>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    width: '100%',
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div>
                <div className="badge-nest" style={{ marginBottom: '10px', fontSize: '0.75rem' }}>
                  Ages: {selectedProduct.ageRange}
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-taupe-dark)', marginBottom: '8px' }}>
                  {selectedProduct.name}
                </h3>

                <div style={{ display: 'inline-block', marginBottom: '16px' }}>
                  <span className="badge-sage" style={{ fontSize: '0.75rem' }}>
                    {selectedProduct.badge} • Inaugural Drop
                  </span>
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-taupe-muted)', marginBottom: '18px', lineHeight: 1.6 }}>
                  {selectedProduct.description}
                </p>

                <div style={{ marginBottom: '18px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Key Features:
                  </span>
                  <ul style={{ listStyle: 'none', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {selectedProduct.features.map((f, idx) => (
                      <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--color-taupe)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Check size={14} color="var(--color-sage)" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: 'var(--bg-creme)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>Fabric & Sustainability:</span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-taupe-muted)', margin: 0 }}>
                    {selectedProduct.fabric} • Certified GOTS Organic • Non-toxic natural dyes • Machine washable on delicate.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      if (onNavigate) onNavigate('shop');
                    }}
                    className="btn-primary"
                    style={{ flex: 1, textAlign: 'center', padding: '12px' }}
                  >
                    <span>🛍️ Shop in Store (25% Off)</span>
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="btn-secondary"
                    style={{ padding: '12px 18px' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .product-card:hover .product-img-hover {
          transform: scale(1.06);
        }
        .product-card:hover .quick-view-overlay {
          opacity: 1;
        }
        @media (max-width: 768px) {
          .modal-inner-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            padding: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
