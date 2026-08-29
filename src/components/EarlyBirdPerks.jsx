import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Gift, Clock, Truck, ShieldCheck, ChevronDown, Star, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PERKS = [
  {
    icon: Sparkles,
    title: '25% Launch Discount',
    desc: 'Receive an exclusive one-time 25% discount voucher redeemable on our entire 0–10Y and Mommy & Me collection on day one.',
    badge: 'Guaranteed Saving',
  },
  {
    icon: Gift,
    title: 'Heirloom Keepsake Bag',
    desc: 'The first 500 early bird orders receive a complimentary hand-embroidered GOTS organic cotton keepsake dustbag.',
    badge: '$24 Gift Value',
  },
  {
    icon: Clock,
    title: '48-Hour VIP Headstart',
    desc: 'Shop the inaugural limited-run small batch 48 hours before public launch to guarantee your preferred sizing and prints.',
    badge: 'Priority Access',
  },
  {
    icon: Truck,
    title: 'Free Express Shipping',
    desc: 'Enjoy carbon-neutral priority express shipping on your very first order, delivered directly to your doorstep in plastic-free packaging.',
    badge: 'Worldwide Perks',
  },
];

const FAQS = [
  {
    q: 'What age groups do mammaBird collections cater to?',
    a: 'mammaBird caters to children aged 0 to 10 years across four tailored stages: Newborn Nestlings (0–12M), Toddler Fledglings (1–3Y), Little Chirpers (4–6Y), and Junior Aviators (7–10Y), plus our signature Mommy & Me matching heirloom outfits.',
  },
  {
    q: 'Are your fabrics truly 100% certified organic?',
    a: 'Yes, all our cotton fabrics are certified by the Global Organic Textile Standard (GOTS). Our linen is grown organically in Normandy, France, and all dyes are non-toxic, plant-based OEKO-TEX Standard 100 compliant, making them safe for sensitive and newborn skin.',
  },
  {
    q: 'How does the sizing work for growing kids?',
    a: 'We design with "Grow-With-Me" features including double-button adjustable shoulder straps, foldable ribbed cuffs, and elasticized waistbands that naturally span across growth spurts.',
  },
  {
    q: 'When will mammaBird officially launch?',
    a: 'Our launch is slated for Autumn 2026. VIP waitlist members will receive early access invitations 48 hours prior to public opening.',
  },
];

export default function EarlyBirdPerks() {
  const [openFaq, setOpenFaq] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.perks-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.perk-box', {
        scrollTrigger: {
          trigger: '.perks-grid',
          start: 'top 80%',
        },
        y: 35,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="perks" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header perks-header">
          <span className="section-tag">Early Bird Privileges</span>
          <h2 className="section-title">Why Join the mammaBird Nest Today?</h2>
          <p className="section-description">
            Because we produce in small, ethical heirloom batches, our inaugural capsule will be strictly limited. 
            Join over 400+ parents reserving their VIP early access.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="perks-grid grid-4" style={{ marginBottom: '70px' }}>
          {PERKS.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="perk-box luxury-card"
                style={{
                  padding: '30px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#FFFFFF',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-pink-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-pink-deep)',
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <span className="badge-sage" style={{ fontSize: '0.7rem' }}>
                      {perk.badge}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.35rem',
                      color: 'var(--color-taupe-dark)',
                      marginBottom: '10px',
                    }}
                  >
                    {perk.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--color-taupe-muted)', lineHeight: 1.6 }}>
                    {perk.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Testimonials Bar */}
        <div
          className="glass-panel"
          style={{
            borderRadius: 'var(--radius-xl)',
            padding: '36px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(246, 220, 214, 0.4) 100%)',
            border: '1px solid var(--border-pink)',
            marginBottom: '70px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '8px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#D4AF37" color="#D4AF37" />
              ))}
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-taupe-dark)' }}>
              Loved by Our Parent Preview Panel
            </h3>
          </div>

          <div className="grid-3" style={{ gap: '24px' }}>
            {[
              {
                quote: '“The fabric quality is unreal. My 6-month-old has sensitive skin and this romper is softer than anything we have bought from big retailers.”',
                author: 'Sophie M.',
                role: 'Mom of Leo (6m)',
              },
              {
                quote: '“The grow-with-me cuffs on the toddler overalls saved us! My 2-year-old wears it nonstop and it washes beautifully without fading.”',
                author: 'David & Clara K.',
                role: 'Parents of Maya (2y)',
              },
              {
                quote: '“Matching with my 7-year-old daughter in the dusty rose linen dress brought tears to my eyes. True heirloom quality to cherish.”',
                author: 'Hannah R.',
                role: 'Mom of Chloe (7y)',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  padding: '22px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--color-taupe)', marginBottom: '14px', lineHeight: 1.6 }}>
                  {item.quote}
                </p>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>{item.author}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-taupe-muted)' }}>{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="section-tag">Got Questions?</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-taupe-dark)' }}>
              Parent Questions Answered
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    overflow: 'hidden',
                    transition: 'var(--transition-smooth)',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    style={{
                      width: '100%',
                      padding: '18px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '0.98rem',
                      color: 'var(--color-taupe-dark)',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        color: 'var(--color-pink-deep)',
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 24px 20px 24px', fontSize: '0.9rem', color: 'var(--color-taupe-muted)', lineHeight: 1.65 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
