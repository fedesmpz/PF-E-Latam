import React from "react";
import Sidebar from "../ComponentsAdmin/SideBar/SideBar";
import SalesCard from "../ComponentsAdmin/Statistics/SalesCard";
import SalesStats from "../ComponentsAdmin/Statistics/SalesStats";
import LineChart from "../ComponentsAdmin/Statistics/LineChart";
import LineChartPrincipal from '../ComponentsAdmin/Statistics/LineChartPrincipal'
import StylesAdmin from "./Statistics.module.css";
import { useState } from "react";

const Statistics = () => {
  const [isOpen, setIsOpen] = useState(false);

  const totalSales = 100;
  const todaySales = 12;
  const monthSales = 71;

  return (
    <div className={StylesAdmin.containerAdmin}>
      <Sidebar />
      <div className={StylesAdmin.containerStats}>
        <section className={StylesAdmin.section}>
          <div className={StylesAdmin.cards}>
                <h1 className={StylesAdmin.title}>Indicador comercial de ventas</h1>
                <SalesCard
                  totalSales={totalSales}
                  todaySales={todaySales}
                  monthSales={monthSales}
                />
          </div> 
          <div className={StylesAdmin.dona}>
              <h1 className={StylesAdmin.title}>Ganancias totales</h1>
              <SalesStats />
          </div>
        </section> 
        <section className={StylesAdmin.section}>
                <div className={StylesAdmin.linealDaily}>
                  <h1 className={StylesAdmin.title}>Metrica diaria</h1>
                  <LineChartPrincipal />
                </div>
                <div className={StylesAdmin.lineal}>
                    <h1 className={StylesAdmin.title}>Metrica mensuales</h1>
                    <LineChart />
                </div>
        </section>
      </div>
    </div>
  );
};

export default Statistics;
