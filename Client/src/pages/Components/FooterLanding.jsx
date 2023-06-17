import Link from "next/link";
import styles from "./Styles/Footerlanding.module.css";
import ModalComoComprar from "./ModalComoComprar";
import ModalInfoSends from "./ModalInfoSends";
import ModalPolitics from "./ModalPolitics";
import ModalLogin from "./ModalLogin"

const FooterLanding = () => {
    return (
    <section className={styles["sec-footer-cta"]}>
    <div className={styles["footer-cta"]}>
        <div className={styles["footer-text"]}>
        <p className={styles["cta-description"]}>
            e-Latam - La Mejor Tienda de Tecnología en Latinoamerica.
        </p>
        <h5 className={styles["cta-title"]}>e-Latam logo<br/><br/></h5>
        <h6 className={styles["cta-title"]}>Conoce más de nosotros en:</h6>
        <p className={styles["cta-description"]}>iconos github</p>
        </div>
    </div>
    <div className={styles["footer-cta"]}>
    <div className={styles["footer-text d-flex flex-column"]}>
        <h6 className={styles["cta-title"]}>Enlaces Rápidos<br/><br/></h6>
        <div className="d-flex flex-column align-items-start">
        <Link className={styles.link} href="/Home">
            <span>Home</span>
        </Link>
        <ModalInfoSends/>
        <ModalComoComprar/>
        <ModalPolitics/>
        <Link className={styles.link} href="/Home">
            <span>Contáctenos</span>
        </Link>
        </div>
    </div>
    </div>

    <div className={styles["footer-cta"]}>
        <div className={styles["footer-text"]}>
            <h4 className={styles["cta-title"]}>Equipo de Desarrollo <br/><br/></h4>

            <div className={styles["container-names"]}>
            <Link className={styles.link} href="/Home">
                <span className={styles["cta-description"]}>Arias Hours, Violeta Sol.<br/></span>
            </Link>
            <Link className={styles.link} href="/Home">
                <span className={styles["cta-description"]}>Demian Cortes.<br/></span>
            </Link>
            <Link className={styles.link} href="/Home">
                <span className={styles["cta-description"]}>Victoria Barrientos.<br/></span>
            </Link>
            <Link className={styles.link} href="/Home">
                <span className={styles["cta-description"]}>Juan Pablo Osudar.<br/></span>
            </Link>
            <Link className={styles.link} href="/Home">
                <span className={styles["cta-description"]}>Federico Pezzutti.<br/></span>
            </Link>
            <Link className={styles.link} href="/Home">
                <span className={styles["cta-description"]}>Camilo Acevedo.<br/></span>
            </Link>
            <Link className={styles.link} href="/Home">
            <span className={styles["cta-description"]}>Cristian Rodriguez.<br/></span>
            </Link>
            <Link className={styles.link} href="/Home">
                <span className={styles["cta-description"]}>Gabriel Yopasa.<br/> <br/></span>
            </Link>
            <Link className={styles.link} href="/Home">
                <p className={styles["cta-description"]}>About</p>
            </Link>
            </div>

        </div>
    </div>

    <div className={styles["footer-cta"]}>
        <div className={styles["footer-text"]}>
        <p className={styles.link}>
            <p className={styles["cta-description"]}>Ingresa a Nuestra Tienda<br/><ModalLogin/><br/></p>
        </p>
            <d1 className={styles["cta-title"]}>
                Para recibir ofertas y los mejores productos
            </d1>
        </div>
    </div>
    </section>
    );
};

export default FooterLanding;
