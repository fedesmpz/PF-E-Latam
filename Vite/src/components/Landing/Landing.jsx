import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarPage from "../NavBarPage/NavbarPage"
import NavBar from "../NavBar/NavBar";
import CarouselProducts from "../CarouselProducts/CarouselProducts"
import CarouselHero from "../CarouselImg/CarouselImg"
import FooterLanding from "../FooterLanding/FooterLanding"
import CommentsUsers from "../CommentsUsers/CommentsUsers"
import styles from "./Landing.module.css"
// import ModalSignin from "../ModalSingIn/ModalSingIn"
import LoaderLanding from "../LoaderLanding/LoaderLanding"

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2900);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  if (isLoading) {
    return (
      <LoaderLanding />
    );
  }
  return (
    <div className={styles.indexInZ} >
      <NavBar></NavBar>
      <CarouselHero />
      <section className={styles.container}>
        <div className={styles['text-container']}>
          <h1 className="display-1">Llegó la hora de comprar online</h1>
          <div className={styles.text_container_subtitle}>
            <h2 className={styles.animatedText}>e-Latam es una plataforma de comercio electrónico innovadora diseñada para el dinámico mercado de América Latina.</h2>
          </div>
          {/* <span> e-Latam es una plataforma de comercio electrónico innovadora diseñada para el dinámico mercado de América Latina. Ofrecemos un mercado virtual donde los administradores supervisan las operaciones comerciales, y los usuarios pueden explorar una amplia gama de productos, reseñas y calificaciones. Nuestra plataforma permite a los usuarios agregar fácilmente los productos deseados al carrito de compras, brindando una experiencia de compra fluida y conveniente.</span>
          <span> Además, ofrecemos códigos de descuento exclusivos para productos seleccionados, permitiendo a los usuarios ahorrar en sus compras. Nuestro sistema incluye filtros intuitivos por categoría, que facilitan la búsqueda de productos según las preferencias de los usuarios. </span> */}
          {/* <span>Regístrate de forma ágil y optimiza tu tiempo y dinero con la plataforma líder de Latinoamérica</span>
                <div className={styles['input-container']}>
                  <input type="text" placeholder="Email address" />
                                  <div className={styles['button-container']}>
                  <ModalSignin/>
                 </div>
                </div> */}

        </div>

        <div className={styles['video-container']}>
          <video autoPlay muted loop>
            <source src="videos/Landing-sechome.mp4" type="video/mp4" />
            Tu navegador no admite el elemento de video.
          </video>
        </div>
      </section>

      <section className={styles['sec-benefits']}>
        <div className={styles.intro}>
          <h2 className={styles.title}>Los más <span className={styles.bold}>vendidos</span></h2>
        </div>
      </section>

      <CarouselProducts />

      <section className={styles['sec-features']}>
        <div className={styles.intro}>
          <h2 className={styles.title}>¿Por qué comprar con<span className={styles.bold}> e-Latam</span>?</h2>
        </div>
        <div className={styles.features}>
          <div className={styles.text}>
            <div className={styles.feature}>
              <span className={styles['icon-sm']}>
                <i className="bi bi-graph-up"></i>
              </span>
              <div className={styles.description}>
                <h4 className={styles['description-title']}>Compras seguras</h4>
                <p className={styles['description-text']}>Te garantizamos la calidad de nuestros productos.</p>
              </div>
            </div>
            <div className={styles.feature}>
              <span className={styles['icon-sm']}>
                <i className="bi bi-calendar"></i>
              </span>
              <div className={styles.description}>
                <h4 className={styles['description-title']}>Tiempos de entrega récord</h4>
                <p className={styles['description-text']}>
                  No sufras por el calendario, tenemos socios logísticos que te brindarán la mejor experiencia de transporte de tus productos.
                </p>
              </div>
            </div>
            <div className={styles.feature}>
              <span className={styles['icon-sm']}>
                <i className="bi bi-phone"></i>
              </span>
              <div className={styles.description}>
                <h4 className={styles['description-title']}>Servicio 24/7</h4>
                <p className={styles['description-text']}>Gestiona tus compras con nuestra ayuda en cualquier momento.</p>
              </div>
            </div>
          </div>
          <div className={styles.image}>
            <img src="images/img_features.png" alt="chart" />
          </div>
        </div>
      </section>



      <section className={styles['sec-video']}>
        <video autoPlay muted loop>
          <source src="videos/videopc.mp4" type="video/mp4" />
          Tu navegador no admite el elemento de video.
        </video>
      </section>

      <section className={styles['sec-promotions']}>
        <div className={styles.intro}>
          <h2 className={styles.title}>Productos al mejor precio, disfruta de nuestras<span className={styles.bold}> PROMOCIONES</span></h2>
        </div>
      </section>
      <CarouselProducts />


      <section className={`${styles['sec-kpis']} row`}>
        <div className={`kpi col-md ${styles.kpi}`}>
          <span className={`number h3 ${styles.number}`}>$547M</span>
          <span className={`desc ${styles.desc}`}>En compras de nuestros clientes</span>
        </div>
        <div className={`kpi col-md ${styles.kpi}`}>
          <span className={`number h3 ${styles.number}`}>+ 500</span>
          <span className={`desc ${styles.desc}`}>Productos Ofrecidos</span>
        </div>
        <div className={`kpi col-md ${styles.kpi}`}>
          <span className={`number h3 ${styles.number}`}>89+M</span>
          <span className={`desc ${styles.desc}`}>Usuarios Registrados</span>
        </div>
      </section>
      <div>
        <CommentsUsers />
      </div>
      <div>
        <FooterLanding />
      </div>



    </div>
  )
}

export default Landing;