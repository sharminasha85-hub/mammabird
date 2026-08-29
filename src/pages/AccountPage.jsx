import React, { useState, useEffect } from 'react';
import { User, Package, Heart, MapPin, LogOut, Sparkles, Clock, CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { fetchMyOrders } from '../services/api';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

export default function AccountPage({ defaultTab = 'orders', onNavigate }) {
  const { user, token, logout, openAuthModal, isAuthenticated } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (isAuthenticated && token) {
      const loadOrders = async () => {
        setLoadingOrders(true);
        try {
          const data = await fetchMyOrders(token);
          setOrders(data || []);
        } catch (e) {
          console.error(e);
        } finally {
          setLoadingOrders(false);
        }
      };
      loadOrders();
    }
  }, [isAuthenticated, token]);

  if (!isAuthenticated) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: '#FAF7F2', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '520px', padding: '40px 20px' }}>
          <div
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-pink-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: 'var(--color-pink-deep)',
            }}
          >
            <User size={32} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-taupe-dark)', marginBottom: '8px' }}>
            mammaBird Account
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-taupe-muted)', marginBottom: '24px' }}>
            Please sign in to view your orders, saved addresses, and 25% VIP Club benefits.
          </p>
          <button
            onClick={() => openAuthModal('login')}
            style={{
              backgroundColor: 'var(--color-pink-deep)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '12px 32px',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            Sign In to Your Account
          </button>
        </div>
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="account-page" style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#FAF7F2' }}>
      <div className="container" style={{ paddingBottom: '80px' }}>
        {/* Header Profile Bar */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '28px 32px',
            marginBottom: '32px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            border: '1px solid rgba(115, 90, 75, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-pink-light)',
                color: 'var(--color-pink-deep)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 700,
                fontFamily: 'var(--font-serif)',
              }}
            >
              {user.name ? user.name[0].toUpperCase() : 'M'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-taupe-dark)', margin: 0 }}>
                  {user.name}
                </h2>
                <span className="badge-nest" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
                  <Sparkles size={12} />
                  <span>VIP Nest Member</span>
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-taupe-muted)', marginTop: '4px' }}>
                {user.email} • Member code: <strong>{user.vipDiscountCode || 'NESTLING25'}</strong> (25% Off)
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            style={{
              backgroundColor: 'var(--bg-creme)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-full)',
              padding: '8px 18px',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--color-taupe)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { id: 'orders', label: '📦 Orders & Tracking', count: orders.length },
            { id: 'wishlist', label: '❤️ Wishlist', count: wishlist.length },
            { id: 'addresses', label: '📍 Saved Addresses' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 22px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: activeTab === tab.id ? 'var(--color-taupe-dark)' : '#FFFFFF',
                color: activeTab === tab.id ? '#FFFFFF' : 'var(--color-taupe)',
                fontSize: '0.88rem',
                fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition-fast)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  style={{
                    fontSize: '0.72rem',
                    backgroundColor: activeTab === tab.id ? 'var(--color-pink-deep)' : 'var(--bg-creme)',
                    color: activeTab === tab.id ? '#FFFFFF' : 'var(--color-taupe-dark)',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontWeight: 700,
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {loadingOrders ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>Loading orders...</div>
            ) : orders.length === 0 ? (
              <div style={{ backgroundColor: '#FFFFFF', padding: '48px 24px', borderRadius: 'var(--radius-xl)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <Package size={36} color="var(--color-taupe-muted)" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-taupe-dark)' }}>
                  No Orders Placed Yet
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-taupe-muted)', marginBottom: '20px' }}>
                  Explore our luxury organic children's collections and save 25% with code NESTLING25.
                </p>
                <button
                  onClick={() => onNavigate('shop')}
                  style={{ backgroundColor: 'var(--color-pink-deep)', color: '#fff', padding: '10px 24px', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer' }}
                >
                  Shop Now
                </button>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord._id || ord.orderNumber}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid rgba(115, 90, 75, 0.08)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-taupe-muted)' }}>
                        Order ID: <strong style={{ color: 'var(--color-taupe-dark)' }}>{ord.orderNumber}</strong>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-taupe-muted)' }}>
                        Placed on {new Date(ord.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        style={{
                          backgroundColor: ord.status === 'Delivered' ? 'rgba(138, 151, 123, 0.2)' : 'var(--color-pink-light)',
                          color: ord.status === 'Delivered' ? 'var(--color-sage-deep)' : 'var(--color-pink-deep)',
                          padding: '4px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                        }}
                      >
                        ● {ord.status || 'Confirmed'}
                      </span>

                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                        ${(ord.totalPrice || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '16px' }}>
                    {ord.orderItems?.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'var(--bg-creme)', padding: '8px 14px', borderRadius: 'var(--radius-md)' }}>
                        {item.image && (
                          <img src={item.image} alt={item.name} style={{ width: '36px', height: '42px', borderRadius: '4px', objectFit: 'cover' }} />
                        )}
                        <div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-taupe-dark)' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--color-taupe-muted)' }}>
                            Qty: {item.quantity} • {item.selectedSize}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {ord.trackingNumber && (
                    <div style={{ marginTop: '14px', fontSize: '0.8rem', color: 'var(--color-taupe-muted)' }}>
                      🚚 Courier Tracking: <strong style={{ color: 'var(--color-taupe-dark)' }}>{ord.trackingNumber}</strong>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div style={{ backgroundColor: '#FFFFFF', padding: '48px 24px', borderRadius: 'var(--radius-xl)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <Heart size={36} color="var(--color-taupe-muted)" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-taupe-dark)' }}>
                  Your Wishlist is Empty
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-taupe-muted)', marginBottom: '20px' }}>
                  Tap the heart icon on any product to save it to your heirloom wishlist.
                </p>
                <button
                  onClick={() => onNavigate('shop')}
                  style={{ backgroundColor: 'var(--color-pink-deep)', color: '#fff', padding: '10px 24px', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer' }}
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
                {wishlist.map((prod) => (
                  <ProductCard key={prod._id || prod.id} product={prod} onNavigate={onNavigate} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Addresses */}
        {activeTab === 'addresses' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-taupe-dark)', marginBottom: '16px' }}>
              Default Shipping Address
            </h3>
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-creme)', borderRadius: 'var(--radius-md)', maxWidth: '420px', borderLeft: '4px solid var(--color-sage)' }}>
              <div style={{ fontWeight: 700, color: 'var(--color-taupe-dark)', marginBottom: '4px' }}>
                {user.name}
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--color-taupe)' }}>
                742 Evergreen Meadow Way, Suite 4B
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--color-taupe)' }}>
                Portland, OR 97201, United States
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-taupe-muted)', marginTop: '8px' }}>
                Phone: {user.phone || '+1 (555) 382-9912'}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
