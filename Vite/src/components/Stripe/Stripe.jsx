import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { payProduct, cleanDetail } from '../../redux/slice/productSlice';
import { useEffect } from 'react';
import styles from "./Stripe.module.css";
import { useNavigate } from 'react-router-dom';

const Stripe = ({ sale, total, shipping, products }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const elements = useElements();
    const stripe = useStripe();
    const [products_id, setProducts_id] = useState([]);
    const [userInfo, setUserInfo] = useState()
    const [info, setInfo] = useState({
        description: "",
        amount: total,
        currency: sale[0].currency_id,
    })
    const [showModal, setShowModal] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    const saleMessage = useSelector((state) => state.products.newSaleMessage)
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
        setUserInfo(userInfo)
        return () => dispatch(cleanDetail())
    }, [])

    const email = userInfo?.email;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowModal(true);
    }
    const handlerCancel = async () => {
        setShowModal(false);
    }
    const handlerConfirm = async () => {
        setShowModal(false);
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
        setShowModalConfirm(true)

    }
    const handlerReconfirm = async () => {
        await dispatch(cleanDetail())
        setShowModal(false);
        setShowModalConfirm(false)
        if (saleMessage === "Muchas gracias por tu compra") {
            navigate("/Home")
        }


    }

    const options = {
        style: {
            base: {
                fontSize: '16px',
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.resume_container} >
                <h2 className={styles.resume}>Resumen</h2>
                <p className={styles.resume_info} >Email: <strong>{`${userInfo?.email}`}</strong> </p>
                <p className={styles.resume_info} >City: <strong>{`${shipping?.city}`}</strong></p>
                <p className={styles.resume_info} >Country: <strong>{`${shipping?.country}`}</strong></p>
                <p className={styles.resume_info} >Dirección: <strong>{`${shipping?.address}`}</strong></p>
                <p className={styles.resume_info} >Código postal: <strong>{`${shipping?.postalCode}`}</strong></p>
                {products && products.map((product) => {
                    return (
                        <div className={styles.resumeContainer} key={product.id}>
                            <h1 className={styles.productTitle}>{`(${product.quantity}) ${product.title}`}</h1>
                            <h1 className={styles.productPrice}>$ {product.original_price * product.quantity}</h1>
                        </div>
                    );
                })}
            </div>
            <div className={styles.container_card}>
                <h1 className={styles.title}>Card</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.card_element_container}>
                        <div /* className={styles.cardElement} */>
                            <CardElement options={options} />
                        </div>
                        <button className={styles.button}>Pay</button>
                    </div>
                </form>
                <>
                    {showModal && (
                        <div className={styles.modal}>
                            <div className={styles.modalContent}>
                                <h2>¿Desea confirmar la compra?</h2>
                                <div className={styles.modalButtons}>
                                    <button onClick={handlerConfirm}>Aceptar</button>
                                    <button onClick={handlerCancel}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
                <>
                    {showModalConfirm && saleMessage && (
                        <div className={styles.modal}>
                            <div className={styles.modalContent}>
                                <h2>{saleMessage}</h2>
                                <div className={styles.modalButtons}>
                                    <button onClick={handlerReconfirm}>x</button>
                                </div>
                            </div>
                        </div>
                    )

                    }
                </>
            </div >
        </div>
    )
}

export default Stripe;
