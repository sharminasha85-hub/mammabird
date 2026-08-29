import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ProductProvider } from './context/ProductContext';

import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage';

gsap.registerPlugin(ScrollTrigger);

function MainApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParam, setPageParam] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Parse URL hash on initial load or popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash.startsWith('product/')) {
        const id = hash.split('product/')[1];
        setCurrentPage('product');
        setPageParam(id);
      } else if (hash === 'shop') {
        setCurrentPage('shop');
        setPageParam(null);
      } else if (hash === 'cart') {
        setCurrentPage('cart');
        setPageParam(null);
      } else if (hash === 'checkout') {
        setCurrentPage('checkout');
        setPageParam(null);
      } else if (hash === 'account') {
        setCurrentPage('account');
        setPageParam(null);
      } else if (hash === 'admin') {
        setCurrentPage('admin');
        setPageParam(null);
      } else if (hash === 'order-success') {
        setCurrentPage('order-success');
      } else {
        setCurrentPage('home');
        setPageParam(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation helper
  const navigateTo = (page, param = null) => {
    setCurrentPage(page);
    setPageParam(param);

    if (page === 'product' && param) {
      window.location.hash = `#/product/${param}`;
    } else if (page === 'home') {
      window.location.hash = '#/';
    } else {
      window.location.hash = `#/${page}`;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  };

  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#FAF7F2' }}>
      {/* Gentle Floating Petals & Feathers */}
      <ParticleCanvas />

      {/* Top Navbar */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Slide-out Shopping Cart Drawer */}
      <CartDrawer onNavigate={navigateTo} />

      {/* Authentication Modal */}
      <AuthModal />

      {/* Main Routed Page Content */}
      <main>
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'shop' && <ShopPage onNavigate={navigateTo} />}
        {currentPage === 'product' && (
          <ProductDetailPage productId={pageParam} onNavigate={navigateTo} />
        )}
        {currentPage === 'cart' && <CartPage onNavigate={navigateTo} />}
        {currentPage === 'checkout' && (
          <CheckoutPage onNavigate={navigateTo} setCompletedOrder={setCompletedOrder} />
        )}
        {currentPage === 'order-success' && (
          <OrderSuccessPage order={completedOrder} onNavigate={navigateTo} />
        )}
        {currentPage === 'account' && (
          <AccountPage defaultTab={pageParam || 'orders'} onNavigate={navigateTo} />
        )}
        {currentPage === 'admin' && <AdminPage onNavigate={navigateTo} />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <MainApp />
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
