import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Ventas Totales', 'Ventas por Mayor', 'Ventas en linea' ],
  datasets: [
    {
      label: '# of Votes',
      data: [70, 10, 16],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const SalesStats = () => {
    return (
      <div>
        <Doughnut data={data} />
      </div>
    )
  }

  export default SalesStats;
