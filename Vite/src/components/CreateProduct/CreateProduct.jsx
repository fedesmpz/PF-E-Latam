'use client'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postProduct } from "../../redux/slice/productSlice"
import { setNewProductMessage } from "../../redux/slice/productSlice"
import { Link } from "react-router-dom"
import validation from "../../utils/formValidation"
import style from "./CreateProduct.module.css"

const CreateProduct = () => {

    const dispatch = useDispatch();
    const [isFormValid, setIsFormValid] = useState(false)
    let [errors, setErrors] = useState({})
    const message = useSelector(state => state.products.newProductMessage)
    const [productThumbnail, setProductThumbnail] = useState("")

    const [newProduct, setNewProduct] = useState({
        title: "",
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
        const isValid = ((Object.keys(errors).length === Object.keys(newProduct).length - 4) || (Object.keys(errors).length === Object.keys(newProduct).length - 3) || (Object.keys(errors).length === Object.keys(newProduct).length - 2)) && Object.values(errors).every((error) => error === "");
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

    const handleProductThumbnailUpload = (event) => {
        const prop = event.target.name
        const file = event.target.files[0];
        validation(prop, file, errors, setErrors)
        transformFile(file)
    }

    const transformFile = (file) => {
        const reader = new FileReader()
        if (file) {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setProductThumbnail(reader.result);
            }
        } else {
            setProductThumbnail("")
        }
    }

    const handleChange = (event) => {

        const prop = event.target.name
        const value = event.target.value

        setNewProduct({
            ...newProduct,
            [prop]: value
        })

        validation(prop, value, errors, setErrors)

    }

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch(postProduct({
            ...newProduct,
            uri: productThumbnail
        }))

        if (isFormValid) {
            setNewProduct({
                title: "",
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
            <div className={style.container_top}>
                <Link to="/Home">
                    <button className={style.backButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M20.59 12H5.41l4.29-4.29a1 1 0 1 0-1.42-1.42l-6 6a1 1 0 0 0 0 1.42l6 6a1 1 0 0 0 1.42-1.42L5.41 12h15.18z" />
                        </svg>
                    </button>
                </Link>
                <div>
                    {message && (
                        <div className={style.successMessageContainer}>
                            <p className={style.successMessage}>{message}<button onClick={handleCloseMessage} className={style.closeButton}>
                                X
                            </button></p>
                        </div>
                    )}
                </div>
            </div>

            <div className={style.containerForm}>
                <form encType="multipart/form-data" onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="title" className={style.label}>Titulo del producto</label>
                        <input placeholder="Ingrese un titulo" type="text" name="title" value={newProduct.title} onChange={handleChange} />

                        {errors.title && <p>{errors.title}</p>}
                    </div>

                    <div>
                        <label htmlFor="official_store_name" className={style.label}>Marca</label>
                        <input type="text" name="official_store_name" value={newProduct.official_store_name} onChange={handleChange} />
                        {errors.official_store_name && <p>{errors.official_store_name}</p>}
                    </div>

                    <div>
                        <label htmlFor="country" className={style.label}>País</label>
                        <select onChange={handleCountryChange} name="country" id="country" className={style.selectField}>
                            <option value="Argentina"> Argentina </option>
                            <option value="Colombia"> Colombia </option>
                            <option value="Mexico"> México </option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="original_price" className={style.label}>Precio</label>
                        <div className={style.priceCont}>
                            <span className={style.priceTag}>$ {newProduct.currency_id}</span>
                            <input className={style.priceInput} type="number" name="original_price" value={newProduct.original_price} onChange={handleChange} />
                        </div>
                        {errors.original_price && <p>{errors.original_price}</p>}
                    </div>

                    <div>
                        <label htmlFor="available_quantity" className={style.label}>Stock disponible</label>
                        <input type="number" name="available_quantity" value={newProduct.available_quantity} onChange={handleChange} />
                        {errors.available_quantity && <p>{errors.available_quantity}</p>}
                    </div>

                    <div>
                        <label htmlFor="thumbnail" className={style.label}>Imagen</label>
                        <input type="file" name="thumbnail" multiple={false} accept="image/*" onChange={handleProductThumbnailUpload} />
                        {errors.thumbnail && <p>{errors.thumbnail}</p>}
                    </div>

                    <div>
                        <label htmlFor="sale_price" className={style.label}>Quiere colocar este producto en oferta?</label>
                        <select name="sale_price" id="sale_price" value={newProduct.sale_price} onChange={handleChange}>
                            <option value="-">---</option>
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
                        <label htmlFor="shipping" className={style.label}>Este producto posee envío gratis?</label>
                        <select name="shipping" id="shipping" value={newProduct.shipping} onChange={handleChange}>
                            <option value="-">---</option>
                            <option value={true} >Sí</option>
                            <option value={false} >No</option>
                        </select>
                        {errors.shipping && <p>{errors.shipping}</p>}
                    </div>

                    <div>
                        <label htmlFor="categories" className={style.label}>Elija una categoría para el producto</label>
                        <select onChange={handleChange} name="categories" id="categories" className={style.selectField}>
                            <option value="-">---</option>
                            <option value="computacion"> Computación </option>
                            <option value="celulares"> Celulares </option>
                            <option value="electronica"> Electrónica </option>
                            <option value="videojuegos"> Videojuegos </option>
                        </select>
                        {errors.categories && <p>{errors.categories}</p>
                        }
                    </div>

                    <div>
                        <label htmlFor="attributes" className={style.label}>Descripción</label>
                        <textarea type="text-area" name="attributes" value={newProduct.attributes} onChange={handleChange} rows="4" cols="50" />
                        {errors.attributes && <p>{errors.attributes}</p>}
                    </div>

                    <div className={style.container_submit}>
                        <button className={` ${isFormValid ? style.submitButton : style.submitDisabledButton}`} type="submit" disabled={!isFormValid}>Crear</button>

                    </div>
                </form>
                <div className={style.secondColumn}>
                    <h2 className={style.PreviewofProduct}>PREVISUALIZACION DEL PRODUCTO</h2>
                    <div className={style.firstRow}>
                        <div className={style.thumbnailContainer}>
                            {!productThumbnail &&
                                <p className={style.previewTitleThumbnail}>La vista previa de la imagen aparecera aqui</p>}
                            {productThumbnail && <img className={style.thumbnail} src={productThumbnail} alt="product_thumbnail"></img>}
                        </div>
                        <div>
                            <h2 className={style.previewValue}>{newProduct.title ? newProduct.title : `Titulo del producto`}</h2>
                            <h3 className={style.previewValue}>{newProduct.official_store_name ? newProduct.official_store_name : `Marca del producto`}</h3>
                            <span className={style.previewLines}><h3 className={style.previewLabel}>Pais</h3><h3 className={style.previewValue}>{newProduct.country}</h3></span>
                            <span className={style.previewLines}><h3 className={style.previewLabel}>Precio</h3>
                                <h3 className={style.previewValue}>$ {newProduct.currency_id} {newProduct.original_price}</h3></span>
                            <span className={style.previewLines}><h3 className={style.previewLabel}>Stock disponible</h3><h3 className={style.previewValue}> {newProduct.available_quantity}</h3></span>
                        </div>
                    </div>

                    <div className={style.previewData}>
                        <span className={style.previewLines}><h3 className={style.previewLabel}>Producto en oferta?</h3>
                            <p className={style.previewValue}>{newProduct.sale_price ? `Si` : `No`}</p></span>
                        <span className={style.previewLines}> <h3 className={style.previewLabel}>Precio de oferta</h3>
                            <p className={style.previewValue}>{newProduct.price}</p></span>
                        <span className={style.previewLines}><h3 className={style.previewLabel}>Envio gratis</h3>
                            <p className={style.previewValue}>{newProduct.shipping ? `Si` : `No`}</p></span>
                        <span className={style.previewLines}><h3 className={style.previewLabel}>Categoria</h3>
                            <h3 className={style.previewValue}>{newProduct.categories ? newProduct.categories : `Seleccione categoria`}</h3></span>
                        <h3 className={style.previewLabel}>Descripcion</h3>
                        <p className={style.previewValue}>{newProduct.attributes ? newProduct.attributes : `Describe el producto brindando información clara y detallada sobre el artículo para ayudar a los clientes a comprender sus características, beneficios y especificaciones; tambien intenta incluir su propósito, función y uso. Enumera las características específicas del producto, como tamaño, dimensiones, materiales, color, capacidad, peso, etc. Si el producto tiene características técnicas, como velocidad, capacidad de almacenamiento o conectividad, asegúrate de incluirlas aquí.`}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default CreateProduct;