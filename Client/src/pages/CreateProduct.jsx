'use client'
import style from "./Styles/CreateProduct/CreateProduct.module.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import Link from "next/link"
import validation from "../utils/formValidation"
import Head from "next/head";
import Providers from "@/redux/provider/Provider"
import { postProduct } from "@/redux/slice/productSlice"


const CreateProduct = () => {



    const dispatch = useDispatch();

    let [valueDiscounts, setValueDiscounts] = useState(0)
    const [selectedFileName, setSelectedFileName] = useState("");

    const [newProduct, setNewProduct] = useState({
        id: "",
        title: "",
        thumbnail: "",
        original_price: 0,
        currency_id: "ARS",
        price: 0,
        sale_price: false,
        sold_quantity: 0,
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


    const [errors, setErrors] = useState({
        id: "",
        title: "",
        original_price: "",
        currency_id: "",
        price: "",
        available_quantity: "",
        oficial_store_name: "",
        attributes: "",
        discounts: "",
        promotions: [],
        categories: "",
        country: ""
    })

    const handleCategoriesChange = (event) => {
        let value = event.target.value

        setNewProduct({
            ...newProduct,
            categories: value
        })
    }

    const handleCountryChange = (event) => {
        let value = event.target.value

        value = (value === "Argentina") ? "ARS"
            : (value === "México") ? "MXN"
                : (value === "Colombia") ? "COP"
                    : value;


        setNewProduct({
            ...newProduct,
            currency_id: value
        })
    }

    const handleCheck = (event) => {
        let prop = event.target.name
        let value = event.target.checked

        prop === "sale_price"
            ?
            setNewProduct({
                ...newProduct,
                sale_price: value
            })
            :
            setNewProduct({
                ...newProduct,
                shipping: value
            })

    }

    const handleChange = (event) => {

        const prop = event.target.name
        const value = event.target.value

        if (prop === "thumbnail") {
            const file = event.target.files[0];
            setNewProduct({
                ...newProduct,
                thumbnail: file,
            })
            setSelectedFileName(file.name)
        }

        setNewProduct({
            ...newProduct,
            [prop]: value
        })

        const validate = validation({
            ...newProduct,
            [prop]: value
        })

        setErrors(validate)

        if (prop === "discounts") {

            let newValue = (newProduct.original_price * value) / 100
            newValue = newProduct.original_price - newValue

            setValueDiscounts(newValue)
        }

    }

    console.log(newProduct.categories);

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(newProduct);
        dispatch(postProduct(newProduct))

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

            <Head>
                <title>/admin/create</title>
            </Head>

            <Link href="/Home">
                <button className={style.backButton}> Back </button>
            </Link>

            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="country">elija un país:</label>
                    <select onChange={handleCountryChange} disabled={newProduct.country} name="country" id="country" className={style.selectField}>
                        <option value="Argentina"> Argentina </option>
                        <option value="Colombia"> Colombia </option>
                        <option value="México"> México </option>
                    </select>
                    {errors.country && <p>{errors.country}</p>}
                </div>

                <div>
                    <label htmlFor="title">Titulo:</label>
                    <input placeholder="Ingrese un titulo" type="text" name="title" value={newProduct.title} onChange={handleChange} />
                    {errors.title && <p>{errors.title}</p>}
                </div>

                <div>
                    <label htmlFor="thumbnail">Imagen:</label>
                    <input type="file" name="thumbnail" value={newProduct.thumbnail} onChange={handleChange} />
                    {selectedFileName && <p>{selectedFileName}</p>}
                    {errors.thumbnail && <p>{errors.thumbnail}</p>}
                </div>

                <div>
                    <span>{newProduct.currency_id}</span><label htmlFor="original_price">precio:</label>
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
                    <input type="checkbox" checked={newProduct.sale_price} name="sale_price" onChange={handleCheck} />
                    {
                        newProduct.sale_price &&
                        <div>
                            <label htmlFor="price">indique el precio de oferta:</label>
                            <input type="text" name="price" value={newProduct.price} onChange={handleChange} />
                            {errors.price && <p>{errors.price}</p>}
                        </div>
                    }
                </div>

                <div>
                    <label htmlFor="available_quantity">Cantidad de productos en stock:</label>
                    <input type="number" name="available_quantity" value={newProduct.available_quantity} onChange={handleChange} />
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
                    <input type="checkbox" name="shipping" checked={newProduct.shipping} onChange={handleCheck} />
                    {errors.shipping && <p>{errors.shipping}</p>}
                </div>

                <div>
                    <label htmlFor="discounts">Descuento:</label>
                    <span>%</span><input type="text" name="discounts" value={newProduct.discounts} onChange={handleChange} />
                    {!errors.discounts && <strong>{`Precio del producto con descuento aplicado: ${valueDiscounts}`}</strong>}
                    {errors.discounts && <p>{errors.discounts}</p>}
                </div>

                {/* <div>
                    <label htmlFor="promotions">Generar ticket de promoción:</label>
                    <button type="button" onClick={() => handlePromotion()} className={style.submitButton}>Crear ticket</button>
                    <span>aqui esta tu codigo creado: {newProduct.promotions.join("")}</span>
                </div> */}

                <div>
                    <label htmlFor="categories">elija una categoría:</label>
                    <select onChange={handleCategoriesChange} name="categories" id="categories" className={style.selectField}>
                        <option value="Computación"> Computación </option>
                        <option value="Celulares"> Celulares </option>
                        <option value="Electrónica"> Electrónica </option>
                        <option value="Electrónica"> Videojuegos </option>
                    </select>
                    {errors.categories && <p>{errors.categories}</p>}
                </div>

                <button type="submit" className={style.submitButton}> Submit </button>
            </form>

        </div>
    )
}

const CreateProductWithProvider = () => {
    return (
        <Providers>
            <CreateProduct />
        </Providers>
    );
};


export default CreateProductWithProvider;