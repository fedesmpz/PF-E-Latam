import style from "./About.module.css"
import { useRef } from "react";

const About = () => {
    const allRef = useRef(null);
    const handleVickyClickGh = () => {
        window.location.href = "https://github.com/Victoria-Barrientos";
      };
    const handleJuampiClickGh = () => {
        window.location.href = "https://github.com/parzybaal";
      };
    const handleFedeClickGh = () => {
        window.location.href = "https://github.com/fedesmpz";
      };
    const handleCristianClickGh = () => {
        window.location.href = "https://github.com/CristianR1992";
      };
    const handleDemianClickGh = () => {
        window.location.href = "https://github.com/DemianCortes1250";
      };
    const handleCamiloClickGh = () => {
        window.location.href = "https://github.com/camilobit";
      };
    const handleVioleClickGh = () => {
        window.location.href = "https://github.com/VioleHours";
      };
    const handleGaboClickGh = () => {
        window.location.href = "https://github.com/GaboYopasa";
      };
    const handleVickyClickLk = () => {
        window.location.href = "https://www.linkedin.com/in/victoria-barrientos/";
      };
    const handleJuampiClickLk = () => {
        window.location.href = "https://www.linkedin.com/in/juan-pablo-osudar-00661821b/";
      };
    const handleFedeClickLk = () => {
        window.location.href = "https://www.linkedin.com/in/fedesmpz/";
      };
    const handleCristianClickLk = () => {
        window.location.href = "https://www.linkedin.com/in/cristian-rodriguez-a970b1276/";
      };
    const handleDemianClickLk = () => {
        window.location.href = "https://www.linkedin.com/in/demian-cortés-a8362525b/";
      };
    const handleCamiloClickLk = () => {
        window.location.href = "https://www.linkedin.com/in/camilo-acevedo/";
      };
    const handleVioleClickLk = () => {
        window.location.href = "https://www.linkedin.com/in/violetasolariashours/";
      };
    const handleGaboClickLk = () => {
        window.location.href = "https://www.linkedin.com/in/gabriel-yopasa-angulo-208665265/";
      };

    return (
        <div>
            <div className={style.container1}>
                <h3 className={style.titulo}>Sobre nosotros</h3>
                <div>
                    <h4 className={style.letras}>           
                    Somos una plataforma de comercio electrónico innovadora para América Latina. 
                    Ofrecemos un mercado virtual con administradores supervisando las operaciones
                    y usuarios explorando una amplia gama de productos con reseñas y calificaciones.
                    Nuestra plataforma permite agregar fácilmente productos al carrito, brindando una
                    experiencia de compra fluida. Nuestro objetivo es revolucionar el 
                    comercio electrónico en América Latina y transformar la experiencia de compra en línea.
                    </h4>
                </div>
                <div>
                    <div className={style.vicky} ref={allRef}>
                        <div className={style.info}>
                            <img className={style.logos} onClick={handleVickyClickGh} src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30px" height="30px"/>
                            <img className={style.logos} onClick={handleVickyClickLk} src="https://e7.pngegg.com/pngimages/342/689/png-clipart-linkedin-logo-icon-others-blue-text-thumbnail.png" width="30px" height="30px" />
                            <h6>Victoria Barrientos</h6>
                            <h6>viictoriabarrientos@gmail.com</h6>
                        </div>
                    </div>
                    <div className={style.juampi} ref={allRef}>
                        <div className={style.info}>
                            <img className={style.logos} onClick={handleJuampiClickGh} src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30px" height="30px" />
                            <img className={style.logos} onClick={handleJuampiClickLk} src="https://e7.pngegg.com/pngimages/342/689/png-clipart-linkedin-logo-icon-others-blue-text-thumbnail.png" width="30px" height="30px" />    
                            <h6>Juan Pablo Osudar</h6>
                            <h6>juampi.parzybal@gmail.com</h6>
                        </div>
                    </div>
                    <div className={style.fede} ref={allRef}>
                        <div className={style.info}>
                            <img className={style.logos} onClick={handleFedeClickGh} src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30px" height="30px" />
                            <img className={style.logos} onClick={handleFedeClickLk} src="https://e7.pngegg.com/pngimages/342/689/png-clipart-linkedin-logo-icon-others-blue-text-thumbnail.png" width="30px" height="30px" />
                            <h6>Federico Pezzutti</h6>
                            <h6>fede.mpz@gmail.com</h6>
                        </div>
                    </div>
                    <div className={style.cristian} ref={allRef} >
                        <div className={style.info}>
                            <img className={style.logos} onClick={handleCristianClickGh} src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30px" height="30px" />
                            <img className={style.logos} onClick={handleCristianClickLk} src="https://e7.pngegg.com/pngimages/342/689/png-clipart-linkedin-logo-icon-others-blue-text-thumbnail.png" width="30px" height="30px" />
                            <h6>Cristian Rodriguez</h6>
                            <h6>rodriguez.cristianezequiel@hotmail.com</h6>
                        </div>
                    </div>
                    <div className={style.camilo} ref={allRef}>
                        <div className={style.info}>
                            <img className={style.logos} onClick={handleCamiloClickGh} src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30px" height="30px" />
                            <img className={style.logos} onClick={handleCamiloClickLk} src="https://e7.pngegg.com/pngimages/342/689/png-clipart-linkedin-logo-icon-others-blue-text-thumbnail.png" width="30px" height="30px" />
                            <h6>Camilo Acevedo</h6>
                            <h6>portafoliodigital.col@gmail.com</h6>
                        </div>
                    </div>
                    <div className={style.demian} ref={allRef}>
                        <div className={style.info}>
                            <img className={style.logos} onClick={handleDemianClickGh} src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30px" height="30px" />
                            <img className={style.logos} onClick={handleDemianClickLk} src="https://e7.pngegg.com/pngimages/342/689/png-clipart-linkedin-logo-icon-others-blue-text-thumbnail.png" width="30px" height="30px" />
                            <h6>Demian Cortes</h6>
                            <h6>demiancmusic@gmail.com</h6>
                        </div>
                    </div>
                    <div className={style.viole} ref={allRef}>
                        <div className={style.info}>
                            <img className={style.logos} onClick={handleVioleClickGh} src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30px" height="30px" />
                            <img className={style.logos} onClick={handleVioleClickLk} src="https://e7.pngegg.com/pngimages/342/689/png-clipart-linkedin-logo-icon-others-blue-text-thumbnail.png" width="30px" height="30px" />
                            <h6>Violeta Sol Arias Hours</h6>
                            <h6>VioleHours@gmail.com</h6>
                        </div>
                    </div>
                    <div className={style.gabo} ref={allRef}>
                        <div className={style.info}>
                            <img className={style.logos} onClick={handleGaboClickGh} src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30px" height="30px" />
                            <img className={style.logos} onClick={handleGaboClickLk} src="https://e7.pngegg.com/pngimages/342/689/png-clipart-linkedin-logo-icon-others-blue-text-thumbnail.png" width="30px" height="30px" />
                            <h6>Gabriel Yopasa Angulo</h6>
                            <h6>gyopasaa@gmail.com</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
    )
}

export default About;