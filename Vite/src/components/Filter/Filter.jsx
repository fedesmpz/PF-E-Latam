import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import Styles from "../../components/Filter/Filter.module.css";
import { setCategoryFN, setOrderByName, setOrderByPrice, axiosAllProductByCountryCategory } from '../../redux/slice/productSlice';

const Filter = ({ countryId, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();
  const [nameOrder, setNameOrder] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [shipping, setShipping] = useState("");
  const [priceRange, setPriceRange] = useState(Infinity);

  function handleSort(event) {
    setCurrentPage(1);
    setNameOrder(event.target.value);
    dispatch(setOrderByName(event.target.value));
    setPriceOrder("---");
  }

  function handlePriceChange(event) {
    setCurrentPage(1);
    setPriceOrder(event.target.value);
    dispatch(setOrderByPrice(event.target.value));
    setNameOrder("---");
  }

  function handleCategoryChange(event) {
    setCurrentPage(1);
    setCategory(event.target.value);
    dispatch(setCategoryFN(category));
    dispatch(axiosAllProductByCountryCategory(countryId, event.target.value, shipping, discount));
    dispatch(setOrderByPrice('---'));
    dispatch(setOrderByName('---'));
    setNameOrder('---');
    setPriceOrder('---');
  }


  const handleDiscountChange = (event) => {
    setCurrentPage(1);
    setDiscount(event.target.value)
    dispatch(axiosAllProductByCountryCategory(countryId, category, shipping, event.target.value));
    setNameOrder("---");
    setPriceOrder("---");
  }

  const handleShippingChange = (event) => {
    setCurrentPage(1);
    setShipping(event.target.value)
    dispatch(axiosAllProductByCountryCategory(countryId, category, event.target.value, discount));
    setNameOrder("---");
    setPriceOrder("---");
  }

  useEffect(() => {
    setCategory("all")
    setNameOrder("---")
    setPriceOrder("---")
    setShipping("---")
    setDiscount("---")
  }, [countryId])

  return (
    <div className={`${Styles.sidebar} ${isOpen ? Styles.open : Styles.close}`}>
      <button className={Styles.btnToggle} onClick={toggleSidebar}>
        {
          isOpen ? (
            <>
              <span></span>
              <span></span>
              <span></span>
            </>
          ) :
            (
              <img src="/assets/filter.png" className={Styles.filterIcon}></img>
            )
        }
      </button>
      <div className={`${Styles.containerSelect} ${isOpen ? '' : Styles.notShow}`} >
        <label className={Styles.Label}>Categoría</label>
        <select className={Styles.select} value={category} onChange={handleCategoryChange}>
          <option value="all">Todas las categorías</option>
          {countryId !== "COL"
            && <option value="computacion">Computación</option>
          }
          <option value="celulares">Celulares</option>
          <option value="electronica">Electrónica</option>
          <option value="videojuegos">Videojuegos</option>
        </select>

        <label className={Styles.Label}>Descuento</label>
        <select className={Styles.select} value={discount} onChange={handleDiscountChange}>
          <option value="---">---</option>
          <option value={true}>con descuento</option>
          <option value={false}>sin descuento</option>
        </select>

        <label className={Styles.Label}>Envío</label>
        <select className={Styles.select} value={shipping} onChange={handleShippingChange}>
          <option value="---">---</option>
          <option value={true}>envío gratis</option>
          <option value={false}>envío pago</option>
        </select>

        <label className={Styles.Label}>Precio</label>
        <select className={Styles.select} value={priceOrder} onChange={handlePriceChange}>
          <option value="---">---</option>
          <option value="mayormenor">De mayor a menor</option>
          <option value="menormayor">De menor a mayor</option>
        </select>

        <label className={Styles.Label}>Orden</label>
        <select className={Styles.select} value={nameOrder} onChange={handleSort}>
          <option value="---">---</option>
          <option value="asc">A-Z</option>
          <option value="des">Z-A</option>
        </select>
      </div>

    </div>
  );
};

export default Filter;
