import React from 'react'
import Sidebar from '../ComponentsAdmin/SideBar/SideBar'
import SalesCard from '../ComponentsAdmin/Statistics/SalesCard'
import SalesStats from '../ComponentsAdmin/Statistics/SalesStats'
import LineChart from '../ComponentsAdmin/Statistics/LineChart'
import StylesAdmin from "./DashboardAdmin.module.css";

const Statistics = () => {

  const totalSales = 100;
  const todaySales = 12;
  const monthSales = 71;

  return (
    <div className={StylesAdmin.container}>
      <Sidebar />
      <SalesCard 
      totalSales={totalSales}
      todaySales={todaySales}
      monthSales={monthSales}
      />
      <SalesStats />
      <LineChart />
    </div>
  )
}

export default Statistics