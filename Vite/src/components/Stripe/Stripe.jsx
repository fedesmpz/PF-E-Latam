import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { payProduct } from '../../redux/slice/productSlice';
import { useEffect } from 'react';

const Stripe = ({ sale, total }) => {

    const dispatch = useDispatch();
    const elements = useElements();
    const stripe = useStripe();

    const [info, setInfo] = useState({
        description: "",
        amount: total,
        currency: sale[0].currency_id,
        id: ""
    })

    const filterInfo = () => {
        sale.map(product => {
            setInfo({
                ...info,
                description: `${info.description}${product.title}`
            })
        })
    }

    useEffect(() => {
        filterInfo();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                address: {
                    country: "AR"
                }
            }
        })


        if (!error) {
            console.log(paymentMethod)
            console.log(sale, total);
            const { id } = paymentMethod
            console.log(id);
            dispatch(payProduct((setInfo({
                ...info,
                id: id,
            }))));
            console.log(info);
        }

    }

    return (
        <>
            <h1>Card</h1>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button>Pay</button>
            </form>
        </>
    )
}

export default Stripe;