import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { payProduct, cleanDetail } from '../../redux/slice/productSlice';
import { useEffect } from 'react';
import styles from "./Stripe.module.css";
import { useNavigate } from 'react-router-dom';

const Stripe = ({ sale, total, shipping }) => {
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
        if(saleMessage ==="Muchas gracias por tu compra"){
           navigate("/Home")
        }

        
    }

    return (
        <div className={styles.container}>
            <div className={styles.container_resume}>
                <div>
                    <h2>Resumen</h2>
                    <div className={styles.resume_container} >
                        <p className={styles.resume_info} >Email: {`${userInfo?.email}`}</p>
                        <p className={styles.resume_info} >City: {`${shipping?.city}`}</p>
                        <p className={styles.resume_info} >Country: {`${shipping?.country}`}</p>
                        <p className={styles.resume_info} >Dirección: {`${shipping?.address}`}</p>
                        <p className={styles.resume_info} >Dirección: {`${shipping?.postalCode}`}</p>
                    </div>
                </div>
            </div>
            <div className={styles.container_card}>
                <h1 className={styles.title}>Card</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.card_element_container}>
                        <div /* className={styles.cardElement} */>
                            <CardElement />
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
