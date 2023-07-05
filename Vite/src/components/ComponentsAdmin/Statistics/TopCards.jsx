import React from "react";
import Styles from "./styles/topCards.module.css";
import { getUsers } from "../../../redux/slice/userSlice";
import { axiosAllProducts } from "../../../redux/slice/productSlice"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const TopCards = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUsers());
    dispatch(axiosAllProducts())
  },[])

  const allUsers = useSelector((state) => state.user.users);
  const totalAdmins = allUsers.filter((user) => user.admin).length;
  const allProducts = useSelector((state) => state.products.products);
  const totalProductsCount = allProducts[0].length + allProducts[1].length + allProducts[2].length;

  return (
    <div className={Styles.cardtop}>
      <div className={Styles.division}>
        <p className={Styles.title}>Usuarios</p>
        <span className={Styles.title}>{allUsers.length}</span>
      </div>
      <div className={Styles.division}>
        <p className={Styles.title}>Administradores</p>
        <span className={Styles.title}>{totalAdmins}</span>
      </div>
      <div className={Styles.division}>
        <p className={Styles.title}>Productos</p>
        <span className={Styles.title}>{totalProductsCount}</span>
      </div>
    </div>
  );
};

export default TopCards;
