import React from "react";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Styles from "./StylesUsers/User.module.css"
import { BiArchive } from "react-icons/bi";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/slice/userSlice';



const UserDetailsModal = ({
  props,
  id,
  name,
  profile_picture,
  surname,
  email,
  country,
  city,
  address,
  admin,
  postal_code,
  createdAt,
}) => {

  const dispatch = useDispatch();
  
  const toggleAdminStatus = (userId, userData, currentAdminStatus) => {
    
    const newAdminStatus = !currentAdminStatus;
    
    const updatedUserData = {
      ...userData,
      admin: newAdminStatus,
    };

    const confirmAction = window.confirm('¿Estás seguro de convertir a este usuario en administrador?');
    
    if (confirmAction) {
      dispatch(updateUser(userId, updatedUserData))
      .then(() => {
        alert('Estado de admin actualizado en la base de datos');
        console.log(updatedUserData);
      })
      .catch(error => {
        console.error('Error al actualizar el estado de admin en la base de datos:', error);
      });
    } else {
      alert('Acción cancelada');
    }
  };
    
  let isAdmin;
  if (admin === false) {
    isAdmin = "No";
  } else if (admin === true) {
    isAdmin = "Si";
  } else if (admin === undefined) {
    isAdmin = "No Definido";
  }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    


    return (
    <div>
    <a className={Styles["a"]} onClick={handleShow}>
            <p className={Styles["text"]}>
            <br></br>
            <BiArchive className={Styles["icon"]} />
            <span className={Styles["text"]}>
              <br></br>Detalles
            </span>
          </p>
    </a>

    <Modal {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
            <Modal.Title>Detalles de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={Styles.userDetails}>
          <Row className={Styles.userDetailsHeader}>
          <Col className={Styles.userDetailsHeaderCol}>
            
          <h1 className={Styles.userDetailsName}>{name} {surname}</h1>
          </Col>
          <Col className={Styles.userDetailsHeaderCol}>

          <Image src={profile_picture} alt="Profile Picture" roundedCircle />
          </Col>
          
          </Row>
          <Row className={Styles.userDetailsInfo}>
          <Col>
                <h5 className={Styles.userDetailsLabel}>
                  ID: <span className={Styles.userDetailsValueId}>{id}</span>
                </h5>
                <h5 className={Styles.userDetailsLabel}>
                  Email: <span className={Styles.userDetailsValue}>{email}</span>
                </h5>
                <h5 className={Styles.userDetailsLabel}>
                  Admin: <span className={Styles.userDetailsValue}>{isAdmin}</span>
                </h5>
                <h5 className={Styles.userDetailsLabel}>
                  Created At: <span className={Styles.userDetailsValue}>{createdAt}</span>
                </h5>
              </Col>
              <Col>
                <h5 className={Styles.userDetailsLabel}>
                  Country: <span className={Styles.userDetailsValue}>{country}</span>
                </h5>
                <h5 className={Styles.userDetailsLabel}>
                  City: <span className={Styles.userDetailsValue}>{city}</span>
                </h5>
                <h5 className={Styles.userDetailsLabel}>
                  Address: <span className={Styles.userDetailsValue}>{address}</span>
                </h5>
                <h5 className={Styles.userDetailsLabel}>
                  Postal Code: <span className={Styles.userDetailsValue}>{postal_code}</span>
                </h5>
              </Col>
          </Row>
        </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={() => toggleAdminStatus(id, admin)}>
        Convertir en Admin
      </Button>
        </Modal.Footer>
    </Modal>
    </div>
    );
}

export default UserDetailsModal;