import Link from "next/link";
import React, { useState } from "react";
import classnames from "classnames";
import NavItem from "./NavItem";
import ModalLogin from "./ModalLogin"
import ModalSignIn from "./ModalSingIn"
import styles from "./Styles/NavbarPage.module.css";
import Style from "./Styles/NavBar.module.css";
import Image from "next/image";
import DarkMode from "./DarkMode";

const MENU_LIST = [
  { text: "Home", href: "/Home" },
  { text: "¿Porqué e-Latam?", href: "/contact" },
  { text: "Soluciones", href: "/contact" },
];
const NavbarPage = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header className={styles.header}>
      <nav className={styles.navv}>
        <DarkMode />
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
          <ModalSignIn />
          <ModalLogin />
        </div>
      </nav>
    </header>
  );
};

export default NavbarPage;
