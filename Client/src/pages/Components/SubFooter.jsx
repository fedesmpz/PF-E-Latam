import Link from "next/link"
import styles from "./Styles/SubFooter.module.css"
const SubFooter = () => {
    return (
        <div>
                <div className={styles.conteiner1}>
                    <h6>&copy; 2023 e-Latam. Todos los derechos reservados.</h6>
                </div>
                <div className={styles.conteiner2}>
                    <h6>¿Necesita ayuda? Contactenos: e.latam.henry@gmail.com</h6>
                </div>
        </div>
    )
}

export default SubFooter;