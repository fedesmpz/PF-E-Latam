import StylesAdmin from "./DashboardAdmin.module.css";
import SalesCard from "../ComponentsAdmin/Statistics/SalesCard";
import SalesStats from "../ComponentsAdmin/Statistics/SalesStats";
import LastOrders from "../ComponentsAdmin/Orders/LastOrders";
import Sidebar from "../ComponentsAdmin/SideBar/SideBar";
import { useState } from "react";
import TopCards from "../ComponentsAdmin/Statistics/TopCards";
import LastAddedProducts from "../ComponentsAdmin/Products/LastAddedProducts";
import NavbarAdmin from "../NavBarAdmin/NavbarAdmin";
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
      <div
        className={StylesAdmin.containerHomeAdmin}
        style={{ marginLeft: isOpen ? "120px" : !isOpen && "60px" }}
      >
        <NavbarAdmin />
        <div className={StylesAdmin.containerSuperior}>
          <TopCards
            totalUsers={totalUsers}
            totalAdmins={totalAdmins}
            totalProducts={totalProducts}
          />
        </div>
        <div className={StylesAdmin.statSales}>
          <SalesCard
            totalSales={totalSales}
            todaySales={todaySales}
            monthSales={monthSales}
          />
          <SalesStats />
        </div>
        <LastOrders />
        <div className={StylesAdmin.line}>
        <LineChartPrincipal />
        </div>
        <LastAddedProducts />
      </div>
    </div>
  );
};

export default DashboardAdmin;
