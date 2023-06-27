import React from 'react'
import Sidebar from '../ComponentsAdmin/SideBar/SideBar'
import AllOrders from '../ComponentsAdmin/Orders/AllOrders'
import StylesAdmin from "./DashboardAdmin.module.css"
import { useState } from 'react'

const Sales = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={StylesAdmin.containerAdmin} >
        <Sidebar />
    <div className={StylesAdmin.containerHomeAdmin}style={{ marginLeft: isOpen ? '120px' : (!isOpen && '60px') }}>
        <div className={StylesAdmin.containerSuperior}>
        <h1></h1>
        </div>
        <AllOrders />
    </div>
    </div>
  )
}

export default Sales