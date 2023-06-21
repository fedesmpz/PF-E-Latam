import Link from "next/link";
import React, { useState } from 'react';
import NavbarAdmin from "./Components/NavbarAdmin"
import Providers from "@/redux/provider/Provider";
import SalesCard from './Components/SalesCard';
import SalesStats from './Components/SalesStats';
import Styles from "./Styles/DashboardAdmin/DashboardAdmin.module.css";

const DashboardAdmin = () => {

    const chartData = {
        labels: ['Ventas en linea', 'Ventas por mayor', 'Ventas tienda oficial'],
        values: [60, 20, 20],
    } 

    return (
        <div>
            <NavbarAdmin/>
        </div>
    )
    
}




const DashboardAdminWithProvider = () => {
    return (
        <Providers>
            <DashboardAdmin/>
        </Providers>
    );
};


export default DashboardAdminWithProvider;