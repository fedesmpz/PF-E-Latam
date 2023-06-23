'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductByIdForEditForm, editProduct } from "../redux/slice/productSlice";
import { useRouter } from "next/router";
import Providers from "@/redux/provider/Provider";
import Link from "next/link";
import validation from "../utils/formValidation"
import NavBar from "./Components/NavBar"
import SubFooter from "./Components/SubFooter";
import style from "./Styles/EditProduct/EditProduct.module.css"

const EditProduct = () => {
    const router = useRouter();
    const { id, countryId, categories } = router.query;
    const dispatch = useDispatch();
    const [isFormValid, setIsFormValid] = useState(false)
    let [errors, setErrors] = useState({})
    const message = useSelector(state => state.products.newProductMessage)
    const [productThumbnail, setProductThumbnail] = useState("")
    let editDetail = useSelector((state) => state.products.editDetail);

    // const [editProduct, setEditedProduct] = useState({
    //   title: "",
    //   original_price: 0,
    //   currency_id: "ARS",
    //   price: 0,
    //   sale_price: null,
    //   sold_quantity: 0,
    //   available_quantity: 0,
    //   official_store_name: "",
    //   shipping: null,
    //   attributes: "",
    //   promotions: [],
    //   categories: "",
    //   country: "Argentina",
    // })

    // setEditedProduct({
    //   ...editProduct,
    //   ...editDetail
    // })

    console.log(editProduct)
    
    const handleCountryChange = () => {

    }

    const handleChange = (event) => {
      const prop = event.target.name;
      const value = event.target.value

      editDetail = {
        ...editDetail,
        [prop]: value
      }

    }

    const handleProductThumbnailUpload = () => {

    }

    const transformFile = () => {

    }

    const handleSubmit = () => {

    }

    useEffect(() => {
      dispatch(ProductByIdForEditForm( id, countryId, categories))
    }, [dispatch, id, countryId, categories])

    return (
        <div className={style.container}>
            <NavBar></NavBar>
            <div className={style.container_top}>
                <Link href="/Home">
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
                        <input type="text" name="title" value={editDetail.title} onChange={handleChange} />

                        {errors.title && <p>{errors.title}</p>}
                    </div>

                    <div>
                        <label htmlFor="official_store_name" className={style.label}>Marca</label>
                        <input type="text" name="official_store_name" value={editDetail.official_store_name} onChange={handleChange} />
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
                            <span className={style.priceTag}>$ {editDetail.currency_id}</span>
                            <input className={style.priceInput} type="number" name="original_price" value={editDetail.original_price} onChange={handleChange} />
                        </div>
                        {errors.original_price && <p>{errors.original_price}</p>}
                    </div>

                    <div>
                        <label htmlFor="available_quantity" className={style.label}>Stock disponible</label>
                        <input type="number" name="available_quantity" value={editDetail.available_quantity} onChange={handleChange} />
                        {errors.available_quantity && <p>{errors.available_quantity}</p>}
                    </div>

                    <div>
                        <label htmlFor="thumbnail" className={style.label}>Imagen</label>
                        <input type="file" name="thumbnail" multiple={false} accept="image/*" onChange={handleProductThumbnailUpload} />
                        {errors.thumbnail && <p>{errors.thumbnail}</p>}
                    </div>

                    <div>
                        <label htmlFor="sale_price" className={style.label}>Quiere colocar este producto en oferta?</label>
                        <select name="sale_price" id="sale_price" value={editDetail.sale_price} onChange={handleChange}>
                            <option value="">---</option>
                            <option value={true}>Sí</option>
                            <option value={false}>No</option>
                        </select>
                        {errors.sale_price && <p>{errors.sale_price}</p>}
                        {
                            (editDetail.sale_price === "true") &&
                            <div>
                                <input type="number" name="price" value={editDetail.price} onChange={handleChange} />
                                <label htmlFor="price" className={style.label}>Indique el precio de oferta</label>
                                {errors.price && <p>{errors.price}</p>}
                            </div>
                        }
                    </div>

                    <div>
                        <label htmlFor="shipping" className={style.label}>Este producto posee envío gratis?</label>
                        <select name="shipping" id="shipping" value={editDetail.shipping} onChange={handleChange}>
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

                    <div>
                        <label htmlFor="attributes" className={style.label}>Descripción</label>
                        <textarea type="text-area" name="attributes" value={editDetail.attributes} onChange={handleChange} rows="4" cols="50" />
                        {errors.attributes && <p>{errors.attributes}</p>}
                    </div>

                    <div className={style.container_submit}>
                        <button className={` ${isFormValid ? style.submitButton : style.submitDisabledButton}`} type="submit" disabled={!isFormValid}>Editar</button>

                    </div>
                </form>
                <div className={style.secondColumn}>
                    <h2 className={style.PreviewofProduct}>PREVISUALIZACION DEL PRODUCTO</h2>
                    <div className={style.firstRow}>
                    <div className={style.thumbnailContainer}>
                    {!editDetail.thumbnail && 
                    <p className={style.previewTitleThumbnail}>La vista previa de la imagen aparecera aqui</p>}
                    {editDetail.thumbnail && <img src={editDetail.thumbnail} className={style.thumbnail}  alt="product_thumbnail"></img>}
                    </div>
                    <div>
                        <h2 className={style.previewValue}>{editDetail.title ? editDetail.title : `Titulo del producto`}</h2>
                        <h3 className={style.previewValue}>{editDetail.official_store_name ? editDetail.official_store_name : `Marca del producto`}</h3>
                        <span className={style.previewLines}><h3 className={style.previewLabel}>Pais</h3><h3 className={style.previewValue}>{editDetail.country}</h3></span>
                        <span className={style.previewLines}><h3 className={style.previewLabel}>Precio</h3>
                        <h3 className={style.previewValue}>$ {editDetail.currency_id} {editDetail.original_price}</h3></span>
                        <span className={style.previewLines}><h3 className={style.previewLabel}>Stock disponible</h3><h3 className={style.previewValue}> {editDetail.available_quantity}</h3></span>
                    </div>
                    </div>

                    <div className={style.previewData}>
                        <span className={style.previewLines}><h3 className={style.previewLabel}>Producto en oferta?</h3>
                        <p className={style.previewValue}>{editDetail.sale_price ? editDetail.sale_price : `-`}</p></span>
                        <span className={style.previewLines}> <h3 className={style.previewLabel}>Precio de oferta</h3>
                        <p className={style.previewValue}>{editDetail.price}</p></span>
                        <span className={style.previewLines}><h3 className={style.previewLabel}>Envio gratis</h3>
                        <p className={style.previewValue}>{editDetail.shipping ? editDetail.shipping : `-`}</p></span>
                        <span className={style.previewLines}><h3 className={style.previewLabel}>Categoria</h3>
                        <h3 className={style.previewValue}>{editDetail.categories ? editDetail.categories : `-` }</h3></span>  
                        <h3 className={style.previewLabel}>Descripcion</h3>
                        <p className={style.previewValue}>{editDetail.attributes ? editDetail.attributes : `Describe el producto brindando información clara y detallada sobre el artículo para ayudar a los clientes a comprender sus características, beneficios y especificaciones; tambien intenta incluir su propósito, función y uso. Enumera las características específicas del producto, como tamaño, dimensiones, materiales, color, capacidad, peso, etc. Si el producto tiene características técnicas, como velocidad, capacidad de almacenamiento o conectividad, asegúrate de incluirlas aquí.`}</p>                  
                    </div>
                </div>

            </div>
            <SubFooter></SubFooter>
        </div>
    )
}

const EditProductWithProvider = () => {
    return (
      <Providers>
        <EditProduct />
      </Providers>
    );
  };
  
  export default EditProductWithProvider;
  
