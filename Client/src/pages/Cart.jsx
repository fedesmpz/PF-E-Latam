import Providers from "@/redux/provider/Provider";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import style from "./styles/Cart/Cart.module.css"


const Cart = () => {

    const [cart, setCart] = useState({})
    const productAdded = useSelector(state => state.carts.cart)
    const productDetail = useSelector(state => state.products.detail)


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    return (
        <div>
            <div className={style.product_container}>
                <div>
                    <img src={cart.thumbnail} alt="product_image" />
                </div>

                <div>
                    <h1>{cart.title}</h1>
                </div>

                <div>
                    <p>$ {cart.price}</p>
                </div>

                <button>Eliminar</button>
                <button>Comprar ahora</button>

            </div>
            <div className={style.resume_container}>
                <div>
                    <h1>Resumen de compra</h1>
                </div>
                <div>
                    <div>
                        <p>productos</p><span>precio</span>
                    </div>
                    <div>
                        <button>Continuar compra</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

const CartComponent = () => {
    <Providers>
        <Cart />
    </Providers>
}

export default CartComponent;