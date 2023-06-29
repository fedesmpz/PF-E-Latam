import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { payProduct } from '../../redux/slice/productSlice';
import { useEffect } from 'react';
import Style from "./Stripe.module.css"

const Stripe = ({ sale, total }) => {

    const dispatch = useDispatch();
    const elements = useElements();
    const stripe = useStripe();
    const [products_id, setProducts_id] = useState([]);
    const [userEmail, setUserEmail] = useState()
    const [info, setInfo] = useState({
        description: "",
        amount: total,
        currency: sale[0].currency_id,
    })

    const filterInfo = () => {
        const newDescription = [];
        const newProductsId = [];

        sale.forEach((product) => {
            newDescription.push(product.title);
            newProductsId.push(product.id);
        });

        const uniqueDescriptions = Array.from(new Set(newDescription));
        const descriptionJoined = uniqueDescriptions.join(",");
        setInfo((prevState) => ({
            ...prevState,
            description: descriptionJoined,
        }));
        setProducts_id(newProductsId);
    };

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        filterInfo();
        setUserEmail(userInfo)
    }, [])

    const email = userEmail?.email;
    console.log(email, products_id);
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
            const payment_method = paymentMethod.id
            dispatch(payProduct({ ...info, payment_method, products_id, email }));
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