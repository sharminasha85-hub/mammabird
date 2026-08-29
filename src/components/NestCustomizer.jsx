import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Package, Heart, Check, Gift, ArrowRight, RotateCcw } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PALETTES = [
  { id: 'blush', name: 'Dusty Rose Blossom', color: '#D59691', bg: '#FDF2F0', desc: 'Soft petal blush and warm porcelain' },
  { id: 'oat', name: 'Warm Oat & Linen', color: '#B49E90', bg: '#F9F5F0', desc: 'Creamy neutrals and toasted wheat' },
  { id: 'sage', name: 'Sage & Olive Leaf', color: '#8A977B', bg: '#F2F6F0', desc: 'Calming botanical green & dew mist' },
  { id: 'mocha', name: 'Earth Mocha & Taupe', color: '#735A4B', bg: '#F5EFEB', desc: 'Warm woodland clay & hazelnut' },
];

const AGE_OPTIONS = [
  { id: 'baby', label: '0–12 Months', title: 'Newborn Nest' },
  { id: 'toddler', label: '1–3 Years', title: 'Toddler Play' },
  { id: 'little', label: '4–6 Years', title: 'Little Explorer' },
  { id: 'junior', label: '7–10 Years', title: 'Junior Flight' },
  { id: 'mommy-me', label: 'Mom & Child', title: 'Matching Pair' },
];

const VIBE_OPTIONS = [
  { id: 'everyday', label: 'Everyday Cloud Comfort', icon: '☁️', desc: 'Ultra-soft play, nap, and crawl essentials' },
  { id: 'occasion', label: 'Heirloom & Celebrations', icon: '🕊️', desc: 'Embroidered botanical dresses & family sets' },
  { id: 'cozy', label: 'Cozy Knit Nesting', icon: '🧶', desc: 'Chunky organic cardigans & warm waffle layers' },
];

