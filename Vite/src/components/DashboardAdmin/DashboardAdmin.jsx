import StylesAdmin from "./DashboardAdmin.module.css";
import SalesCard from "../ComponentsAdmin/Statistics/SalesCard";
import SalesStats from "../ComponentsAdmin/Statistics/SalesStats";
import LastOrders from "../ComponentsAdmin/Orders/LastOrders";
import Sidebar from "../ComponentsAdmin/SideBar/SideBar"
import { useState } from "react";

const DashboardAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  //lógica para el circulo estadístico
  // const [isOpen, setIsOpen] = useState(false);
  // const toggleMenu = () => {
  //     setIsOpen(!isOpen);
  // }
  const [showSalesCard, setShowSalesCard] = useState(false);
  const handleSalesClick = () => {
    setShowSalesCard(true);
  };
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
        <div className={StylesAdmin.containerSuperior}>
          <h1></h1>
        </div>

        <SalesCard
          totalSales={totalSales}
          todaySales={todaySales}
          monthSales={monthSales}
        />
        <SalesStats />
        <LastOrders />
      </div>
    </div>
  );
};

export default DashboardAdmin;