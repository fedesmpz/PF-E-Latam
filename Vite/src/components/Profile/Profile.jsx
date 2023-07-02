import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postProduct } from "../../redux/slice/productSlice"
import { loginUserLocal } from "../../redux/slice/userSlice"
import { setNewProductMessage } from "../../redux/slice/productSlice"
import { Link } from "react-router-dom"
import validation from "../../utils/formValidation"
import style from "./Profile.module.css"


const Profile = () => {

    const dispatch = useDispatch();
    const [isFormValid, setIsFormValid] = useState(false)
    let [errors, setErrors] = useState({})
    const message = useSelector(state => state.products.newProductMessage)
    const [profilePicture, setProfilePicture] = useState("")
    const userData = useSelector(state => state.user.userData)

    useEffect(()=>{
        dispatch(loginUserLocal())
        
    },[])

    const [newDataUser, setNewDataUser] = useState({
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        //surname: userData.name,
        birth_date: userData.name,
        sale_price: null,
        sold_quantity: 0,
        birth_date: 0,
        shipping: null,
        attributes: "",
        promotions: [],
        categories: "",
        country: "Argentina",
    })

    // useEffect(() => {
    //     const isValid = ((Object.keys(errors).length === Object.keys(newProduct).length - 4) || (Object.keys(errors).length === Object.keys(newProduct).length - 3) || (Object.keys(errors).length === Object.keys(newProduct).length - 2)) && Object.values(errors).every((error) => error === "");
    //     setIsFormValid(isValid);
    // }, [errors, newProduct]);

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

        setNewDataUser({
            ...newDataUser,
            email: aux,
            country: value
        })
    }

    

    const handleProductThumbnailUpload = (event) => {
        const prop = event.target.name
        const file = event.target.files[0];
        //validation(prop, file, errors, setErrors)
        transformFile(file)
    }

    const transformFile = (file) => {
        const reader = new FileReader()
        if (file) {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            }
        } else {
            setProfilePicture("")
        }
    }

    const handleChange = (event) => {

        const prop = event.target.name
        const value = event.target.value

        setNewDataUser({
            ...newDataUser,
            [prop]: value
        })

      //  validation(prop, value, errors, setErrors)

    }

    const handleSubmit = (event) => {
        event.preventDefault()

        // dispatch(postProduct({
        //     ...newProduct,
        //     uri: profilePicture
        // }))
        console.log(profilePicture);
        // if (isFormValid) {
            setNewDataUser({
        //         name: "",
        //         surname: 0,
        //         email: "",
        //         birth_date: 0,
        //         sale_price: false,
        //         available_quantity: 0,
        //         official_store_name: "",
        //         shipping: true,
        //         attributes: "",
        //         catalog_listing: true,
        //         promotions: [],
        //         categories: "",
        //         country: ""
            })
        //     setErrors({})
        // }
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
                        <label htmlFor="title" className={style.label}>Tu nombre</label>
                        <input placeholder="Ingrese un titulo" type="text" name="title" value={newDataUser.name} onChange={handleChange} />
                        {errors.title && <p>{errors.title}</p>}
                    </div>

                    <div>
                        <label htmlFor="title" className={style.label}>Tu apellido</label>
                        <input placeholder="Ingrese un titulo" type="text" name="title" value={newDataUser.name} onChange={handleChange} />
                        {errors.title && <p>{errors.title}</p>}
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
                        <label htmlFor="title" className={style.label}>Tu E-Mail</label>
                        <input placeholder="Ingrese un titulo" type="text" name="title" value={newDataUser.name} onChange={handleChange} />
                        {errors.title && <p>{errors.title}</p>}
                    </div>

                    <div>
                        <label htmlFor="birth_date" className={style.label}>Tu fecha de nacimiento</label>
                        <input placeholder="Ingrese un titulo" type="date" pattern="\d{2} \d{2} \d{4}"  name="birth_date" value={newDataUser.name} onChange={handleChange} />
                        {/* {errors.title && <p>{errors.title}</p>} */}
                    </div>

                    <div>
                        <label htmlFor="title" className={style.label}>Tu dirección</label>
                        <input placeholder="Ingrese un titulo" type="text" name="title" value={newDataUser.name} onChange={handleChange} />
                        {errors.title && <p>{errors.title}</p>}
                    </div>

                    <div>
                        <label htmlFor="title" className={style.label}>Tu ciudad</label>
                        <input placeholder="Ingrese un titulo" type="text" name="title" value={newDataUser.name} onChange={handleChange} />
                        {errors.title && <p>{errors.title}</p>}
                    </div>

                    <div>
                        <label htmlFor="title" className={style.label}>Tu código postal</label>
                        <input placeholder="Ingrese un titulo" type="text" name="title" value={newDataUser.name} onChange={handleChange} />
                        {errors.title && <p>{errors.title}</p>}
                    </div>                    

                    <div>
                        <label htmlFor="thumbnail" className={style.label}>Foto de tu perfil</label>
                        <input type="file" name="thumbnail" multiple={false} accept="image/*" onChange={handleProductThumbnailUpload} />
                        {errors.thumbnail && <p>{errors.thumbnail}</p>}
                    </div>



                    <div className={style.container_submit}>
                        {/* <button className={` ${isFormValid ? style.submitButton : style.submitDisabledButton}`} type="submit" disabled={!isFormValid}>Crear</button> */}
                        <button className={style.submitButton} type="submit">Crear</button>

                    </div>
                </form>
                <div className={style.secondColumn}>
                    <h2 className={style.PreviewofProduct}>Datos de tu perfil</h2>
                    <div className={style.firstRow}>
                        <div className={style.thumbnailContainer}>
                            {!profilePicture &&
                                <p className={style.previewTitleThumbnail}>La vista previa de la imagen aparecera aqui</p>}
                            {profilePicture && <img className={style.thumbnail} src={profilePicture} alt="product_thumbnail"></img>}
                        </div>
                        <div>
                            <h2 className={style.previewValue}>{newDataUser.name ? newDataUser.name : `Tu nombre`}</h2>
                            <h2 className={style.previewValue}>{newDataUser.surname ? newDataUser.surname : `Tu apellido`}</h2>
                            <span className={style.previewLines}><h3 className={style.previewLabel}>Pais</h3><h3 className={style.previewValue}>{newDataUser.country}</h3></span>
                            <span className={style.previewLines}><h3 className={style.previewLabel}>E-Mail </h3>
                                <h3 className={style.previewValue}>{`: ${newDataUser.email}`}</h3></span>
                            <span className={style.previewLines}><h3 className={style.previewLabel}>Fecha de nacimiento</h3><h3 className={style.previewValue}> {newDataUser.birth_date}</h3></span>
                        </div>
                    </div>

                    <div className={style.previewData}>
                        <span className={style.previewLines}><h3 className={style.previewLabel}>Producto en oferta?</h3>
                            <p className={style.previewValue}>{newDataUser.sale_price ? newDataUser.sale_price : `-`}</p></span>
                        <span className={style.previewLines}> <h3 className={style.previewLabel}>Precio de oferta</h3>
                            <p className={style.previewValue}>{newDataUser.birth_date}</p></span>
                        <span className={style.previewLines}><h3 className={style.previewLabel}>Envio gratis</h3>
                            <p className={style.previewValue}>{newDataUser.shipping ? newDataUser.shipping : `-`}</p></span>
                        <span className={style.previewLines}><h3 className={style.previewLabel}>Categoria</h3>
                            <h3 className={style.previewValue}>{newDataUser.categories ? newDataUser.categories : `-`}</h3></span>
                        <h3 className={style.previewLabel}>Descripcion</h3>
                        <p className={style.previewValue}>{newDataUser.attributes ? newDataUser.attributes : `Describe el producto brindando información clara y detallada sobre el artículo para ayudar a los clientes a comprender sus características, beneficios y especificaciones; tambien intenta incluir su propósito, función y uso. Enumera las características específicas del producto, como tamaño, dimensiones, materiales, color, capacidad, peso, etc. Si el producto tiene características técnicas, como velocidad, capacidad de almacenamiento o conectividad, asegúrate de incluirlas aquí.`}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Profile;