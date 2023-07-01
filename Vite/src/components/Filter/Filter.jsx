import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Styles from "../../components/Filter/Filter.module.css";
import { setOrderByName, setOrderByPrice, axiosAllProductByCountryCategory } from '../../redux/slice/productSlice';

const Filter = ({ countryId, setCurrentPage }) => {
  const dispatch = useDispatch();
  const [nameOrder, setNameOrder] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [category, setCategory] = useState("");
  console.log(countryId);
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
    setCategory(event.target.value)
    dispatch(axiosAllProductByCountryCategory(countryId, event.target.value));
    dispatch(setOrderByPrice("---"))
    dispatch(setOrderByName("---"))
    setNameOrder("---");
    setPriceOrder("---");
  }

  useEffect(() => {
    setCategory("all")
    setNameOrder("---")
    setPriceOrder("---")
  }, [countryId])

  return (
    <div className={Styles.filtercontainer}>
      <label>Precio</label>
      <select className={Styles.select} value={priceOrder} onChange={handlePriceChange}>
        <option value="---">---</option>
        <option value="mayormenor">De mayor a menor</option>
        <option value="menormayor">De menor a mayor</option>
      </select>

      <label>Orden</label>
      <select className={Styles.select} value={nameOrder} onChange={handleSort}>
        <option value="---">---</option>
        <option value="asc">A-Z</option>
        <option value="des">Z-A</option>
      </select>

      <label>Categoría</label>
      <select className={Styles.select} value={category} onChange={handleCategoryChange}>
        <option value="all">Todas las categorías</option>
        {countryId !== "COL"
          && <option value="computacion">Computación</option>
        }
        <option value="celulares">Celulares</option>
        <option value="electronica">Electrónica</option>
        <option value="videojuegos">Videojuegos</option>
      </select>
    </div>
  );
};

export default Filter;
