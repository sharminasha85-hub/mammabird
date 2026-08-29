import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Baby, Footprints, Compass, Feather, HeartHandshake, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AGE_STAGES = [
  {
    id: 'baby',
    range: '0 – 12 Months',
    title: 'The Nestling Newborns',
    subtitle: 'Ultra-gentle cocooning for first days and tender snoozes',
    icon: Baby,
    image: `${import.meta.env.BASE_URL}images/baby.jpg`,
    badge: 'Stage 01 • Pure Cocoon',
    color: '#D59691',
    features: [
      '100% Organic GOTS-certified ultra-soft waffle knit',
      'Magnetic & nickel-free snaps for effortless 2am changes',
      'Seamless flatlock stitching (zero chafing on delicate skin)',
      'Fold-over scratch mitts & expandable envelope necks',
    ],
    capsuleHighlights: 'Cable Knit Rompers, Cocoon Swaddles, Organic Booties',
  },
  {
    id: 'toddler',
    range: '1 – 3 Years',
    title: 'The Little Fledglings',
    subtitle: 'Flexible, durable comfort for first steps and playground wanders',
    icon: Footprints,
    image: `${import.meta.env.BASE_URL}images/toddler.jpg`,
    badge: 'Stage 02 • First Steps',
    color: '#735A4B',
    features: [
      'Grow-with-me adjustable straps & foldable ankle cuffs',
      'Double-stitched reinforced knees for crawling & tumbling',
      'Naturally breathable French linen regulating temperature',
      'Easy-pull elasticated backs for quick potty training',
    ],
    capsuleHighlights: 'Linen Dungarees, Waffle Henley Shirts, Earth Bloom Sets',
  },
  {
    id: 'little',
    range: '4 – 6 Years',
    title: 'The Young Chirpers',
    subtitle: 'Free-spirited designs tailored for imagination, play, and joy',
    icon: Compass,
    image: `${import.meta.env.BASE_URL}images/little_kids.jpg`,
    badge: 'Stage 03 • Little Explorers',
    color: '#8A977B',
    features: [
      'Self-dressing friendly silhouettes (promotes independence)',
      'Gentle plant-derived botanical dyes (zero harsh chemicals)',
      'Deep adventure-ready pockets for collecting treasures',
      'Heirloom botanical embroidery inspired by songbirds',
    ],
    capsuleHighlights: 'Botanical Linen Dresses, Play Rompers, Cozy Knit Cardigans',
  },
  {
    id: 'junior',
    range: '7 – 10 Years',
    title: 'The Soaring Juniors',
    subtitle: 'Timeless refined casuals engineered for comfort and elevated style',
    icon: Feather,
    image: `${import.meta.env.BASE_URL}images/big_kids.jpg`,
    badge: 'Stage 04 • Soaring Wings',
    color: '#B49E90',
    features: [
      'Premium heavyweight organic cotton & garment-dyed linen',
      'Modern relaxed unisex cuts with tailored detailing',
      'Sensory-friendly tagless collars & ultra-soft ribbing',
      'Built to withstand active school days and weekend trips',
    ],
    capsuleHighlights: 'Chunky Pullovers, Tailored Linen Pants, Classic Overshirts',
  },
  {
    id: 'mommy-me',
    range: 'Mom & Child Pairing',
    title: 'Mommy & Me Heirlooms',
    subtitle: 'Harmonious mother-and-child matching pieces for lasting memories',
    icon: HeartHandshake,
    image: `${import.meta.env.BASE_URL}images/mommy_me.jpg`,
    badge: 'Special • Timeless Bond',
    color: '#D59691',
    features: [
      'Matching mother-daughter & mother-son organic palettes',
      'Flattering breezy linen silhouettes for effortless elegance',
      'Signature mother bird & chick embroidery accents',
      'Perfect for family portraits, holidays & sunny afternoons',
    ],
    capsuleHighlights: 'Matching Tiered Linen Dresses, Artisan Lounge Sets',
  },
];

export default function AgesGuide({ onNavigate }) {
  const [activeStage, setActiveStage] = useState(0);
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ages-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.ages-tabs-bar', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const current = AGE_STAGES[activeStage];

  return (
    <section
      ref={sectionRef}
      id="ages"
      style={{
        paddingTop: '70px',
        paddingBottom: '70px',
        backgroundColor: 'var(--bg-creme-warm)',
        position: 'relative',
        borderTop: '1px solid rgba(115, 90, 75, 0.08)',
        borderBottom: '1px solid rgba(115, 90, 75, 0.08)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header ages-header">
          <span className="section-tag">Ages 0 – 10 Years & Beyond</span>
          <h2 className="section-title">Designed for Every Stage of Flight</h2>
          <p className="section-description">
            Just like little birds growing their wings, every age requires thoughtful design. 
            Discover how mammaBird tailors pure organic fabrics and smart functionality for kids aged 0 to 10.
          </p>
        </div>

        {/* Interactive Age Selector Tabs */}
        <div
          className="ages-tabs-bar"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          {AGE_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activeStage === idx;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-full)',
                  background: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
                  border: isActive ? '2px solid var(--color-pink)' : '1px solid var(--border-light)',
                  boxShadow: isActive ? 'var(--shadow-md)' : 'none',
                  color: isActive ? 'var(--color-taupe-dark)' : 'var(--color-taupe-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.88rem',
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                  transition: 'var(--transition-smooth)',
                }}
              >
                <Icon size={16} color={isActive ? 'var(--color-pink)' : 'var(--color-taupe-muted)'} />
                <span>{stage.range}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep-Dive Card */}
        <div
          ref={cardsContainerRef}
          className="glass-panel"
          style={{
            borderRadius: 'var(--radius-xl)',
            padding: '36px',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid rgba(213, 150, 145, 0.3)',
            background: '#FFFFFF',
          }}
        >
          <div className="stage-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '40px', alignItems: 'center' }}>
            
            {/* Left Content */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span className="badge-nest" style={{ fontSize: '0.78rem' }}>
                  {current.badge}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-taupe-muted)' }}>
                  Ages: {current.range}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  color: 'var(--color-taupe-dark)',
                  marginBottom: '10px',
                }}
              >
                {current.title}
              </h3>

              <p style={{ fontSize: '1.05rem', color: 'var(--color-taupe-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                {current.subtitle}
              </p>

              {/* Feature Bullet Points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                {current.features.map((feature, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-pink-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '2px',
                        flexShrink: 0,
                      }}
                    >
                      <Check size={14} color="var(--color-pink-deep)" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: '0.95rem', color: 'var(--color-taupe)', fontWeight: 500 }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Capsule Highlights Box */}
              <div
                style={{
                  background: 'var(--bg-creme)',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: '4px solid var(--color-pink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe-muted)' }}>
                    Upcoming Capsule Pieces:
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                    {current.capsuleHighlights}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate && onNavigate('shop')}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--color-pink-deep)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <span>Shop This Milestone</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Right Image Visual */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)',
                  aspectRatio: '4/3',
                  border: '4px solid #FFFFFF',
                  background: 'var(--bg-creme)',
                }}
              >
                <img
                  src={current.image}
                  alt={current.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                />
              </div>

              {/* Watermark Tag */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--color-taupe)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                mammaBird {current.range}
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .stage-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
