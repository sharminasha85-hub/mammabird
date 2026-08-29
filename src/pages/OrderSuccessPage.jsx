import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Sparkles, Package, Truck, ArrowRight, Home, Feather } from 'lucide-react';
import Footer from '../components/Footer';

export default function OrderSuccessPage({ order, onNavigate }) {
  useEffect(() => {
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D59691', '#8A977B', '#DFCEBE', '#735A4B'],
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const orderNum = order?.orderNumber || 'MB-2026-8491';
  const trackingNum = order?.trackingNumber || 'TRK-MB749281';

  return (
    <div className="order-success-page" style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#FAF7F2' }}>
      <div className="container" style={{ maxWidth: '760px', paddingBottom: '80px' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '48px 36px',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'center',
            border: '1px solid rgba(115, 90, 75, 0.08)',
          }}
        >
          {/* Top Check Icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(138, 151, 123, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: 'var(--color-sage-deep)',
            }}
          >
            <CheckCircle2 size={44} strokeWidth={2.5} />
          </div>

          <div className="badge-nest" style={{ display: 'inline-flex', marginBottom: '12px' }}>
            <Feather size={14} />
            <span>Order Confirmed & Nesting</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--color-taupe-dark)', margin: '0 0 10px 0' }}>
            Thank You for Nesting with mammaBird!
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--color-taupe-muted)', maxWidth: '520px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            We are gently hand-preparing your organic garments with heirloom care and packaging. A receipt and tracking details have been sent to your email.
          </p>

          {/* Order Meta Box */}
          <div
            style={{
              backgroundColor: 'var(--bg-creme)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px 24px',
              marginBottom: '32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px',
              textAlign: 'left',
              border: '1px solid var(--border-light)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-taupe-muted)', fontWeight: 600 }}>
                Order Number:
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                {orderNum}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-taupe-muted)', fontWeight: 600 }}>
                Estimated Delivery:
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-sage-deep)' }}>
                3 – 5 Business Days
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-taupe-muted)', fontWeight: 600 }}>
                Tracking ID:
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-taupe)' }}>
                {trackingNum}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-taupe-muted)', fontWeight: 600 }}>
                Payment Status:
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-sage-deep)' }}>
                ✓ Paid & Verified
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('account')}
              style={{
                backgroundColor: 'var(--color-taupe-dark)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '13px 28px',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Package size={16} />
              <span>View Order in Account</span>
            </button>

            <button
              onClick={() => onNavigate('shop')}
              style={{
                backgroundColor: 'var(--color-pink-deep)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '13px 28px',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>Continue Shopping</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
