import React, { useState } from "react";
import Styles from "../Products/StylesProducts/AllProductsAdmin.module.css";
import { BiArchive } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import UserDetails from "./UserDetails";
import { useDispatch } from "react-redux";
import { getUserById } from "../../../redux/slice/userSlice";

const User = ({
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
  let isAdmin;
  if (admin === false) {
    isAdmin = "No";
  } else if (admin === "true") {
    isAdmin = "Si";
  } else if (admin === null) {
    isAdmin = "No Definido";
  }

  const maxLength = 60;

  const shortenname = (name) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  };

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setShowModal(true);
    dispatch(getUserById(id));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <li key={id} className={Styles.order}>
        <div className={Styles.faShop}>
          <img
            src={profile_picture}
            alt="Producto"
            style={{
              width: "auto",
              height: "3rem",
            }}
          />
        </div>
        <div className={Styles.textContainer}>
          <p className="text-gray-800 font-bold">{shortenname(name)}</p>
          <p className="text-gray-400 text-sm">Pais: {country}</p>
          <p className="text-gray-400 text-sm">Email: {email}</p>
        </div>
        <p className={Styles.date}>
          <p className={Styles["text"]}>
            {}
            <br></br>
            <span className={Styles["text"]}>
              <GrUserAdmin className={Styles["icon"]} />
              <br></br>Admin {isAdmin}
            </span>
          </p>

          <button className={Styles["button"]} onClick={handleOpenModal}>
            <BiArchive className={Styles["icon"]} />
            <span className={Styles["text"]}>
              <br></br>Detalles
            </span>
          </button>
        </p>
      </li>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showModal && <UserDetails id={id} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default User;

