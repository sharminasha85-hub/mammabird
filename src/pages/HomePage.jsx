import React from 'react';
import { ShoppingBag, ArrowRight, Sparkles, Feather, Heart, Leaf, ShieldCheck } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import AgesGuide from '../components/AgesGuide';
import StoryPillars from '../components/StoryPillars';
import LookbookShowcase from '../components/LookbookShowcase';
import Footer from '../components/Footer';
import { useProducts } from '../context/ProductContext';
import { getAssetUrl } from '../utils/assetUrl';

export default function HomePage({ onNavigate }) {
  const { updateFilter } = useProducts();

  const handleAgeCategoryClick = (ageGroupId) => {
    updateFilter('ageGroup', ageGroupId);
    if (onNavigate) {
      onNavigate('shop');
    }
  };

  const ageCategories = [
    {
      id: 'baby',
      range: '0 – 12 Months',
      title: 'Baby & Newborn',
      subtitle: 'Pure organic waffle rompers & cocoon swaddles',
      image: getAssetUrl('images/baby.jpg'),
      badge: 'Stage 01',
    },
    {
      id: 'toddler',
      range: '1 – 3 Years',
      title: 'Toddler Fledglings',
      subtitle: 'Durable French washed linen dungarees & sets',
      image: getAssetUrl('images/toddler.jpg'),
      badge: 'Stage 02',
    },
    {
      id: 'little',
      range: '4 – 6 Years',
      title: 'Little Explorers',
      subtitle: 'Handcrafted botanical dresses & play sets',
      image: getAssetUrl('images/little_kids.jpg'),
      badge: 'Stage 03',
    },
    {
      id: 'junior',
      range: '7 – 10 Years',
      title: 'Junior Aviators',
      subtitle: 'Chunky cotton knits & tailored linen trousers',
      image: getAssetUrl('images/big_kids.jpg'),
      badge: 'Stage 04',
    },
    {
      id: 'mommy-me',
      range: 'Mother & Child',
      title: 'Mommy & Me Sets',
      subtitle: 'Matching keepsake heirloom tiered dresses',
      image: getAssetUrl('images/mommy_me.jpg'),
      badge: 'Heirloom Special',
    },
  ];

  return (
    <div className="home-page-view">
      {/* 1. Hero Section */}
      <HeroSection onNavigate={onNavigate} />

      {/* 2. Shop by Age Group Showcase Grid */}
      <section
        style={{
          padding: '60px 0 80px',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--border-light)',
          borderBottom: '1px solid var(--border-light)',
          position: 'relative',
        }}
      >
        <div className="container">
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px' }}>
            <div
              className="badge-nest"
              style={{ display: 'inline-flex', marginBottom: '12px', fontSize: '0.78rem' }}
            >
              <Sparkles size={13} />
              <span>Tailored for Every Milestone</span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                color: 'var(--color-taupe-dark)',
                marginBottom: '14px',
              }}
            >
              Shop by Age & Milestone
            </h2>
            <p style={{ fontSize: '1.02rem', color: 'var(--color-taupe-muted)', lineHeight: 1.6 }}>
              From tender newborn snoozes to lively junior adventures, explore GOTS organic cotton and French linen apparel designed to grow with your child.
            </p>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            {ageCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleAgeCategoryClick(cat.id)}
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '3/4',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'var(--transition-smooth)',
                }}
                className="category-card-hover"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                  className="cat-img"
                />

                {/* Gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(50, 35, 25, 0.88) 0%, rgba(50, 35, 25, 0.25) 50%, rgba(0,0,0,0) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '24px',
                    color: '#FFFFFF',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: 'var(--color-pink-light)',
                      marginBottom: '4px',
                    }}
                  >
                    {cat.range}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.45rem',
                      margin: '0 0 6px 0',
                      color: '#FFFFFF',
                    }}
                  >
                    {cat.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'rgba(255, 255, 255, 0.82)',
                      margin: '0 0 14px 0',
                      lineHeight: 1.4,
                    }}
                  >
                    {cat.subtitle}
                  </p>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--color-pink-light)',
                    }}
                  >
                    <span>Shop Milestone</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Banner Button */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button
              onClick={() => onNavigate && onNavigate('shop')}
              style={{
                backgroundColor: 'var(--color-pink-deep)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '14px 36px',
                fontSize: '1rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
                transition: 'var(--transition-fast)',
              }}
              className="cta-btn-hover"
            >
              <ShoppingBag size={18} />
              <span>Explore All Organic Clothing (Ages 0–10)</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive Ages Guide */}
      <AgesGuide onNavigate={onNavigate} />

      {/* 4. Story Pillars Philosophy */}
      <StoryPillars />

      {/* 5. Capsule Lookbook Preview */}
      <LookbookShowcase onNavigate={onNavigate} />

      {/* 6. Footer */}
      <Footer onNavigate={onNavigate} />

      <style>{`
        .category-card-hover:hover .cat-img {
          transform: scale(1.08);
        }
        .category-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
        }
        .cta-btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(184, 114, 108, 0.4);
        }
      `}</style>
    </div>
  );
}
