import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import validate from '../../utils/registerValidation';
import Styles from "./ModalSignIn.module.css"
import axios from 'axios';
//import { fetchUsers } from "../../redux/slice/userSlice";

function Example() {

  const countries = [
    { value: "Argentina", label: "Argentina" },
    { value: "Colombia", label: "Colombia" },
    { value: "Mexico", label: "México" },
  ];
  const [show, setShow] = useState(false);

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

  const register = async (user) => {
    try{ 
      const response = await axios.post('https://pf-elatam.onrender.com/users/register', user)
      if (response.data.message == 'Firebase: Error (auth/email-already-in-use).') {
        alert("El usuario ya existe")
      }else if (response.data.message == 'Firebase: Error (auth/invalid-email).'){
        alert("Faltan datos en el formulario")
      }else{
        alert("El usuario fue creado con éxito y se envió un correo de validación")
      }
    }catch(error){
        console.log(error.message);
    }
}

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



      <fieldset>
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
        <Col sm={{ span: 10, offset: 7 }}>
          <Button disabled={!Object.values(error).every(value => value === null || value === undefined || value === '')} type="submit" className="m-4">
            Registrarse
          </Button>
        </Col>
      </Form.Group>
    </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;