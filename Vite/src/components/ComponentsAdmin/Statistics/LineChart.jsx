import React from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scales: {
    y: {
      min: 0
    },
    x: {
      ticks: { color: 'rgba(255, 99, 132)'}
    }
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Celulares',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Computacion',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Electronica',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10000 })),
      borderColor: 'rgb(90, 235, 53)',
      backgroundColor: 'rgba(90, 235, 53, 0.5)',
    },
    {
      label: 'Videojuegos',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10000 })),
      borderColor: 'rgb(196, 53, 235)',
      backgroundColor: 'rgba(196, 53, 235, 0.5)',
    },
  ],
};

const LineChart = () => {
  return (
      <Line options={options} data={data} />
  );
}

export default LineChart;
