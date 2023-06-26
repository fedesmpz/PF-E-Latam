import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from "../FooterLanding/Footerlanding.module.css"

function ModalComoComprar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
    <>
    <Button className={style.link} variant="btn btn-link" onClick={handleShow}>
        Cómo Comprar
    </Button>

    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!Woohoo, you are reading this text in a modal!Woohoo, you are reading this text in a modal!Woohoo, you are reading this text in a modal!Woohoo, you are reading<br/>INSTRUCIONES PARA COMPRAR ETC... BLABLA</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
    </>
    );
}

export default ModalComoComprar;