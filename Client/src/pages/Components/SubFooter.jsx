import Link from "next/link"
import styles from "./styles/Landing/Landing.module.css"
const SubFooter = () => {
    return (
        <div>
                <footer className={`${styles['footer']}`}>
                <div className={`${styles['container']}`}>
                    <p>&copy; 2023 e-Latam. Todos los derechos reservados.</p>
                </div>
                </footer>
        </div>
    )
}

export default SubFooter;