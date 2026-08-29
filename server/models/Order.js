import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  selectedSize: { type: String, required: true },
  selectedColor: { type: String, default: '' },
  category: { type: String, default: '' },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    orderNumber: { type: String, required: true, unique: true },
    guestEmail: { type: String, default: '' },
    orderItems: [orderItemSchema],
    shippingAddress: {
      fullName: { type: String, required: true },
      street: { type: String, required: true },
      apartment: { type: String, default: '' },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, default: 'United States' },
      phone: { type: String, required: true },
    },
    shippingMethod: {
      name: { type: String, default: 'Standard Eco Delivery' },
      price: { type: Number, default: 0 },
      estimatedDelivery: { type: String, default: '3 – 5 Business Days' },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['credit_card', 'upi', 'cash_on_delivery', 'apple_pay', 'net_banking'],
      default: 'credit_card',
    },
    paymentResult: {
      id: { type: String },
      status: { type: String, default: 'COMPLETED' },
      update_time: { type: String },
      email_address: { type: String },
    },
    coupon: {
      code: { type: String, default: '' },
      discountAmount: { type: Number, default: 0 },
      discountPercentage: { type: Number, default: 0 },
    },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    discountPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: true },
    paidAt: { type: Date, default: Date.now },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Confirmed',
    },
    trackingNumber: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
