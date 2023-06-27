import React from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Styles from "./StylesUsers/UserModal.module.css";

const UserDetails = ({ id }) => {
  const user = useSelector((state) => state.user.users);
  console.log(user);

  return (
    <>
      <Modal.Body>
        <div className={Styles.userDetails}>
          <h1 className={Styles.userDetailsName}>User Details</h1>
          <Image src={user.profile_picture} alt="Profile Picture" roundedCircle />
          <Row className={Styles.userDetailsInfo}>
            <Col>
              <p className={Styles.userDetailsLabel}>ID:</p>
              <p>{user.id}</p>
              <p className={Styles.userDetailsLabel}>Name:</p>
              <p>{user.name}</p>
              <p className={Styles.userDetailsLabel}>Surname:</p>
              <p>{user.surname}</p>
              <p className={Styles.userDetailsLabel}>Email:</p>
              <p>{user.email}</p>
            </Col>
            <Col>
              <p className={Styles.userDetailsLabel}>Country:</p>
              <p>{user.country}</p>
              <p className={Styles.userDetailsLabel}>City:</p>
              <p>{user.city}</p>
              <p className={Styles.userDetailsLabel}>Address:</p>
              <p>{user.address}</p>
              <p className={Styles.userDetailsLabel}>Admin:</p>
              <p>{user.admin ? "Yes" : "No"}</p>
              <p className={Styles.userDetailsLabel}>Postal Code:</p>
              <p>{user.postal_code}</p>
              <p className={Styles.userDetailsLabel}>Created At:</p>
              <p>{user.createdAt}</p>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
};

export default UserDetails;
