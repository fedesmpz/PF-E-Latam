import Link from "next/link";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Styles from "./Styles/NavBar.module.css";
import { axiosAllProductsByCountries } from "../../redux/slice/productSlice";


const NavBar = () => {
  const dispatch = useDispatch()

  const productsCountry = useSelector((state) => state.products.country);
  
  function handleFilterByCountry(event) {
      dispatch(axiosAllProductsByCountries(event.target.value));
  }

  return (
    <div className={Styles.navbar}>
      <div className={Styles.leftContainer}>
        <Link className={Styles.logo} href="/" >e-Latam</Link>


        {/* Esto va a ser reemplazado por el componente de fede donde renderiza las banderitas */}
        <div className={Styles.flags}>
          <select value={productsCountry} onChange={handleFilterByCountry}>
            <option value="ARG">ARG</option>
            <option value="COL">COL</option>
            <option value="MEX">MEX</option>
          </select>
        </div>
      </div>

      <p>Inserte searchBar</p>
    {/* Aca iria la searchBar imaginaria q no se donde quedo.. */}
     
      <div className={Styles.rightContainer}>
        <Link className={Styles.button} href="/CreateProduct">New</Link>
        <button className={Styles.button}>Login</button>
      </div>
    </div>
  );
};

export default NavBar;