import React, { useState } from 'react';
import Sidebar from '../ComponentsAdmin/SideBar/SideBar';
import AllOrders from '../ComponentsAdmin/Orders/AllOrders';
import ProcessOrders from '../ComponentsAdmin/Orders/ProcessOrders';
import StylesAdmin from "../DashboardAdmin/DashboardAdmin.module.css";

const Sales = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deletedSales, setDeletedSales] = useState([]);

  const handleSaleDelete = (deletedSale) => {
    setDeletedSales((prevDeletedSales) => [...prevDeletedSales, deletedSale]);
  };

  return (
    <div className={StylesAdmin.containerAdmin}>
      <Sidebar />
      <div className={StylesAdmin.processingOrders}>
        <ProcessOrders onSaleDelete={handleSaleDelete} />
        <AllOrders deletedSales={deletedSales} />
      </div>
    </div>
  );
};

export default Sales;
