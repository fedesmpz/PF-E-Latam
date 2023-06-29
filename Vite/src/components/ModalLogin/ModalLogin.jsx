import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Styles from "./ModalLogin.module.css"
import axios from 'axios'
import { GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
   } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from "../../redux/slice/userSlice";
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
  const navigate = useNavigate()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const countries = [
    { value: "Argentina", label: "Argentina" },
    { value: "Colombia", label: "Colombia" },
    { value: "Mexico", label: "México" },
  ];

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTextModal('')
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(()=>{
    setShowModalCountry(false)
  },[selectCountry])



  const login = async (form) => {
    try{ 

      const response = await axios.post('https://pf-elatam.onrender.com/users/login', form)
      
      if (response.data == 'Firebase: Error (auth/wrong-password).'){
        console.log(textModal);
        setTextModal("La contraseña es incorrecta")
        console.log(textModal);
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
        navigate('./home')
      }else if (response.data.access && location.pathname === '/home'){
        window.location.reload();
      }
      handleClose()
    }catch(error){
        console.log(error.message);
    }
  }






  const loginGoogle = async () => {
    const provider = await new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider);
    

    const dataEmail = { email : result.user.email }
    const response = await axios.post('https://pf-elatam.onrender.com/users/googleExist', dataEmail);
    const user = {
      name: result.user.displayName,
      email: result.user.email,
      access: response.data.access,
      isAdmin: response.data.isAdmin,
      isSuperAdmin: response.data.isSuperAdmin,
      verified: result.user.emailVerified,
      address: response.data.address,
      city: response.data.city,
      country: response.data.country,
      cartId: response.data.cartId
    }
   
    if (response.data.exist){


        const token = await axios.post('https://pf-elatam.onrender.com/users/getToken', user)
        localStorage.setItem("token", JSON.stringify(token.data))
        localStorage.setItem("user", JSON.stringify(user))
        
        if(response.data.access && location.pathname === '/'){
          navigate('./home')
        }else{
          window.location.reload();
        }
        handleClose()
        

    }else{
      handleClose()
      setShowModalCountry(true)



        const data = { name : result.user.displayName || 'AAAA',
        email: result.user.email,
        country: selectCountry,
      }
      
      const response2 = await axios.post('https://pf-elatam.onrender.com/users/googleLogin', data);
      const token = await axios.post('https://pf-elatam.onrender.com/users/getToken', response2.data )
      
      localStorage.setItem("token", JSON.stringify(token.data))
      
      const userLogued = {
        name: result.user.displayName,
        email: result.user.email,
        access: response2.data.access,
        isAdmin: response2.data.isAdmin,
        isSuperAdmin: response2.data.isSuperAdmin,
        verified: result.user.emailVerified,
        address: response2.data.address,
        city: response2.data.city,
        country: response2.data.country,
        cartId: response2.data.cartId
        
      }
      
      localStorage.setItem("user", JSON.stringify(userLogued))
      
      if(response2.data.access && location.pathname === '/'){
        navigate('./home')
      }else{
        window.location.reload();
      }
    
    }
  }




  const handleChange = (event) =>{
    setForm((prevForm) => ({
        ...prevForm,
        [event.target.name]: event.target.value
      }));
  };

  const handleChangeCountry = (event) =>{
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

          <Button variant="primary" onClick={loginGoogle}>
            Inicia con Google
          </Button>

        </Modal.Footer>
      </Modal>
      {/* <button onClick={openModal}>XXXX</button> */}
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
                  <h2>Debes seleccionar un pais</h2>

                <select name="country" value={selectCountry} onChange={handleChangeCountry}>
                  <option value="">Selecciona un país</option>
                  {countries.map((country) => (
                    <option key={country.value} value={country.value} onChange={handleChangeCountry}>
                      {country.label}
                    </option>
                  ))}
                </select>
              <div className={Styles.modalButtons}>
                {/* <button onClick={closeModal}>Cerrar</button> */}
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default Example;