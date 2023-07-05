import React, { useEffect } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import Styles from './styles/SalesStats.module.css';
import { axiosAllSales } from '../../../redux/slice/saleSlice';

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
      min: 0,
    },
    x: {
      ticks: { color: 'rgba(78, 85, 217)' },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const LineChart = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sale.sales);

  useEffect(() => {
    dispatch(axiosAllSales());
  }, [dispatch]);

  const groupSalesByDay = () => {
    const groupedSales = {};
    sales.forEach((sale) => {
      const saleDay = new Date(sale.updatedAt).toLocaleDateString('es-419', { weekday: 'long' });
      if (groupedSales[saleDay]) {
        groupedSales[saleDay] += 1;
      } else {
        groupedSales[saleDay] = 1;
      }
    });
    return groupedSales;
  };

  const groupedSales = groupSalesByDay();
  const labels = Object.keys(groupedSales);
  const data = Object.values(groupedSales);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Ventas',
        data,
        borderColor: 'rgb(78, 85, 217)',
        backgroundColor: 'rgba(78, 85, 217, 0.5)',
      },
    ],
  };

  return (
    <div className={Styles.container}>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default LineChart;