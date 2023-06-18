import Link from "next/link";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Styles from "./Styles/NavBar.module.css";
import { axiosAllProductsByCountries } from "../../redux/slice/productSlice";
import Image from "next/image"; 


const NavBar = () => {
  const dispatch = useDispatch()

  const productsCountry = useSelector((state) => state.products.country);

  function handleSearch(event) {
    console.log(event.target.value)
  }
  
  function handleFilterByCountry(event) {
      dispatch(axiosAllProductsByCountries(event.target.value));
  }

  return (
    <div className={Styles.navbar}>
      <div className={Styles.leftContainer}>
        <Link className={Styles.logo} href="/" ><div className={Styles.logoContainer}>
        <Image
          className={Styles.logoE}
          src="/assets/e-world.png"
          width={100}
          height={100}
          alt="Animación1"
        />
        <Image
          className={Styles.logoLam}
          src="/assets/latam-store.png"
          width={100}
          height={100}
          alt="Animación2"
        />
        </div></Link>
        
        {/* Esto va a ser reemplazado por el componente de fede donde renderiza las banderitas */}
        <div className={Styles.flags}>
          <select value={productsCountry} onChange={handleFilterByCountry}>
            <option value="ARG">ARG</option>
            <option value="COL">COL</option>
            <option value="MEX">MEX</option>
          </select>
        </div>

        <div className={Styles.searchBar}>
          <input type="search" placeholder="Que buscas hoy?" onChange={handleSearch}></input>
        </div>
      </div>

      
     
      <div className={Styles.rightContainer}>
        <Link className={Styles.button} href="/CreateProduct">New</Link>
        <button className={Styles.button}>Login</button>
      </div>
    </div>
  );
};

export default NavBar;