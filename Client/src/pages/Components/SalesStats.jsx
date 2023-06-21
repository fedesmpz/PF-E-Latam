import React, { useEffect, useRef } from 'react';
import {Chart} from 'chart.js';
import Styles from './Styles/SalesStats.module.css';

const SalesStats = ({ data }) => {
    const chartRef = useRef(null);
    let chartInstance = null;

    useEffect(() => {
        if (chartInstance) {
            chartInstance.destroy()
        }

        const ref = chartRef.current.getContext("2d");

        chartInstance = new Chart(ref, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                databases: [
                    {
                        data: data.values,
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BCOCO',
                            '#9966FF',
                        ],
                    },
                ],
            },
        });
        return () => {
            if (chartInstance) {
                chartInstance.destroy()
            }
        }
    }, [data]);
    return <div className={Styles.container}><canvas ref={chartRef}/></div>
}

export default SalesStats;