import Link from "next/link"
import Providers from "@/redux/provider/Provider"
import NavbarPage from "./Components/NavbarPage"
import CarouselProducts from "./Components/CarouselProducts"
import FooterLanding from "./Components/FooterLanding"
import CommentsUsers from "./Components/CommentsUsers"
import style from "./Styles/Landing/Landing.module.css"
import classnames from "classnames";

const Landing = () => {
    return (
        <div>
            <NavbarPage/>
            <section className="sec-home">
        <div className="home-cta"> 
            <h1 className="home-title display-1">Llegó la hora de comprar online</h1>
            <p className="home-description">Regístrate de forma ágil y optimiza tu tiempo y dinero con la plataforma líder de Latinoamérica</p>
            <div className="lead-magnet row align-items-center ">
                <div className="col">
                    <input type="text" className="form-control" placeholder="Email address"/>
                </div>
                <div className="col">
                    <button className="btn-main">Regístrate</button>
                </div>
            </div>
        </div>
        <div className="home-img d-none d-md-block">
            {/* imagen */}
        </div>
    </section>

    <section className="sec-benefits">
      <div className="intro">
        <h3>Los más vendidos</h3>
        <p>Fíjate que tenemos promos exclusivas</p>
      </div>
      </section>
            <CarouselProducts/>







    





            <section className={classnames(style.secFeatures, style.secBenefits)}>
        <div className={style.intro}>
          <h3>¿Por qué comprar con nosotros?</h3>
          <p>
            Nosotros hemos creado el mejor sitio para que realices tus compras de forma segura y rápida.
          </p>
        </div>
        <div className={style.features}>
          <div className={classnames(style.text, style.feature)}>
            <span className={style.iconSm}>
              <i className="bi bi-graph-up"></i>
            </span>
            <div className={style.description}>
              <h4 className={style.descriptionTitle}>Compras seguras</h4>
              <p className={style.descriptionText}>
                Te garantizamos la calidad de nuestros Productos
              </p>
            </div>
          </div>
          <div className={classnames(style.text, style.feature)}>
            <span className={style.iconSm}>
              <i className="bi bi-calendar"></i>
            </span>
            <div className={style.description}>
              <h4 className={style.descriptionTitle}>Tiempos de entrega record</h4>
              <p className={style.descriptionText}>
                No sufras por el calendario, tenemos socios logísticos que te brindarán la mejor experiencia de transporte de tus productos.
              </p>
            </div>
          </div>
          <div className={classnames(style.text, style.feature)}>
            <span className={style.iconSm}>
              <i className="bi bi-phone"></i>
            </span>
            <div className={style.description}>
              <h4 className={style.descriptionTitle}>Servicio 24/7</h4>
              <p className={style.descriptionText}>
                Gestiona tus compras con nuestra ayuda en cualquier momento.
              </p>
            </div>
          </div>
        </div>
        <div className={classnames(style.features, style.image, "d-none", "d-md-block")}>
          <img src="./Components/multimedia/images/flag_of_Colombiaok.png" alt="chart" />
        </div>
      </section>



      <section className="sec-video row">
    <video autoPlay muted loop>
  <source src="/video/videopc.mp4" type="video/mp4" />
  Tu navegador no admite el elemento de video.
</video>
    </section>



      
            <section className="sec-kpis row">

<div className="kpi col-md">
  <span className="number h3">$547M</span>
  <span className="desc">En compras de nuestros clientes</span>
</div>

<div className="kpi col-md">
  <span className="number h3">+ 750</span>
  <span className="desc">Productos Ofrecidos</span>
</div>

<div className="kpi col-md">
  <span className="number h3">89+M</span>
  <span className="desc">Usuarios Registrados</span>
</div>


</section>
            <CommentsUsers/>
            <section className="sec-benefits">
      <div className="intro">
        <h3>Productos al mejor precio PROMOCIONES</h3>
        <p>Apúrate que se van a acabar</p>
      </div>
      </section>
            <CarouselProducts/>
            <FooterLanding/>
        </div>
    )
}

const LandingWithProvider = () => {
    return (
        <Providers>
            <Landing/>
        </Providers>
    );
};


export default LandingWithProvider;
