import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Heart, Sparkles, Clock, ShieldCheck, Feather, ArrowDown, CheckCircle2, Leaf, SunMedium } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function HeroSection() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);
  const countdownRef = useRef(null);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    // Launch countdown timer
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14);
    targetDate.setHours(targetDate.getHours() + 8);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // GSAP Intro animation timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(badgeRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.9,
      })
        .from(
          titleRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 1.1,
          },
          '-=0.5'
        )
        .from(
          '.hero-subtext',
          {
            y: 25,
            opacity: 0,
            duration: 0.9,
          },
          '-=0.7'
        )
        .from(
          countdownRef.current,
          {
            scale: 0.95,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          '.hero-feature-pills',
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
          },
          '-=0.5'
        )
        .from(
          imageRef.current,
          {
            x: 60,
            opacity: 0,
            scale: 0.95,
            duration: 1.3,
            ease: 'expo.out',
          },
          '-=1.2'
        )
        .from(
          '.hero-floating-badge',
          {
            scale: 0,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=0.6'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToLookbook = (e) => {
    e.preventDefault();
    const target = document.querySelector('#lookbook');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToStory = (e) => {
    e.preventDefault();
    const target = document.querySelector('#story');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        minHeight: '100vh',
        paddingTop: '130px',
        paddingBottom: '90px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(246, 220, 214, 0.45) 0%, rgba(250, 247, 242, 0.9) 70%)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Ambient Nest Background Glows */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(213, 150, 145, 0.18) 0%, rgba(250, 247, 242, 0) 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '2%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(138, 151, 123, 0.15) 0%, rgba(250, 247, 242, 0) 70%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Column: Story, Title, Countdown, and Highlights */}
          <div className="hero-content">
            
            {/* Top Logo & Badge Row */}
            <div
              ref={badgeRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '22px',
              }}
            >
              <BrandLogo size="medium" />
              <div className="badge-nest">
                <Feather size={15} className="feather-glow" />
                <span>Landing Soon • Online Store (Ages 0–10)</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1
              ref={titleRef}
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 4.1rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                color: 'var(--color-taupe-dark)',
                lineHeight: 1.12,
                marginBottom: '20px',
                letterSpacing: '-0.5px',
              }}
            >
              Nesting Love in <br />
              <span
                style={{
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-pink)',
                  position: 'relative',
                }}
              >
                Every Gentle Thread.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="hero-subtext"
              style={{
                fontSize: '1.15rem',
                color: 'var(--color-taupe-muted)',
                lineHeight: 1.7,
                maxWidth: '560px',
                marginBottom: '28px',
              }}
            >
              From tender newborn cuddles to free-spirited childhood adventures. 
              <strong> mammaBird</strong> crafts GOTS-certified organic cotton & breathable French linen 
              apparel designed with motherly care for children aged <strong>0 to 10 years</strong>.
            </p>

            {/* Countdown Box */}
            <div
              ref={countdownRef}
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-lg)',
                padding: '18px 24px',
                marginBottom: '32px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '24px',
                border: '1px solid rgba(213, 150, 145, 0.25)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-pink-deep)' }}>
                <Clock size={20} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Hatching In:
                </span>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                {[
                  { val: timeLeft.days, label: 'Days' },
                  { val: timeLeft.hours, label: 'Hours' },
                  { val: timeLeft.minutes, label: 'Mins' },
                  { val: timeLeft.seconds, label: 'Secs' },
                ].map((item, i) => (
                  <div key={i} style={{ textAlign: 'center', minWidth: '46px' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.6rem',
                        fontWeight: 700,
                        color: 'var(--color-taupe-dark)',
                        lineHeight: 1,
                      }}
                    >
                      {String(item.val).padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-taupe-muted)', letterSpacing: '0.5px', marginTop: '3px' }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons & Brand Pillars */}
            <div className="hero-feature-pills" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a
                  href="#lookbook"
                  onClick={handleScrollToLookbook}
                  className="btn-primary"
                  style={{ padding: '14px 28px' }}
                >
                  <Sparkles size={16} />
                  <span>Preview Collection</span>
                </a>
                <a
                  href="#story"
                  onClick={handleScrollToStory}
                  className="btn-secondary"
                  style={{ padding: '14px 24px' }}
                >
                  <span>Our Story & Philosophy</span>
                  <ArrowDown size={15} />
                </a>
              </div>

              {/* Guarantees row */}
              <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--color-taupe-muted)', paddingTop: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={15} color="var(--color-sage)" /> 100% GOTS Organic Cotton
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={15} color="var(--color-sage)" /> Ages 0 to 10 Years & Mommy & Me
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={15} color="var(--color-sage)" /> Plant-Based Botanical Dyes
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual & Floating Luxury Highlights */}
          <div ref={imageRef} className="hero-visual-wrapper" style={{ position: 'relative' }}>
            
            {/* Main Arch Lifestyle Photo */}
            <div
              style={{
                position: 'relative',
                borderRadius: '260px 260px 36px 36px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '8px solid #FFFFFF',
                aspectRatio: '4/5',
                background: 'var(--color-pink-light)',
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/hero.jpg`}
                alt="mammaBird mother and children wearing organic apparel"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s ease',
                }}
                className="hero-main-img"
              />

              {/* Gradient overlay at bottom */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(115, 90, 75, 0.4) 0%, transparent 40%)',
                }}
              />

              {/* Tag on image */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, display: 'block' }}>
                  "Soft as a mother's embrace"
                </span>
                <span style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.9 }}>
                  Heirloom Kids & Mommy Pairings (0–10Y)
                </span>
              </div>
            </div>

            {/* Floating Highlight Badge 1: 100% GOTS Organic */}
            <div
              className="hero-floating-badge glass-panel"
              style={{
                position: 'absolute',
                top: '12%',
                left: '-24px',
                borderRadius: 'var(--radius-full)',
                padding: '10px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-sage-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-sage-dark)',
                }}
              >
                <ShieldCheck size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>100% GOTS Certified</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-taupe-muted)' }}>Pure Organic Cotton</div>
              </div>
            </div>

            {/* Floating Highlight Badge 2: Ages 0 to 10 Years */}
            <div
              className="hero-floating-badge glass-panel"
              style={{
                position: 'absolute',
                bottom: '18%',
                right: '-20px',
                borderRadius: 'var(--radius-lg)',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-pink-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-pink-deep)',
                }}
              >
                <Heart size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>Ages 0 to 10 Years</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-taupe-muted)' }}>Tailored for every growth stage</div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-visual-wrapper {
            max-width: 420px;
            margin: 0 auto;
          }
          .hero-floating-badge {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
