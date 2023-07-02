import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Styles from "../../components/Filter/Filter.module.css";
import { setOrderByName, setOrderByPrice, axiosAllProductByCountryCategory, setFilterByShipping, setFilterByDiscount } from '../../redux/slice/productSlice';

const Filter = ({ countryId, setCurrentPage }) => {
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
    setCategory(event.target.value)
    dispatch(axiosAllProductByCountryCategory(countryId, event.target.value));
    dispatch(setOrderByPrice("---"))
    dispatch(setOrderByName("---"))
    setNameOrder("---");
    setPriceOrder("---");
  }

  const handleDiscountChange = (event) => {
    setCurrentPage(1);
    setDiscount(event.target.value)
    dispatch(setFilterByDiscount(event.target.value));
    setNameOrder("---");
    setPriceOrder("---");
  }

  const handleShippingChange = (event) => {
    setCurrentPage(1);
    setShipping(event.target.value)
    dispatch(setFilterByShipping(event.target.value));
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
    <div className={Styles.filtercontainer}>
      <label className={Styles.LabelCat}>Categoría</label>
      <select className={Styles.select1} onChange={handleCategoryChange}>
        <option value="all">Todas las categorías</option>
        {countryId !== "COL"
          && <option value="computacion">Computación</option>
        }
        <option value="celulares">Celulares</option>
        <option value="electronica">Electrónica</option>
        <option value="videojuegos">Videojuegos</option>
      </select>

      <label className={Styles.LabelDes}>Descuento</label>
      <select className={Styles.select2} value={discount} onChange={handleDiscountChange}>
        <option value="---">---</option>
        <option value={true}>con descuento</option>
        <option value={false}>sin descuento</option>
      </select>

      <label className={Styles.LabelEnv}>Envío</label>
      <select className={Styles.select3} value={shipping} onChange={handleShippingChange}>
        <option value="---">---</option>
        <option value={true}>envío gratis</option>
        <option value={false}>envío pago</option>
      </select>

      <label className={Styles.LabelPre}>Precio</label>
      <select className={Styles.select4} onChange={handlePriceChange}>
        <option value="---">---</option>
        <option value="mayormenor">De mayor a menor</option>
        <option value="menormayor">De menor a mayor</option>
      </select>

      <label className={Styles.LabelOrd}>Orden</label>
      <select className={Styles.select5} onChange={handleSort}>
        <option value="---">---</option>
        <option value="asc">A-Z</option>
        <option value="des">Z-A</option>
      </select>

    </div>
  );
};

export default Filter;
