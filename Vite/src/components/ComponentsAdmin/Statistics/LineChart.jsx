import React, { useEffect } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { axiosAllSales } from "../../../redux/slice/saleSlice";

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
      ticks: { color: "rgba(75, 191, 104)" },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const LineChart = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sale.sales);

  useEffect(() => {
    dispatch(axiosAllSales());
  }, [dispatch]);

  const groupSalesByMonth = () => {
    const groupedSales = {};
    sales.forEach((sale) => {
      const saleDate = new Date(sale.updatedAt);
      const saleMonth = saleDate.getMonth();
      if (groupedSales[saleMonth]) {
        groupedSales[saleMonth] += 1;
      } else {
        groupedSales[saleMonth] = 1;
      }
    });
    return groupedSales;
  };

  const allMonths = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const groupedSales = groupSalesByMonth();
  const data = allMonths.map((month, index) => groupedSales[index] || 0);

  const chartData = {
    labels: allMonths,
    datasets: [
      {
        label: "Ventas",
        data,
        borderColor: "rgb(75, 191, 104)",
        backgroundColor: "rgba(75, 191, 104, 0.5)",
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};

export default LineChart;
