import Link from "next/link";
import React, { useState } from 'react';
import NavbarAdmin from "./Components/NavbarAdmin"
import Providers from "@/redux/provider/Provider";
import TableInfo from "./ComponentsAdmin/Table/TableInfo";
import SalesCard from "./ComponentsAdmin/Statistics/SalesCard";
import SalesStats from "./ComponentsAdmin/Statistics/SalesStats";

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


    const data = {
        labels: ['Ventas en linea', 'Ventas por mayor', 'Ventas tienda oficial'],
        datasets: [{
            values: [60, 20, 20],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6386', '#36A4EB', '#FFCE58']
        }]
    } 
    
    return (
        <div>
            <NavbarAdmin/>
            <TableInfo/>
            <SalesCard 
            totalSales={totalSales}
            todaySales={todaySales}
            monthSales={monthSales}/>
            {/* <SalesStats data={data}/> */}
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