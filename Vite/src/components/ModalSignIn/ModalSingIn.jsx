import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import validate from '../../utils/registerValidation';
import Styles from "./ModalSignIn.module.css"
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
   } from 'firebase/auth'
import { auth } from '../../utils/firebase'

function Example() {

  const countries = [
    { value: "Argentina", label: "Argentina" },
    { value: "Colombia", label: "Colombia" },
    { value: "Mexico", label: "México" },
  ];
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [textModal, setTextModal] = useState("")
  const [showModalCountry, setShowModalCountry] = useState(false);
  const [selectCountry, setSelectCountry] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    address: '',
    city: '',
    country: ''
  });

  const handleCloseCountry = async () =>{
    setShowModalCountry(true)

    handleClose()

  }



  const handleChange = (event) =>{
    setForm((prevForm) => ({
        ...prevForm,
        [event.target.name]: event.target.value
      }));
      setError(validate(form));
  };

  useEffect(() => {
    setError(validate(form));
  }, [form]);

  const closeModal = () => {
    setShowModal(false);
    setTextModal('')
  };

  const closemodalCountry = () => {
    setShowModalCountry(false);
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



  const register = async (user) => {
    try{ 
      const response = await axios.post('https://pf-elatam.onrender.com/users/register', user)
      if (response.data.message == 'Firebase: Error (auth/email-already-in-use).') {
        setTextModal("El usuario ya existe")
      }else if (response.data.message == 'Firebase: Error (auth/invalid-email).'){
        setTextModal("Existen errores en el formulario")
      }else{
        setTextModal("El usuario fue creado con éxito y se envió un correo de validación")
      }
      setShowModal(true)
      handleClose()

    }catch(error){
        console.log(error.message);
    }
}


const handleChangeCountry = async (event) =>{
  setSelectCountry(event.target.value);
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(error).length === 0) {
      try {
        register(form)
        setForm({
            name: '',
            surname: '',
            email: '',
            password: '',
            address: '',
            city: '',
            country: ''
        });
        // return response
        handleClose()
      } catch (error) {
        alert(error.message);
        // return error
      }
    }
  };



  return (
    <>
      <Button variant="secundary" onClick={handleShow}>
        Registrate
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h3>Registrate</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={3}>
          <h5>Nombre</h5>
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" name="name" value={form.name} onChange={handleChange}/>
        {error.name ? (<p className={Styles.error}>{error.name}</p>):(<p className={Styles.noError}>Nombre correcto</p>)}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={3}>
        <h5>Apellido</h5>
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" name="surname" value={form.surname} onChange={handleChange} />
        {error.surname ? (<p className={Styles.error}>{error.surname}</p>):(<p className={Styles.noError}>Apellido correcto</p>)}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={3}>
          <h5>Dirección</h5>
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" name="address" value={form.address} onChange={handleChange}/>
        {error.address ? (<p className={Styles.error}>{error.address}</p>):(<p className={Styles.noError}>Dirección correcta</p>)}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={3}>
          <h5>Ciudad</h5>
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" name="city" value={form.city} onChange={handleChange}/>
        {error.city ? (<p className={Styles.error}>{error.city}</p>):(<p className={Styles.noError}>Ciudad correcta</p>)}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={3}>
          <h5>E-Mail</h5>
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="email" name="email" value={form.email} onChange={handleChange}/>
        {error.email ? (<p className={Styles.error}>{error.email}</p>):(<p className={Styles.noError}>E-Mail correcto</p>)}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={3}>
          <h5>Contraseña</h5>
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="password" name="password" value={form.password} onChange={handleChange}/>
        {error.password ? (<p className={Styles.error}>{error.password}</p>):(<p className={Styles.noError}>Contraseña correcta</p>)}
        </Col>
      </Form.Group>



      <fieldset className={Styles.indexInZ}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={3}>
            <h5>País</h5>
          </Form.Label>
          <Col sm={9}>
            <div>
            <select name="country" value={form.country} onChange={handleChange}>
              <option value="">Selecciona un país</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value} onChange={handleChange}>
                  {country.label}
                </option>
              ))}
            </select>
            {error.country ? (<p className={Styles.error}>{error.country}</p>):(<p className={Styles.noError}>Campo correcto</p>)}
            </div>
  
            </Col>
        </Form.Group>
      </fieldset>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 3 }}>
          <Button disabled={!Object.values(error).every(value => value === null || value === undefined || value === '')} type="submit" className="m-4">
            Registrarse
          </Button>
          <Button variant="primary" onClick={handleCloseCountry}>
            Inicia con Google
          </Button>
        </Col>
      </Form.Group>
    </Form>
        </Modal.Body>
      </Modal>
      <>
        {showModal && (
          <div className={Styles.modal}>
            <div className={Styles.modalContent}>
              <h2>{textModal}</h2>
              <div className={Styles.modalButtons}>
                <button onClick={closeModal}>Aceptar</button>
              </div>
            </div>
          </div>
        )}
      </>

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
  );
}

export default Example;