import { useEffect, useState } from "react";
import styles from "./TableSeller.module.css";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import Styles from "../../NavBarPage/NavbarPage.module.css"
import { axiosAllProductsByCountries, axiosSearchProduct } from "../../../redux/slice/productSlice";

const TableSeller = ({ productsPerPage, products, paginado, currentPage }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  function handleSearch(event) {
    setTitle(event.target.value);
  }

  const handlerClick = async () => {
    if (title.trim() === '') {
      setShowModal(true);
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
        setShowModal(true);
      }
    }
  };

  function handleFilterByCountry(event) {
    const selectedValue = event.value;
    setCountry(selectedValue);
    dispatch(axiosAllProductsByCountries(selectedValue));
  }
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setActivePage(1);
    paginado(1);
  }, [products]);

  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(products / productsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
    paginado(pageNumber);
  };

  const goToPreviousPage = () => {
    if (activePage > 1) {
      handlePageClick(activePage - 1);
    }
  };

  const goToNextPage = () => {
    if (activePage < pageNumbers.length) {
      handlePageClick(activePage + 1);
    }
  };

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
    <nav className={styles.navContainer}>
      <Select
        options={options}
        value={options.find(option => option.value === country)}
        onChange={handleFilterByCountry}
        isSearchable={false}
        getOptionLabel={option => (
          <div>
            <img src={option.img} alt={option.label} className={styles.flagIcon} />
            {option.label}
          </div>
        )}
        getOptionValue={option => option.value}
      />

      {showModal && (
        <div className={Styles.modal}>
          <div className={Styles.modalContent}>
            <h2>Error de búsqueda</h2>
            <p>Por favor, ingresa algún dato válido antes de realizar la búsqueda.</p>
            <button className={Styles.closeButton} onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
      
        <div className={styles.searchBar}>
          <input type="search" placeholder="Busca tu producto" value={title} onChange={handleSearch} />
          <button onClick={handlerClick} className={styles.button}>Buscar</button>
        </div>

      <ul className={styles.pagination}>
        <li>
          <button
            className={
              activePage === 1 ? `${styles.pageButton} ${styles.disabledButton}` : styles.pageButton
            }
            onClick={goToPreviousPage}
            disabled={activePage === 1}
          >
            &lt;
          </button>
        </li>
        {pageNumbers.map((n) => (
          <li key={n}>
            <button
              className={
                activePage === n ? `${styles.pageButton} ${styles.activePageButton}` : styles.pageButton
              }
              onClick={() => handlePageClick(n)}
            >
              {n}
            </button>
          </li>
        ))}
        <li>
          <button
            className={
              activePage === pageNumbers.length ? `${styles.pageButton} ${styles.disabledButton}` : styles.pageButton
            }
            onClick={goToNextPage}
            disabled={activePage === pageNumbers.length}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default TableSeller;