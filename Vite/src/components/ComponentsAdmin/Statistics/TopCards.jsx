import React from "react";
import Styles from "./SalesCard.module.css";

const TopCards = ({ totalUsers, totalAdmins, totalProducts, totalSales }) => {
  return (
    <div className={Styles.cardtop}>
      <h3>Stats</h3>
      <div>
        <p>Total Users:</p>
        <span>{totalUsers}</span>
      </div>
      <div>
        <p>Total Admins:</p>
        <span>{totalAdmins}</span>
      </div>
      <div>
        <p>Total Products:</p>
        <span>{totalProducts}</span>
      </div>
      <div>
        <p>Total Sales:</p>
        <span>{totalSales}</span>
      </div>
    </div>
  );
};

export default TopCards;
