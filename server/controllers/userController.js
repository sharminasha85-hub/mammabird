import mongoose from 'mongoose';
import User from '../models/User.js';
import { generateToken } from '../middleware/authMiddleware.js';

let inMemoryUsers = [
  {
    _id: 'admin_1',
    name: 'mammaBird Admin',
    email: 'admin@mammabird.com',
    role: 'admin',
    phone: '+1 (555) 019-2834',
    vipMember: true,
    vipDiscountCode: 'NESTLING25',
    addresses: [],
    wishlist: [],
  },
  {
    _id: 'user_1',
    name: 'Jessica Reynolds',
    email: 'customer@mammabird.com',
    role: 'user',
    phone: '+1 (555) 382-9912',
    vipMember: true,
    vipDiscountCode: 'NESTLING25',
    addresses: [
      {
        fullName: 'Jessica Reynolds',
        street: '742 Evergreen Meadow Way',
        apartment: 'Suite 4B',
        city: 'Portland',
        state: 'OR',
        zipCode: '97201',
        country: 'United States',
        phone: '+1 (555) 382-9912',
        isDefault: true,
      },
    ],
    wishlist: [],
  },
];

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const newUser = {
        _id: 'user_' + Date.now(),
        name,
        email: email.toLowerCase(),
        role: 'user',
        phone: '',
        vipMember: true,
        vipDiscountCode: 'NESTLING25',
        addresses: [],
        wishlist: [],
      };
      inMemoryUsers.push(newUser);
      return res.status(201).json({
        ...newUser,
        token: generateToken(newUser._id),
      });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'A user with this email already exists' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        vipMember: user.vipMember,
        vipDiscountCode: user.vipDiscountCode,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data provided' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const user = inMemoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (user) {
        return res.json({
          ...user,
          token: generateToken(user._id),
        });
      }
      if (password && password.length >= 6) {
        const dummyUser = {
          _id: 'user_' + Date.now(),
          name: email.split('@')[0],
          email: email.toLowerCase(),
          role: email.includes('admin') ? 'admin' : 'user',
          vipMember: true,
          vipDiscountCode: 'NESTLING25',
          addresses: [],
          wishlist: [],
        };
        inMemoryUsers.push(dummyUser);
        return res.json({
          ...dummyUser,
          token: generateToken(dummyUser._id),
        });
      }
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        vipMember: user.vipMember,
        vipDiscountCode: user.vipDiscountCode,
        addresses: user.addresses,
        wishlist: user.wishlist,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const user = inMemoryUsers.find((u) => u._id === req.user?._id) || inMemoryUsers[1];
      return res.json(user);
    }

    const user = await User.findById(req.user._id).populate('wishlist');
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        addresses: user.addresses,
        wishlist: user.wishlist,
        vipMember: user.vipMember,
        vipDiscountCode: user.vipDiscountCode,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile & addresses
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const user = inMemoryUsers.find((u) => u._id === req.user?._id);
      if (user) {
        Object.assign(user, req.body);
        return res.json({ ...user, token: generateToken(user._id) });
      }
      return res.status(404).json({ message: 'User not found' });
    }

    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email ? req.body.email.toLowerCase() : user.email;
      user.phone = req.body.phone || user.phone;

      if (req.body.addresses) {
        user.addresses = req.body.addresses;
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        addresses: updatedUser.addresses,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle product in user wishlist
// @route   POST /api/users/wishlist/:productId
// @access  Private
export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }

    const user = await User.findById(req.user._id);

    if (user) {
      const index = user.wishlist.indexOf(productId);
      if (index > -1) {
        user.wishlist.splice(index, 1);
      } else {
        user.wishlist.push(productId);
      }
      await user.save();
      const updated = await User.findById(req.user._id).populate('wishlist');
      res.json(updated.wishlist);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
