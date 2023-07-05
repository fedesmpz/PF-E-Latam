import StylesAdmin from "./DashboardAdmin.module.css";
import SalesCard from "../ComponentsAdmin/Statistics/SalesCard";
import SalesStats from "../ComponentsAdmin/Statistics/SalesStats";
import LastOrders from "../ComponentsAdmin/Orders/LastOrders";
import Sidebar from "../ComponentsAdmin/SideBar/SideBar";
import { useState } from "react";
import TopCards from "../ComponentsAdmin/Statistics/TopCards";
import LastAddedProducts from "../ComponentsAdmin/Products/LastAddedProducts";
import LineChartPrincipal from '../ComponentsAdmin/Statistics/LineChartPrincipal'

const DashboardAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSalesCard, setShowSalesCard] = useState(false);
  const handleSalesClick = () => {
    setShowSalesCard(true);
  };
  const totalUsers = 2486;
  const totalAdmins = 5;
  const totalProducts = 14500;
  const totalSales = 100;
  const todaySales = 12;
  const monthSales = 71;
  const data = {
    labels: ["Ventas en linea", "Ventas por mayor", "Ventas tienda oficial"],
    datasets: [
      {
        values: [60, 20, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6386", "#36A4EB", "#FFCE58"],
      },
    ],
  };

  return (
    <div className={StylesAdmin.containerAdmin}>
      <Sidebar />
        <div className={StylesAdmin.containerHomeAdmin}>
          <h1 className={StylesAdmin.mainTitle}>Panel del administrador</h1>   
          <div className={StylesAdmin.containerSuperior}>
          <h1 className={StylesAdmin.title}>Metricas totales</h1>
            <TopCards
              totalUsers={totalUsers}
              totalAdmins={totalAdmins}
              totalProducts={totalProducts}
            />
          </div>
          <div className={StylesAdmin.mainContainer}>
          <LastOrders />
          <div className={StylesAdmin.statSales}>
          <h1 className={StylesAdmin.title}>Indicador comercial de ventas</h1>
            <SalesCard
              totalSales={totalSales}
              todaySales={todaySales}
              monthSales={monthSales}
            />
            <h1 className={StylesAdmin.title}>Ganancias totales</h1>
            <SalesStats />
          </div>
          </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
