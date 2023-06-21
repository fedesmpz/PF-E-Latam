import { useState } from 'react';
import styles from './Styles/NavbarPage.module.css'
import { useDispatch, useSelector } from "react-redux";
import Styles from "./Styles/NavBar.module.css";
import { axiosAllProductsByCountries } from "../../redux/slice/productSlice";
import Select from 'react-select'


const Menu = () => {
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    // Lógica de cierre de sesión
  };

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
    <>
    <button className={styles['menu-button']} onClick={() => setOpen(!open)}>
        <div></div>
        <div></div>
        <div></div>
      </button>
    {open && (
      <div className={styles.back}>
      <div className={styles.menu}>
      <div className={`${Styles.flags} ${styles.flagsadmin}`}>
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
        <ul>
          <li><a href="#">Opción 1sdufhsdhfjskd</a></li>
          <li><a href="#">Opción 2 nombre completo y logito</a></li>
          <li><a href="#">Opción 3</a></li>
        </ul>
        <button className={styles['logout-button']} onClick={handleLogout}>
        Log out
          </button>
      </div>
      </div>
    )}
    {!open && (
      <div className={styles.menuNon}>
      <div className={`${Styles.flags} ${styles.flagsadmin}`}>
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
        <ul>
          <li><a href="#"> 1</a></li>
          <li><a href="#"> 2</a></li>
          <li><a href="#"> 3</a></li>
        </ul>
        <button className={styles['logout-buttonNon']} onClick={handleLogout}>
        Log out
          </button>
      </div>
    )}
  </>
  );
}

export default Menu;
