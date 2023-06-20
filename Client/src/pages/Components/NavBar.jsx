import Link from "next/link";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Styles from "./Styles/NavBar.module.css";
import { axiosAllProductsByCountries, axiosSearchProduct } from "../../redux/slice/productSlice";
import Image from "next/image";
import { useRouter } from "next/router"

const NavBar = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const productsCountry = useSelector((state) => state.products.country);
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('ARG');
  const [error, setError] = useState('');

  function handleSearch(event) {
    setError('')
    setTitle(event.target.value);
  }

  const handlerClick = async () => {
    if (title.trim() === '') {
      setError('Ingrese algún dato');
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
        setTitle('');
      } catch (error) {
        setError('Producto no encontrado');

      }
    }
  };

  function handleFilterByCountry(event) {
    const selectedValue = event.target.value;
    setCountry(selectedValue);
    dispatch(axiosAllProductsByCountries(selectedValue));
  }

  return (
    <div className={Styles.navbar}>
      <div className={Styles.leftContainer}>
        <Link className={Styles.logo} href="/">
          <div className={Styles.logoContainer}>
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
          </div>
        </Link>

        {/* Esto va a ser reemplazado por el componente de fede donde renderiza las banderitas */}

        {router.pathname === "/Home" &&
          <div className={Styles.flags}>
            <select value={country} onChange={handleFilterByCountry}>
              <option value="ARG">ARG</option>
              <option value="COL">COL</option>
              <option value="MEX">MEX</option>
            </select>
          </div>
        }

        {router.pathname === "/Home" &&
          <div className={Styles.searchBar}>

            <input type="search" placeholder="¿Qué buscas hoy?" value={title} onChange={handleSearch} />
            <button onClick={handlerClick} className={Styles.buttonBusqueda}>Buscar</button>
            {error && <p className={Styles.error}>{error}</p>}

          </div>
        }
      </div>

      <div className={Styles.rightContainer}>
        <Link className={Styles.button} href="/CreateProduct">New</Link>
        <button className={Styles.button}>Login</button>
      </div>
    </div>
  );
};

export default NavBar;
