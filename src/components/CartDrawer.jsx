import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ onNavigate }) {
  const {
    cartItems,
    cartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
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

  if (!cartDrawerOpen) return null;

  const handleCheckout = () => {
    closeCartDrawer();
    if (onNavigate) {
      onNavigate('checkout');
    }
  };

  const handleViewCartPage = () => {
    closeCartDrawer();
    if (onNavigate) {
      onNavigate('cart');
    }
  };

  const handleExploreShop = () => {
    closeCartDrawer();
    if (onNavigate) {
      onNavigate('shop');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(50, 35, 25, 0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={closeCartDrawer}
    >
      <div
        className="cart-drawer-panel"
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-creme)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--color-taupe-dark)" />
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                margin: 0,
                color: 'var(--color-taupe-dark)',
              }}
            >
              Your Nesting Bag ({itemsCount})
            </h3>
          </div>
          <button
            onClick={closeCartDrawer}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-taupe)',
              padding: '6px',
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Indicator */}
        <div
          style={{
            padding: '12px 24px',
            backgroundColor: isFreeShipping ? 'rgba(138, 151, 123, 0.12)' : 'rgba(213, 150, 145, 0.12)',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-taupe-dark)', marginBottom: '6px' }}>
            <span>
              {isFreeShipping
                ? '✨ You have unlocked FREE Heirloom Shipping!'
                : `Add $${amountNeededForFreeShipping.toFixed(2)} more for Free Shipping`}
            </span>
            <span>{freeShippingProgress}%</span>
          </div>
          <div
            style={{
              height: '6px',
              width: '100%',
              backgroundColor: 'rgba(115, 90, 75, 0.12)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${freeShippingProgress}%`,
                backgroundColor: isFreeShipping ? 'var(--color-sage)' : 'var(--color-pink-deep)',
                borderRadius: '3px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* Drawer Body: Cart Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {cartItems.length === 0 ? (
            <div
              style={{
                margin: 'auto 0',
                textAlign: 'center',
                padding: '40px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-pink-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-pink-deep)',
                }}
              >
                <ShoppingBag size={32} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--color-taupe-dark)' }}>
                Your Nest Bag is Empty
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-taupe-muted)', maxWidth: '280px', lineHeight: 1.5 }}>
                Discover our gentle organic cotton and linen apparel for ages 0–10.
              </p>
              <button
                onClick={handleExploreShop}
                style={{
                  backgroundColor: 'var(--color-pink-deep)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '10px 24px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                Explore Organic Collection
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.key}
                style={{
                  display: 'flex',
                  gap: '14px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid rgba(115, 90, 75, 0.08)',
                }}
              >
                <div
                  style={{
                    width: '74px',
                    height: '86px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    backgroundColor: 'var(--bg-creme)',
                    flexShrink: 0,
                  }}
                >
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h5
                      style={{
                        fontSize: '0.92rem',
                        fontWeight: 600,
                        color: 'var(--color-taupe-dark)',
                        lineHeight: 1.3,
                        margin: '0 0 4px 0',
                      }}
                    >
                      {item.name}
                    </h5>
                    <button
                      onClick={() => removeFromCart(item.key)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-taupe-muted)',
                        cursor: 'pointer',
                        padding: '2px',
                      }}
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--color-taupe-muted)', marginBottom: '8px' }}>
                    Size: <strong style={{ color: 'var(--color-taupe)' }}>{item.selectedSize}</strong>
                    {item.selectedColor && (
                      <span> • {item.selectedColor}</span>
                    )}
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Quantity Selector */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-full)',
                        padding: '2px 6px',
                        background: 'var(--bg-creme)',
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.key, -1)}
                        style={{ background: 'transparent', border: 'none', padding: '2px 6px', cursor: 'pointer' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.key, 1)}
                        style={{ background: 'transparent', border: 'none', padding: '2px 6px', cursor: 'pointer' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Controls */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid var(--border-light)',
              backgroundColor: 'var(--bg-creme)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Promo Code Input */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Tag size={14} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-taupe-muted)' }} />
                <input
                  type="text"
                  placeholder="Promo Code (Try NESTLING25)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 32px',
                    fontSize: '0.8rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                />
              </div>
              <button
                onClick={() => applyCoupon(inputCoupon)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'var(--color-taupe-dark)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Apply
              </button>
            </div>

            {couponSuccess && (
              <div style={{ fontSize: '0.75rem', color: 'var(--color-sage-deep)', fontWeight: 600 }}>
                ✓ {couponSuccess}
              </div>
            )}
            {couponError && (
              <div style={{ fontSize: '0.75rem', color: 'var(--color-pink-deep)', fontWeight: 600 }}>
                ⚠️ {couponError}
              </div>
            )}

            {/* Price Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-taupe)' }}>
                <span>Subtotal</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              {discountPrice > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-pink-deep)', fontWeight: 600 }}>
                  <span>VIP Discount</span>
                  <span>-${discountPrice.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-taupe)' }}>
                <span>Estimated Shipping</span>
                <span>{shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-taupe-dark)', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid rgba(115, 90, 75, 0.1)' }}>
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleCheckout}
              style={{
                width: '100%',
                backgroundColor: 'var(--color-pink-deep)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '13px',
                fontSize: '0.95rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={handleViewCartPage}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-taupe)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'center',
                textDecoration: 'underline',
              }}
            >
              View Full Shopping Bag & Gift Notes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
