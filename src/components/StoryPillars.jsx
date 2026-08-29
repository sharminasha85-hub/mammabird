import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Feather, Heart, Sparkles, Shield, Leaf, RefreshCw, SunMedium, Eye } from 'lucide-react';
import BrandLogo from './BrandLogo';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    icon: Feather,
    tag: 'Tender Comfort',
    title: 'Feather-Soft 100% Organic',
    description:
      'Spun from long-staple GOTS-certified organic cotton and breathable flax linen, our fabrics are combed repeatedly for that cloud-soft, weightless feel against delicate skin.',
    detail: 'Zero synthetic blends • Breathable micro-weaves',
    accentColor: '#D59691',
  },
  {
    icon: Leaf,
    tag: 'Pure Nature',
    title: 'Botanical & Hypoallergenic',
    description:
      'Dyed strictly with non-toxic, plant-derived botanical pigments and OEKO-TEX certified mineral washes. Free from formaldehyde, heavy metals, or artificial fragrances.',
    detail: 'Safe for eczema-prone skin • Sensitive-tested',
    accentColor: '#8A977B',
  },
  {
    icon: Heart,
    tag: 'Mother’s Care',
    title: 'Thoughtful Ergonomics',
    description:
      'Designed by mothers who know the daily dance: sensory-friendly tagless necklines, whisper-quiet magnetic buttons, expandable necklines, and roomy diaper room.',
    detail: 'No scratchy tags • Frictionless flatlock seams',
    accentColor: '#735A4B',
  },
  {
    icon: RefreshCw,
    tag: 'Sustainable Legacy',
    title: 'Heirloom Longevity',
    description:
      'Fast fashion has no home in our nest. Every piece is constructed with reinforced double-needle stitching, built to be cherished and lovingly passed down between siblings.',
    detail: 'Pre-washed against shrinkage • Heirloom gift ready',
    accentColor: '#B49E90',
  },
];

export default function StoryPillars() {
  const sectionRef = useRef(null);
  const [activePillar, setActivePillar] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Section Header
      gsap.from('.story-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Animate Pillar Cards
      gsap.from('.pillar-card', {
        scrollTrigger: {
          trigger: '.pillars-grid',
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
      });

      // Animate Mother quote card
      gsap.from('.mother-quote-box', {
        scrollTrigger: {
          trigger: '.mother-quote-box',
          start: 'top 85%',
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      style={{
        paddingTop: '70px',
        paddingBottom: '30px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      
      {/* Subtle Background Glows */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(213, 150, 145, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        
        {/* Section Header */}
        <div className="section-header story-header" style={{ marginBottom: '40px' }}>
          <span className="section-tag">The Mother’s Nest Philosophy</span>
          <h2 className="section-title">Crafted with Motherly Tenderness</h2>
          <p className="section-description">
            Just as a mother bird gathers only the softest twigs, down feathers, and leaves to build her nest, 
            we handpick every fiber to wrap your little ones in pure, non-toxic warmth.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="pillars-grid grid-4" style={{ marginBottom: '36px' }}>
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isHovered = activePillar === idx;

            return (
              <div
                key={idx}
                className="pillar-card luxury-card"
                onMouseEnter={() => setActivePillar(idx)}
                style={{
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  borderTop: `4px solid ${pillar.accentColor}`,
                }}
              >
                <div>
                  {/* Icon and Tag */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '16px',
                        backgroundColor: 'var(--bg-creme)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: pillar.accentColor,
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe-muted)' }}>
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.4rem',
                      color: 'var(--color-taupe-dark)',
                      marginBottom: '12px',
                      lineHeight: 1.25,
                    }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-taupe-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                    {pillar.description}
                  </p>
                </div>

                {/* Detail pill */}
                <div
                  style={{
                    background: 'var(--bg-creme-subtle)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--color-taupe-dark)',
                    border: '1px solid rgba(115, 90, 75, 0.08)',
                  }}
                >
                  ✨ {pillar.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Spotlight: The Mother's Touch Quote & Certification Banner */}
        <div
          className="mother-quote-box glass-panel"
          style={{
            borderRadius: 'var(--radius-xl)',
            padding: '40px',
            boxShadow: 'var(--shadow-md)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 240, 237, 0.9) 100%)',
            border: '1px solid var(--border-pink)',
          }}
        >
          <div className="quote-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '36px', alignItems: 'center' }}>
            
            {/* Quote content */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--color-pink)' }}>
                <Heart size={18} fill="var(--color-pink)" />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                  A Note from Our Founder & Mother of 2 Girls
                </span>
              </div>

              <blockquote
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)',
                  fontStyle: 'italic',
                  color: 'var(--color-taupe-dark)',
                  lineHeight: 1.5,
                  marginBottom: '16px',
                }}
              >
                “As a mother of two girls, I wanted every garment touching their skin to feel as tender and pure as a mother's embrace. We created mammaBird so parents everywhere can celebrate childhood in timeless, feather-soft organic pieces.”
              </blockquote>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-pink-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-pink-deep)',
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}
                >
                  S
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-taupe-dark)' }}>Sharmina</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-taupe-muted)' }}>Founder & Mom of 2 Girls • mammaBird</div>
                </div>
              </div>
            </div>

            {/* Certifications Badge Cluster */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '14px',
              }}
            >
              {[
                { title: 'GOTS Certified', desc: '100% Organic Standards' },
                { title: 'OEKO-TEX 100', desc: 'Zero Harmful Chemicals' },
                { title: 'Cruelty-Free', desc: 'Pure Plant Botanical Dyes' },
                { title: 'Carbon-Neutral', desc: 'Eco-Friendly Deliveries' },
              ].map((cert, i) => (
                <div
                  key={i}
                  style={{
                    background: '#FFFFFF',
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>{cert.title}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-taupe-muted)', marginTop: '2px' }}>{cert.desc}</div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .quote-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