export default function NestCustomizer() {
  const [selectedAge, setSelectedAge] = useState('toddler');
  const [selectedPalette, setSelectedPalette] = useState('blush');
  const [selectedVibe, setSelectedVibe] = useState('everyday');
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.customizer-header', {
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

  const handleBuildNest = () => {
    setIsRevealed(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D59691', '#8A977B', '#DFCEBE', '#F6DCD6'],
      });
    } catch (e) {}
  };

  const getCapsuleDetails = () => {
    const ageObj = AGE_OPTIONS.find((a) => a.id === selectedAge);
    const palObj = PALETTES.find((p) => p.id === selectedPalette);
    const vibeObj = VIBE_OPTIONS.find((v) => v.id === selectedVibe);

    let items = [];
    let retailPrice = 142;
    let vipPrice = 106.5;

    if (selectedAge === 'baby') {
      items = [
        '1x GOTS Organic Cable Knit Romper',
        '1x Breathable Muslin Bird Swaddle (120x120cm)',
        '1x Hand-carved Beechwood Bird Teething Rattle',
      ];
      retailPrice = 110;
      vipPrice = 82.5;
    } else if (selectedAge === 'toddler') {
      items = [
        '1x Grow-With-Me French Linen Dungarees',
        '1x Organic Combed Cotton Waffle Henley',
        '1x Organic Cotton Keepsake Drawstring Pouch',
      ];
      retailPrice = 128;
      vipPrice = 96;
    } else if (selectedAge === 'little') {
      items = [
        '1x Botanical Songbird Embroidered Dress / Romper',
        '1x Chunky Heirloom Knit Cardigan',
        '1x Mama Bird Keepsake Story Card',
      ];
      retailPrice = 145;
      vipPrice = 108.75;
    } else if (selectedAge === 'junior') {
      items = [
        '1x Heavyweight Organic Ribbed Pullover',
        '1x Tailored Drawstring French Linen Trousers',
        '1x Sensory-Friendly Waffle Undershirt',
      ];
      retailPrice = 158;
      vipPrice = 118.5;
    } else {
      items = [
        '1x Mother Matching Tiered Linen Dress',
        '1x Child Matching Meadow Linen Outfit',
        '1x Hand-Embroidered Mother Bird Keepsake Ribbon',
      ];
      retailPrice = 195;
      vipPrice = 146.25;
    }

    return { ageObj, palObj, vibeObj, items, retailPrice, vipPrice };
  };

  const bundle = getCapsuleDetails();

  return (
    <section
      ref={sectionRef}
      id="builder"
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-creme-warm)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        
        {/* Header */}
        <div className="section-header customizer-header">
          <span className="section-tag">Interactive Capsule Builder</span>
          <h2 className="section-title">Build Your Child's First Nest</h2>
          <p className="section-description">
            Customize a capsule wardrobe tailored to your child's age group (0–10Y) and favorite color palette. 
            Unlock a tailored launch bundle and special early bird savings.
          </p>
        </div>

        {/* Interactive Workspace Grid */}
        <div
          className="builder-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '36px',
            alignItems: 'start',
          }}
        >
          {/* Left: Configuration Steps */}
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              borderRadius: 'var(--radius-xl)',
              background: '#FFFFFF',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {/* Step 1: Select Age */}
            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--color-pink-light)',
                    color: 'var(--color-pink-deep)',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  1
                </span>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--color-taupe-dark)' }}>Select Age Range:</h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                {AGE_OPTIONS.map((a) => {
                  const isActive = selectedAge === a.id;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setSelectedAge(a.id)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        background: isActive ? 'var(--color-pink-light)' : 'var(--bg-creme)',
                        border: isActive ? '2px solid var(--color-pink)' : '1px solid var(--border-light)',
                        textAlign: 'center',
                        transition: 'var(--transition-smooth)',
                      }}
                    >
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: isActive ? 'var(--color-pink-deep)' : 'var(--color-taupe-dark)' }}>
                        {a.label}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-taupe-muted)', marginTop: '2px' }}>
                        {a.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Color Palette */}
            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--color-pink-light)',
                    color: 'var(--color-pink-deep)',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  2
                </span>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--color-taupe-dark)' }}>Choose Earth Tone Palette:</h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {PALETTES.map((p) => {
                  const isActive = selectedPalette === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPalette(p.id)}
                      style={{
                        padding: '14px',
                        borderRadius: 'var(--radius-md)',
                        background: isActive ? '#FFFFFF' : 'var(--bg-creme)',
                        border: isActive ? `2px solid ${p.color}` : '1px solid var(--border-light)',
                        boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textAlign: 'left',
                      }}
                    >
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: p.color,
                          flexShrink: 0,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                        }}
                      />
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-taupe-muted)' }}>
                          {p.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Wardrobe Mood */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--color-pink-light)',
                    color: 'var(--color-pink-deep)',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  3
                </span>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--color-taupe-dark)' }}>Select Capsule Mood:</h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {VIBE_OPTIONS.map((v) => {
                  const isActive = selectedVibe === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVibe(v.id)}
                      style={{
                        padding: '12px 10px',
                        borderRadius: 'var(--radius-md)',
                        background: isActive ? 'var(--color-pink-light)' : 'var(--bg-creme)',
                        border: isActive ? '2px solid var(--color-pink)' : '1px solid var(--border-light)',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '1.3rem', marginBottom: '4px' }}>{v.icon}</div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                        {v.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleBuildNest}
              className="btn-primary"
              style={{ width: '100%', padding: '16px', fontSize: '1rem' }}
            >
              <Sparkles size={18} />
              <span>Generate My Child's Custom Nest</span>
            </button>
          </div>

          {/* Right: Live Box Preview */}
          <div
            className="glass-panel"
            style={{
              padding: '32px',
              borderRadius: 'var(--radius-xl)',
              background: '#FFFFFF',
              border: `2px solid ${bundle.palObj.color}`,
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top decorative ribbon */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: bundle.palObj.color,
                color: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '6px 20px',
                borderRadius: '0 0 0 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Gift size={13} />
              <span>Personalized Capsule</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Package size={22} color={bundle.palObj.color} />
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe-muted)' }}>
                  mammaBird Bespoke Box
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-taupe-dark)' }}>
                  {bundle.ageObj.title} Capsule
                </h3>
              </div>
            </div>

            {/* Palette swatch bar */}
            <div
              style={{
                background: bundle.palObj.bg,
                border: `1px solid ${bundle.palObj.color}40`,
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                  Theme: {bundle.palObj.name}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-taupe-muted)' }}>
                  {bundle.vibeObj.label}
                </div>
              </div>
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: bundle.palObj.color,
                }}
              />
            </div>

            {/* Included Pieces List */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-taupe-muted)', marginBottom: '10px' }}>
                Included Hand-Crafted Pieces:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {bundle.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-creme-subtle)',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: 'var(--color-taupe-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      border: '1px solid rgba(115, 90, 75, 0.08)',
                    }}
                  >
                    <Check size={15} color="var(--color-sage)" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bundle Pricing calculation */}
            <div
              style={{
                borderTop: '1px dashed var(--border-light)',
                paddingTop: '16px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-taupe-muted)' }}>Standard Capsule Value:</span>
                <span style={{ fontSize: '0.95rem', textDecoration: 'line-through', color: 'var(--color-taupe-muted)' }}>
                  ${bundle.retailPrice.toFixed(2)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                  VIP Early Bird Price (25% Off):
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-pink-deep)' }}>
                  ${bundle.vipPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Lock in CTA */}
            <a
              href="#waitlist"
              className="btn-primary"
              style={{ width: '100%', textAlign: 'center', padding: '12px' }}
            >
              <span>Lock in This Custom Bundle</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .builder-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
