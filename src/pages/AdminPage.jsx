import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Package,
  DollarSign,
  ShoppingBag,
  CheckCircle2,
  Truck,
  Image as ImageIcon,
  Sparkles,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { createProduct, updateProduct, deleteProduct, uploadImage, fetchAllOrders, updateOrderStatus } from '../services/api';
import Footer from '../components/Footer';

export default function AdminPage({ onNavigate }) {
  const { user, token, isAdmin, openAuthModal } = useAuth();
  const { products, reloadProducts } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'add'
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // New Product Form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    subtitle: '',
    description: '',
    price: '',
    compareAtPrice: '',
    category: 'rompers',
    ageGroup: 'baby',
    ageRange: '0 – 12 Months',
    badge: 'Pure Organic Knit',
    fabric: '100% GOTS Organic Combed Cotton',
    featuredImage: '/images/baby.jpg',
    images: ['/images/baby.jpg'],
    totalStock: 30,
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [formMsg, setFormMsg] = useState('');

  useEffect(() => {
    if (isAdmin && token) {
      const loadOrders = async () => {
        setLoadingOrders(true);
        try {
          const data = await fetchAllOrders(token);
          setOrders(data || []);
        } catch (e) {
          console.error(e);
        } finally {
          setLoadingOrders(false);
        }
      };
      loadOrders();
    }
  }, [isAdmin, token]);

  if (!isAdmin) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: '#FAF7F2', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '520px', padding: '40px 20px' }}>
          <ShieldCheck size={48} color="var(--color-taupe-dark)" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-taupe-dark)', marginBottom: '8px' }}>
            Administrator Access Required
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-taupe-muted)', marginBottom: '24px' }}>
            Please sign in with your mammaBird Administrator account to manage products and orders.
          </p>
          <button
            onClick={() => openAuthModal('login')}
            style={{
              backgroundColor: 'var(--color-taupe-dark)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '12px 32px',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Sign In as Admin
          </button>
        </div>
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  // Handle Cloudinary Image Upload
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadSuccess('');
    try {
      const data = await uploadImage(file, token);
      setNewProduct((prev) => ({
        ...prev,
        featuredImage: data.url,
        images: [data.url, ...(prev.images || [])],
      }));
      setUploadSuccess('✓ Image uploaded to Cloudinary successfully!');
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle Add Product Submit
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setFormMsg('');
    try {
      await createProduct(
        {
          ...newProduct,
          price: Number(newProduct.price),
          compareAtPrice: newProduct.compareAtPrice ? Number(newProduct.compareAtPrice) : null,
          totalStock: Number(newProduct.totalStock),
          sizes: [
            { size: '0 – 3 Months', stock: 10 },
            { size: '3 – 6 Months', stock: 10 },
            { size: '6 – 12 Months', stock: 10 },
          ],
          colors: [{ name: 'Organic Natural', hex: '#DFCEBE' }],
        },
        token
      );
      setFormMsg('✅ Product added successfully!');
      reloadProducts();
      setTimeout(() => {
        setActiveTab('products');
        setFormMsg('');
      }, 1200);
    } catch (err) {
      setFormMsg(`❌ Error: ${err.message}`);
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id, token);
        reloadProducts();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // Handle Update Order Status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus, null, token);
      const updated = await fetchAllOrders(token);
      setOrders(updated);
    } catch (err) {
      alert(err.message);
    }
  };

  // Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);
  const totalStockCount = products.reduce((acc, p) => acc + (p.totalStock || 25), 0);

  return (
    <div className="admin-page" style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#FAF7F2' }}>
      <div className="container" style={{ paddingBottom: '80px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={24} color="var(--color-pink-deep)" />
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--color-taupe-dark)', margin: 0 }}>
                mammaBird Admin Dashboard
              </h1>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-taupe-muted)', margin: '4px 0 0' }}>
              Manage MongoDB products, Cloudinary images, inventory, and customer fulfillment
            </p>
          </div>

          <button
            onClick={() => setActiveTab('add')}
            style={{
              backgroundColor: 'var(--color-pink-deep)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '10px 22px',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Plus size={16} />
            <span>Add New Product</span>
          </button>
        </div>

        {/* 1. Metrics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(115, 90, 75, 0.08)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-taupe-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Total Revenue
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-taupe-dark)', marginTop: '4px' }}>
              ${totalRevenue.toFixed(2)}
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(115, 90, 75, 0.08)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-taupe-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Total Orders
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-taupe-dark)', marginTop: '4px' }}>
              {orders.length}
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(115, 90, 75, 0.08)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-taupe-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Active Catalog Items
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-taupe-dark)', marginTop: '4px' }}>
              {products.length}
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(115, 90, 75, 0.08)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-taupe-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Total Stock Units
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-sage-deep)', marginTop: '4px' }}>
              {totalStockCount} units
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          {[
            { id: 'products', label: '👗 Catalog Products' },
            { id: 'orders', label: '📦 Customer Orders' },
            { id: 'add', label: '➕ Add Product (Cloudinary)' },
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
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Product List */}
        {activeTab === 'products' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '24px', boxShadow: 'var(--shadow-sm)', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-creme)', textAlign: 'left' }}>
                  <th style={{ padding: '12px', borderBottom: '1px solid var(--border-light)' }}>Image</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid var(--border-light)' }}>Name</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid var(--border-light)' }}>Category</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid var(--border-light)' }}>Age Group</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid var(--border-light)' }}>Price</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid var(--border-light)' }}>Stock</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid var(--border-light)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id || p.id} style={{ borderBottom: '1px solid rgba(115, 90, 75, 0.08)' }}>
                    <td style={{ padding: '12px' }}>
                      <img
                        src={p.featuredImage || p.images?.[0] || '/images/hero.jpg'}
                        alt={p.name}
                        style={{ width: '48px', height: '56px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                    </td>
                    <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-taupe-dark)' }}>
                      {p.name}
                    </td>
                    <td style={{ padding: '12px', textTransform: 'capitalize' }}>{p.category}</td>
                    <td style={{ padding: '12px' }}>{p.ageRange}</td>
                    <td style={{ padding: '12px', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                      ${p.price}
                    </td>
                    <td style={{ padding: '12px' }}>{p.totalStock || 30} in stock</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleDeleteProduct(p._id || p.id)}
                        style={{ background: 'transparent', border: 'none', color: '#c0392b', cursor: 'pointer', padding: '6px' }}
                        title="Delete Product"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Orders List */}
        {activeTab === 'orders' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '24px', boxShadow: 'var(--shadow-sm)', overflowX: 'auto' }}>
            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>No orders recorded yet.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-creme)', textAlign: 'left' }}>
                    <th style={{ padding: '12px', borderBottom: '1px solid var(--border-light)' }}>Order ID</th>
                    <th style={{ padding: '12px', borderBottom: '1px solid var(--border-light)' }}>Customer</th>
                    <th style={{ padding: '12px', borderBottom: '1px solid var(--border-light)' }}>Items</th>
                    <th style={{ padding: '12px', borderBottom: '1px solid var(--border-light)' }}>Total</th>
                    <th style={{ padding: '12px', borderBottom: '1px solid var(--border-light)' }}>Status</th>
                    <th style={{ padding: '12px', borderBottom: '1px solid var(--border-light)' }}>Tracking ID</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord._id || ord.orderNumber} style={{ borderBottom: '1px solid rgba(115, 90, 75, 0.08)' }}>
                      <td style={{ padding: '12px', fontWeight: 700 }}>{ord.orderNumber}</td>
                      <td style={{ padding: '12px' }}>
                        <div>{ord.shippingAddress?.fullName || ord.guestEmail}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-taupe-muted)' }}>{ord.shippingAddress?.city}, {ord.shippingAddress?.state}</div>
                      </td>
                      <td style={{ padding: '12px' }}>{ord.orderItems?.length || 1} items</td>
                      <td style={{ padding: '12px', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                        ${(ord.totalPrice || 0).toFixed(2)}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <select
                          value={ord.status || 'Confirmed'}
                          onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-light)',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                          }}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--color-taupe-muted)' }}>
                        {ord.trackingNumber || 'Pending'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab 3: Add Product with Cloudinary Upload */}
        {activeTab === 'add' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', padding: '36px', boxShadow: 'var(--shadow-sm)', maxWidth: '780px', margin: '0 auto' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-taupe-dark)', marginBottom: '8px' }}>
              Add New Organic Garment
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-taupe-muted)', marginBottom: '24px' }}>
              Upload product photography directly to Cloudinary and populate product metadata for MongoDB.
            </p>

            {formMsg && (
              <div style={{ padding: '12px', backgroundColor: 'var(--bg-creme)', borderRadius: 'var(--radius-md)', fontWeight: 600, marginBottom: '20px', fontSize: '0.9rem' }}>
                {formMsg}
              </div>
            )}

            <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Product Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                  Product Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meadow Blossom Linen Romper"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.9rem' }}
                />
              </div>

              {/* Subtitle & Fabric */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                    Subtitle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Heirloom Pure Washed Flax Overalls"
                    value={newProduct.subtitle}
                    onChange={(e) => setNewProduct({ ...newProduct, subtitle: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                    Fabric Specification
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 100% GOTS Organic Cotton"
                    value={newProduct.fabric}
                    onChange={(e) => setNewProduct({ ...newProduct, fabric: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              {/* Price & Stock */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                    Price ($)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="48"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                    Compare At Price ($)
                  </label>
                  <input
                    type="number"
                    placeholder="62"
                    value={newProduct.compareAtPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, compareAtPrice: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                    Stock Units
                  </label>
                  <input
                    type="number"
                    placeholder="30"
                    value={newProduct.totalStock}
                    onChange={(e) => setNewProduct({ ...newProduct, totalStock: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              {/* Category & Age Group */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.9rem' }}
                  >
                    <option value="rompers">Rompers & Onesies</option>
                    <option value="dresses">Botanical Dresses</option>
                    <option value="dungarees">Linen Dungarees</option>
                    <option value="knitwear">Chunky Knitwear</option>
                    <option value="sets">Matching Sets</option>
                    <option value="accessories">Accessories & Swaddles</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                    Age Group
                  </label>
                  <select
                    value={newProduct.ageGroup}
                    onChange={(e) => {
                      const val = e.target.value;
                      let range = '0 – 12 Months';
                      if (val === 'toddler') range = '1 – 3 Years';
                      if (val === 'little') range = '4 – 6 Years';
                      if (val === 'junior') range = '7 – 10 Years';
                      if (val === 'mommy-me') range = 'Mother & Child Set';
                      setNewProduct({ ...newProduct, ageGroup: val, ageRange: range });
                    }}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.9rem' }}
                  >
                    <option value="baby">0 – 12 Months (Baby)</option>
                    <option value="toddler">1 – 3 Years (Toddler)</option>
                    <option value="little">4 – 6 Years (Little Kids)</option>
                    <option value="junior">7 – 10 Years (Juniors)</option>
                    <option value="mommy-me">Mommy & Me Matching Set</option>
                  </select>
                </div>
              </div>

              {/* Cloudinary Image Upload Section */}
              <div style={{ padding: '20px', backgroundColor: 'var(--bg-creme)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-pink)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <ImageIcon size={18} color="var(--color-pink-deep)" />
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-taupe-dark)' }}>
                    Product Photography (Cloudinary Upload)
                  </span>
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--color-taupe-muted)', marginBottom: '12px' }}>
                  Select an image from your device to upload automatically to Cloudinary storage.
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  style={{ display: 'block', marginBottom: '12px', fontSize: '0.85rem' }}
                />

                {uploadingImage && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-taupe)', fontWeight: 600 }}>
                    ⏳ Uploading image to Cloudinary...
                  </div>
                )}

                {uploadSuccess && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-sage-deep)', fontWeight: 600 }}>
                    {uploadSuccess}
                  </div>
                )}

                {newProduct.featuredImage && (
                  <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={newProduct.featuredImage} alt="preview" style={{ width: '60px', height: '70px', borderRadius: '6px', objectFit: 'cover' }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-taupe-muted)' }}>Image URL: {newProduct.featuredImage.slice(0, 45)}...</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-taupe)', marginBottom: '4px' }}>
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the silhouette, organic certifications, buttons, and craftsmanship..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.9rem' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--color-pink-deep)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '14px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-md)',
                  marginTop: '10px',
                }}
              >
                Publish Organic Product to Catalog
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
