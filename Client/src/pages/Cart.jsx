'use client'
import Providers from "@/redux/provider/Provider";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import style from "./styles/Cart/Cart.module.css"
import { addProduct } from "@/redux/slice/cartSlice";
import { useRouter } from "next/router"


const Cart = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.carts.cart)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const cartLS = JSON.parse(localStorage.getItem("cart"))
        dispatch(addProduct(cartLS))
    }, [])

    const handleEliminate = (id) => {
        const updatedCart = cart.filter((product) => product.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        router.push("/Cart");
    };

    return (
        <div>
            {cart?.map(product => {
                return (product?.title &&
                    <div>
                        <div className={style.product_container}>
                            <div>
                                <img src={product.thumbnail} alt="product_image" />
                            </div>

                            <div>
                                <h1>{product.title}</h1>
                            </div>

                            <div>
                                <p>${product.original_price}</p>
                            </div>

                            <button onClick={() => handleEliminate(product.id)}>Eliminar</button>
                            <button>Comprar ahora</button>
                        </div>
                    </div>
                )
            })

            }

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
    return (
        <Providers>
            <Cart />
        </Providers>
    )

}

export default CartComponent;