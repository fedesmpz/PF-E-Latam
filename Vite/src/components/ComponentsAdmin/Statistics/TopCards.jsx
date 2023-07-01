import React from "react";
import Styles from "./styles/topCards.module.css";

const TopCards = ({ totalUsers, totalAdmins, totalProducts, totalSales }) => {
  return (
    <div className={Styles.cardtop}>
      <h3 className={Styles.coment}>Stats</h3>
      <div className={Styles.division}>
        <p>Total Users:</p>
        <span>{totalUsers}</span>
      </div>
      <div className={Styles.division}>
        <p>Total Admins:</p>
        <span>{totalAdmins}</span>
      </div>
      <div className={Styles.division}>
        <p>Total Products:</p>
        <span>{totalProducts}</span>
      </div>
    </div>
  );
};

export default TopCards;
