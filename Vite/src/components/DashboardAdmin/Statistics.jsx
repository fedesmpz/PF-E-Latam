import React from "react";
import Sidebar from "../ComponentsAdmin/SideBar/SideBar";
import SalesCard from "../ComponentsAdmin/Statistics/SalesCard";
import SalesStats from "../ComponentsAdmin/Statistics/SalesStats";
import LineChart from "../ComponentsAdmin/Statistics/LineChart";
import StylesAdmin from "./Statistics.module.css";
import { useState } from "react";
import NavbarAdmin from "../NavBarAdmin/NavbarAdmin";

const Statistics = () => {
  const [isOpen, setIsOpen] = useState(false);

  const totalSales = 100;
  const todaySales = 12;
  const monthSales = 71;

  return (
    <div className={StylesAdmin.containerAdmin}>
      <Sidebar />
      <div
        className={StylesAdmin.containerHomeAdmin}
        style={{ marginLeft: isOpen ? "120px" : !isOpen && "60px" }}
      >
        <NavbarAdmin />
        <div className={StylesAdmin.containerSuperior}></div>
        <section className={StylesAdmin.containerProducts}>
          <div className={StylesAdmin.cards}>
            <SalesCard
              totalSales={totalSales}
              todaySales={todaySales}
              monthSales={monthSales}
            />
          </div>
          <div className={StylesAdmin.dona}>
            <SalesStats />
          </div>
          <div className={StylesAdmin.lineal}>
            <LineChart />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Statistics;
