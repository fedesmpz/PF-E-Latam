import React from 'react';
import Styles from './SalesCard.module.css';

const SalesCard = ({ totalSales, todaySales, monthSales}) => {

    return (
        <div className={Styles.card}>
            <h3>Sales Stats</h3>
            <div>
                <p>Total Sales:</p>
                <span>{totalSales}</span>
            </div>
            <div>
                <p>Today Sales:</p>
                <span>{todaySales}</span>
            </div>
            <div>
                <p>Month Sales:</p>
                <span>{monthSales}</span>
            </div>
        </div>
    )
}

export default SalesCard;