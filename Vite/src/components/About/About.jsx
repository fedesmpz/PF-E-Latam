import { Link } from "react-router-dom"
import style from "./About.module.css"
import { useContext, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loginUserLocal } from "../../redux/slice/userSlice"
import validateToken from '../../utils/validationToken'


const About = () => {

    // const userData = useSelector((state) => state.user.userData);
    // const dispatch = useDispatch();
    
    // useEffect(()=>{
    //     dispatch(loginUserLocal())
        
    // },[])
    
    // const access = userData.access
    // const admin = userData.isAdmin
    // const superAdmin = userData.isSuperAdmin


    return (
        <div>
            {/* {access && admin ? (
                <div>

                </div>
                
            
            ) : (null)} */}

                <div className={style.container1}>
            <h1 className={style.titulo}>About</h1>
            <div>
                <h2 className={style.letras}>           
                Somos una plataforma de comercio electrónico innovadora para América Latina. 
                Ofrecemos un mercado virtual con administradores supervisando las operaciones
                y usuarios explorando una amplia gama de productos con reseñas y calificaciones.
                Nuestra plataforma permite agregar fácilmente productos al carrito, brindando una
                experiencia de compra fluida. También ofrecemos códigos de descuento exclusivos y
                filtros intuitivos por categoría y país. Nuestro objetivo es revolucionar el 
                comercio electrónico en América Latina y transformar la experiencia de compra en línea.
                </h2>
                <Link to='/'>
                    <button>Back</button>
                </Link>
                </div>
            </div>
        </div>
        
    )
}



export default About;
