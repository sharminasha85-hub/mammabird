import React, { useState } from 'react';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, Tag, ShieldCheck, Gift, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

export default function CartPage({ onNavigate }) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    itemsCount,
    itemsPrice,
    discountPrice,
    discountedItemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isFreeShipping,
    freeShippingProgress,
    amountNeededForFreeShipping,
    couponCode,
    applyCoupon,
    couponError,
    couponSuccess,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState(couponCode || '');
  const [giftWrapping, setGiftWrapping] = useState(true);
  const [giftNote, setGiftNote] = useState('');

  if (cartItems.length === 0) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '85vh', backgroundColor: '#FAF7F2' }}>
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center', padding: '60px 20px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-pink-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: 'var(--color-pink-deep)',
            }}
          >
            <ShoppingBag size={36} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-taupe-dark)', marginBottom: '12px' }}>
            Your Nesting Bag is Empty
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--color-taupe-muted)', lineHeight: 1.6, marginBottom: '28px' }}>
            Explore our curated collections of GOTS organic cotton and French linen garments tailored for ages 0–10 and mommy-and-me pairings.
          </p>
          <button
            onClick={() => onNavigate('shop')}
            style={{
              backgroundColor: 'var(--color-pink-deep)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '14px 36px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            Explore Organic Collection
          </button>
        </div>
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#FAF7F2' }}>
      <div className="container" style={{ paddingBottom: '80px' }}>
        {/* Title */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--color-taupe-dark)', margin: '0 0 6px 0' }}>
            Your Shopping Bag
          </h1>
          <p style={{ color: 'var(--color-taupe-muted)', fontSize: '0.92rem', margin: 0 }}>
            {itemsCount} organic heirloom piece{itemsCount > 1 ? 's' : ''} ready for your nest
          </p>
        </div>

        {/* Free Shipping Progress */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '16px 24px',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '28px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid rgba(115, 90, 75, 0.08)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-taupe-dark)', marginBottom: '8px' }}>
            <span>
              {isFreeShipping
                ? '✨ You qualify for FREE Heirloom Gift Shipping & Express Delivery!'
                : `Add $${amountNeededForFreeShipping.toFixed(2)} more for Free Express Delivery`}
            </span>
            <span>{freeShippingProgress}%</span>
          </div>
          <div style={{ height: '8px', width: '100%', backgroundColor: 'var(--bg-creme)', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${freeShippingProgress}%`,
                backgroundColor: isFreeShipping ? 'var(--color-sage)' : 'var(--color-pink-deep)',
                borderRadius: '4px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* Layout: Left Items Table + Right Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'start' }}>
          {/* Left: Items List */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-taupe)', textTransform: 'uppercase' }}>
                Item Details
              </span>
              <button
                onClick={clearCart}
                style={{ background: 'transparent', border: 'none', color: 'var(--color-taupe-muted)', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Empty Bag
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
              {cartItems.map((item) => (
                <div
                  key={item.key}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid rgba(115, 90, 75, 0.08)',
                  }}
                >
                  <div
                    style={{
                      width: '90px',
                      height: '110px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      backgroundColor: 'var(--bg-creme)',
                      flexShrink: 0,
                    }}
                  >
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--color-taupe-dark)', margin: '0 0 4px 0' }}>
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--color-taupe-muted)', cursor: 'pointer' }}
                        title="Remove"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--color-taupe-muted)', marginBottom: '12px' }}>
                      Size: <strong>{item.selectedSize}</strong>
                      {item.selectedColor && <span> • Shade: <strong>{item.selectedColor}</strong></span>}
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {/* Quantity Controller */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid var(--border-light)',
                          borderRadius: 'var(--radius-full)',
                          padding: '4px 10px',
                          background: 'var(--bg-creme)',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.key, -1)}
                          style={{ background: 'transparent', border: 'none', padding: '2px 8px', cursor: 'pointer', fontSize: '1rem' }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, minWidth: '22px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.key, 1)}
                          style={{ background: 'transparent', border: 'none', padding: '2px 8px', cursor: 'pointer', fontSize: '1rem' }}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gift Wrapping & Notes */}
            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--bg-creme)', borderRadius: 'var(--radius-md)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-taupe-dark)', cursor: 'pointer', marginBottom: '8px' }}>
                <input
                  type="checkbox"
                  checked={giftWrapping}
                  onChange={(e) => setGiftWrapping(e.target.checked)}
                />
                <Gift size={16} color="var(--color-pink-deep)" />
                <span>Complimentary Organic Heirloom Gift Wrapping with Bird Ribbon</span>
              </label>

              {giftWrapping && (
                <input
                  type="text"
                  placeholder="Optional handwritten gift note (e.g. 'Welcome to the world, baby Leo!')"
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.84rem',
                    backgroundColor: '#FFFFFF',
                  }}
                />
              )}
            </div>
          </div>

          {/* Right: Order Summary Box */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '28px', boxShadow: 'var(--shadow-md)', border: '1px solid rgba(115, 90, 75, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-taupe-dark)', margin: '0 0 20px 0' }}>
              Order Summary
            </h3>

            {/* Coupon Box */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Tag size={15} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-taupe-muted)' }} />
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 34px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                  }}
                />
              </div>
              <button
                onClick={() => applyCoupon(inputCoupon)}
                style={{
                  padding: '10px 18px',
                  backgroundColor: 'var(--color-taupe-dark)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Apply
              </button>
            </div>

            {couponSuccess && (
              <div style={{ fontSize: '0.78rem', color: 'var(--color-sage-deep)', fontWeight: 600, marginBottom: '16px' }}>
                ✓ {couponSuccess}
              </div>
            )}
            {couponError && (
              <div style={{ fontSize: '0.78rem', color: 'var(--color-pink-deep)', fontWeight: 600, marginBottom: '16px' }}>
                ⚠️ {couponError}
              </div>
            )}

            {/* Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', paddingBottom: '18px', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-taupe)' }}>
                <span>Subtotal ({itemsCount} items)</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>

              {discountPrice > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-pink-deep)', fontWeight: 700 }}>
                  <span>VIP Early Access Discount ({couponCode})</span>
                  <span>-${discountPrice.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-taupe)' }}>
                <span>Eco Shipping</span>
                <span>{shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-taupe)' }}>
                <span>Estimated Sales Tax</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '18px', marginBottom: '24px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                Estimated Total
              </span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => onNavigate('checkout')}
              style={{
                width: '100%',
                backgroundColor: 'var(--color-pink-deep)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '15px',
                fontSize: '1rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            {/* Return link */}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                onClick={() => onNavigate('shop')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-taupe)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <ArrowLeft size={14} />
                <span>Continue Browsing Collection</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
