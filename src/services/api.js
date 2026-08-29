import { FALLBACK_PRODUCTS } from './mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper for local mock products in browser storage
const getLocalProducts = () => {
  try {
    const stored = localStorage.getItem('mammabird_products');
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Error reading localStorage products:', e);
  }
  localStorage.setItem('mammabird_products', JSON.stringify(FALLBACK_PRODUCTS));
  return FALLBACK_PRODUCTS;
};

const setLocalProducts = (products) => {
  try {
    localStorage.setItem('mammabird_products', JSON.stringify(products));
  } catch (e) {
    console.error('Error writing to localStorage products:', e);
  }
};

// Helper for local mock orders in browser storage
const getLocalOrders = () => {
  try {
    const stored = localStorage.getItem('mammabird_orders');
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Error reading localStorage orders:', e);
  }
  return [];
};

const saveLocalOrder = (order) => {
  const orders = getLocalOrders();
  orders.unshift(order);
  localStorage.setItem('mammabird_orders', JSON.stringify(orders));
  return order;
};

// ==========================================
// Product APIs
// ==========================================

export const fetchProducts = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/products?${queryString}`);
    if (!res.ok) throw new Error('API request failed');
    return await res.json();
  } catch (err) {
    // Graceful fallback to client store
    console.info('📡 [API Offline/Standalone] Serving products from local cache');
    let products = getLocalProducts();

    if (params.category && params.category !== 'all') {
      products = products.filter((p) => p.category === params.category);
    }
    if (params.ageGroup && params.ageGroup !== 'all') {
      products = products.filter((p) => p.ageGroup === params.ageGroup);
    }
    if (params.keyword) {
      const q = params.keyword.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q)
      );
    }
    if (params.minPrice) {
      products = products.filter((p) => p.price >= Number(params.minPrice));
    }
    if (params.maxPrice) {
      products = products.filter((p) => p.price <= Number(params.maxPrice));
    }
    if (params.sort === 'price-asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'price-desc') {
      products.sort((a, b) => b.price - a.price);
    } else if (params.sort === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    }

    return {
      products,
      page: 1,
      pages: 1,
      total: products.length,
    };
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    if (!res.ok) throw new Error('Product not found via API');
    return await res.json();
  } catch (err) {
    const products = getLocalProducts();
    const found = products.find((p) => p._id === id || p.slug === id || p.id === id);
    if (found) return found;
    throw new Error('Product not found');
  }
};

export const createProduct = async (productData, token) => {
  try {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Failed to create product');
    return await res.json();
  } catch (err) {
    // Local fallback creation
    const products = getLocalProducts();
    const newProduct = {
      ...productData,
      _id: 'local_' + Date.now(),
      id: 'local_' + Date.now(),
      rating: 5,
      numReviews: 0,
      reviews: [],
      createdAt: new Date().toISOString(),
    };
    products.unshift(newProduct);
    setLocalProducts(products);
    return newProduct;
  }
};

export const updateProduct = async (id, productData, token) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return await res.json();
  } catch (err) {
    const products = getLocalProducts();
    const index = products.findIndex((p) => p._id === id || p.id === id);
    if (index > -1) {
      products[index] = { ...products[index], ...productData };
      setLocalProducts(products);
      return products[index];
    }
    throw new Error('Product not found locally');
  }
};

export const deleteProduct = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    if (!res.ok) throw new Error('Failed to delete product');
    return await res.json();
  } catch (err) {
    const products = getLocalProducts().filter((p) => p._id !== id && p.id !== id);
    setLocalProducts(products);
    return { message: 'Product deleted from local storage' };
  }
};

export const addProductReview = async (productId, reviewData) => {
  try {
    const res = await fetch(`${API_URL}/products/${productId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!res.ok) throw new Error('Failed to submit review');
    return await res.json();
  } catch (err) {
    const products = getLocalProducts();
    const p = products.find((prod) => prod._id === productId || prod.id === productId);
    if (p) {
      p.reviews = p.reviews || [];
      p.reviews.push({
        id: 'rev_' + Date.now(),
        ...reviewData,
        createdAt: new Date().toISOString(),
      });
      p.numReviews = p.reviews.length;
      p.rating = p.reviews.reduce((a, b) => a + Number(b.rating), 0) / p.reviews.length;
      setLocalProducts(products);
      return { message: 'Review added to local storage', product: p };
    }
    throw new Error('Product not found');
  }
};

// ==========================================
// Image Upload APIs (Cloudinary)
// ==========================================

export const uploadImage = async (file, token) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: formData,
    });

    if (!res.ok) throw new Error('Image upload failed');
    return await res.json();
  } catch (err) {
    // If backend is offline, convert file to data URL for immediate preview
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          url: reader.result,
          message: 'Loaded as local preview image',
        });
      };
      reader.readAsDataURL(file);
    });
  }
};

// ==========================================
// Authentication APIs
// ==========================================

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Login failed');
    }
    return await res.json();
  } catch (err) {
    // Demo accounts fallback
    if (email === 'admin@mammabird.com' && password === 'password123') {
      return {
        _id: 'mock_admin_1',
        name: 'mammaBird Admin',
        email: 'admin@mammabird.com',
        role: 'admin',
        vipMember: true,
        vipDiscountCode: 'NESTLING25',
        token: 'mock_jwt_token_admin_' + Date.now(),
      };
    }
    if (password === 'password123' || password.length >= 6) {
      return {
        _id: 'mock_user_' + Date.now(),
        name: email.split('@')[0],
        email: email,
        role: 'user',
        vipMember: true,
        vipDiscountCode: 'NESTLING25',
        token: 'mock_jwt_token_user_' + Date.now(),
      };
    }
    throw new Error(err.message || 'Invalid credentials');
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const res = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Registration failed');
    }
    return await res.json();
  } catch (err) {
    return {
      _id: 'mock_user_' + Date.now(),
      name,
      email,
      role: 'user',
      vipMember: true,
      vipDiscountCode: 'NESTLING25',
      token: 'mock_jwt_token_' + Date.now(),
    };
  }
};

// ==========================================
// Order APIs
// ==========================================

export const createOrder = async (orderData, token) => {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) throw new Error('Order creation failed');
    return await res.json();
  } catch (err) {
    const newOrder = {
      ...orderData,
      _id: 'order_' + Date.now(),
      orderNumber: 'MB-2026-' + Math.floor(1000 + Math.random() * 9000),
      trackingNumber: 'TRK-MB' + Math.floor(100000 + Math.random() * 900000),
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      paidAt: new Date().toISOString(),
      isPaid: true,
    };
    saveLocalOrder(newOrder);
    return newOrder;
  }
};

export const fetchMyOrders = async (token) => {
  try {
    const res = await fetch(`${API_URL}/orders/myorders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch user orders');
    return await res.json();
  } catch (err) {
    return getLocalOrders();
  }
};

export const fetchAllOrders = async (token) => {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch all orders');
    return await res.json();
  } catch (err) {
    return getLocalOrders();
  }
};

export const updateOrderStatus = async (orderId, status, trackingNumber, token) => {
  try {
    const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, trackingNumber }),
    });
    if (!res.ok) throw new Error('Failed to update order status');
    return await res.json();
  } catch (err) {
    const orders = getLocalOrders();
    const order = orders.find((o) => o._id === orderId || o.orderNumber === orderId);
    if (order) {
      order.status = status;
      if (trackingNumber) order.trackingNumber = trackingNumber;
      localStorage.setItem('mammabird_orders', JSON.stringify(orders));
      return order;
    }
    throw new Error('Order not found');
  }
};
