require('dotenv').config();
const { CLAVE_STRIPE } = process.env;
const Stripe = require("stripe");

const { stripePost }= require("../../Controllers/post/stripePost.js")

const stripe = new Stripe("sk_test_51NMEmIAqi82qB8rdhFdmHI7JLwSpPqgGBToNlbB1X57NkDLn0uvbYlsN8LXR3wSoYSl8DHg0nxsTuxABBxxcaa3U00nNPYUfHw");

const stripeHandler = async (req, res) => {
  let { amount, currency, description,  payment_method, products_id, email } = req.body;
  
  try {
   if( !amount || !currency || !description || !payment_method|| !products_id || !email){
   throw new Error("faltan datos")
   }
    amount = amount * 100;
     const paymentIntent = await stripe.paymentIntents.create({
     amount,
     currency,
     description,
     payment_method
     
   });

  const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id);
   const savedBDD= await stripePost(amount,products_id,email)

    return res.status(200).json("El pago fue exitoso")
  } catch (error) {
    return res.status(400).json({error:error.message});
  }
}

module.exports = { stripeHandler };
