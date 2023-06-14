'use client'
import style from "./CreateProduct.module.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import Link from "next/link"
import validation from "../../utils/formValidation"
import Head from "next/head";

const CreateProduct = () => {

    <Head>
        <title>admin/product/create</title>
    </Head>

    const dispatch = useDispatch();

    const [sale, setSale] = useState(false)
    const [shipping, setShipping] = useState(true)

    const [newProduct, setNewProduct] = useState({
        id: "",
        title: "",
        thumbnail: "",
        original_price: 0,
        currency_id: "",
        price: 0,
        sale_price: sale,
        available_quantity: 0,
        oficial_store_name: "",
        shipping: shipping,
        attributes: "",
        catalog_listing: true,
        discounts: "",
        promotions: [],
        categories: "",
        country: ""
    })

    const [errors, setErrors] = useState({
        id: "",
        title: "",
        thumbnail: "",
        original_price: 0,
        currency_id: "",
        price: 0,
        sale_price: false,
        available_quantity: 0,
        oficial_store_name: "",
        shipping: true,
        attributes: "",
        catalog_listing: true,
        discounts: "",
        promotions: [],
        categories: "",
        country: ""
    })

    const handlePromotion = (event) => {
        const prop = event.target.name

        const value = dispatch(/* funcion del back */)

        setNewProduct({
            ...newProduct,
            [prop]: value
        })
    }

    const handleCheck = (event) => {
        const prop = event.target.name
        const value = event.target.value

        prop === sale
            ? setSale({
                ...sale,
                [prop]: value
            })
            : setShipping({
                ...shipping,
                [prop]: value
            })

    }

    const handleChange = (event) => {
        const prop = event.target.name
        const value = event.target.value

        setNewProduct({
            ...newProduct,
            [prop]: value
        })

        const validate = validation({
            ...newProduct,
            [prop]: value
        })

        setErrors(validate)

    }


    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch(/* crear id random y crear el producto */);

        setErrors({
            id: "",
            title: "",
            thumbnail: "",
            original_price: 0,
            currency_id: "",
            price: 0,
            sale_price: false,
            available_quantity: 0,
            oficial_store_name: "",
            shipping: true,
            attributes: "",
            catalog_listing: true,
            discounts: "",
            promotions: [],
            categories: "",
            country: ""
        })

        setNewProduct({
            id: "",
            title: "",
            thumbnail: "",
            original_price: 0,
            currency_id: "",
            price: 0,
            sale_price: false,
            available_quantity: 0,
            oficial_store_name: "",
            shipping: true,
            attributes: "",
            catalog_listing: true,
            discounts: "",
            promotions: [],
            categories: "",
            country: ""
        })

    }

    return (
        <div className={style.container}>

            <Link href="/">
                <button> Back </button>
            </Link>

            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="title">Titulo:</label>
                    <input type="text" name="title" value={newProduct.title} onChange={handleChange} />
                    {errors.title && <p>{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="thumbnail">Imagen:</label>
                    <input type="file" name="thumbnail" value={newProduct.thumbnail} onChange={handleChange} />
                    {errors.thumbnail && <p>{errors.thumbnail}</p>}
                </div>

                <div>
                    <label htmlFor="original_price">precio:</label>
                    <input type="text" name="original_price" value={newProduct.original_price} onChange={handleChange} />
                    {errors.original_price && <p>{errors.original_price}</p>}
                </div>

                {/* <div>
                    <label htmlFor="currency_id">elija el tipo de moneda:</label>
                    <input type="text" name="currency_id" value={newProduct.currency_id} onChange={handleChange} />
                    {errors.currency_id && <p>{errors.currency_id}</p>}
                </div> */}

                <div>
                    <label htmlFor="sale_price">Quiere colocar este producto en oferta?:</label>
                    <input type="checkbox" value={newProduct.sale_price} onChange={handleCheck} />
                    {
                        sale &&
                        <div>
                            <label htmlFor="price">indique el precio de oferta:</label>
                            <input type="text" name="price" value={newProduct.price} onChange={handleChange} />
                            {errors.price && <p>{errors.price}</p>}
                        </div>
                    }
                </div>

                <div>
                    <label htmlFor="available_quantity">Cantidad de productos en stock:</label>
                    <input type="text" name="available_quantity" value={newProduct.available_quantity} onChange={handleChange} />
                    {errors.available_quantity && <p>{errors.available_quantity}</p>}
                </div>

                <div>
                    <label htmlFor="oficial_store_name">Marca:</label>
                    <input type="text" name="oficial_store_name" value={newProduct.oficial_store_name} onChange={handleChange} />
                    {errors.oficial_store_name && <p>{errors.oficial_store_name}</p>}
                </div>

                <div>
                    <label htmlFor="attributes">Descripción:</label>
                    <input type="text" name="attributes" value={newProduct.attributes} onChange={handleChange} />
                    {errors.attributes && <p>{errors.attributes}</p>}
                </div>

                <div>
                    <label htmlFor="shipping">envío gratis:</label>
                    <input type="checkbox" name="shipping" value={newProduct.shipping} onChange={handleCheck} />
                    {errors.shipping && <p>{errors.shipping}</p>}
                </div>

                <div>
                    <label htmlFor="discounts">Descuento:</label>
                    <input type="checkbox" name="discounts" value={newProduct.discounts} onChange={handleChange} />
                    {errors.discounts && <p>{errors.discounts}</p>}
                </div>

                <div>
                    <label htmlFor="promotions">Generar ticket de promoción:</label>
                    <button onClick={() => handlePromotion()}>Crear ticket</button>
                    <span>aqui esta tu codigo creado: {newProduct.promotions.join("")}</span>
                </div>

                <div>
                    <label htmlFor="categories">elija una categoría:</label>
                    <select disabled={newProduct.categories} name="categories" id="categories">
                        <option value="Computación"> Computación </option>
                        <option value="Celulares"> Celulares </option>
                        <option value="Electrónica"> Electrónica </option>
                        <option value="Videojuegos"> Videojuegos </option>
                    </select>
                </div>

                <div>
                    <label htmlFor="country">elija un país:</label>
                    <select disabled={newProduct.country} onChange={handleChange} name="country" id="country">
                        <option value="Argentina"> Argentina </option>
                        <option value="Colombia"> Colombia </option>
                        <option value="Mexico"> Mexico </option>
                    </select>
                </div>

            </form>
        </div>
    )
};

export default CreateProduct;