import { useState } from 'react';
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
//import { fetchUser } from "@/redux/slice/userSlice";

function Example() {
  const [show, setShow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
 // const userData = useSelector((state) => state.userData);

  const login = async (form) => {
    try{ 
      //envia el formulario
      //const response = await axios.post('http://localhost:8000/users/login', form)
      const response = await axios.post('https://pf-elatam.onrender.com/users/login', form)
      if (!response.data.verified){
        alert("El usuario no está verificado")
        handleClose()
        return 
      }
      //si no hay error, genera el token
      //const token = await axios.post('http://localhost:8000/users/getToken', response.data)
      const token = await axios.post('https://pf-elatam.onrender.com/getToken', response.data)
      //si no hay error guarda el token
      localStorage.setItem("token", JSON.stringify(token.data))
      if (response.data == 'Firebase: Error (auth/wrong-password).'){
        alert("La contraseña es incorrecta")
      }
      if (response.data == 'Firebase: Error (auth/user-not-found).'){
        alert("El usuario no existe")
      }
 //***** DATOS PARA GUARDAR EN ESTADOS *****     
      console.log(response.data);
      //dispatch(fetchUser(response.data))
      //console.log(userData);
      //access:true
      //email:"fede.mpz@gmail.com"
      //isAdmin:false
      //isSuperAdmin:false
      //name:"Federico Pezzutti"
        
    }catch(error){
        console.log(error.message);
    }
  }


  const loginGoogle = async () => {
    const provider = await new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider);
    // const token = result.user.accessToken;
    
    //validar si existe o no con axios a users/googleExist, llega false o datos del usuario
    const dataEmail = { email : result.user.email }
    //const response = await axios.post('http://localhost:8000/users/googleExist', dataEmail);
    const response = await axios.post('https://pf-elatam.onrender.com/users/googleExist', dataEmail);
    const user = {
      name: result.user.displayName,
      email: result.user.email,
      access: response.data.access,
      isAdmin: response.data.isAdmin,
      isSuperAdmin: response.data.isSuperAdmin
    }

    if (response.data.exist){
      //SE GUARDA EL TOKEN EN LOCALSTORAGE
      //const token = await axios.post('http://localhost:8000/users/getToken', user)
      const token = await axios.post('https://pf-elatam.onrender.com/users/getToken', user)
      localStorage.setItem("token", JSON.stringify(token.data))
//***** DATOS PARA GUARDAR EN ESTADOS *****
      console.log(user); //user es lo que se guarda en el estado, el token ya se guarda en localStorage

    }else{
      //no existe en nnuestra DB, hay que verificar el usuario
      sendEmailVerification(result.user)
      //RESOLVER TEMA PAIS
      // setPopUp(true)
      const data = { name : result.user.displayName || 'AAAA',
                     email: result.user.email,
                     country: 'Argentina'
                    }
      
      //SE CREA EN NUESTRA DB EL USUARIO Y SE GENERA EL TOKEN          
      //const response = await axios.post('http://localhost:8000/users/googleLogin', data);
      const response = await axios.post('https://pf-elatam.onrender.com/users/googleLogin', data);
      //const token = await axios.post('http://localhost:8000/users/getToken', user)
      const token = await axios.post('https://pf-elatam.onrender.com/users/getToken', user)
      //SE GUARDA EL TOKEN
      localStorage.setItem("token", JSON.stringify(token.data))
      const user = {
        name: result.user.displayName,
        email: result.user.email,
        access: response.data.access,
        isAdmin: response.data.isAdmin,
        isSuperAdmin: response.data.isSuperAdmin
        }
      
//***** DATOS PARA GUARDAR EN ESTADOS *****
      console.log(user);//user es lo que se guarda en el estado, el token ya se guarda en localStorage
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