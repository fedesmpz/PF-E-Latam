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
        title: "",
        thumbnail: "",
        original_price: undefined,
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
        country: "Argentina"
    })


    const [errors, setErrors] = useState({})

    const handleCategoriesChange = (event) => {
        let value = event.target.value

        setNewProduct({
            ...newProduct,
            categories: value
        })
    }

    const handleCountryChange = (event) => {
        let value = event.target.value
        let aux = value

        aux = (aux === "Argentina") ? "ARS"
            : (aux === "México") ? "MXN"
                : (aux === "Colombia") ? "COP"
                    : aux;

        setNewProduct({
            ...newProduct,
            currency_id: aux,
            country: value
        })
        console.log(newProduct.country);
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

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch(postProduct(newProduct))

        setErrors({
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

            <div className={style.container_backButton}>
                <Link href="/Home">
                    <button className={style.backButton}> Back </button>
                </Link>
            </div>


            <div className={style.container_form}>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="country">Elija un país</label>
                        <select onChange={handleCountryChange} name="country" id="country" className={style.selectField}>
                            <option value="Argentina"> Argentina </option>
                            <option value="Colombia"> Colombia </option>
                            <option value="México"> México </option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="title">Titulo</label>
                        <input placeholder="Ingrese un titulo" type="text" name="title" value={newProduct.title} onChange={handleChange} />

                        {errors.title
                            ? <p>{errors.title}</p>
                            : <p></p>
                        }
                    </div>

                    <div>
                        <label htmlFor="thumbnail">Imagen</label>
                        <input type="file" name="thumbnail" value={newProduct.thumbnail} onChange={handleChange} />
                        {selectedFileName && <p>{selectedFileName}</p>}
                        {errors.thumbnail
                            ? <p>{errors.thumbnail}</p>
                            : <p></p>
                        }
                    </div>

                    <div>
                        <span>{newProduct.currency_id}</span><label htmlFor="original_price">Precio</label>
                        <input type="text" name="original_price" value={newProduct.original_price} onChange={handleChange} />
                        {errors.original_price
                            ? <p>{errors.original_price}</p>
                            : <p></p>
                        }
                    </div>

                    <div>
                        <label htmlFor="sale_price">Quiere colocar este producto en oferta?</label>
                        <input type="checkbox" checked={newProduct.sale_price} name="sale_price" onChange={handleCheck} />
                        {
                            newProduct.sale_price
                                ?
                                <div>
                                    <input type="text" name="price" value={newProduct.price} onChange={handleChange} />
                                    <label htmlFor="price">Indique el precio de oferta</label>
                                    {errors.price
                                        ? <p>{errors.price}</p>
                                        : <p></p>
                                    }
                                </div>
                                : <div className={style.notShow}>
                                    <input type="text" name="price" value={newProduct.price} onChange={handleChange} />
                                    <label htmlFor="price">Indique el precio de oferta</label>
                                    {errors.price
                                        ? <p>{errors.price}</p>
                                        : <p></p>
                                    }
                                </div>
                        }
                    </div>

                    <div>
                        <label htmlFor="available_quantity">Cantidad de productos en stock</label>
                        <input type="number" name="available_quantity" value={newProduct.available_quantity} onChange={handleChange} />
                        {errors.available_quantity
                            ? <p>{errors.available_quantity}</p>
                            : <p></p>
                        }
                    </div>

                    <div>
                        <label htmlFor="oficial_store_name">Marca</label>
                        <input type="text" name="oficial_store_name" value={newProduct.oficial_store_name} onChange={handleChange} />
                        {errors.oficial_store_name
                            ? <p>{errors.oficial_store_name}</p>
                            : <p></p>
                        }
                    </div>

                    <div>
                        <label htmlFor="attributes">Descripción</label>
                        <textarea type="text-area" name="attributes" value={newProduct.attributes} onChange={handleChange} rows="4" cols="50" />
                        {errors.attributes
                            ? <p>{errors.attributes}</p>
                            : <p></p>
                        }
                    </div>

                    <div>
                        <label htmlFor="shipping">Envío gratis</label>
                        <input type="checkbox" name="shipping" checked={newProduct.shipping} onChange={handleCheck} />
                        {errors.shipping
                            ? <p>{errors.shipping}</p>
                            : <p></p>
                        }
                    </div>

                    <div>
                        <label htmlFor="discounts">Descuento</label>
                        <span>%</span><input type="text" name="discounts" value={newProduct.discounts} onChange={handleChange} />
                        <div>
                            {!errors.discounts && <strong>{`Precio del producto con descuento aplicado: ${valueDiscounts}`}</strong>
                            }
                        </div>
                        <div>
                            {errors.discounts
                                ? <p>{errors.discounts}</p>
                                : <p></p>
                            }
                        </div>
                    </div>

                    <div>
                        <label htmlFor="categories">Elija una categoría</label>
                        <select onChange={handleCategoriesChange} name="categories" id="categories" className={style.selectField}>
                            <option value="computacion"> Computación </option>
                            <option value="celulares"> Celulares </option>
                            <option value="electronica"> Electrónica </option>
                            <option value="videojuegos"> Videojuegos </option>
                        </select>
                        {errors.categories
                            ? <p>{errors.categories}</p>
                            : <p></p>
                        }
                    </div>

                    <div className={style.container_submit}>
                        {
                            (Object.keys(errors).length > 0 || !newProduct.title)
                                ? <button type="submit" disabled={true} className={style.submitDisabledButton}> Submit </button>
                                : <button type="submit" className={style.submitButton}> Submit </button>
                        }
                    </div>
                </form>
            </div>
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