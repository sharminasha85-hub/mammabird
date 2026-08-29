import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, QrCode, Banknote, ArrowRight, CheckCircle2, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/api';
import Footer from '../components/Footer';

export default function CheckoutPage({ onNavigate, setCompletedOrder }) {
  const { cartItems, itemsCount, itemsPrice, discountPrice, shippingPrice, taxPrice, totalPrice, couponCode, clearCart } = useCart();
  const { user, token, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.name || 'Jessica Reynolds',
    email: user?.email || 'customer@mammabird.com',
    phone: user?.phone || '+1 (555) 382-9912',
    street: '742 Evergreen Meadow Way',
    apartment: 'Suite 4B',
    city: 'Portland',
    state: 'OR',
    zipCode: '97201',
    country: 'United States',
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [submitting, setSubmitting] = useState(false);

  // Card details dummy state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('849');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setSubmitting(true);
    try {
      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          product: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor || 'Natural',
        })),
        guestEmail: formData.email,
        shippingAddress: {
          fullName: formData.fullName,
          street: formData.street,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          phone: formData.phone,
        },
        shippingMethod: {
          name: shippingMethod === 'express' ? 'Express Nest Air Delivery' : 'Standard Eco Delivery',
          price: shippingMethod === 'express' ? 14.5 : shippingPrice,
          estimatedDelivery: shippingMethod === 'express' ? '1 – 2 Business Days' : '3 – 5 Business Days',
        },
        paymentMethod: paymentMethod,
        coupon: {
          code: couponCode,
          discountAmount: discountPrice,
        },
        itemsPrice,
        taxPrice,
        shippingPrice: shippingMethod === 'express' ? 14.5 : shippingPrice,
        discountPrice,
        totalPrice: Number((totalPrice + (shippingMethod === 'express' ? 14.5 - shippingPrice : 0)).toFixed(2)),
      };

      const created = await createOrder(orderPayload, token);
      clearCart();
      if (setCompletedOrder) {
        setCompletedOrder(created);
      }
      if (onNavigate) {
        onNavigate('order-success', created._id || created.orderNumber);
      }
    } catch (err) {
      console.error('Order placement failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-page" style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#FAF7F2' }}>
      <div className="container" style={{ maxWidth: '1080px', paddingBottom: '80px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--color-taupe-dark)', margin: '0 0 6px' }}>
            Secure Heirloom Checkout
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-taupe-muted)', margin: 0 }}>
            Encrypted 256-Bit SSL Checkout • GOTS Organic Authenticity Guaranteed
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', alignItems: 'start' }}>
            {/* Left: Customer & Address & Payment */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* 1. Contact Information */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-taupe-dark)', marginBottom: '16px' }}>
                  1. Contact Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                      Parent Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.88rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                      Email Address (for tracking receipt)
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.88rem' }}
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                      Phone Number (for courier SMS updates)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-taupe-dark)', marginBottom: '16px' }}>
                  2. Shipping Destination
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street"
                      required
                      value={formData.street}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Shipping Speed */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-taupe-dark)', marginBottom: '16px' }}>
                  3. Shipping Method
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      border: shippingMethod === 'standard' ? '2px solid var(--color-pink-deep)' : '1px solid var(--border-light)',
                      backgroundColor: shippingMethod === 'standard' ? 'var(--color-pink-light)' : 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="radio"
                        name="shippingOption"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-taupe-dark)' }}>
                          Standard Eco Delivery (3 – 5 Business Days)
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-taupe-muted)' }}>
                          Carbon-neutral shipping in biodegradable plant-based mailers
                        </div>
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                      {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
                    </span>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      border: shippingMethod === 'express' ? '2px solid var(--color-pink-deep)' : '1px solid var(--border-light)',
                      backgroundColor: shippingMethod === 'express' ? 'var(--color-pink-light)' : 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="radio"
                        name="shippingOption"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-taupe-dark)' }}>
                          Express Nest Delivery (1 – 2 Business Days)
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-taupe-muted)' }}>
                          Priority express air shipping with signature heirloom box
                        </div>
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--color-taupe-dark)' }}>$14.50</span>
                  </label>
                </div>
              </div>

              {/* 4. Payment Method */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-taupe-dark)', marginBottom: '16px' }}>
                  4. Payment Method
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
                  {[
                    { id: 'credit_card', label: 'Credit Card', icon: CreditCard },
                    { id: 'upi', label: 'UPI / QR', icon: QrCode },
                    { id: 'cash_on_delivery', label: 'Cash on Delivery', icon: Banknote },
                  ].map((pm) => {
                    const Icon = pm.icon;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id)}
                        style={{
                          padding: '12px 8px',
                          borderRadius: 'var(--radius-md)',
                          border: paymentMethod === pm.id ? '2px solid var(--color-pink-deep)' : '1px solid var(--border-light)',
                          backgroundColor: paymentMethod === pm.id ? 'var(--color-pink-light)' : 'var(--bg-creme)',
                          color: paymentMethod === pm.id ? 'var(--color-pink-deep)' : 'var(--color-taupe)',
                          fontWeight: 600,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <Icon size={20} />
                        <span>{pm.label}</span>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === 'credit_card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', backgroundColor: 'var(--bg-creme)', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                        Card Number (Test Simulation)
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                          Expires (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.88rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                          CVV / CVC
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div style={{ padding: '16px', backgroundColor: 'var(--bg-creme)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe)', margin: '0 0 10px 0' }}>
                      Scan QR code or enter your UPI ID (e.g. <code>parent@okaxis</code>) at next step.
                    </p>
                    <div className="badge-sage" style={{ display: 'inline-flex' }}>
                      Instant Verification Supported
                    </div>
                  </div>
                )}

                {paymentMethod === 'cash_on_delivery' && (
                  <div style={{ padding: '16px', backgroundColor: 'var(--bg-creme)', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-taupe)', margin: 0 }}>
                      💵 Pay cash upon delivery to your doorstep. Free package inspection included.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Review Sidebar */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '28px', boxShadow: 'var(--shadow-md)', position: 'sticky', top: '110px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-taupe-dark)', margin: '0 0 18px 0' }}>
                Order Summary ({itemsCount} items)
              </h3>

              {/* Items Mini List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px', marginBottom: '18px' }}>
                {cartItems.map((item) => (
                  <div key={item.key} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '48px', height: '56px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-taupe-dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--color-taupe-muted)' }}>
                        Qty: {item.quantity} • {item.selectedSize}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', padding: '14px 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-taupe)' }}>
                  <span>Subtotal</span>
                  <span>${itemsPrice.toFixed(2)}</span>
                </div>
                {discountPrice > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-pink-deep)', fontWeight: 700 }}>
                    <span>VIP Promo Discount ({couponCode})</span>
                    <span>-${discountPrice.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-taupe)' }}>
                  <span>Shipping</span>
                  <span>{shippingMethod === 'express' ? '$14.50' : shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-taupe)' }}>
                  <span>Estimated Tax</span>
                  <span>${taxPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '16px', marginBottom: '22px' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                  Total to Pay
                </span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                  ${(totalPrice + (shippingMethod === 'express' ? 14.5 - shippingPrice : 0)).toFixed(2)}
                </span>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={submitting}
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
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.7 : 1,
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <Lock size={16} />
                <span>{submitting ? 'Placing Nest Order...' : 'Complete & Place Order'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
