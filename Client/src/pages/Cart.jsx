'use client'
import Providers from "@/redux/provider/Provider";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import style from "./styles/Cart/Cart.module.css"
import { removeProduct } from "@/redux/slice/cartSlice";
import { useRouter } from "next/router"


const Cart = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    /* const cart = useSelector(state => state.carts.cart) */
    const [cart, setCart] = useState([])

    useEffect(() => {
        const cartLS = JSON.parse(localStorage.getItem("cart"))
        setCart(cartLS)
        console.log(cart);
    }, [])

    const handleEliminate = (id) => {
        const updatedCart = cart.filter((product) => product.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        dispatch(removeProduct(id));
        router.push("/Cart");
    };


    return (
        <div className={style.cartContainer}>
            <div className={style.cartProducts}>
                {cart?.map((product) => {
                    return (
                        product?.title && (
                            <div className={style.productContainer} key={product.id}>
                                <div className={style.productImage}>
                                    <img src={product.thumbnail} alt="product_image" />
                                </div>
                                <div className={style.productInfo}>
                                    <h1 className={style.productTitle}>{product.title}</h1>
                                    <p className={style.productPrice}>${product.original_price}</p>
                                </div>
                                <div className={style.productActions}>
                                    <button
                                        className={style.deleteButton}
                                        onClick={() => handleEliminate(product.id)}
                                    >
                                        Eliminar
                                    </button>
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
    )

}

export default CartComponent;