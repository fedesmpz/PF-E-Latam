require('dotenv').config();
const { CLAVE_STRIPE } = process.env;

const Stripe = require("stripe")

const stripe = new Stripe(CLAVE_STRIPE)

const stripeHandler = async (req, res) => {
    try {
        const {amount, id, currency, description} = req.body


        const payment = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency,
            description,
            id,
            confirm: true
        })

        return res.status(400).json(payment)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {stripeHandler};