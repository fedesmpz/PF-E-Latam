
import { Link, useNavigate  } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Styles from "./NavbarAdmin.module.css"
import { CartContext } from "../../utils/CartContext";
import { loginUserLocal, logoutUser } from '../../redux/slice/userSlice';



const NavBar = () => {
  const { cart } = useContext(
    CartContext
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) =>  state.user.userData);
  const [productsInCart, setProductsInCart] = useState(6);
  const [notifications, setNotifications] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(userData.access);

  useEffect(() => {
    dispatch(loginUserLocal())
  }, [])

  useEffect(() => {

    if (userData.access) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

  }, [userData.access]);


  const handlerLogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }


  const totalProducts = () => {
    let countAux = 0
    if (cart?.length > 0) {
      cart.forEach((product) => {
        setProductsInCart((countAux += product.quantity));
      });
      setNotifications(true)
    } else {
      setNotifications(false)
    }
    setProductsInCart(countAux);
  };

  useEffect(() => {
    totalProducts();
  }, [cart])

  const handlerProfile = () =>{
    navigate('/Profile')
  }

  return (
    <div className={Styles.navbar}>
      <div className={Styles.leftContainer}>
        <Link className={Styles.logo} to="/Home">
          <div className={Styles.logoContainer}>
            <img
              className={Styles.logoE}
              src="/assets/e-world.png"
              width={100}
              height={100}
              alt="Animación1"
            />
            <img
              className={Styles.logoLam}
              src="/assets/latam-store.png"
              width={100}
              height={100}
              alt="Animación2"
            />
          </div>
        </Link>
      </div>
      <div className={Styles.rightContainer}>
        {!userData.isAdmin && (
                  <div className={Styles.cartContainer}>
                  {notifications &&
                    <div className={Styles.productsNumber}>
                      <span>{productsInCart}</span>
                    </div>
                  }
                  <Link className={Styles.cartButton} to="/Cart" >
                    <img
                      className={Styles.iconCarrito}
                      src="/assets/CarritoVioleta.png"
                      width={100}
                      height={100}
                      alt="cart_icon"
                    />
                  </Link>
                </div>
        )}
        {userData.access === true && userData.isAdmin &&
           <>
              <Link className={Styles.button} to="/Home">Home</Link>
           </>
        }
        {isLoggedIn? 
         (
          <div className={Styles.cartContainer}>
            <div>
              <button className={Styles.button} onClick={handlerProfile}>Perfil</button>
  
            </div>
            <div>
              <button className={Styles.button} onClick={handlerLogout}>Logout</button>
  
            </div>
          </div>
          
          ) :
          (<div className={Styles.cartContainer}>
            <div>
              <ModalSignIn/>  
            </div>
            <div>
              <ModalLogin/>
            </div>
          </div>)
        }
      </div>
    </div>
  );
};

export default NavBar;
