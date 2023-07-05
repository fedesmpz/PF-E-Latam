import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { axiosAllSales } from "../../../redux/slice/saleSlice";
import moment from "moment";
ChartJS.register(ArcElement, Tooltip, Legend);

const SalesStats = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sale.sales);

  useEffect(() => {
    dispatch(axiosAllSales());
  }, [dispatch]);

  const currentDate = moment().startOf("day");
  const ventasHoy = sales?.filter((sale) => {
    const saleDate = moment(sale.updatedAt).startOf("day");
    return saleDate.isSame(currentDate);
  });

  const currentMonth = moment().month();
  const ventasMes = sales?.filter((sale) => {
    const saleMonth = moment(sale.updatedAt).month();
    return saleMonth === currentMonth;
  });

  const totalVentas = sales?.reduce((total, sale) => total + Number(sale.total_price), 0) / 100;
  const ventasHoyTotal = ventasHoy?.reduce((total, sale) => total + Number(sale.total_price), 0) / 100;
  const ventasMesTotal = ventasMes?.reduce((total, sale) => total + Number(sale.total_price), 0) / 100;

  const data = {
    labels: ["Ganancias acumuladas", "Ganancia de Hoy", "Granancia del Mes"],
    datasets: [
      {
        label: "#",
        data: [
          totalVentas,
          ventasHoyTotal,
          ventasMesTotal,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default SalesStats;