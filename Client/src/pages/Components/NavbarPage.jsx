import Link from "next/link";
import React, { useState } from "react";
import classnames from "classnames";
import NavItem from "./NavItem";
import ModalLogin from "./ModalLogin"
import ModalSignIn from "./ModalSingIn"
import styles from "./Styles/NavbarPage.module.css";
//import Image from "next/image";
//import Logo from "./Logo";

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
        <Link href="/" className={styles.link}>
          <p className={styles.logo}>logo e-Latam</p>
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
          className={classnames(styles["nav__menu-list"],{
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
          <ModalSignIn/>
          <ModalLogin/>
        </div>
      </nav>
    </header>
  );
};

export default NavbarPage;
