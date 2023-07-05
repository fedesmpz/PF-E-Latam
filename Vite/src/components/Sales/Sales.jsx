import React from 'react'
import Sidebar from '../ComponentsAdmin/SideBar/SideBar'
import AllOrders from '../ComponentsAdmin/Orders/AllOrders'
import ProcessOrders from '../ComponentsAdmin/Orders/ProcessOrders'
import StylesAdmin from "../DashboardAdmin/DashboardAdmin.module.css"
import { useState } from 'react'

const Sales = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={StylesAdmin.containerAdmin} >
        <Sidebar />
        <div className={StylesAdmin.processingOrders} >
        <ProcessOrders />
        <AllOrders />
        </div>
    </div>
  )
}

export default Sales