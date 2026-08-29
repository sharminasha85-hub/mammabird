import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const FREE_SHIPPING_THRESHOLD = 90;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mammabird_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('NESTLING25'); // default VIP coupon
  const [discountPercent, setDiscountPercent] = useState(25); // default 25% VIP coupon
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('VIP Early Access (25% Off)');

  // Save to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('mammabird_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to storage:', e);
    }
  }, [cartItems]);

  // Calculations
  const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const itemsPrice = Number(
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
  );

  const discountPrice = Number(
    ((itemsPrice * discountPercent) / 100).toFixed(2)
  );

  const discountedItemsPrice = Math.max(0, itemsPrice - discountPrice);

  const isFreeShipping = discountedItemsPrice >= FREE_SHIPPING_THRESHOLD || itemsCount === 0;
  const shippingPrice = isFreeShipping ? 0 : 8.5;
  const freeShippingProgress = Math.min(
    100,
    Math.round((discountedItemsPrice / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedItemsPrice);

  const taxPrice = Number((discountedItemsPrice * 0.06).toFixed(2)); // 6% tax rate
  const totalPrice = Number((discountedItemsPrice + shippingPrice + taxPrice).toFixed(2));

  // Add Item to Cart
  const addToCart = (product, selectedSize, selectedColor = null, quantity = 1, openDrawer = true) => {
    const size = selectedSize || (product.sizes && product.sizes[0]?.size) || '0 – 3 Months';
    const color = selectedColor || (product.colors && product.colors[0]?.name) || 'Natural';
    const itemKey = `${product._id || product.id}-${size}-${color}`;

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.key === itemKey);

      if (existingItemIndex > -1) {
        const updated = [...prevItems];
        updated[existingItemIndex].quantity += quantity;
        return updated;
      } else {
        const newItem = {
          key: itemKey,
          productId: product._id || product.id,
          name: product.name,
          slug: product.slug,
          image: product.featuredImage || product.images?.[0] || '/images/hero.jpg',
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          selectedSize: size,
          selectedColor: color,
          fabric: product.fabric,
          ageRange: product.ageRange,
          quantity: quantity,
        };
        return [...prevItems, newItem];
      }
    });

    if (openDrawer) {
      setCartDrawerOpen(true);
    }
  };

  // Update item quantity
  const updateQuantity = (key, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.key === key) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Remove item from cart
  const removeFromCart = (key) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.key !== key));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Apply Coupon Code
  const applyCoupon = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    setCouponError('');
    setCouponSuccess('');

    if (!cleanCode) {
      setCouponCode('');
      setDiscountPercent(0);
      return;
    }

    if (cleanCode === 'NESTLING25' || cleanCode === 'MAMMABIRD25') {
      setCouponCode(cleanCode);
      setDiscountPercent(25);
      setCouponSuccess('25% VIP Early Bird Discount applied!');
    } else if (cleanCode === 'ORGANIC15') {
      setCouponCode(cleanCode);
      setDiscountPercent(15);
      setCouponSuccess('15% Organic Starter Discount applied!');
    } else if (cleanCode === 'FREESHIP') {
      setCouponCode(cleanCode);
      setDiscountPercent(10);
      setCouponSuccess('10% Off + Free Shipping code applied!');
    } else {
      setCouponError('Invalid coupon code. Try NESTLING25 for 25% off');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
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
        FREE_SHIPPING_THRESHOLD,
        couponCode,
        discountPercent,
        couponError,
        couponSuccess,
        applyCoupon,
        cartDrawerOpen,
        openCartDrawer: () => setCartDrawerOpen(true),
        closeCartDrawer: () => setCartDrawerOpen(false),
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
