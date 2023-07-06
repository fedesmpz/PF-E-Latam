import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import style from "./Profile.module.css"
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { loginUserLocal, updateUser } from '../../redux/slice/userSlice';
import axios from 'axios'




const Profile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const message = useSelector(state => state.products.newProductMessage)
    const [profilePicture, setProfilePicture] = useState("")
    const userData = useSelector(state => state.user.userData)
    const noPofileFoto = '../../../public/images/no_profile.jpg'
    const [formDisabled, setFormDisabled] = useState(false)
    const [newDataUser, setNewDataUser] = useState(userData)
    const [showModalPassword, setShowModalPassword] = useState(false)
    const [showModalSend, setShowModalSend] = useState(false)
    const [newProfilePicture, setNewProfilePicture] = useState("")
    




    useEffect(()=>{
        dispatch(loginUserLocal())

        
    },[])

    useEffect(()=>{
        const fetchData = async () => {
            const data = {image: profilePicture}
            const image = await axios.put(`https://pf-elatam.onrender.com/users/update/image/${userData.userId}`, data)
            setNewProfilePicture(image.data)
       }
        fetchData()
        
    },[profilePicture])

    const sendChangePassword = () =>{
        
        setShowModalPassword(true)
        sendPasswordResetEmail(auth, newDataUser.email)

    }

    const closeChangePassword = () => {
        setShowModalPassword(false)
    }

    const closeChangeSend = () => {
        setShowModalSend(false)
    }


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
 
        transformFile(file)
    }


    const transformFile = (file) => {
        const reader = new FileReader()
        if (file) {
            reader.readAsDataURL(file)
            reader.onloadend =() => {
                setProfilePicture(reader.result);
            }
        } else {
            setProfilePicture("")
        }
    }



    const handleFormDisabled = () => {
        setFormDisabled(true)
    }

    const handleChange = (event) => {

        const prop = event.target.name
        const value = event.target.value

        setNewDataUser({
            ...newDataUser,
            [prop]: value
        })

    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (profilePicture){
            setNewDataUser({
                ...newDataUser,
               profile_picture: newProfilePicture
            })
        }
        setFormDisabled(false)
        dispatch(updateUser(userData.userId, newDataUser))
        setShowModalSend(true)
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
            </div>

            <div className={style.containerForm}>
                <div>

                <form encType="multipart/form-data">

                    <div>
                        <label htmlFor="title" className={style.label}>Tu nombre</label>
                        <input disabled={!formDisabled} className={!formDisabled && style.formDisabled} placeholder="Ingresa tu nombre" type="text" name="name"  value={newDataUser.name} onChange={handleChange}/>
                    </div>

                    <div>
                        <label htmlFor="title" className={style.label}>Tu apellido</label>
                        <input disabled={!formDisabled} className={!formDisabled && style.formDisabled} placeholder="Ingresa tu apellido" type="text" name="surname"  value={newDataUser.surname} onChange={handleChange}/>
                    </div>

                    <div>
                        <label htmlFor="country" className={style.label}>País</label>
                        <select onChange={handleCountryChange} name="country" id="country" className={style.selectField} value={newDataUser.country} disabled={!formDisabled}>
                            <option value="Argentina"> Argentina </option>
                            <option value="Colombia"> Colombia </option>
                            <option value="Mexico"> México </option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="title" className={style.label}>Tu E-Mail</label>
                        <input disabled={true} placeholder="Ingresa tu E-Mail" type="text" name="email" value={newDataUser.email}/>
                        {formDisabled && <p>Tu E-Mail no se puede cambiar</p>}
                    </div>

                    <div>
                        <label htmlFor="birth_date" className={style.label}>Tu fecha de nacimiento</label>
                        
                        <input disabled={!formDisabled} className={!formDisabled && style.formDisabled} type="date" name="birth_date"  value={newDataUser.birth_date} onChange={handleChange}/>
                    </div>

                    <div>
                        <label htmlFor="title" className={style.label}>Tu dirección</label>
                        <input disabled={!formDisabled} className={!formDisabled && style.formDisabled} placeholder="Ingresa tu dirección" type="text" name="address" value={newDataUser.address} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="title" className={style.label}>Tu ciudad</label>
                        <input disabled={!formDisabled} className={!formDisabled && style.formDisabled}  placeholder="Ingresa tu ciudad" type="text" name="city" value={newDataUser.city} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="title" className={style.label}>Tu código postal</label>
                        <input disabled={!formDisabled} className={!formDisabled && style.formDisabled} placeholder="Ingresa tu código postal" type="text" name="postal_code" value={newDataUser.postal_code} onChange={handleChange} />
                    </div>                    

                    <div>
                        <label htmlFor="thumbnail" className={style.label}>Foto de tu perfil</label>
                        <input disabled={!formDisabled} className={!formDisabled && style.formDisabled}  type="file" name="thumbnail" multiple={false} accept="image/*" onChange={handleProductThumbnailUpload}/>
                        {/* <input type="file" name="thumbnail" multiple={false} accept="image/*" onChange={handleProductThumbnailUpload} /> */}
                    </div>

                    
                </form>
                <div className={style.container_submit}>
                        {
                            formDisabled ? 
                            <button className={style.submitButton}  onClick={handleSubmit}>Actualizar Perfil</button>
                            :
                            <button className={style.submitButton}  onClick={handleFormDisabled}>Editar Perfil</button>
                        }
                        
                        {/* <button className={style.submitButton}>Mis reseñas</button>
                        <button className={style.submitButton} onClick={handleMySales}>Mis compras</button> */}
                        <button className={style.submitButton} onClick={sendChangePassword}>Cambiar Contraseña</button>
                    </div>
                </div>



                <div className={style.secondColumn}>
                    <h2 className={style.PreviewofProduct}>Datos de tu perfil</h2>
                    <div className={style.firstRow}>

                        <div className={style.thumbnailContainer}>
                            {profilePicture ? (
                              <img className={style.thumbnail} src={profilePicture} alt="product_thumbnail" />
                            ) : newDataUser.profile_picture ? (
                              <img className={style.thumbnail} src={newDataUser.profile_picture} alt="product_thumbnail" />
                            ) : (
                              <img className={style.thumbnail} src={noPofileFoto} alt="product_thumbnail" />
                            )}
                        </div>
                        <div>
                            <h2 className={style.previewTitle}>{newDataUser.name ? newDataUser.name : `Tu nombre`}</h2>
                            <h2 className={style.previewTitle}>{newDataUser.surname ? newDataUser.surname : `Tu apellido`}</h2>

                            <span className={style.previewLines}><h4 className={style.previewLabel}>Pais</h4>
                            <p className={style.previewValue}>{newDataUser.country}</p></span>

                            <span className={style.previewLines}><h4 className={style.previewLabel}>E-Mail</h4>
                            <p className={style.previewValue}>{`${newDataUser.email}`}</p></span>

                            <span className={style.previewLines}><h4 className={style.previewLabel}>Fecha de nacimiento</h4>
                            <p className={style.previewValue}> {newDataUser.birth_date}</p></span>
                        </div>
                    </div>

                    <div className={style.previewData}>
                        <span className={style.previewTitle}><h4 className={style.previewLabel}>Dirección</h4>
                            </span>
                            <p className={style.previewTitle}>{newDataUser.address ? newDataUser.address : `Tu dirección`}</p>

                        <span className={style.previewTitle}> <h4 className={style.previewLabel}>Ciudad</h4>
                            </span>
                            <p className={style.previewTitle}>{newDataUser.address ? newDataUser.city : `Tu ciudad`}</p>

                        <span className={style.previewTitle}><h4 className={style.previewLabel}>Código Postal</h4>
                            </span>
                            <p className={style.previewTitle}>{newDataUser.address ? newDataUser.postal_code : `Tu código postal`}</p>

 
                    </div>
                </div>
                <>
                  {showModalPassword && (
                    <div className={style.modal}>
                      <div className={style.modalContent}>
                        <h2>Se envió un correo a {userData.email}</h2> 
                        <h2>para reestablecer la contraseña</h2>
                        <div className={style.modalButtons}>
                          <button onClick={closeChangePassword}>Aceptar</button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
                <>
                  {showModalSend && (
                    <div className={style.modal}>
                      <div className={style.modalContent}>
                        <h2>Se hicieron modificaciones </h2> 
                        <h2>en el usuario {userData.email}</h2>
                        <div className={style.modalButtons}>
                          <button onClick={closeChangeSend}>Aceptar</button>
                        </div>
                      </div>
                    </div>
                  )}
                </>

            </div>
        </div>
    )
}


export default Profile;