const express = require('express');
const Stripe = require('stripe');
const token = process.env.STRIPE_SECRET_KEY;
const stripe = Stripe(token);  
const router = express.Router();

// Route to create a PaymentIntent
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.send({
      clientSecret: paymentIntent.client_secret, 
    });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error.message);
    res.status(500).send({ error: error.message });
  }
});
// Route to confirm the PaymentIntent (if necessary)
router.post('/confirm-payment', async (req, res) => {
  const { paymentIntentId, paymentMethodId } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });
    if (paymentIntent.status === 'succeeded') {
      res.status(200).send({ message: 'Payment succeeded', paymentIntent });
    } else {
      res.status(400).send({ message: 'Payment failed', paymentIntent });
    }
  } catch (error) {
    console.error('Error confirming PaymentIntent:', error.message);
    res.status(500).send({ error: error.message });
  }
});
module.exports = router;