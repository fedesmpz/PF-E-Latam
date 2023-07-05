import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Styles from "./ModalLogin.module.css"
import axios from 'axios'
import { GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
   } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { useSelector, useDispatch } from 'react-redux';
import { loginUserLocal } from "../../redux/slice/userSlice";
import { useNavigate, useLocation } from 'react-router-dom';


function Example() {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const location = useLocation()

  const [showModal, setShowModal] = useState(false);
  const [textModal, setTextModal] = useState("")
  const [showModalCountry, setShowModalCountry] = useState(false);
  const [selectCountry, setSelectCountry] = useState('');
  const [show, setShow] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const navigate = useNavigate()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showPassword, setShowPassword] = useState(false)
  const [passwordModal, setPasswordModal] = useState(false)
  const [emailSend, setEmailSend] = useState('');

  const handleEmailChange = (event) => {
    setEmailSend(event.target.value);
  };


  const countries = [
    { value: "Argentina", label: "Argentina" },
    { value: "Colombia", label: "Colombia" },
    { value: "Mexico", label: "México" },
  ];

  const [form, setForm] = useState({
    email: '',
    password: '',
  });


  const closeModal = () => {
    setShowModal(false);
    setTextModal('')
  };

  const closemodalCountry = () => {
    setShowModalCountry(false);
  }

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };



  const login = async (form) => {
    try{ 

      const response = await axios.post('https://pf-elatam.onrender.com/users/login', form)
      
      if (response.data == 'Firebase: Error (auth/wrong-password).'){
        setTextModal("La contraseña es incorrecta")
        setShowModal(true)
      }else if (response.data == 'Firebase: Error (auth/user-not-found).'){
        setTextModal("El usuario no existe")
        setShowModal(true)
      }else if (!response.data.verified){
        setTextModal("El usuario no está verificado")
        setShowModal(true)
        
        handleClose()
        return 
      }


      const token = await axios.post('https://pf-elatam.onrender.com/users/getToken', response.data)
      localStorage.setItem("user", JSON.stringify(response.data))
      localStorage.setItem("token", JSON.stringify(token.data))

      if(response.data.access && location.pathname === '/'){
       navigate('/Home')
      }else if (response.data.access && location.pathname === '/Cart'){
        navigate(`/Purchase?cartId=${userData.cartId}`)
      }else if (response.data.access){
        window.location.reload();
      }
      handleClose()
    }catch(error){
        console.log(error.message);
    }
  }


  const loginGoogle = async () => {

    setShowModalCountry(false)

    const provider = await new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider);
    const dataUser = { email : result.user.email,
                        name : result.user.displayName,
                        country: selectCountry,
                        firebaseId: result.user.uid,
                        profile_picture: result.user.photoURL
                        }
    const response = await axios.post('https://pf-elatam.onrender.com/users/googleExist', dataUser);
   
    const user = {
      userId: response.data.userId,
      name: response.data.name,
      surname: response.data.surname,
      email: result.user.email,
      access: response.data.access,
      isAdmin: response.data.isAdmin,
      isSuperAdmin: response.data.isSuperAdmin,
      verified: result.user.emailVerified,
      postal_code: response.data.postal_code,
      address: response.data.address,
      city: response.data.city,
      country: response.data.country,
      profile_picture: response.data.profile_picture,
      cartId: response.data.cartId,
      firebaseId: response.data.firebaseId,
    }


        const token = await axios.post('https://pf-elatam.onrender.com/users/getToken', user)
  
        localStorage.setItem("token", JSON.stringify(token.data))
        localStorage.setItem("user", JSON.stringify(user))
        
        if(response.data.access && location.pathname === '/'){
         navigate('/Home')
        }else if (response.data.access && location.pathname === '/Cart'){
         navigate(`/Purchase?cartId=${userData.cartId}`)
        }else if (response.data.access){
         window.location.reload();
        }
        handleClose()
     
  }

  const handleCloseCountry = async () =>{
    setShowModalCountry(true)

    handleClose()

  }
  
  const handleChange = (event) =>{
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value
    }));
  };

  const handleChangeCountry = async (event) =>{
    setSelectCountry(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
      try {
        login(form)
        setForm({
            email: '',
            password: '',
        });
        // return response
      } catch (error) {

        setSuccess('Error al crear el usuario'+ error.message);
        // return error
      }
  };

  const openModalPassword = () =>{
    setShowPassword(true);
    handleClose()
  }
  const sendEmail = () => {
    sendPasswordResetEmail(auth, emailSend)
    setShowPassword(false)
    setPasswordModal(true);
  }

  const closePassword = () => {
    setShowPassword(false)
    setPasswordModal(false);
  }

  const cancel = () => {
    setShowPassword(false)
    setPasswordModal(false);
  }




  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Iniciar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inicia Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group  className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={3}>
          E-Mail
        </Form.Label>

          <Form.Control type="email" name="email" value={form.email} onChange={handleChange}/>

      </Form.Group>

      <Form.Group className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={3}>
          Contraseña
        </Form.Label>

          <Form.Control type="password" name="password" value={form.password} onChange={handleChange}/>
        
      </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={handleSubmit}>
            Iniciar
          </Button>

          <Button variant="primary" onClick={handleCloseCountry}>
            Inicia con Google
          </Button>



        </Modal.Footer>
        <a  href="#" variant="primary" onClick={openModalPassword}>
            Olvidaste tu contraseña?
          </a>
      </Modal>
      <>
        {showPassword && (
          <div className={Styles.modal}>
            <div className={Styles.modalContent}>
              <h2>Ingresa tu E-Mail</h2>
              <input type="text" value={emailSend} onChange={handleEmailChange} />
              <div className={Styles.modalButtons}>
                <button onClick={sendEmail}>Enviar</button>
                <button onClick={cancel}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </>
      <>
        {passwordModal && (
          <div className={Styles.modal}>
            <div className={Styles.modalContent}>
              <h2>Se envió un correo a tu dirección</h2>
              <h2>para reestablecer la contraseña</h2>
              <div className={Styles.modalButtons}>
                <button onClick={closePassword}>Aceptar</button>
              </div>
            </div>
          </div>
        )}
      </>
      <>
        {showModal && (
          <div className={Styles.modal}>
            <div className={Styles.modalContent}>
              <h2>{textModal}</h2>
              <div className={Styles.modalButtons}>
                <button onClick={closeModal}>Cerrar</button>
              </div>
            </div>
          </div>
        )}
      </>
      <>
        {showModalCountry && (
          <div className={Styles.modal}>
            <div className={Styles.modalContent}>
                  <h2>Selecciona un país</h2>
                  <p>Para continuar debes seleccionar un país</p>
                <select name="country" value={selectCountry} onChange={handleChangeCountry}>
                  <option value="">Selecciona un país</option>
                  {countries.map((country) => (
                    <option key={country.value} value={country.value} onChange={handleChangeCountry}>
                      {country.label}
                    </option>
                  ))}
                </select>

              <div className={Styles.modalButtons}>
                <div className={Styles.modalContent}>
                <button className={Styles.modalContent} onClick={loginGoogle}><h2>Iniciar</h2></button>
                <button className={Styles.modalContent} onClick={closemodalCountry}><h2>Cerrar</h2></button>

                </div>
              
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default Example;
