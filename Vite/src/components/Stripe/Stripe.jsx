import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const Stripe = () => {
    const elements = useElements();
    const stripe = useStripe();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card: elements.getElement(CardElement)
        })
        if(!error) {
            console.log(paymentMethod)
        }
    }
    
    return(
        <>
            <h1>Card</h1>
            <form onSubmit={handleSubmit}>
                <CardElement/>
                <button>Pay</button>
            </form>
        </>
    )
}

export default Stripe;