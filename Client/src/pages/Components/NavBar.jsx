import React from "react";
import Link from "next/link";
import Styles from "./Styles/NavBar.module.css";

const NavBar = () => {
  return (
    <div className={Styles.navbar}>
      <div className={Styles.leftContainer}>
        <Link className={Styles.logo} href="/" >e-Latam</Link>


        {/* Esto va a ser reemplazado por el componente de fede donde renderiza las banderitas */}
        <div className={Styles.flags}>
          <select>
            <option value="en">ARG</option>
            <option value="es">COL</option>
            <option value="es">MEX</option>
          </select>
        </div>
      </div>

    {/* Aca iria la searchBar imaginaria q no se donde quedo.. */}
      {/* <div className={Styles["search-bar"]}>
        <input type="text" placeholder="Search..." />
      </div> */}

      <div className={Styles.rightContainer}>
        <Link className={Styles.button} href="/CreateProduct">New</Link>
        <button className={Styles.button}>Login</button>
      </div>
    </div>
  );
};

export default NavBar;
