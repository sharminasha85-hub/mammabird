import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, Star, Check, ShieldCheck, Sparkles, ArrowRight, Feather } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getAssetUrl } from '../utils/assetUrl';

export default function QuickViewModal({ onNavigate }) {
  const { quickViewProduct, closeQuickView } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes?.[0]?.size || '0 – 3 Months');
      setSelectedColor(quickViewProduct.colors?.[0]?.name || 'Natural');
      setActiveImageIndex(0);
      setQuantity(1);
      setAddedAnimation(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product._id || product.id);
  const rawImages = product.images && product.images.length > 0 ? product.images : [product.featuredImage || 'images/hero.jpg'];
  const images = rawImages.map(img => getAssetUrl(img));

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity, true);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      closeQuickView();
    }, 1200);
  };

  const handleViewFullDetails = () => {
    closeQuickView();
    if (onNavigate) {
      onNavigate('product', product.slug || product._id || product.id);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(50, 35, 25, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={closeQuickView}
    >
      <div
        className="quick-view-card"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '920px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(250, 247, 242, 0.95)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            color: 'var(--color-taupe)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <X size={20} />
        </button>

        {/* Left: Image Gallery */}
        <div style={{ padding: '24px', background: 'var(--bg-creme)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              aspectRatio: '1/1.1',
              boxShadow: 'var(--shadow-sm)',
              border: '4px solid #FFFFFF',
            }}
          >
            <img
              src={images[activeImageIndex] || product.featuredImage || '/images/hero.jpg'}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {product.badge && (
              <span
                className="badge-nest"
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  fontSize: '0.72rem',
                }}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '10px' }}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: activeImageIndex === idx ? '2px solid var(--color-pink-deep)' : '2px solid transparent',
                    cursor: 'pointer',
                    padding: 0,
                    opacity: activeImageIndex === idx ? 1 : 0.7,
                  }}
                >
                  <img src={img} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Controls */}
        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
          {/* Rating & Age Group */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="badge-sage" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>
              Ages: {product.ageRange}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={14} fill="#E5A93C" color="#E5A93C" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-taupe)' }}>
                {product.rating || 5.0} ({product.numReviews || 12} reviews)
              </span>
            </div>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.65rem',
              color: 'var(--color-taupe-dark)',
              marginBottom: '6px',
            }}
          >
            {product.name}
          </h3>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-taupe-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
            {product.description}
          </p>

          {/* Pricing */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                fontWeight: 700,
                color: 'var(--color-taupe-dark)',
              }}
            >
              ${product.price}
            </span>
            {product.compareAtPrice && (
              <span style={{ fontSize: '1.1rem', textDecoration: 'line-through', color: 'var(--color-taupe-muted)' }}>
                ${product.compareAtPrice}
              </span>
            )}
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-pink-deep)' }}>
              VIP Coupon: 25% Off with code NESTLING25
            </span>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '8px' }}>
                Color: <span style={{ fontWeight: 400 }}>{selectedColor}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: c.hex,
                      border: selectedColor === c.name ? '2px solid var(--color-pink-deep)' : '2px solid rgba(0,0,0,0.1)',
                      outline: selectedColor === c.name ? '2px solid var(--color-pink-light)' : 'none',
                      cursor: 'pointer',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15)',
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe)' }}>
                Select Age / Size:
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-pink-deep)', fontWeight: 600 }}>
                100% True-to-Size
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {product.sizes?.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: selectedSize === s.size ? '1.5px solid var(--color-pink-deep)' : '1px solid var(--border-light)',
                    backgroundColor: selectedSize === s.size ? 'var(--color-pink-light)' : '#FFFFFF',
                    color: selectedSize === s.size ? 'var(--color-pink-deep)' : 'var(--color-taupe)',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)',
                  }}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart Bar */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: 'auto', marginBottom: '18px' }}>
            {/* Quantity Controller */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-full)',
                padding: '4px 8px',
                background: 'var(--bg-creme)',
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ background: 'transparent', border: 'none', padding: '4px 10px', fontSize: '1rem', cursor: 'pointer' }}
              >
                -
              </button>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{ background: 'transparent', border: 'none', padding: '4px 10px', fontSize: '1rem', cursor: 'pointer' }}
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                backgroundColor: addedAnimation ? 'var(--color-sage)' : 'var(--color-pink-deep)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '12px 20px',
                fontSize: '0.92rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
                transition: 'var(--transition-fast)',
              }}
            >
              {addedAnimation ? (
                <>
                  <Check size={18} strokeWidth={3} />
                  <span>Added to Nest Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
                </>
              )}
            </button>

            {/* Wishlist button */}
            <button
              onClick={() => toggleWishlist(product)}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-creme)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Heart
                size={20}
                fill={isFavorited ? 'var(--color-pink-deep)' : 'none'}
                color={isFavorited ? 'var(--color-pink-deep)' : 'var(--color-taupe)'}
              />
            </button>
          </div>

          {/* View Full Product Details Link */}
          <button
            onClick={handleViewFullDetails}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-taupe)',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: '6px',
            }}
          >
            <span>View Full Specifications & Customer Reviews</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
