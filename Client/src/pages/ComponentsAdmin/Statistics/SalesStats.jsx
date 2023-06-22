import React, { useState, useEffect } from 'react'
import Styles from './SalesStats.module.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart } from 'chart.js'; 

const SalesStats = () => {

//     const [chartData, setChartData ] = useState({
//         datasets: []
//     })

//     const [chartOptions, setChartOptions] = useState({})

//     useEffect(() => {
//         setChartData({
//             labels: ['Ventas en linea', 'Ventas por mayor', 'Ventas tienda oficial'],
//             datasets: [
//                 {
//                 data: [60, 20, 20],
//                 backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//                 hoverBackgroundColor: ['#FF6386', '#36A4EB', '#FFCE58']
//             }
//         ]
//         })

//         setChartOptions({
//             plugins: {
//                 legend: {
//                     position: 'top'
//                 },
//                 title: {
//                     display: true,
//                     text: 'sepacristo'
//                 }
//             },
//             maintainAspectRatio: false,
//             responsive: true
//         })
//     }, [])
     


//   return (
//     <div className={Styles.charts}>
//         <div className={Styles.circle}>
//             <h2>Sales</h2>
//             <Doughnut data={chartData} width={400} height={400}/>
//         </div>
//         </div>
//   )
// }
    useEffect(() => {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Accepted", "Pending", "Rejected"],
                datasets: [{
                    data: [70, 10, 6],
                    borderColor: [
                        "rgb(75, 192, 192)",
                        "rgb(255, 205, 86)",
                        "rgb(255, 99, 132)",
                    ],
                    backgroundColor: [
                        "rgb(75, 192, 192 )",
                        "rgb(255, 205, 86)",
                        "rgb(255, 99, 132)",
                    ],
                    borderWidth: 2,
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: false,
                    }],
                    yAxes: [{
                        display: false,
                    }],
                }
            },

        });
    }, [])


    return (
        <>
            {/* Doughnut chart */}
            <h1 className="w-[150px] mx-auto mt-10 text-xl font-semibold capitalize ">Doughnut Chart</h1>
            <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl w-full h-fit my-auto  shadow-xl pb-2'>
                    <Doughnut id='myChart'></Doughnut>
                </div>
            </div>
        </>
    )
}

export default SalesStats;
