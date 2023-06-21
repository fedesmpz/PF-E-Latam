'use client'
import style from "./Styles/CreateProduct/CreateProduct.module.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import validation from "../utils/formValidation"
import Head from "next/head";
import Providers from "@/redux/provider/Provider"
import { postProduct } from "@/redux/slice/productSlice"
import NavBar from "./Components/NavBar"
import SubFooter from "./Components/SubFooter"
import FooterLanding from "./Components/FooterLanding"
import { useEffect } from "react"
import { setNewProductMessage } from "../redux/slice/productSlice"


const CreateProduct = () => {

    const dispatch = useDispatch();
    const [selectedFileName, setSelectedFileName] = useState("");
    const [isFormValid, setIsFormValid] = useState(false)
    let [errors, setErrors] = useState({})
    const message = useSelector(state => state.products.newProductMessage)


    const [newProduct, setNewProduct] = useState({
        title: "",
        thumbnail: "",
        original_price: 0,
        currency_id: "ARS",
        price: 0,
        sale_price: null,
        sold_quantity: 0,
        available_quantity: 0,
        official_store_name: "",
        shipping: null,
        attributes: "",
        promotions: [],
        categories: "",
        country: "Argentina",
    })

    useEffect(() => {
        const isValid = ((Object.keys(errors).length === Object.keys(newProduct).length - 5) || (Object.keys(errors).length === Object.keys(newProduct).length - 4)) && Object.values(errors).every((error) => error === "");
        setIsFormValid(isValid);
    }, [errors, newProduct]);

    const handleCloseMessage = () => {
        dispatch(setNewProductMessage(""))
    };

    const handleCountryChange = (event) => {
        let value = event.target.value
        let aux = value

        aux = (aux === "Argentina") ? "ARS"
            : (aux === "Mexico") ? "MXN"
                : (aux === "Colombia") ? "COP"
                    : aux;

        setNewProduct({
            ...newProduct,
            currency_id: aux,
            country: value
        })
    }

    const handleDiscountSelect = (event) => {
        setValueSelect(event.target.value)
    }

    const handleChange = (event) => {

        const prop = event.target.name
        const value = event.target.value

        // if (prop === "thumbnail") {
        //     const file = event.target.files[0];
        //     setNewProduct({
        //         ...newProduct,
        //         thumbnail: file,
        //     })
        //     setSelectedFileName(file.name)
        // }

        setNewProduct({
            ...newProduct,
            [prop]: value
        })

        validation(prop, value, errors, setErrors)

    }
    console.log(Object.keys(errors).length);
    console.log(Object.keys(newProduct).length);
    console.log(newProduct);

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch(postProduct(newProduct))

        if (isFormValid) {
            setNewProduct({
                title: "",
                thumbnail: "",
                original_price: 0,
                currency_id: "",
                price: 0,
                sale_price: false,
                available_quantity: 0,
                official_store_name: "",
                shipping: true,
                attributes: "",
                catalog_listing: true,
                promotions: [],
                categories: "",
                country: ""
            })
            setErrors({})
        }
    }

    return (
        <div className={style.container}>

            <Head>
                <title>/admin/create</title>
            </Head>

            <NavBar></NavBar>

            <div className={style.container_backButton}>
                <Link href="/Home">
                    <button className={style.backButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M20.59 12H5.41l4.29-4.29a1 1 0 1 0-1.42-1.42l-6 6a1 1 0 0 0 0 1.42l6 6a1 1 0 0 0 1.42-1.42L5.41 12h15.18z" />
                        </svg>
                    </button>
                </Link>
            </div>
            <h1 className={style.createProduct}>Crear producto</h1>
            <div className={style.successMessageContainer}>
            <p>este es el mensaje:</p>
                {message && (
                    <div>
                    <p className={style.successMessage}>{message}<button onClick={handleCloseMessage} className={style.closeButton}>
                        X
                    </button></p>
                    </div>
                )}
            </div>
            <div className={style.containerForm}>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="country" className={style.label}>País del producto</label>
                        <select onChange={handleCountryChange} name="country" id="country" className={style.selectField}>
                            <option value="Argentina"> Argentina </option>
                            <option value="Colombia"> Colombia </option>
                            <option value="Mexico"> México </option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="title" className={style.label}>Titulo del producto</label>
                        <input placeholder="Ingrese un titulo" type="text" name="title" value={newProduct.title} onChange={handleChange} />

                        {errors.title && <p>{errors.title}</p>}
                    </div>

                    {/* <div>
                        <label htmlFor="thumbnail">Imagen</label>
                        <input type="file" name="thumbnail" value={newProduct.thumbnail} onChange={handleChange} />
                        {selectedFileName && <p>{selectedFileName}</p>}
                        {errors.thumbnail
                            ? <p>{errors.thumbnail}</p>
                            : <p></p>
                        }
                    </div> */}

                    <div>
                        <label htmlFor="thumbnail" className={style.label}>Imagen del producto</label>
                        <input type="text" name="thumbnail" value={newProduct.thumbnail} onChange={handleChange} />
                        {errors.thumbnail && <p>{errors.thumbnail}</p>}
                    </div>

                    <div>
                        <label htmlFor="original_price" className={style.label}>Precio del producto</label>
                        <div className={style.priceCont}>
                            <span className={style.priceTag}>$ {newProduct.currency_id}</span>
                            <input className={style.priceInput} type="number" name="original_price" value={newProduct.original_price} onChange={handleChange} />
                        </div>
                        {errors.original_price && <p>{errors.original_price}</p>}
                    </div>

                    <div>
                        <label htmlFor="sale_price" className={style.label}>Quiere colocar este producto en oferta?</label>
                        <select name="sale_price" id="sale_price" value={newProduct.sale_price} onChange={handleChange}>
                            <option value="">---</option>
                            <option value={true}>Sí</option>
                            <option value={false}>No</option>
                        </select>
                        {errors.sale_price && <p>{errors.sale_price}</p>}
                        {
                            (newProduct.sale_price === "true") &&
                            <div>
                                <input type="number" name="price" value={newProduct.price} onChange={handleChange} />
                                <label htmlFor="price" className={style.label}>Indique el precio de oferta</label>
                                {errors.price && <p>{errors.price}</p>}
                            </div>
                        }
                    </div>

                    <div>
                        <label htmlFor="available_quantity" className={style.label}>Cantidad de productos en stock</label>
                        <input type="number" name="available_quantity" value={newProduct.available_quantity} onChange={handleChange} />
                        {errors.available_quantity && <p>{errors.available_quantity}</p>}
                    </div>

                    <div>
                        <label htmlFor="official_store_name" className={style.label}>Marca del producto</label>
                        <input type="text" name="official_store_name" value={newProduct.official_store_name} onChange={handleChange} />
                        {errors.official_store_name && <p>{errors.official_store_name}</p>}
                    </div>

                    <div>
                        <label htmlFor="attributes" className={style.label}>Descripción del producto</label>
                        <textarea type="text-area" name="attributes" value={newProduct.attributes} onChange={handleChange} rows="4" cols="50" />
                        {errors.attributes && <p>{errors.attributes}</p>}
                    </div>

                    <div>
                        <label htmlFor="shipping" className={style.label}>Este producto posee envío gratis?</label>
                        <select name="shipping" id="shipping" value={newProduct.shipping} onChange={handleChange}>
                            <option value="">---</option>
                            <option value={true} >Sí</option>
                            <option value={false} >No</option>
                        </select>
                        {errors.shipping && <p>{errors.shipping}</p>}
                    </div>

                    <div>
                        <label htmlFor="categories" className={style.label}>Elija una categoría para el producto</label>
                        <select onChange={handleChange} name="categories" id="categories" className={style.selectField}>
                            <option value="">---</option>
                            <option value="computacion"> Computación </option>
                            <option value="celulares"> Celulares </option>
                            <option value="electronica"> Electrónica </option>
                            <option value="videojuegos"> Videojuegos </option>
                        </select>
                        {errors.categories && <p>{errors.categories}</p>
                        }
                    </div>

                    <div className={style.container_submit}>
                        <button className={`${style.submitButton} ${isFormValid ? '' : style.submitDisabledButton}`} type="submit" disabled={!isFormValid}>Create</button>

                    </div>
                </form>
            </div>
            <SubFooter></SubFooter>
            <FooterLanding></FooterLanding>
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