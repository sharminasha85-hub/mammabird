import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const {
    authModalOpen,
    authModalTab,
    setAuthModalTab,
    closeAuthModal,
    login,
    register,
    loading,
    error,
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authModalTab === 'login') {
      await login(email, password);
    } else {
      await register(name, email, password);
    }
  };

  const handleDemoLogin = (role) => {
    if (role === 'admin') {
      setEmail('admin@mammabird.com');
      setPassword('password123');
      login('admin@mammabird.com', 'password123');
    } else {
      setEmail('customer@mammabird.com');
      setPassword('password123');
      login('customer@mammabird.com', 'password123');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(50, 35, 25, 0.65)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={closeAuthModal}
    >
      <div
        className="auth-modal-card"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '460px',
          width: '100%',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          position: 'relative',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(250, 247, 242, 0.9)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            color: 'var(--color-taupe)',
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header Banner */}
        <div
          style={{
            padding: '28px 28px 20px',
            background: 'var(--bg-creme)',
            borderBottom: '1px solid var(--border-light)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--color-pink-light)',
              color: 'var(--color-pink-deep)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: '10px',
            }}
          >
            <Sparkles size={12} />
            <span>mammaBird VIP Club</span>
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.6rem',
              color: 'var(--color-taupe-dark)',
              margin: '0 0 6px',
            }}
          >
            {authModalTab === 'login' ? 'Welcome Back to the Nest' : 'Create Your mammaBird Account'}
          </h3>
          <p style={{ fontSize: '0.84rem', color: 'var(--color-taupe-muted)', margin: 0 }}>
            {authModalTab === 'login'
              ? 'Sign in to access your orders, wishlist & 25% VIP savings'
              : 'Join for early drops, heirloom gift registry & member discounts'}
          </p>

          {/* Tab Switcher */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-full)',
              padding: '4px',
              marginTop: '18px',
              border: '1px solid var(--border-light)',
            }}
          >
            <button
              onClick={() => setAuthModalTab('login')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: authModalTab === 'login' ? 'var(--color-pink-deep)' : 'transparent',
                color: authModalTab === 'login' ? '#FFFFFF' : 'var(--color-taupe)',
                fontWeight: 600,
                fontSize: '0.84rem',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthModalTab('register')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: authModalTab === 'register' ? 'var(--color-pink-deep)' : 'transparent',
                color: authModalTab === 'register' ? '#FFFFFF' : 'var(--color-taupe)',
                fontWeight: 600,
                fontSize: '0.84rem',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
              }}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Modal Form Content */}
        <div style={{ padding: '24px 28px' }}>
          {error && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(213, 150, 145, 0.18)',
                color: '#9e3c3c',
                fontSize: '0.82rem',
                fontWeight: 600,
                marginBottom: '16px',
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {authModalTab === 'register' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '6px' }}>
                  Parent or Guardian Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-taupe-muted)' }} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jessica Reynolds"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 36px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-taupe-muted)' }} />
                <input
                  type="email"
                  required
                  placeholder="parent@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.9rem',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-taupe-muted)' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.9rem',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: 'var(--color-pink-deep)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '12px',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <span>{loading ? 'Authenticating...' : authModalTab === 'login' ? 'Sign In to Account' : 'Create Account'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick 1-Click Demo Buttons */}
          <div
            style={{
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px dashed var(--border-light)',
            }}
          >
            <div style={{ fontSize: '0.74rem', color: 'var(--color-taupe-muted)', textAlign: 'center', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Quick Demo Access
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleDemoLogin('customer')}
                style={{
                  flex: 1,
                  padding: '8px',
                  backgroundColor: 'var(--bg-creme)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--color-taupe-dark)',
                  cursor: 'pointer',
                }}
              >
                👤 Demo Customer
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                style={{
                  flex: 1,
                  padding: '8px',
                  backgroundColor: 'var(--color-taupe-dark)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  cursor: 'pointer',
                }}
              >
                ⚡ Demo Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
