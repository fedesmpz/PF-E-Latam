const paymentProductcontroller = require("../../Controllers/post/paymentProductController");
const Stripe = require("stripe")

const stripe = new Stripe('sk_test_51NMEmIAqi82qB8rdhFdmHI7JLwSpPqgGBToNlbB1X57NkDLn0uvbYlsN8LXR3wSoYSl8DHg0nxsTuxABBxxcaa3U00nNPYUfHw')

const postProductPayment = async (req, res) => {
    try {
        const {original_price, sale_price, id, price, currency_id, country} = req.body
        let amount = original_price;

        if (sale_price) {
            amount = price
        }
        const payment = await stripe.paymentIntents.create({
            amount: amount * 100, // pasar a centavos los ARS, MXN y COP
            currency: currency_id,
            description: title,
            payment_method: id,
            confirm: true
        })

        return res.status(400).json(payment)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = postProductPayment;