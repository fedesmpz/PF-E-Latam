import { Link } from "react-router-dom";
import React, { useState } from "react";
import styles from "./Styles/NavbarPage.module.css";
import Style from "./Styles/NavBar.module.css";


const NavbarPage = () => {

  

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
      </nav>
    </header>
  );
};

export default NavbarPage;
