import Link from "next/link";
import React, { useState } from "react";
import styles from "./Styles/NavbarPage.module.css";
import Style from "./Styles/NavBar.module.css";
import Image from "next/image";


const NavbarPage = () => {

  

  return (
    <header className={styles.header}>
      <nav className={styles.navv}>





     
      
      <Link className={Style.logo} href="/">
          <div className={Style.logoContainer}>
            <Image
              className={Style.logoE}
              src="/assets/e-world.png"
              width={100}
              height={100}
              alt="Animación1"
            />
            <Image
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
