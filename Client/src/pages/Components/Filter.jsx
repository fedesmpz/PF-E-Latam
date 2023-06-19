import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Styles from "./Styles/Filter.module.css";
import { setOrderByName, setOrderByPrice, setCategory, filterByCategory } from '@/redux/slice/productSlice';

const Filter = ({ setOrden, setCurrentPage }) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.products.category);

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
    dispatch(setCategory(event.target.value));
    dispatch(filterByCategory()); // Aplica el filtro por categoría
  }

  return (
    <div className={Styles.filtercontainer}>
      <label>Precio</label>      
      <select className={Styles.select} onChange={handlePriceChange}>
        <option>---</option>
        <option value="mayormenor">De mayor a menor</option>
        <option value="menormayor">De menor a mayor</option>
      </select>

      <label>Orden</label>      
      <select className={Styles.select} onChange={handleSort}>
        <option value="asc">A-Z</option>
        <option value="des">Z-A</option>
      </select>

      <label>Categoría</label>      
      <select className={Styles.select} onChange={handleCategoryChange}>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;