import React from "react";
import Styles from "./styles/topCards.module.css";
import { getUsers } from "../../../redux/slice/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const TopCards = ({ totalProducts }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUsers());
  },[])

  const allUsers = useSelector((state) => state.user.users);
  const totalAdmins = allUsers.filter((user) => user.admin).length;

  return (
    <div className={Styles.cardtop}>
      <h3 className={Styles.coment}>Estadisticas</h3>
      <div className={Styles.division}>
        <p>Total Usuarios:</p>
        <span>{allUsers.length}</span>
      </div>
      <div className={Styles.division}>
        <p>Total Admins:</p>
        <span>{totalAdmins}</span>
      </div>
      <div className={Styles.division}>
        <p>Total Productos:</p>
        <span>{totalProducts}</span>
      </div>
    </div>
  );
};

export default TopCards;
