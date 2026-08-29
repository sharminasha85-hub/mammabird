import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    verifiedPurchase: { type: Boolean, default: true },
    childAge: { type: String, default: '' },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    subtitle: { type: String, default: '' },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, default: null },
    category: {
      type: String,
      required: true,
      enum: ['rompers', 'dresses', 'dungarees', 'knitwear', 'sets', 'accessories', 'all'],
    },
    ageGroup: {
      type: String,
      required: true,
      enum: ['baby', 'toddler', 'little', 'junior', 'mommy-me'],
    },
    ageRange: { type: String, required: true }, // e.g. "0 – 12 Months", "1 – 3 Years", "Mom & Child Set"
    badge: { type: String, default: '' }, // e.g. "Pure Organic Knit", "French Flax Linen"
    fabric: { type: String, required: true }, // e.g. "100% GOTS Organic Combed Cotton"
    fabricDetails: [String],
    certifications: {
      type: [String],
      default: ['GOTS Certified Organic', 'OEKO-TEX Standard 100', 'Hypoallergenic'],
    },
    careInstructions: {
      type: [String],
      default: [
        'Machine wash cold on gentle cycle (30°C)',
        'Use mild plant-based detergent',
        'Lay flat to dry in shade',
        'Warm iron if desired',
      ],
    },
    colors: [
      {
        name: { type: String, required: true },
        hex: { type: String, required: true },
      },
    ],
    sizes: [
      {
        size: { type: String, required: true }, // e.g. "0-3M", "3-6M", "6-12M", "1-2Y", "Adult M"
        stock: { type: Number, default: 20 },
      },
    ],
    images: [{ type: String, required: true }],
    featuredImage: { type: String, required: true },
    features: [String],
    rating: { type: Number, default: 5, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: true },
    isBestseller: { type: Boolean, default: false },
    totalStock: { type: Number, default: 50 },
  },
  { timestamps: true }
);

// Virtual index for searching
productSchema.index({ name: 'text', description: 'text', fabric: 'text' });

export default mongoose.models.Product || mongoose.model('Product', productSchema);
