import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';

export default function ProductCard({ product, onNavigate }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { openQuickView } = useProducts();

  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0]?.size || '0 – 3 Months'
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name || 'Natural'
  );
  const [isAddedToast, setIsAddedToast] = useState(false);

  const isFavorited = isInWishlist(product._id || product.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1, true);
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 2200);
  };

  const handleCardClick = () => {
    if (onNavigate) {
      onNavigate('product', product.slug || product._id || product.id);
    }
  };

  return (
    <div
      className="product-card"
      onClick={handleCardClick}
      style={{
        background: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid rgba(115, 90, 75, 0.08)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'var(--transition-smooth)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {/* Top Media Area */}
      <div
        className="product-img-wrapper"
        style={{
          position: 'relative',
          aspectRatio: '1/1.1',
          overflow: 'hidden',
          background: 'var(--bg-creme)',
        }}
      >
        <img
          src={product.featuredImage || product.images?.[0] || '/images/hero.jpg'}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="product-card-img"
          loading="lazy"
        />

        {/* Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            zIndex: 2,
          }}
        >
          {product.badge && (
            <span
              className="badge-nest"
              style={{
                fontSize: '0.68rem',
                padding: '4px 10px',
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(250, 247, 242, 0.92)',
              }}
            >
              {product.badge}
            </span>
          )}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span
              style={{
                fontSize: '0.68rem',
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-pink-deep)',
                color: '#FFFFFF',
                fontWeight: 700,
                letterSpacing: '0.3px',
              }}
            >
              SAVE ${product.compareAtPrice - product.price}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label="Toggle Wishlist"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'var(--transition-fast)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            zIndex: 2,
          }}
          className="wishlist-btn"
        >
          <Heart
            size={18}
            fill={isFavorited ? 'var(--color-pink-deep)' : 'none'}
            color={isFavorited ? 'var(--color-pink-deep)' : 'var(--color-taupe)'}
            strokeWidth={2}
          />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div
          className="quick-actions-bar"
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            gap: '8px',
            zIndex: 3,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(115, 90, 75, 0.1)',
              padding: '8px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--color-taupe-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'var(--transition-fast)',
            }}
            className="quick-view-btn"
          >
            <Eye size={14} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Age & Fabric Meta */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '6px',
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-sage-deep)' }}>
            Ages: {product.ageRange}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Star size={13} fill="#E5A93C" color="#E5A93C" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-taupe)' }}>
              {product.rating || 5.0}
            </span>
          </div>
        </div>

        {/* Title */}
        <h4
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.18rem',
            fontWeight: 600,
            color: 'var(--color-taupe-dark)',
            lineHeight: 1.3,
            marginBottom: '6px',
          }}
        >
          {product.name}
        </h4>

        {/* Fabric subtitle */}
        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-taupe-muted)',
            marginBottom: '14px',
            lineHeight: 1.4,
          }}
        >
          {product.fabric}
        </p>

        {/* Bottom Price & Add to Cart */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px',
            borderTop: '1px dashed rgba(115, 90, 75, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--color-taupe-dark)',
              }}
            >
              ${product.price}
            </span>
            {product.compareAtPrice && (
              <span
                style={{
                  fontSize: '0.85rem',
                  textDecoration: 'line-through',
                  color: 'var(--color-taupe-muted)',
                }}
              >
                ${product.compareAtPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            style={{
              backgroundColor: isAddedToast ? 'var(--color-sage)' : 'var(--color-pink-deep)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '8px 16px',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              boxShadow: '0 3px 10px rgba(184, 114, 108, 0.25)',
            }}
            className="add-bag-btn"
          >
            {isAddedToast ? (
              <>
                <Check size={14} strokeWidth={3} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
