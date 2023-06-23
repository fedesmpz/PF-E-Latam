import { useEffect, useState } from "react";
import style from "./styles/Cart/Cart.module.css";
import { useRouter } from "next/router";
import { removeProduct } from "@/redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import Providers from "@/redux/provider/Provider";

const Cart = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [cart, setCart] = useState([]);
    const [productCounts, setProductCounts] = useState({});
    const [uniqueProductIds, setUniqueProductIds] = useState(new Set());

    useEffect(() => {
        const cartLS = JSON.parse(localStorage.getItem("cart"));
        setCart(cartLS);
        const counts = {};
        const uniqueIds = new Set();
        cartLS.forEach((product) => {
            const productId = product.id;
            counts[productId] = counts[productId] ? counts[productId] + 1 : 1;
            uniqueIds.add(productId);
        });
        setProductCounts(counts);
        setUniqueProductIds(uniqueIds);
    }, []);

    const handleEliminate = (id) => {
        const productIndex = cart.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart.splice(productIndex, 1);
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            dispatch(removeProduct(id));
        }
        router.push("/Cart");
    };

    const handleIncrement = (id) => {
        const updatedCart = cart.map((product) => {
            if (product.id === id) {
                const newQuantity = productCounts[id] + 1 || 1;
                return {
                    ...product,
                    quantity: newQuantity,
                };
            }
            return product;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setProductCounts((prevCounts) => ({
            ...prevCounts,
            [id]: prevCounts[id] + 1 || 1,
        }));
    };

    const handleDecrement = (id) => {
        const updatedCart = cart.map((product) => {
            if (product.id === id && productCounts[id] > 1) {
                const newQuantity = productCounts[id] - 1;
                return {
                    ...product,
                    quantity: newQuantity,
                };
            }
            return product;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setProductCounts((prevCounts) => ({
            ...prevCounts,
            [id]: prevCounts[id] - 1,
        }));
    };

    return (
        <div className={style.cartContainer}>
            <div className={style.cartProducts}>
                {cart?.map((product) => {
                    console.log(uniqueProductIds);
                    const {
                        id,
                        title,
                        thumbnail,
                        original_price,
                        price,
                        shipping,
                        sale_price,
                        currency_id,
                    } = product;
                    const quantity = productCounts[id];
                    if (!uniqueProductIds.has(id)) {
                        return null;
                    }
                    setUniqueProductIds((prevIds) => {
                        const updatedIds = new Set(prevIds);
                        updatedIds.delete(id);
                        return updatedIds;
                    });
                    return (
                        title && (
                            <div className={style.productContainer} key={id}>
                                <div className={style.productImage}>
                                    <img src={thumbnail} alt="product_image" />
                                </div>
                                <div className={style.productInfo}>
                                    <h1 className={style.productTitle}>{title}</h1>
                                    {sale_price
                                        ? (
                                            <>
                                                <p className={style.productPriceDiscount}>
                                                    ${original_price}
                                                </p>
                                                <p className={style.productPrice}>${price}</p>
                                            </>
                                        )
                                        : (
                                            <p className={style.productPrice}>${original_price}</p>
                                        )}
                                    {shipping
                                        ? <p>Envío: <strong>gratis</strong></p>
                                        : <p>Envío: <strong>{currency_id}1500</strong></p>
                                    }
                                </div>
                                <div className={style.productActions}>
                                    <button
                                        className={style.deleteButton}
                                        onClick={() => handleEliminate(id)}
                                    >
                                        Eliminar
                                    </button>
                                    <div className={style.quantityContainer}>
                                        <button
                                            className={style.quantityButton}
                                            onClick={() => handleDecrement(id)}
                                        >
                                            -
                                        </button>
                                        <span className={style.quantity}>{quantity}</span>
                                        <button
                                            className={style.quantityButton}
                                            onClick={() => handleIncrement(id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button className={style.buyButton}>Comprar ahora</button>
                                </div>
                            </div>
                        )
                    );
                })}
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
                        <button className={style.continueButton}>Continuar compra</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartComponent = () => {
    return (
        <Providers>
            <Cart />
        </Providers>
    );
};

export default CartComponent;
