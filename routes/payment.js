const express = require('express');
const { processPayment, sendStripeApi } = require('../controllers/payment');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/process').post(protect, processPayment);
router.route('/stripeapi').get(protect, sendStripeApi);

module.exports = router;