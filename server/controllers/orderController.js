import mongoose from 'mongoose';
import Order from '../models/Order.js';

let inMemoryOrders = [];

const generateOrderNumber = () => {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `MB-2026-${randomDigits}`;
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (supports Guest checkout and Logged in user)
export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      shippingMethod,
      paymentMethod,
      coupon,
      itemsPrice,
      taxPrice,
      shippingPrice,
      discountPrice,
      totalPrice,
      guestEmail,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }

    const orderPayload = {
      orderNumber: generateOrderNumber(),
      orderItems,
      user: req.user ? req.user._id : null,
      guestEmail: guestEmail || (req.user ? req.user.email : ''),
      shippingAddress,
      shippingMethod: shippingMethod || {
        name: 'Standard Eco Delivery',
        price: 0,
        estimatedDelivery: '3 – 5 Business Days',
      },
      paymentMethod: paymentMethod || 'credit_card',
      paymentResult: {
        id: 'SIMULATED_PAY_' + Date.now(),
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        email_address: guestEmail || (req.user ? req.user.email : 'guest@mammabird.com'),
      },
      coupon: coupon || { code: '', discountAmount: 0 },
      itemsPrice: Number(itemsPrice),
      taxPrice: Number(taxPrice || 0),
      shippingPrice: Number(shippingPrice || 0),
      discountPrice: Number(discountPrice || 0),
      totalPrice: Number(totalPrice),
      isPaid: true,
      paidAt: Date.now(),
      status: 'Confirmed',
      trackingNumber: 'TRK-MB' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
    };

    if (mongoose.connection.readyState !== 1) {
      const created = {
        ...orderPayload,
        _id: 'ord_' + Date.now(),
      };
      inMemoryOrders.unshift(created);
      return res.status(201).json(created);
    }

    const order = new Order(orderPayload);
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public / Private
export const getOrderById = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const found = inMemoryOrders.find((o) => o._id === req.params.id || o.orderNumber === req.params.id);
      if (found) return res.json(found);
      return res.status(404).json({ message: 'Order not found' });
    }

    let order;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(req.params.id).populate('user', 'name email');
    }
    if (!order) {
      order = await Order.findOne({ orderNumber: req.params.id });
    }

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(inMemoryOrders);
    }

    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(inMemoryOrders);
    }

    const orders = await Order.find({})
      .populate('user', 'id name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status / tracking (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const order = inMemoryOrders.find((o) => o._id === req.params.id || o.orderNumber === req.params.id);
      if (order) {
        order.status = status;
        if (trackingNumber) order.trackingNumber = trackingNumber;
        return res.json(order);
      }
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = status || order.status;
      if (trackingNumber) order.trackingNumber = trackingNumber;

      if (status === 'Delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
