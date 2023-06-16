
import Providers from "@/redux/provider/Provider"
import style from "./styles/About/About.module.css"


const About = () => {
    return (
        <div className={style.container1}>
            <h2 className={style.letras}>
                Nuestro proyecto es una plataforma de comercio electrónico innovadora diseñada para el dinámico mercado de América Latina.
                Ofrecemos un mercado virtual donde los administradores supervisan las operaciones comerciales, y los usuarios pueden explorar
                una amplia gama de productos, reseñas y calificaciones. Nuestra plataforma permite a los usuarios agregar fácilmente
                los productos deseados al carrito de compras, brindando una experiencia de compra fluida y conveniente. Además, ofrecemos
                códigos de descuento exclusivos para productos seleccionados, permitiendo a los usuarios ahorrar en sus compras.
                Nuestro sistema incluye filtros intuitivos por categoría, que facilitan la búsqueda de productos según las preferencias de los usuarios.
                También ofrecemos filtros por país, permitiendo a los usuarios encontrar productos disponibles en sus respectivos países. En resumen,
                nuestra plataforma de comercio electrónico para América Latina combina los roles de administradores y usuarios, y ofrece
                características como reseñas de productos, calificaciones, códigos de descuento y opciones de filtrado exhaustivas.
                Nuestro objetivo es revolucionar el comercio electrónico en América Latina y transformar la experiencia de compra en línea.
            </h2>
        </div>
    )
}



export default About;
