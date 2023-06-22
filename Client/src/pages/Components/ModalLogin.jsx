import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import style from "./Styles/Footerlanding.module.css"
import axios from 'axios'

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const login = async (form) => {
    try{ 
      const response = await axios.post('http://localhost:8000/users/login', form)
      console.log(response.data);
        
    }catch(error){
        console.log(error.message);
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
        Log In
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

              <label htmlFor="email">
              E-Mail
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder='Ej: ashketchum@pokemon.com'
              />
            </label>

              <label htmlFor="password">
              Contraseña
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder='Contraseña'
              />
            </label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleSubmit}>
            Log In
          </Button>

          <Button variant="primary" onClick={handleClose}>
            Log In with Google
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;