import React, { useState, useEffect } from 'react';
import {
  Heart,
  ShoppingBag,
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Feather,
  ArrowLeft,
  ChevronRight,
  Leaf,
  Send,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';
import { fetchProductById, addProductReview } from '../services/api';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

export default function ProductDetailPage({ productId, onNavigate }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { products } = useProducts();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [activeTab, setActiveTab] = useState('fabric'); // 'fabric' | 'care' | 'size' | 'reviews'

  // Review Form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewChildAge, setReviewChildAge] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
        setSelectedSize(data.sizes?.[0]?.size || '0 – 3 Months');
        setSelectedColor(data.colors?.[0]?.name || 'Natural');
        setActiveImageIndex(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setLoading(false);
      }
    };
    if (productId) loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '80vh', textAlign: 'center' }}>
        <div className="badge-nest" style={{ display: 'inline-flex', padding: '10px 24px' }}>
          <Sparkles size={16} />
          <span>Loading Product Details...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ paddingTop: '140px', minHeight: '80vh', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button
          onClick={() => onNavigate && onNavigate('shop')}
          style={{
            marginTop: '16px',
            backgroundColor: 'var(--color-pink-deep)',
            color: '#fff',
            padding: '10px 24px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(product._id || product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.featuredImage || '/images/hero.jpg'];

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity, true);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2200);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity, false);
    if (onNavigate) {
      onNavigate('checkout');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    try {
      await addProductReview(product._id || product.id, {
        name: reviewName,
        rating: reviewRating,
        comment: reviewComment,
        childAge: reviewChildAge,
      });
      setReviewSuccessMsg('Thank you! Your verified nest review has been posted.');
      setReviewComment('');
      setReviewName('');
      setReviewChildAge('');
      // Refresh product
      const updated = await fetchProductById(productId);
      setProduct(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingReview(false);
    }
  };

  // Related products
  const relatedProducts = products
    .filter((p) => (p._id || p.id) !== (product._id || product.id))
    .slice(0, 3);

  return (
    <div className="product-detail-page" style={{ paddingTop: '90px', backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      {/* 1. Breadcrumbs */}
      <div style={{ padding: '18px 0', borderBottom: '1px solid var(--border-light)', backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--color-taupe-muted)' }}>
          <button
            onClick={() => onNavigate('home')}
            style={{ background: 'transparent', border: 'none', color: 'var(--color-taupe)', cursor: 'pointer' }}
          >
            Home
          </button>
          <ChevronRight size={14} />
          <button
            onClick={() => onNavigate('shop')}
            style={{ background: 'transparent', border: 'none', color: 'var(--color-taupe)', cursor: 'pointer' }}
          >
            Shop Collection
          </button>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--color-pink-deep)', fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      {/* 2. Main Product Hero Section */}
      <div className="container" style={{ padding: '40px 20px 60px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '48px',
            alignItems: 'start',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '36px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid rgba(115, 90, 75, 0.08)',
          }}
        >
          {/* Left Column: Image Gallery */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                aspectRatio: '1/1.15',
                backgroundColor: 'var(--bg-creme)',
                boxShadow: 'var(--shadow-sm)',
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
                    top: '16px',
                    left: '16px',
                    fontSize: '0.78rem',
                  }}
                >
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: activeImageIndex === idx ? '2px solid var(--color-pink-deep)' : '2px solid transparent',
                      cursor: 'pointer',
                      padding: 0,
                      opacity: activeImageIndex === idx ? 1 : 0.7,
                      transition: 'var(--transition-fast)',
                    }}
                  >
                    <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specifications, Price & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Age Badge & Rating */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span className="badge-sage" style={{ fontSize: '0.78rem', padding: '4px 12px' }}>
                Ages: {product.ageRange}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={16} fill="#E5A93C" color="#E5A93C" />
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                  {product.rating || 5.0}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-taupe-muted)' }}>
                  ({product.numReviews || 18} verified reviews)
                </span>
              </div>
            </div>

            {/* Product Title */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
                color: 'var(--color-taupe-dark)',
                margin: '0 0 10px 0',
                lineHeight: 1.2,
              }}
            >
              {product.name}
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: '0.95rem', color: 'var(--color-taupe-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
              {product.subtitle || product.fabric}
            </p>

            {/* Price Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '14px',
                padding: '16px 20px',
                backgroundColor: 'var(--bg-creme)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '24px',
                borderLeft: '4px solid var(--color-pink)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.1rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                ${product.price}
              </span>
              {product.compareAtPrice && (
                <span style={{ fontSize: '1.2rem', textDecoration: 'line-through', color: 'var(--color-taupe-muted)' }}>
                  ${product.compareAtPrice}
                </span>
              )}
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-pink-deep)', marginLeft: 'auto' }}>
                ✨ 25% Off with code NESTLING25
              </span>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '10px' }}>
                  Select Shade: <strong style={{ color: 'var(--color-taupe-dark)' }}>{selectedColor}</strong>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: c.hex,
                        border: selectedColor === c.name ? '2px solid var(--color-pink-deep)' : '2px solid rgba(0,0,0,0.1)',
                        outline: selectedColor === c.name ? '3px solid var(--color-pink-light)' : 'none',
                        cursor: 'pointer',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15)',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-taupe)' }}>
                  Select Age / Size:
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-pink-deep)', fontWeight: 600 }}>
                  📏 Organic Fit Guide Available
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {product.sizes?.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    style={{
                      padding: '10px 18px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      border: selectedSize === s.size ? '2px solid var(--color-pink-deep)' : '1px solid var(--border-light)',
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

            {/* Actions: Add to Cart & Buy Now */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                {/* Quantity */}
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
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ background: 'transparent', border: 'none', padding: '6px 10px', fontSize: '1.1rem', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, minWidth: '28px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ background: 'transparent', border: 'none', padding: '6px 10px', fontSize: '1.1rem', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1,
                    backgroundColor: addedToast ? 'var(--color-sage)' : 'var(--color-pink-deep)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '14px 24px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'var(--transition-fast)',
                  }}
                >
                  {addedToast ? (
                    <>
                      <Check size={18} strokeWidth={3} />
                      <span>Added to Nest Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>Add to Nest Bag • ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  style={{
                    width: '50px',
                    height: '50px',
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
                    size={22}
                    fill={isFavorited ? 'var(--color-pink-deep)' : 'none'}
                    color={isFavorited ? 'var(--color-pink-deep)' : 'var(--color-taupe)'}
                  />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--color-taupe-dark)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '14px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                Instant Express Checkout
              </button>
            </div>

            {/* Trust & Guarantee Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-light)',
                textAlign: 'center',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={20} color="var(--color-sage-deep)" />
                <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-taupe)' }}>
                  GOTS Certified
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <Truck size={20} color="var(--color-sage-deep)" />
                <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-taupe)' }}>
                  Free Shipping $90+
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <RotateCcw size={20} color="var(--color-sage-deep)" />
                <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-taupe)' }}>
                  30-Day Returns
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Product Tabs: Fabric, Care, Size Guide, Reviews */}
        <div style={{ marginTop: '48px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '36px', boxShadow: 'var(--shadow-sm)' }}>
          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '14px', flexWrap: 'wrap' }}>
            {[
              { id: 'fabric', label: '🌿 Fabric & Certifications' },
              { id: 'care', label: '🧼 Washing & Care Guide' },
              { id: 'size', label: '📏 Size & Milestone Fit' },
              { id: 'reviews', label: `⭐ Verified Reviews (${product.reviews?.length || 0})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: activeTab === tab.id ? 'var(--color-pink-light)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--color-pink-deep)' : 'var(--color-taupe)',
                  fontSize: '0.9rem',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Fabric */}
          {activeTab === 'fabric' && (
            <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-taupe-dark)' }}>
                {product.fabric}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-taupe-muted)', lineHeight: 1.7, maxWidth: '720px' }}>
                {product.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                {product.certifications?.map((cert, i) => (
                  <span key={i} className="badge-sage" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                    <ShieldCheck size={14} />
                    <span>{cert}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Care Guide */}
          {activeTab === 'care' && (
            <div style={{ padding: '24px 0' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-taupe-dark)', marginBottom: '16px' }}>
                Keeping Your Organic Apparel Gentle & Long-Lasting
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {product.careInstructions?.map((ins, i) => (
                  <div key={i} style={{ padding: '16px', backgroundColor: 'var(--bg-creme)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Check size={18} color="var(--color-sage-deep)" />
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-taupe-dark)' }}>{ins}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Size & Fit */}
          {activeTab === 'size' && (
            <div style={{ padding: '24px 0' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-taupe-dark)', marginBottom: '16px' }}>
                Milestone Size Chart for Ages {product.ageRange}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-taupe-muted)', marginBottom: '20px' }}>
                mammaBird garments are tailored with generous growth ease and adjustable straps. If between sizes, we recommend sizing up for longer wear.
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-creme)', textAlign: 'left' }}>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>Size / Stage</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>Child Height</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>Approx. Weight</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>Chest Width</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>0 – 3 Months</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>21 – 24 in (53 – 61 cm)</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>8 – 12 lbs</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>16.5 in</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>3 – 6 Months</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>24 – 27 in (61 – 68 cm)</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>12 – 16 lbs</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>17.5 in</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>1 – 3 Years</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>31 – 38 in (78 – 96 cm)</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>22 – 32 lbs</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>20.5 in</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)', fontWeight: 600 }}>4 – 6 Years</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>39 – 46 in (99 – 117 cm)</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>34 – 48 lbs</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>23.0 in</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div style={{ padding: '24px 0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '36px' }}>
                {/* Existing Reviews List */}
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-taupe-dark)', marginBottom: '16px' }}>
                    What Parents are Saying ({product.reviews?.length || 0})
                  </h4>

                  {product.reviews && product.reviews.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {product.reviews.map((rev, i) => (
                        <div key={i} style={{ padding: '16px', backgroundColor: 'var(--bg-creme)', borderRadius: 'var(--radius-md)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-taupe-dark)' }}>
                              {rev.name}
                            </span>
                            <div style={{ display: 'flex', gap: '2px' }}>
                              {[...Array(rev.rating || 5)].map((_, idx) => (
                                <Star key={idx} size={13} fill="#E5A93C" color="#E5A93C" />
                              ))}
                            </div>
                          </div>
                          {rev.childAge && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-sage-deep)', fontWeight: 600, marginBottom: '6px' }}>
                              Verified Parent of {rev.childAge} old child
                            </div>
                          )}
                          <p style={{ fontSize: '0.88rem', color: 'var(--color-taupe)', margin: 0, lineHeight: 1.5 }}>
                            "{rev.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-taupe-muted)' }}>
                      Be the first parent to share a review for this heirloom garment!
                    </p>
                  )}
                </div>

                {/* Submit New Review Form */}
                <div style={{ backgroundColor: 'var(--bg-creme)', padding: '24px', borderRadius: 'var(--radius-lg)' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-taupe-dark)', marginBottom: '12px' }}>
                    Write a Review
                  </h4>

                  {reviewSuccessMsg && (
                    <div style={{ padding: '10px', backgroundColor: 'rgba(138, 151, 123, 0.2)', color: 'var(--color-sage-deep)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '14px' }}>
                      {reviewSuccessMsg}
                    </div>
                  )}

                  <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah M."
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                        Child's Age (e.g. 6 Months, 3 Years)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2 Years"
                        value={reviewChildAge}
                        onChange={(e) => setReviewChildAge(e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                        Rating
                      </label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ 5 Stars (Exceptional)</option>
                        <option value={4}>⭐⭐⭐⭐ 4 Stars (Very Good)</option>
                        <option value={3}>⭐⭐⭐ 3 Stars (Average)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                        Your Review Comment
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="How does the organic fabric feel? How was the fit?"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.85rem' }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingReview}
                      style={{
                        backgroundColor: 'var(--color-pink-deep)',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: 'var(--radius-full)',
                        padding: '10px',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <Send size={14} />
                      <span>{submittingReview ? 'Submitting...' : 'Post Review'}</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Complete the Look / Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '64px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div className="badge-nest" style={{ display: 'inline-flex', marginBottom: '8px' }}>
                <Sparkles size={13} />
                <span>Heirloom Pairings</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-taupe-dark)' }}>
                Complete the Look
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
              {relatedProducts.map((rel) => (
                <ProductCard key={rel._id || rel.id} product={rel} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
