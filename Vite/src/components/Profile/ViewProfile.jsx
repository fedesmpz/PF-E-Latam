import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Styles from "../ComponentsAdmin/Users/StylesUsers/User.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import StylesButton from "../NavBar/NavBar.module.css";
import StylesViewProfile from "./Profile.module.css"

const UserDetailsModal = ({ props, id, admin }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector((state) => state.user.userData);

  let isAdmin;
  if (user.isAdmin === false) {
    isAdmin = "No";
  } else if (user.isAdmin === true) {
    isAdmin = "Si";
  } else if (user.isAdmin === undefined) {
    isAdmin = "No Definido";
  }

  let isSuperAdmin;
  if (user.isSuperAdmin === false) {
    isSuperAdmin = "No";
  } else if (user.isSuperAdmin === true) {
    isSuperAdmin = "Si";
  } else if (user.isSuperAdmin === undefined) {
    isSuperAdmin = "No Definido";
  }

  const handlerProfile = () =>{
    navigate('/Profile')
    handleClose();
  }

  return (
    <div>
      <button className={StylesButton.button} onClick={handleShow}>
            Perfil
      </button>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalles de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={Styles.userDetails}>
            <Row className={Styles.userDetailsHeader}>
              <Col className={Styles.userDetailsHeaderCol}>
                <h1 className={Styles.userDetailsName}>
                  {user.name} {user.surname}
                </h1>
              </Col>
            </Row>
            <Row className={Styles.userDetailsInfo}>
              <Col>
                <h5 className={Styles.userDetailsLabel}>
                  Email:<span className={Styles.userDetailsValue}>{user.email}</span>
                </h5>
                <h5 className={Styles.userDetailsLabel}>
                  Admin:<span className={Styles.userDetailsValue}>{isAdmin}</span>
                </h5>
                <h5 className={Styles.userDetailsLabel}>
                  SuperAdmin:<span className={Styles.userDetailsValue}>
                    {isSuperAdmin}
                  </span>
                </h5>
                <h5 className={Styles.userDetailsLabel}>
                  Country:<span className={Styles.userDetailsValue}>
                    {user.country}
                  </span>
                </h5>
                <h5 className={Styles.userDetailsLabel}>
                  City:<span className={Styles.userDetailsValue}>{user.city}</span>
                </h5>
                <h5 className={Styles.userDetailsLabel}>
                  Address:<span className={Styles.userDetailsValue}>
                    {user.address}
                  </span>
                </h5>
              </Col>
              <Col className={Styles.userDetailsHeaderCol}>
                <Image
                  src={user.profile_picture}
                  alt="Profile Picture"
                  roundedCircle
                />
              </Col>
            </Row>
          </div>
          <div className={StylesViewProfile.aviso}>
          <span>Te queremos recordar que para poder disfrutar de una experiencia completa de nuestro portal de comercio deberás revisar las propiedas <span className={StylesViewProfile.uppercase}>ADMIN</span> y <span className={StylesViewProfile.uppercase}>SUPERADMIN</span>, estas propiedas deben estar marcadas con un <span className={StylesViewProfile.uppercase}>"SI"</span> para acceder a nuestro portal de <span className={StylesViewProfile.uppercase}>Admin</span>, da click en <span className={StylesViewProfile.uppercase}>ACTUALIZAR</span> cambia esas propiedades y disfruta de un total acceso a nuestro portal, recuerda usarlo <span className={StylesViewProfile.uppercase}>responsablemente</span>.
          </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <div className={StylesButton.cartContainer}>
        <div>
          <button className={StylesButton.button} variant="secondary" onClick={handleClose}>
            Close
          </button>
        </div>
        <div>
          <button className={StylesButton.button}  onClick={handlerProfile}>Actualizar</button>
        </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserDetailsModal;
