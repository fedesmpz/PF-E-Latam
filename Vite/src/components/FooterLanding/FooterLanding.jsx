import { Link, Navigate } from "react-router-dom";
import styles from "./Footerlanding.module.css";
import ModalComoComprar from "../ModalComoComprar/ModalComoComprar"
import ModalInfoSends from "../ModalInfoSends/ModalInfoSends"
import ModalPolitics from "../ModalPolitics/ModalPolitics";
import ModalLogin from "../ModalLogin/ModalLogin.jsx"
import styles2 from "../NavBar/NavBar.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



const FooterLanding = () => {
    return (
        <section className={styles["sec-footer-cta"]}>
            <div className={styles["footer-cta"]}>
                <div className={styles["footer-text"]}>
                    <h5 className={styles["cta-title"]}>
                        <Link className={styles2.logo} to="/">
                            <div className={styles2.logoContainer}>
                                <img
                                    className={styles2.logoE}
                                    src="assets/e-world.png"
                                    width={100}
                                    height={100}
                                    alt="Animación1"
                                />
                                <img
                                    className={styles2.logoLam}
                                    src="assets/latam-store.png"
                                    width={100}
                                    height={100}
                                    alt="Animación2"
                                />
                            </div>
                        </Link>
                        <br /><br /></h5>
                    <p className={styles["cta-description"]}>
                        e-Latam - La Mejor Tienda de Tecnología en Latinoamerica.
                    </p>
                    <h6 className={styles["cta-title"]}>Conoce más de nosotros en:</h6>
                    <p className={styles["cta-description"]}>
                        <a className={styles.icon} href="https://github.com/fedesmpz/PF-E-Latam" target="_blank" rel="noopener noreferrer">
                            <span >
                                <i class="bi bi-github"></i></span>
                        </a>
                        <a className={styles.icon} href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                            <span>
                                <i class="bi bi-facebook"></i></span>
                        </a>
                        <a className={styles.icon} href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            <span>
                                <i class="bi bi-instagram"></i></span>
                        </a>
                    </p>
                </div>
            </div>


            <div className={styles["footer-cta"]}>
                <div className={styles["footer-text d-flex flex-column"]}>
                    <h6 className={styles["cta-title"]}>Enlaces Rápidos<br /><br /></h6>
                    <div className={`d-flex flex-column align-items-start`}>
                        <Link className={styles.link} to="/Home">
                            <span>Home</span>
                        </Link>
                        {/* <ModalInfoSends />
                        <ModalComoComprar />
                        <ModalPolitics />
                        <Link className={styles.link} to="/Home">
                            <span>Contáctenos</span>
                        </Link> */}
                        <Link className={styles.link} to="/About">
                            <span>About</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles["footer-cta"]}>
                <div className={styles["footer-text"]}>
                    <h4 className={styles["cta-title"]}>Equipo de Desarrollo <br /><br /></h4>

                    <div className={styles["container-names"]}>
                        <a className={styles.link} href="https://www.linkedin.com/in/violetasolariashours/" target="_blank" rel="noopener noreferrer">
                            <span className={styles["cta-description"]}> <span className={styles['icon-sm']}>
                                <i className="bi bi-linkedin"></i> </span>Arias Hours, Violeta Sol.<br /></span>
                        </a>
                        <a className={styles.link} href="https://www.linkedin.com/in/demian-cortés-a8362525b/" target="_blank" rel="noopener noreferrer">
                            <span className={styles["cta-description"]}> <span className={styles['icon-sm']}>
                                <i className="bi bi-linkedin"></i> </span>Demian Cortes.<br /></span>
                        </a>
                        <a className={styles.link} href="https://www.linkedin.com/in/victoria-barrientos/" target="_blank" rel="noopener noreferrer">
                            <span className={styles["cta-description"]}> <span className={styles['icon-sm']}>
                                <i className="bi bi-linkedin"></i> </span>Victoria Barrientos.<br /></span>
                        </a>
                        <a className={styles.link} href="https://www.linkedin.com/in/juan-pablo-osudar-00661821b/" target="_blank" rel="noopener noreferrer">
                            <span className={styles["cta-description"]}> <span className={styles['icon-sm']}>
                                <i className="bi bi-linkedin"></i> </span>Juan Pablo Osudar.<br /></span>
                        </a>
                        <a className={styles.link} href="https://www.linkedin.com/in/fedesmpz/" target="_blank" rel="noopener noreferrer">
                            <span className={styles["cta-description"]}> <span className={styles['icon-sm']}>
                                <i className="bi bi-linkedin"></i> </span>Federico Pezzutti.<br /></span>
                        </a>
                        <a className={styles.link} href="https://www.linkedin.com/in/camilo-acevedo/" target="_blank" rel="noopener noreferrer">
                            <span className={styles.ctaDescription}>
                                <span className={styles.iconSm}><i className="bi bi-linkedin"></i> </span> Camilo Acevedo.<br /></span>
                        </a>
                        <a className={styles.link} href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                            <span className={styles["cta-description"]}> <span className={styles['icon-sm']}>
                                <i className="bi bi-linkedin"></i> </span>Cristian Rodriguez.<br /></span>
                        </a>
                        <a className={styles.link} href="https://www.linkedin.com/feed/">
                            <span className={styles["cta-description"]}>
                                <span className={styles['icon-sm']}>
                                    <i className="bi bi-linkedin"></i> </span>Gabriel Yopasa.<br /><br /></span>
                        </a>
                    </div>

                </div>
            </div>

            {/* <div className={styles["footer-cta"]}>
        <div className={styles["footer-text"]}>
        <p className={styles.link}>
            <p className={styles["cta-description"]}>Ingresa a Nuestra Tienda<br/><ModalLogin/><br/></p>
        </p>
            <d1 className={styles["cta-title"]}>
                Para recibir ofertas y los mejores productos
            </d1>
        </div>
    </div> */}
        </section>
    );
};

export default FooterLanding;
