import Link from "next/link";
import React, { useState } from "react";
import styles from "./Styles/NavbarPage.module.css";
import Style from "./Styles/NavBar.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./Styles/NavBar.module.css";
import { axiosAllProductsByCountries } from "../../redux/slice/productSlice";
import Select from 'react-select'
import ButtonNavAdmin from './ButtonNavAdmin'


const NavbarPage = () => {
    const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const productsCountry = useSelector((state) => state.products.country);
  const [country, setCountry] = useState('ARG');
  const options = [
    { value: 'ARG', /* label: ' Argentina' */ img: 'https://flagcdn.com/w20/ar.png' },
    { value: 'COL', /* label: ' Colombia' */ img: 'https://flagcdn.com/w20/co.png' },
    { value: 'MEX', /* label: ' México' */ img: 'https://flagcdn.com/w20/mx.png' },
  ];

  function handleFilterByCountry(event) {
    const selectedValue = event.value;
    setCountry(selectedValue);
    dispatch(axiosAllProductsByCountries(selectedValue));
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navv}>
      <ButtonNavAdmin/>





     
      <div className={Styles.flags}>
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
