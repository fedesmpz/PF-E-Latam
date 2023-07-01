import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import NavItem from "../NavItem/NavItem";
import ModalLogin from "../ModalLogin/ModalLogin"
import ModalSignIn from "../ModalSignIn/ModalSingIn"
import styles from "./NavbarPage.module.css";
import Style from "../NavBar/NavBar.module.css";
import { loginUserLocal, logoutUser } from '../../redux/slice/userSlice';
import Button from 'react-bootstrap/Button';

const MENU_LIST = [
  { text: "Home", href: "/Home" },
  { text: "¿Porqué e-Latam?", href: "/contact" },
  { text: "Soluciones", href: "/contact" },
];
const NavbarPage = () => {

  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const userData = useSelector((state) =>  state.user.userData);
  const [isLoggedIn, setIsLoggedIn] = useState(userData.access);
  const dispatch = useDispatch();
  const navigate =useNavigate()


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

  const handlerLogout = async () => {
    await dispatch(logoutUser())
  }
  
  const handlerProfile = () =>{
    navigate('/Profile')
  }




  return (
    <header className={styles.header}>
      <nav className={styles.navv}>
        <Link className={Style.logo} to="/">
          <div className={Style.logoContainer}>
            <img
              className={Style.logoE}
              src="/assets/e-world.png"
              width={100}
              height={100}
              alt="Animación1"
            />
            <img
              className={Style.logoLam}
              src="/assets/latam-store.png"
              width={100}
              height={100}
              alt="Animación2"
            />
          </div>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={classnames(styles["nav__menu-bar"], {
            [styles.active]: navActive,
          })}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div
          className={classnames(styles["nav__menu-list"], {
            [styles.active]: navActive,
          })}
        >
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem
                active={activeIdx === idx}
                text={menu.text}
                href={menu.href}
              />
            </div>
          ))}
        {isLoggedIn ? 
        (<div>
          <Button onClick={handlerProfile}>Perfil</Button>
          <Button onClick={handlerLogout}>Logout</Button>
        </div>
        ) : 
        (
          <div>
            <ModalSignIn/>
            <ModalLogin/>
          </div>
        )}
        </div>
      </nav>
    </header>
  );
};

export default NavbarPage;
