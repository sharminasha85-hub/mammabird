import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { initialProducts } from '../data/seedProducts.js';

let inMemoryProducts = [...initialProducts];

// @desc    Get all products with filtering, search, sorting & pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const {
      keyword,
      category,
      ageGroup,
      fabric,
      minPrice,
      maxPrice,
      sort,
      isFeatured,
      page = 1,
      limit = 24,
    } = req.query;

    // If MongoDB Atlas is not currently connected, use in-memory fallback
    if (mongoose.connection.readyState !== 1) {
      let filtered = [...inMemoryProducts];

      if (keyword) {
        const q = keyword.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.fabric.toLowerCase().includes(q)
        );
      }

      if (category && category !== 'all') {
        filtered = filtered.filter((p) => p.category === category);
      }

      if (ageGroup && ageGroup !== 'all') {
        filtered = filtered.filter((p) => p.ageGroup === ageGroup);
      }

      if (fabric && fabric !== 'all') {
        filtered = filtered.filter((p) => p.fabric.toLowerCase().includes(fabric.toLowerCase()));
      }

      if (minPrice) {
        filtered = filtered.filter((p) => p.price >= Number(minPrice));
      }

      if (maxPrice) {
        filtered = filtered.filter((p) => p.price <= Number(maxPrice));
      }

      if (isFeatured === 'true') {
        filtered = filtered.filter((p) => p.isFeatured);
      }

      if (sort === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      }

      return res.json({
        products: filtered,
        page: Number(page),
        pages: Math.ceil(filtered.length / Number(limit)),
        total: filtered.length,
      });
    }

    // When MongoDB is connected
    const query = {};

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { fabric: { $regex: keyword, $options: 'i' } },
      ];
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (ageGroup && ageGroup !== 'all') {
      query.ageGroup = ageGroup;
    }

    if (fabric && fabric !== 'all') {
      query.fabric = { $regex: fabric, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (isFeatured === 'true') {
      query.isFeatured = true;
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'price-asc') sortOptions = { price: 1 };
    else if (sort === 'price-desc') sortOptions = { price: -1 };
    else if (sort === 'rating') sortOptions = { rating: -1 };
    else if (sort === 'popular') sortOptions = { numReviews: -1 };

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(Number(limit))
      .skip(Number(limit) * (Number(page) - 1));

    if (products.length === 0 && Object.keys(query).length === 0) {
      return res.json({
        products: inMemoryProducts,
        page: 1,
        pages: 1,
        total: inMemoryProducts.length,
      });
    }

    res.json({
      products,
      page: Number(page),
      pages: Math.ceil(count / Number(limit)),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by ID or Slug
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState !== 1) {
      const found = inMemoryProducts.find((p) => p._id === id || p.slug === id || p.id === id);
      if (found) return res.json(found);
      return res.status(404).json({ message: 'Product not found' });
    }

    let product;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }

    if (!product) {
      product = await Product.findOne({ slug: id });
    }

    if (!product) {
      const fallback = inMemoryProducts.find((p) => p._id === id || p.slug === id || p.id === id);
      if (fallback) return res.json(fallback);
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new product (Admin)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      subtitle,
      description,
      price,
      compareAtPrice,
      category,
      ageGroup,
      ageRange,
      badge,
      fabric,
      fabricDetails,
      colors,
      sizes,
      images,
      featuredImage,
      features,
      isFeatured,
      totalStock,
    } = req.body;

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const productPayload = {
      name,
      slug: generatedSlug,
      subtitle: subtitle || '',
      description,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
      category,
      ageGroup,
      ageRange: ageRange || '0 – 10 Years',
      badge: badge || '',
      fabric,
      fabricDetails: fabricDetails || [],
      colors: colors || [{ name: 'Natural Oatmeal', hex: '#DFCEBE' }],
      sizes: sizes || [
        { size: '0-3M', stock: 10 },
        { size: '3-6M', stock: 10 },
        { size: '6-12M', stock: 10 },
      ],
      images: images && images.length ? images : [featuredImage || '/images/hero.jpg'],
      featuredImage: featuredImage || (images && images[0]) || '/images/hero.jpg',
      features: features || [],
      isFeatured: Boolean(isFeatured),
      totalStock: totalStock ? Number(totalStock) : 30,
    };

    if (mongoose.connection.readyState !== 1) {
      const created = {
        ...productPayload,
        _id: 'prod_' + Date.now(),
        id: 'prod_' + Date.now(),
        rating: 5,
        numReviews: 0,
        reviews: [],
        createdAt: new Date().toISOString(),
      };
      inMemoryProducts.unshift(created);
      return res.status(201).json(created);
    }

    const product = new Product(productPayload);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an existing product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const index = inMemoryProducts.findIndex((p) => p._id === req.params.id || p.id === req.params.id);
      if (index > -1) {
        inMemoryProducts[index] = { ...inMemoryProducts[index], ...req.body };
        return res.json(inMemoryProducts[index]);
      }
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = await Product.findById(req.params.id);
    if (product) {
      Object.assign(product, req.body);
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      inMemoryProducts = inMemoryProducts.filter((p) => p._id !== req.params.id && p.id !== req.params.id);
      return res.json({ message: 'Product removed successfully' });
    }

    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create product review
// @route   POST /api/products/:id/reviews
// @access  Public / Authenticated
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment, name, childAge } = req.body;

    const review = {
      name: name || (req.user ? req.user.name : 'Verified Nest Parent'),
      rating: Number(rating),
      comment,
      childAge: childAge || '',
      user: req.user ? req.user._id : null,
      verifiedPurchase: true,
      createdAt: new Date().toISOString(),
    };

    if (mongoose.connection.readyState !== 1) {
      const p = inMemoryProducts.find((prod) => prod._id === req.params.id || prod.id === req.params.id);
      if (p) {
        p.reviews = p.reviews || [];
        p.reviews.push(review);
        p.numReviews = p.reviews.length;
        p.rating = p.reviews.reduce((acc, item) => item.rating + acc, 0) / p.reviews.length;
        return res.status(201).json({ message: 'Review added successfully', review });
      }
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = await Product.findById(req.params.id);
    if (product) {
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added successfully', review });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
