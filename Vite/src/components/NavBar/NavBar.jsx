import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Styles from "../NavBar/NavBar.module.css";
import { axiosAllProductsByCountries, axiosSearchProduct } from "../../redux/slice/productSlice";
import Select from 'react-select'
import { CartContext } from "../../utils/CartContext";
import ModalLogin from "../ModalLogin/ModalLogin"
import ModalSignIn from "../ModalSignIn/ModalSingIn"
import { loginUserLocal, logoutUser } from '../../redux/slice/userSlice';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

const NavBar = () => {
  const { cart } = useContext(
    CartContext
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsCountry = useSelector((state) => state.products.country);
  const userData = useSelector((state) =>  state.user.userData);
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('ARG');
  const [showModal, setShowModal] = useState(false);
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

  const options = [
    { value: 'ARG', /* label: ' Argentina' */ img: 'https://flagcdn.com/w20/ar.png' },
    { value: 'COL', /* label: ' Colombia' */ img: 'https://flagcdn.com/w20/co.png' },
    { value: 'MEX', /* label: ' México' */ img: 'https://flagcdn.com/w20/mx.png' },
  ];

  function handleSearch(event) {
    setTitle(event.target.value);
  }

  const handlerLogout = async () => {
    await dispatch(logoutUser())
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

  const handlerClick = async () => {
    if (title.trim() === '') {
      setShowModal(true);
    } else {
      let selectedCountry = '';

      if (country === 'ARG') {
        selectedCountry = 'Argentina';
      } else if (country === 'COL') {
        selectedCountry = 'Colombia';
      } else if (country === 'MEX') {
        selectedCountry = 'Mexico';
      }

      try {
        await dispatch(axiosSearchProduct(title, selectedCountry));
        setTitle('')

      } catch (error) {
        setShowModal(true)
        setTitle('');
      }
    }
  };

  function handleFilterByCountry(event) {
    const selectedValue = event.value;
    setCountry(selectedValue);
    dispatch(axiosAllProductsByCountries(selectedValue));
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlerProfile = () =>{
    navigate('/Profile')
  }

  const handlerSales = () =>{
    navigate('/mysales')
  }

  const handlerReview = () =>{
    navigate('/myreviews')
  }


  return (
    <div className={Styles.navbar}>
      <div className={Styles.leftContainer}>
        {
          location.pathname === "/Home" && 
          <Link className={Styles.logo} to="/">
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
        }
        {
          location.pathname !== "/Home" &&
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
        }

        {location.pathname === "/Home" && <div className={Styles.flags}>
          <Select
            options={options}
            value={options.find(option => option.value === country)}
            onChange={handleFilterByCountry}
            isSearchable={false}
            getOptionLabel={option => (
              <div>
                <img src={option.img} alt={option.label} className={Styles.flagIcon} />
                {option.label}
              </div>
            )}
            getOptionValue={option => option.value}
          />
        </div>
        }


        {showModal && (
          <div className={Styles.modal}>
            <div className={Styles.modalContent}>
              <h2>Error de búsqueda</h2>
              <p>Por favor, ingresa algún dato válido para realizar la búsqueda.</p>
              <button className={Styles.closeButton} onClick={handleCloseModal}>Cerrar</button>
            </div>
          </div>
        )}

        {location.pathname === "/Home" &&
          <div className={Styles.searchBar}>
            <input type="search" placeholder="¿Qué buscas hoy?" value={title} onChange={handleSearch} />
            <button onClick={handlerClick} className={Styles.button}>Buscar</button>
          </div>
        }
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
      {
        !isLoggedIn &&
        <div>
          <ModalSignIn/>
          <ModalLogin/>
        </div>
      }
            {isLoggedIn &&
        (
        <div className={Styles.profileButtonContainer}>
          <div className={Styles.buttonCenter}>         
              {
                userData.access && userData.profile_picture &&
                <>
                    <button className={Styles.roundButton}>
                    <img className={Styles.profileImg} src={userData.profile_picture}alt="Perfil"></img>
                    </button>                  
                </>     
              }
              {  userData.access && userData.name && <>

                <Dropdown className={Styles.dropdownNav} as={ButtonGroup}>
                    <p className={Styles.profileButton}>{userData.name}</p>
                    <Dropdown.Toggle className={Styles.dropdownNav} split />
                    <Dropdown.Menu>
                    {userData.access === true && userData.isAdmin &&
                      <>
                          <Dropdown.Item><Link className={Styles.button} to="/DashboardAdmin">Panel de administrador</Link></Dropdown.Item>
                      </>
                    }
                    <Dropdown.Item><button className={Styles.button} onClick={handlerProfile}>Perfil de usuario</button></Dropdown.Item>
                    <Dropdown.Item><button className={Styles.button} onClick={handlerSales}>Mis Compras</button></Dropdown.Item>
                    <Dropdown.Item><button className={Styles.button} onClick={handlerReview}>Mis Reseñas</button></Dropdown.Item>
                    <Dropdown.Item><button className={Styles.button} onClick={handlerLogout}>Cerrar sesión</button></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
              </>
              }
            
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
