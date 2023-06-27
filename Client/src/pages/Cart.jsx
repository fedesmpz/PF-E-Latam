import { useContext, useState, useEffect, useCallback } from "react";
import style from "./styles/Cart/Cart.module.css";
import { CartContext, CartProvider } from "./CartContext";
import { useRouter } from "next/router";

const Cart = () => {
    const { cart, addToCart, removeFromCart, removeToCart } = useContext(
        CartContext
    );
    const [productCounts, setProductCounts] = useState({});
    const [cartIsEmpty, setCartIsEmpty] = useState(true);
    const router = useRouter();

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

    useEffect(() => {
        loadCartData();
    }, [loadCartData]);

    useEffect(() => {
        if (!cartIsEmpty) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, cartIsEmpty]);

    const handleRemove = (productId) => {
        removeFromCart(productId);
    };

    const handlerPurchase = async () => {
        router.push("/Purchase");
    };

    const handleIncrement = (productId) => {
        setProductCounts((prevCounts) => {
            const newCounts = {
                ...prevCounts,
                [productId]: (prevCounts[productId] || 0) + 1
            };
            addToCart({ id: productId, quantity: newCounts[productId] });
            return newCounts;
        });
    };

    const handleDecrement = (productId) => {
        setProductCounts((prevCounts) => {
            const newCounts = {
                ...prevCounts,
                [productId]: (prevCounts[productId] || 0) - 1
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

    return (
        <div className={style.cartContainer}>
            <div className={style.cartProducts}>
                {cart.map((product) => (
                    <div className={style.productContainer} key={product.id}>
                        <div className={style.productImage}>
                            <img src={product.thumbnail} alt="product_image" />
                        </div>
                        <div className={style.productInfo}>
                            <h1 className={style.productTitle}>{product.title}</h1>
                            {product.sale_price ? (
                                <div>
                                    <p className={style.productPriceDiscount}>
                                        ${product.original_price}
                                    </p>
                                    <p className={style.productPrice}>${product.price}</p>
                                </div>
                            ) : (
                                <p className={style.productPrice}>
                                    ${product.original_price}
                                </p>
                            )}
                            <div>
                                <p>
                                    Envío: <strong>gratis</strong>
                                </p>
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
                                Eliminar
                            </button>
                            {/* <button className={style.buyButton}>Comprar ahora</button> */}
                        </div>
                    </div>
                ))}
            </div>

            <div className={style.resumeContainer}>
                <div className={style.resumeHeader}>
                    <h1 className={style.resumeTitle}>Resumen de compra</h1>
                </div>
                <div className={style.resumeContent}>
                    <div className={style.resumeDetails}>
                        <p className={style.resumeText}>productos</p>
                        <span className={style.resumePrice}>precio</span>
                    </div>
                    <div className={style.resumeActions}>
                        <button
                            className={style.continueButton}
                            onClick={handlerPurchase}
                        >
                            Continuar compra
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartWithProvider = () => {
    return (
        <CartProvider>
            <Cart />
        </CartProvider>
    );
};

export default CartWithProvider;
