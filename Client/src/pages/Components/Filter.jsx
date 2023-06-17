import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Styles from "./Styles/Filter.module.css"

const Filter = ({ setOrden, setCurrentPage }) => {
    const dispatch = useDispatch();
    
  function handleSort(event) {
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`);
    dispatch(orderByName(event.target.value));
  }

  function handlePriceChange(event) {
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`);
    // dispatch(orderByPrice(event.target.value));
  }


  return (
    <div className="filter-container">

      <label>Precio</label>      
      <select className={Styles.select} onChange={handlePriceChange}>
          <option value="menormayor">De menor a mayor</option>
          <option value="mayormenor">De mayor a menor</option>
      </select>

      <label>Orden</label>      
      <select className={Styles.select} onChange={handleSort}>
          <option value="asc">A-Z</option>
          <option value="des">Z-A</option>
      </select>

    </div>
  );
};

export default Filter;
