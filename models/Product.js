const mongoose = require('mongoose');
const slugify = require('slugify');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand'],
    enum: [
      'Rolex',
      'Omega',
      'Patek Philippe',
      'Audemars Piguet',
      'Tag Heuer',
      'Breitling',
      'Cartier',
      'IWC',
      'Hublot',
      'Panerai',
      'Other'
    ]
  },
  gender: {
    type: String,
    required: [true, 'Please specify gender'],
    enum: ['men', 'women', 'unisex']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'dress',
      'sports',
      'diver',
      'chronograph',
      'pilot',
      'smartwatch',
      'other'
    ]
  },
  strapType: {
    type: String,
    required: [true, 'Please add a strap type'],
    enum: ['metal', 'leather', 'rubber', 'nylon', 'ceramic', 'other']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  discountPrice: {
    type: Number,
    validate: {
      validator: function(val) {
        return val < this.price;
      },
      message: 'Discount price must be below regular price'
    }
  },
  color: {
    type: String,
    required: [true, 'Please add a color']
  },
  waterResistance: {
    type: String,
    required: [true, 'Please add water resistance']
  },
  movement: {
    type: String,
    required: [true, 'Please add movement type'],
    enum: [
      'automatic',
      'manual',
      'quartz',
      'solar',
      'kinetic',
      'mechanical',
      'other'
    ]
  },
  caseMaterial: {
    type: String,
    required: [true, 'Please add case material']
  },
  caseDiameter: {
    type: Number,
    required: [true, 'Please add case diameter']
  },
  features: {
    type: [String],
    required: true
  },
  images: {
    type: [String],
    required: [true, 'Please add at least one image']
  },
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    min: [0, 'Stock cannot be negative']
  },
  ratingsAverage: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must can not be more than 5'],
    set: val => Math.round(val * 10) / 10
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create product slug from the name
ProductSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Reverse populate with reviews
ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});

module.exports = mongoose.model('Product', ProductSchema);