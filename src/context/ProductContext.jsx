import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../services/api';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    category: 'all',
    ageGroup: 'all',
    fabric: 'all',
    minPrice: '',
    maxPrice: '',
    keyword: '',
    sort: 'newest',
  });

  const loadProducts = useCallback(async (params = filters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(params);
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'all',
      ageGroup: 'all',
      fabric: 'all',
      minPrice: '',
      maxPrice: '',
      keyword: '',
      sort: 'newest',
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        filters,
        updateFilter,
        setFilters,
        resetFilters,
        reloadProducts: loadProducts,
        quickViewProduct,
        openQuickView: (prod) => setQuickViewProduct(prod),
        closeQuickView: () => setQuickViewProduct(null),
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};
