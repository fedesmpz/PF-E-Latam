import Link from "next/link";
import React, { useState } from 'react';
import NavbarAdmin from "./Components/NavbarAdmin"
import Providers from "@/redux/provider/Provider";
import TableInfo from "./ComponentsAdmin/Table/TableInfo";

const DashboardAdmin = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const [showSalesCard, setShowSalesCard] = useState(false);

    const handleSalesClick = () => {
        setShowSalesCard(true);
    }

    const totalSales = 100;
    const todaySales = 12;
    const monthSales = 71;


    const chartData = {
        labels: ['Ventas en linea', 'Ventas por mayor', 'Ventas tienda oficial'],
        values: [60, 20, 20],
    } 
    
    return (
        <div>
            <NavbarAdmin/>
            <TableInfo/>
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