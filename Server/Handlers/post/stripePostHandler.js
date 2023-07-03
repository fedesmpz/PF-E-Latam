require('dotenv').config();
const nodemailer = require ("nodemailer")
const { CLAVE_STRIPE } = process.env;
const Stripe = require("stripe");

const { stripePost }= require("../../Controllers/post/stripePost.js")

const stripe = new Stripe("sk_test_51NMEmIAqi82qB8rdhFdmHI7JLwSpPqgGBToNlbB1X57NkDLn0uvbYlsN8LXR3wSoYSl8DHg0nxsTuxABBxxcaa3U00nNPYUfHw");

const stripeHandler = async (req, res) => {
  let { amount, currency, description,  payment_method, products_id, email } = req.body;

  const paymentNotification = async () => {

    const config = {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: 'E.latam.henry@gmail.com',
        pass: 'hjkblozrmqiltmim',
      }
    };

    const message = {
      from: "E.latam.henry@gmail.com",
      to: `${email}`,
      subject: 'Compra exitosa',
      html:`
      <h1>¡Compra exitosa!</h1>
      <p>Has realizado una compra exitosa del siguiente producto:</p>
      <p>${description}</p>
      <p>Precio: ${currency} ${amount}</p>
      <p>Gracias por tu compra.</p>
      <h2>E-Latam</h2>
    `
    };

    const transport = nodemailer.createTransport(config)
    const info = await transport.sendMail(message)
  }
  
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

  paymentNotification();

    return res.status(200).json("Muchas gracias por tu compra")
  } catch (error) {
    if(error.message == "Your card was declined."){
     error.message= "Pago rechazado, verifique sus datos e intente de nuevo"
    }

    
    return res.status(400).json({error:error.message});
  }
}

module.exports = { stripeHandler };
