import React from 'react';

/**
 * mammaBird Brand Logo Component
 * Renders the exact authentic logo image provided by the user,
 * with scalable responsive presets and clean fallback.
 */
export default function BrandLogo({ size = 'medium', className = '', showSubtitle = true, mode = 'image' }) {
  const sizeStyles = {
    small: { height: '46px', maxWidth: '160px' },
    medium: { height: '85px', maxWidth: '240px' },
    large: { height: '140px', maxWidth: '320px' },
    xlarge: { height: '200px', maxWidth: '420px' },
  };

  const style = sizeStyles[size] || sizeStyles.medium;

  return (
    <div
      className={`brand-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <img
        src={`${import.meta.env.BASE_URL}images/logo.png`}
        alt="mammaBird Kids Fashion Logo"
        style={{
          height: style.height,
          width: 'auto',
          maxWidth: style.maxWidth,
          objectFit: 'contain',
          display: 'block',
          filter: 'drop-shadow(0 2px 8px rgba(115, 90, 75, 0.06))',
          transition: 'transform 0.3s ease',
        }}
        className="brand-logo-img"
        loading="eager"
      />
    </div>
  );
}
