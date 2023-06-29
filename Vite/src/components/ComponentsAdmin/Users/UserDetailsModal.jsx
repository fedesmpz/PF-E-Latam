import React from "react";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Styles from "./StylesUsers/UserModal.module.css";
import StyleProduct from "../Products/StylesProducts/AllProductsAdmin.module.css";
import { BiArchive } from "react-icons/bi";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from "../../FooterLanding/Footerlanding.module.css"

const UserDetailsModal = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
    <div>
    <Button className={style.link} variant="btn btn-link" onClick={handleShow}>
    <p className={Styles["text"]}>
            <br></br>
            <BiArchive className={Styles["icon"]} />
            <span className={Styles["text"]}>
              <br></br>Detalles
            </span>
          </p>
    </Button>

    <Modal size="lg" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={Styles.userDetails}>
          <h1 className={Styles.userDetailsName}>User Details</h1>
          <Image src="" alt="Profile Picture" roundedCircle />
          <Row className={Styles.userDetailsInfo}>
            <Col>
              <p className={Styles.userDetailsLabel}>ID:</p>
              <p>{}</p>
              <p className={Styles.userDetailsLabel}>Name:</p>
              <p>{}</p>
              <p className={Styles.userDetailsLabel}>Surname:</p>
              <p>{}</p>
              <p className={Styles.userDetailsLabel}>Email:</p>
              <p>{}</p>
            </Col>
            <Col>
              <p className={Styles.userDetailsLabel}>Country:</p>
              <p>{}</p>
              <p className={Styles.userDetailsLabel}>City:</p>
              <p>{}</p>
              <p className={Styles.userDetailsLabel}>Address:</p>
              <p>{}</p>
              <p className={Styles.userDetailsLabel}>Admin:</p>
              <p>{"No"}</p>
              <p className={Styles.userDetailsLabel}>Postal Code:</p>
              <p>{}</p>
              <p className={Styles.userDetailsLabel}>Created At:</p>
              <p>{}</p>
            </Col>
          </Row>
        </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
    </div>
    );
}

export default UserDetailsModal;