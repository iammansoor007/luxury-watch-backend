const { processPayment, sendStripeApi } = require('../utils/stripe');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Process payment
// @route   POST /api/v1/payment/process
// @access  Private
exports.processPayment = asyncHandler(async (req, res, next) => {
    await processPayment(req, res, next);
});

// @desc    Send stripe API key
// @route   GET /api/v1/payment/stripeapi
// @access  Private
exports.sendStripeApi = asyncHandler(async (req, res, next) => {
    await sendStripeApi(req, res, next);
});