require('dotenv').config();
const { CLAVE_STRIPE } = process.env;

const Stripe = require("stripe");

const stripe = new Stripe("sk_test_51NMEmIAqi82qB8rdhFdmHI7JLwSpPqgGBToNlbB1X57NkDLn0uvbYlsN8LXR3wSoYSl8DHg0nxsTuxABBxxcaa3U00nNPYUfHw");

const stripeHandler = async (req, res) => {
  try {
    let { amount, currency, description, id, confirm, payment_method } = req.body;
    amount = amount * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      payment_method: id,
      confirm 
    });

    const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id);

    console.log(confirmedPaymentIntent);
    return res.status(200).json(confirmedPaymentIntent);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { stripeHandler };
