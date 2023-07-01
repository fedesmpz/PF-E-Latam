import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Styles from "../../components/Filter/Filter.module.css";
import { setOrderByName, setOrderByPrice, axiosAllProductByCountryCategory } from '../../redux/slice/productSlice';

const Filter = ({ countryId, setOrden, setCurrentPage }) => {
  const dispatch = useDispatch();

  function handleSort(event) {
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`);
    dispatch(setOrderByName(event.target.value));
  }

  function handlePriceChange(event) {
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`);
    dispatch(setOrderByPrice(event.target.value));
  }

  function handleCategoryChange(event) {
    setCurrentPage(1);
    setOrden(`Categoría ${event.target.value}`);
    dispatch(axiosAllProductByCountryCategory(countryId, event.target.value));
    dispatch(setOrderByPrice("---"))
    dispatch(setOrderByName("---"))
  }



  return (
    <div className={Styles.filtercontainer}>
      <label className={Styles.LabelCat}>Categoría</label>
      <select className={Styles.select1} onChange={handleCategoryChange}>
        <option value="all">Todas las categorías</option>
        <option value="computacion">Computación</option>
        <option value="celulares">Celulares</option>
        <option value="electronica">Electrónica</option>
        <option value="videojuegos">Videojuegos</option>
      </select>
      
      <label className={Styles.LabelPre}>Precio</label>
      <select className={Styles.select2} onChange={handlePriceChange}>
        <option value="---">---</option>
        <option value="mayormenor">De mayor a menor</option>
        <option value="menormayor">De menor a mayor</option>
      </select>

      <label className={Styles.LabelOrd}>Orden</label>
      <select className={Styles.select3} onChange={handleSort}>
        <option value="---">---</option>
        <option value="asc">A-Z</option>
        <option value="des">Z-A</option>
      </select>

    </div>
  );
};

export default Filter;
