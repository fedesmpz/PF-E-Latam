import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
// import style from "../FooterLanding/Footerlanding.module.css"
import axios from 'axios'
import { GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
   } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from "../../redux/slice/userSlice";
import { useNavigate } from 'react-router-dom';


function Example() {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);


  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };






  const login = async (form) => {
    try{ 

      const response = await axios.post('https://pf-elatam.onrender.com/users/login', form)
      if (!response.data.verified){
        alert("El usuario no está verificado")
        
        handleClose()
        return 
      }
      const token = await axios.post('https://pf-elatam.onrender.com/users/getToken', response.data)

      localStorage.setItem("token", JSON.stringify(token.data))
      if (response.data == 'Firebase: Error (auth/wrong-password).'){
        alert("La contraseña es incorrecta")
      }
      if (response.data == 'Firebase: Error (auth/user-not-found).'){
        alert("El usuario no existe")
      }
 //***** DATOS PARA GUARDAR EN ESTADOS ***** 
      //await dispatch(fetchUsers(response.data))
      localStorage.setItem("user", JSON.stringify(response.data))
      //console.log(userData);
      if(response.data.access){
        navigate('./home')
      }
        
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
        
        handleClose()
        if(user.access){
          navigate('./home')
        }
        

    }else{
      //no existe en nnuestra DB, hay que verificar el usuario
      //RESOLVER TEMA PAIS
      // setPopUp(true)
      const data = { name : result.user.displayName || 'AAAA',
                     email: result.user.email,
                     country: 'Argentina',
                    }
      
      //SE CREA EN NUESTRA DB EL USUARIO Y SE GENERA EL TOKEN          
      //const response = await axios.post('http://localhost:8000/users/googleLogin', data);
      const response2 = await axios.post('https://pf-elatam.onrender.com/users/googleLogin', data);
      //const token = await axios.post('http://localhost:8000/users/getToken', user)
      const token = await axios.post('https://pf-elatam.onrender.com/users/getToken', response2.data )
      //SE GUARDA EL TOKEN
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
      //await dispatch(fetchUsers(userLogued))
      //***** DATOS PARA GUARDAR EN ESTADOS *****
      localStorage.setItem("user", JSON.stringify(userLogued))

      //console.log(userData);//user es lo que se guarda en el estado, el token ya se guarda en localStorage
    }
  }




  const handleChange = (event) =>{
    setForm((prevForm) => ({
        ...prevForm,
        [event.target.name]: event.target.value
      }));
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
    </>
  );
}

export default Example;