import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductByIdForEditForm, editProduct, cleanEditDetail, setEditProductMessage, setEditedProduct } from "../../redux/slice/productSlice";
import { useNavigation, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import validation from "../../utils/formValidation";
import style from "./EditProduct.module.css"

const EditProduct = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const countryId = searchParams.get('countryId');
    const categories = searchParams.get('categories');
    const id = searchParams.get('id');
    const dispatch = useDispatch();
    const [isFormValid, setIsFormValid] = useState(false);
    let [errors, setErrors] = useState({});
    const message = useSelector(state => state.products.editProductMessage);
    const [productThumbnail, setProductThumbnail] = useState("");
    let editDetail = useSelector((state) => state.products.editDetail);
    const [localEditDetail, setLocalEditDetail] = useState(editDetail);
    const [showModal, setShowModal] = useState(false);
    const [showModalEdited, setShowModalEdited] = useState(false);

    const handleCountryChange = (event) => {
        let value = event.target.value
        let aux = value

        aux = (aux === "Argentina") ? "ARS"
            : (aux === "Mexico") ? "MXN"
                : (aux === "Colombia") ? "COP"
                    : aux;

        setLocalEditDetail({
            ...localEditDetail,
            currency_id: aux,
            country: value
        })
    }

    const handleChange = (event) => {
        const prop = event.target.name;
        const value = event.target.value

        setLocalEditDetail({
            ...localEditDetail,
            [prop]: value
        });

        validation(prop, value, errors, setErrors)

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

    const handleCloseModal = () => {
        dispatch(setEditProductMessage(""));
        setShowModalEdited(false)
    };

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch(editProduct(id, {
            ...localEditDetail,
            uri: productThumbnail
        }))

        setShowModalEdited(true)

        if (isFormValid) {
            setLocalEditDetail({})
            setErrors({})
        }
        router.push()

    }

    useEffect(() => {
        dispatch(ProductByIdForEditForm(id, countryId, categories));
        return () => dispatch(cleanEditDetail());
    }, [dispatch, id, countryId, categories])

    useEffect(() => {
        setLocalEditDetail(editDetail);
        setProductThumbnail(editDetail.thumbnail)
    }, [editDetail]);

    useEffect(() => {
        const isValid = (localEditDetail !== editDetail) && Object.values(errors).every((error) => error === "");
        setIsFormValid(isValid);
    }, [errors, localEditDetail]);

    useEffect(() => {

    }, [editDetail])

    return (
        <div className={style.container}>
            <div className={style.container_top}>
                <Link to={`/DetailProduct?countryId=${countryId}&categories=${categories}&id=${id}`}>
                    <button className={style.backButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M20.59 12H5.41l4.29-4.29a1 1 0 1 0-1.42-1.42l-6 6a1 1 0 0 0 0 1.42l6 6a1 1 0 0 0 1.42-1.42L5.41 12h15.18z" />
                        </svg>
                    </button>
                </Link>
                {/* <div>
                {message && (
                    <div className={style.successMessageContainer}>
                    <p className={style.successMessage}>{message}<button onClick={handleCloseMessage} className={style.closeButton}>
                        X
                    </button></p>
                    </div>
                )}
                </div> */}
            </div>
            <div className={style.containerForm}>
                <form encType="multipart/form-data" onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="title" className={style.label}>Titulo del producto</label>
                        <input type="text" name="title" value={localEditDetail.title} onChange={handleChange} />

                        {errors.title && <p>{errors.title}</p>}
                    </div>

                    <div>
                        <label htmlFor="official_store_name" className={style.label}>Marca</label>
                        <input type="text" name="official_store_name" value={localEditDetail.official_store_name} onChange={handleChange} />
                        {errors.official_store_name && <p>{errors.official_store_name}</p>}
                    </div>

                    <div>
                        <label htmlFor="country" className={style.label}>País</label>
                        <select onChange={handleCountryChange} name="country" id="country" value={localEditDetail.country} className={style.selectField}>
                            <option value="Argentina"> Argentina </option>
                            <option value="Colombia"> Colombia </option>
                            <option value="Mexico"> México </option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="original_price" className={style.label}>Precio</label>
                        <div className={style.priceCont}>
                            <span className={style.priceTag}>$ {editDetail.currency_id}</span>
                            <input className={style.priceInput} type="number" name="original_price" value={localEditDetail.original_price} onChange={handleChange} />
                        </div>
                        {errors.original_price && <p>{errors.original_price}</p>}
                    </div>

                    <div>
                        <label htmlFor="available_quantity" className={style.label}>Stock disponible</label>
                        <input type="number" name="available_quantity" value={localEditDetail.available_quantity} onChange={handleChange} />
                        {errors.available_quantity && <p>{errors.available_quantity}</p>}
                    </div>

                    <div>
                        <label htmlFor="thumbnail" className={style.label}>Imagen</label>
                        <input type="file" name="thumbnail" multiple={false} accept="image/*" onChange={handleProductThumbnailUpload} />
                        {errors.thumbnail && <p>{errors.thumbnail}</p>}
                    </div>

                    <div>
                        <label htmlFor="sale_price" className={style.label}>Quiere colocar este producto en oferta?</label>
                        <select name="sale_price" id="sale_price" value={localEditDetail.sale_price} onChange={handleChange}>
                            <option value="">---</option>
                            <option value={true}>Sí</option>
                            <option value={false}>No</option>
                        </select>
                        {errors.sale_price && <p>{errors.sale_price}</p>}  
                    </div>
                    {
                            (localEditDetail.sale_price === "true") &&
                            <div>
                                <label htmlFor="price" className={style.label}>Indique el precio de oferta</label>
                                <input type="number" name="price" value={localEditDetail.price} onChange={handleChange} />
                                {errors.price && <p>{errors.price}</p>}
                            </div>
                    }

                    <div>
                        <label htmlFor="shipping" className={style.label}>Este producto posee envío gratis?</label>
                        <select name="shipping" id="shipping" value={localEditDetail.shipping} onChange={handleChange}>
                            <option value="">---</option>
                            <option value={true} >Sí</option>
                            <option value={false} >No</option>
                        </select>
                        {errors.shipping && <p>{errors.shipping}</p>}
                    </div>

                    <div>
                        <label htmlFor="categories" className={style.label}>Elija una categoría para el producto</label>
                        <select onChange={handleChange} name="categories" id="categories" value={localEditDetail.categories} className={style.selectField}>
                            <option value="">---</option>
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
                        <textarea type="text-area" name="attributes" value={localEditDetail.attributes} onChange={handleChange} rows="4" cols="50" />
                        {errors.attributes && <p>{errors.attributes}</p>}
                    </div>

                    <div className={style.container_submit}>
                        <button className={` ${isFormValid ? style.submitButton : style.submitDisabledButton}`} type="submit" disabled={!isFormValid}>Editar</button>

                    </div>
                </form>
                <>
                    {message && showModalEdited && (
                        <div className={style.modal}>
                            <div className={style.modalContent}>
                                <p>{message}</p>
                                <div className={style.modalButtons}>
                                    <button onClick={handleCloseModal}>x</button>
                                </div>
                            </div>
                        </div>)
                    }
                </>
                <div className={style.secondColumn}>
                    <h2 className={style.PreviewofProduct}>PREVISUALIZACION DEL PRODUCTO</h2>
                    <div className={style.firstRow}>
                        <div className={style.thumbnailContainer}>
                            {!productThumbnail &&
                                <p className={style.previewTitleThumbnail}>La vista previa de la imagen aparecera aqui</p>}
                            {productThumbnail && <img src={productThumbnail} className={style.thumbnail} alt="product_thumbnail"></img>}
                        </div>
                        <div>
                            <h2 className={style.previewValue}>{localEditDetail.title ? localEditDetail.title : `Titulo del producto`}</h2>
                            <h3 className={style.previewValue}>{localEditDetail.official_store_name ? localEditDetail.official_store_name : `Marca del producto`}</h3>
                            <span className={style.previewLines}><h3 className={style.previewLabel}>Pais</h3><h3 className={style.previewValue}>{localEditDetail.country}</h3></span>
                            <span className={style.previewLines}><h3 className={style.previewLabel}>Precio</h3>
                                <h3 className={style.previewValue}>$ {editDetail.currency_id} {editDetail.original_price}</h3></span>
                            <span className={style.previewLines}><h3 className={style.previewLabel}>Stock disponible</h3><h3 className={style.previewValue}> {localEditDetail.available_quantity}</h3></span>
                        </div>
                    </div>

                    <div className={style.previewData}>
                        <span className={style.previewLines}><h3 className={style.previewLabel}>Producto en oferta?</h3>
                            <p className={style.previewValue}>{localEditDetail.sale_price ? `Si` : `No`}</p></span>
                        <span className={style.previewLines}> <h3 className={style.previewLabel}>Precio de oferta</h3>
                            <p className={style.previewValue}>{localEditDetail.price}</p></span>
                        <span className={style.previewLines}><h3 className={style.previewLabel}>Envio gratis</h3>
                            <p className={style.previewValue}>{localEditDetail.shipping ? `Si` : `No`}</p></span>
                        <span className={style.previewLines}><h3 className={style.previewLabel}>Categoria</h3>
                            <h3 className={style.previewValue}>{localEditDetail.categories ? localEditDetail.categories : `Seleccione categoria`}</h3></span>
                        <h3 className={style.previewLabel}>Descripcion</h3>
                        <p className={style.previewValue}>{localEditDetail.attributes ? localEditDetail.attributes : `Describe el producto brindando información clara y detallada sobre el artículo para ayudar a los clientes a comprender sus características, beneficios y especificaciones; tambien intenta incluir su propósito, función y uso. Enumera las características específicas del producto, como tamaño, dimensiones, materiales, color, capacidad, peso, etc. Si el producto tiene características técnicas, como velocidad, capacidad de almacenamiento o conectividad, asegúrate de incluirlas aquí.`}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditProduct;