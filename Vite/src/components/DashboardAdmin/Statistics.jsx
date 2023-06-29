import React from 'react'
import Sidebar from '../ComponentsAdmin/SideBar/SideBar'
import SalesCard from '../ComponentsAdmin/Statistics/SalesCard'
import SalesStats from '../ComponentsAdmin/Statistics/SalesStats'
import LineChart from '../ComponentsAdmin/Statistics/LineChart'
import StylesAdmin from "./DashboardAdmin.module.css";
import { useState } from 'react'
import NavbarAdmin from '../NavBarAdmin/NavbarAdmin'

const Statistics = () => {
  const [isOpen, setIsOpen] = useState(false);

  const totalSales = 100;
  const todaySales = 12;
  const monthSales = 71;

  return (
    <div className={StylesAdmin.containerAdmin} >
      <Sidebar />
      <div className={StylesAdmin.containerHomeAdmin} style={{ marginLeft: isOpen ? '120px' : (!isOpen && '60px') }}>
      <NavbarAdmin />
        <div className={StylesAdmin.containerSuperior}>
        </div>
        <section className={StylesAdmin.containerProducts}>
      <SalesCard 
      totalSales={totalSales}
      todaySales={todaySales}
      monthSales={monthSales}
      />
      <SalesStats />
      <LineChart />
          
        </section>
        
      </div>
    </div>
  )
}

export default Statistics