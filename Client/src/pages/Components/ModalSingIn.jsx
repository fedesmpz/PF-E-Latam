import { useState } from 'react';
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

  const register = async (user) => {
    try{ 
      const response = await axios.post('http://localhost:8000/users/register', user)
      if (response.data.message == 'Firebase: Error (auth/email-already-in-use).') {
        alert("El usuario ya existe")
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
      } catch (error) {
        setSuccess('Error al crear el usuario'+ error.message);
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
          <Modal.Title>Registrate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={3}>
          Nombre
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" name="name" value={form.name} onChange={handleChange}/>
        </Col>
        {error.name && <span>{error.name}</span>}
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={3}>
          Apellido
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" name="surname" value={form.surname} onChange={handleChange} />
        </Col>
        {error.surname && <span>{error.surname}</span>}
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={3}>
          Dirección
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" name="address" value={form.address} onChange={handleChange}/>
        </Col>
        {error.address && <span>{error.address}</span>}
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={3}>
          Ciudad
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" name="city" value={form.city} onChange={handleChange}/>
        </Col>
        {error.city && <span>{error.city}</span>}
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={3}>
          E-Mail
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="email" name="email" value={form.email} onChange={handleChange}/>
        </Col>
        {error.email && <span>{error.email}</span>}
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={3}>
          Contraseña
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="password" name="password" value={form.password} onChange={handleChange}/>
        </Col>
        {error.password && <span>{error.password}</span>}
      </Form.Group>



      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={3}>
            País
          </Form.Label>
          <Col sm={9}>
          <select name="country" value={form.country} onChange={handleChange}>
              <option value="">Selecciona un país</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
            </Col>
            {error.country && <span>{error.country}</span>}
        </Form.Group>
      </fieldset>
      {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
        <Col sm={{ span: 10, offset: 2 }}>
          <Form.Check label="Remember me" />
        </Col>
      </Form.Group> */}

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 7 }}>
          <Button type="submit" className="m-4">Registrarse</Button>
        </Col>
      </Form.Group>
    </Form>
    {/* <RegisterForm></RegisterForm> */}
          {/* <Button variant="secondary" className="" onClick={handleClose}>Close</Button> */}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;