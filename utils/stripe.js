const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process payment
exports.processPayment = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret
    });
  } catch (err) {
    return next(new ErrorResponse('Error processing payment', 500));
  }
};

// Send stripe API key
exports.sendStripeApi = async (req, res, next) => {
  res.status(200).json({
    success: true,
    stripeApiKey: process.env.STRIPE_API_KEY
  });
};