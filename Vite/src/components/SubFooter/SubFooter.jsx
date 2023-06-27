import styles from "./SubFooter.module.css"
// import About from "../About"

const SubFooter = () => {
    return (
        <div>
            {/* <div className={styles.about}>
            <Link  to="/About"> About </Link> 
            </div> */}
            <div className={styles.containerSubFooter}>
                <h6>&copy; 2023 e-Latam. Todos los derechos reservados.</h6>
                <h6>¿Necesita ayuda? Contactenos: e.latam.henry@gmail.com</h6>
            </div>
        </div>
    )
}

export default SubFooter;