const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Please add a coupon code'],
    unique: true,
    uppercase: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  discountType: {
    type: String,
    required: [true, 'Please add a discount type'],
    enum: ['percentage', 'fixed']
  },
  discountAmount: {
    type: Number,
    required: [true, 'Please add a discount amount'],
    min: [0, 'Discount cannot be negative']
  },
  minOrderAmount: {
    type: Number,
    required: [true, 'Please add a minimum order amount'],
    min: [0, 'Minimum order amount cannot be negative']
  },
  maxDiscountAmount: {
    type: Number,
    min: [0, 'Max discount amount cannot be negative']
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please add an end date']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Check if coupon is valid
CouponSchema.methods.isValid = function() {
  const now = new Date();
  return this.isActive && this.startDate <= now && this.endDate >= now;
};

module.exports = mongoose.model('Coupon', CouponSchema);