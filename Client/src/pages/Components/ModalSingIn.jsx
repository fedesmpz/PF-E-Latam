import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import validate from '../../utils/registerValidation';
import axios from 'axios';

function Example() {

  const countries = [
    { value: "Argentina", label: "Argentina" },
    { value: "Colombia", label: "Colombia" },
    { value: "Mexico", label: "México" },
  ];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState({
    // name: '*',
    // surname: 'Campo Obligatorio',
    // email: 'Campo Obligatorio',
    // password: 'Campo Obligatorio',
    // address: 'Campo Obligatorio',
    // city: 'Campo Obligatorio',
    // country: 'Campo Obligatorio'
  });
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
      const response = await axios.post('http://localhost:8000/users/register', user)
      if (response.data.message == 'Firebase: Error (auth/email-already-in-use).') {
        alert("El usuario ya existe")
      }else if (response.data.message == 'Firebase: Error (auth/invalid-email).'){
        alert("Faltan datos en el formulario")
      }else{
        alert("El usuario fue creado con éxito y se envió un correo de validación")
      }
      //DATA DE USUARIO
      console.log(response.data);
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
        </Col>
        {error.name && <p>{error.name}</p>}
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={3}>
        <h5>Apellido</h5>
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" name="surname" value={form.surname} onChange={handleChange} />
        </Col>
        {error.surname && <p>{error.surname}</p>}
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={3}>
          <h5>Dirección</h5>
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" name="address" value={form.address} onChange={handleChange}/>
        </Col>
        {error.address && <p>{error.address}</p>}
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={3}>
          <h5>Ciudad</h5>
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" name="city" value={form.city} onChange={handleChange}/>
        </Col>
        {error.city && <p>{error.city}</p>}
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={3}>
          <h5>E-Mail</h5>
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="email" name="email" value={form.email} onChange={handleChange}/>
        </Col>
        {error.email && <p>{error.email}</p>}
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={3}>
          <h5>Contraseña</h5>
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="password" name="password" value={form.password} onChange={handleChange}/>
        </Col>
        {error.password && <p>{error.password}</p>}
      </Form.Group>



      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={3}>
            <h5>País</h5>
          </Form.Label>
          <Col sm={9}>
          <select name="country" value={form.country} onChange={handleChange}>
              <option value="">Selecciona un país</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value} onChange={handleChange}>
                  {country.label}
                </option>
              ))}
            </select>
            </Col>
            {error.country && <span>{error.country}</span>}
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