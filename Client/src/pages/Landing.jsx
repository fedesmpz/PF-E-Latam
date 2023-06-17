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
            <section class="sec-home">
        <div class="home-cta"> 
            <h1 class="home-title display-1">Llegó la hora de comprar online</h1>
            <p class="home-description">Regístrate de forma ágil y optimiza tu tiempo y dinero con la plataforma líder de Latinoamérica</p>
            <div class="lead-magnet row align-items-center ">
                <div class="col">
                    <input type="text" class="form-control" placeholder="Email address"/>
                </div>
                <div class="col">
                    <button class="btn-main">Regístrate</button>
                </div>
            </div>
        </div>
        <div class="home-img d-none d-md-block">
            {/* imagen */}
        </div>
    </section>

    <section class="sec-benefits">
      <div class="intro">
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



      <section class="sec-video row">
    <video autoPlay muted loop>
  <source src="/video/cargando2.mp4" type="video/mp4" />
  Tu navegador no admite el elemento de video.
</video>
    </section>



      
            <section class="sec-kpis row">

<div class="kpi col-md">
  <span class="number h3">$547M</span>
  <span class="desc">En compras de nuestros clientes</span>
</div>

<div class="kpi col-md">
  <span class="number h3">+ 750</span>
  <span class="desc">Productos Ofrecidos</span>
</div>

<div class="kpi col-md">
  <span class="number h3">89+M</span>
  <span class="desc">Usuarios Registrados</span>
</div>


</section>
            <CommentsUsers/>
            <section class="sec-benefits">
      <div class="intro">
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
