import { useContext, useState, useEffect, useCallback } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../utils/CartContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import CarouselProducts from "../CarouselProducts/CarouselProducts"
import { useSelector } from "react-redux";
import { loginUserLocal } from "../../redux/slice/userSlice";
import ModalLogin from "../ModalLogin/ModalLogin"

const Cart = () => {
    const { cart, addToCart, removeFromCart, removeToCart } = useContext(
        CartContext
    );
    const [productCounts, setProductCounts] = useState({});
    const [cartIsEmpty, setCartIsEmpty] = useState(true);
    const userData = useSelector((state) => state.user.userData)
    const navigate = useNavigate();
    const location = useLocation();
    let [count, setCount] = useState(0);
    let [total, setTotal] = useState(0);

    const [showModal, setShowModal] = useState(false)

    const loadCartData = useCallback(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        if (savedCart && savedCart.length > 0) {
            setCartIsEmpty(false);
            const counts = {};
            savedCart.forEach((product) => {
                counts[product.id] = product.quantity;
            });
            setProductCounts(counts);
        }
    }, []);

    const totalPrice = () => {
        let totalAux = 0;
        if (cart.length > 0) {
            cart.forEach((product) => {
                product.sale_price
                    ? setTotal((totalAux += product.price * product.quantity))
                    : setTotal((totalAux += product.original_price * product.quantity));
            });
        }
        setTotal(totalAux)
    };
    const totalProducts = () => {
        let countAux = 0
        if (cart.length > 0) {
            cart.forEach((product) => {
                setCount((countAux += product.quantity));
            });
        }
        setCount(countAux);
    };

    useEffect(() => {
        loadCartData();
    }, [loadCartData]);

    useEffect(() => {
        // window.location.reload()
        setShowModal(false);
    }, [userData.access])

    useEffect(() => {
        totalProducts();
        totalPrice();
        if (!cartIsEmpty) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, cartIsEmpty]);

    const handleRemove = (productId) => {
        removeFromCart(productId);
    };

    const handlerPurchase = async () => {
        userData.access && navigate(`/Purchase?cartId=${userData.cartId}`);
        !userData.access && setShowModal(true)
    };

    const handleIncrement = (productId) => {
        setProductCounts((prevCounts) => {
            const newCounts = {
                ...prevCounts,
                [productId]: (prevCounts[productId] || 0) + 1,
            };
            addToCart({ id: productId, quantity: newCounts[productId] });
            return newCounts;
        });
    };

    const handleDecrement = (productId) => {
        setProductCounts((prevCounts) => {
            const newCounts = {
                ...prevCounts,
                [productId]: (prevCounts[productId] || 0) - 1,
            };
            if (newCounts[productId] <= 0) {
                delete newCounts[productId];
                removeFromCart(productId);
            } else {
                removeToCart({ id: productId, quantity: newCounts[productId] });
            }
            return newCounts;
        });
    };

    const handleModal = (event) => {
        event.preventDefault();
        setShowModal(false)
    }

    return (
        <div className={style.cartContainer}>
            <Link to="/Home">
                <button className={style.backButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M20.59 12H5.41l4.29-4.29a1 1 0 1 0-1.42-1.42l-6 6a1 1 0 0 0 0 1.42l6 6a1 1 0 0 0 1.42-1.42L5.41 12h15.18z" />
                    </svg>
                </button>
            </Link>
            <div className={style.cartProducts}>
                <div className={style.resumeHeader}>
                    <h1 className={style.resumeTitle}>Resumen de compra</h1>
                </div>
                <div className={style.resumeContainer}>
                    {cart.map((product) => (
                        <div className={style.productContainer} key={product.id}>
                            <div className={style.productImage}>
                                <img src={product.thumbnail} alt="product_image" />
                            </div>
                            <div className={style.productInfo}>
                                <h1 className={style.productTitle}>{product.title}</h1>
                                {product.sale_price ? (
                                    <span className={style.productPricesContainer}>
                                        <p className={style.productPriceDiscount}>
                                            $ {product.quantity * product.original_price}
                                        </p>
                                        <p className={style.productPrice}>
                                            $ {product.quantity * product.price}
                                        </p>
                                    </span>
                                ) : (
                                    <p className={style.productPrice}>
                                        $ {product.quantity * product.original_price}
                                    </p>
                                )}
                                <div>
                                    {product.shipping ? (
                                        <p>
                                            Envío: <strong>gratis</strong>
                                        </p>
                                    ) : (
                                        <p>
                                            Envío:{" "}
                                            <strong>se sumará en el total de la compra</strong>
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className={style.productActions}>
                                <div className={style.quantityContainer}>
                                    <button
                                        className={style.quantityButton}
                                        onClick={() => handleDecrement(product.id)}
                                    >
                                        -
                                    </button>

                                    <span className={style.quantity}>
                                        {productCounts[product.id] || 1}
                                    </span>

                                    <button
                                        className={style.quantityButton}
                                        onClick={() => handleIncrement(product.id)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className={style.deleteButton}
                                    onClick={() => handleRemove(product.id)}
                                >
                                    <img src="/assets/trashcanRed.png"></img>
                                </button>
                                {/* <button className={style.buyButton}>Comprar ahora</button> */}
                            </div>
                        </div>
                    ))}
                    <>
                        {showModal && (
                            <div className={style.modal}>
                                <div className={style.modalContent}>
                                    <div className={style.closeModal} onClick={handleModal}>X</div>
                                    <h2>Hola!</h2>
                                    <p>Para comprar, ingresá a tu cuenta</p>
                                    <div>
                                        <ModalLogin />
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                    <div className={style.resumeContent}>
                        <div className={style.resumeDetails}>
                            <p className={style.resumeText}>{`(${count}) Productos`}</p>
                            <p className={style.resumePrice}>Total $ {total}</p>
                        </div>
                    </div>
                </div>
                <div className={style.resumeActions}>
                    <button

                        onClick={handlerPurchase}
                        className={`${style.continueButton} ${total === 0 ? style.disabledButton : ""}`}
                        disabled={total === 0}>
                        Continuar compra
                    </button>
                </div>
            </div>
            <h2 className={style.titleProducts}>Productos relacionados</h2>
            <div className={style.productContainer}>
                <CarouselProducts />
            </div>
        </div>
    );
};

export default Cart;
