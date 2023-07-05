import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Styles from "./styles/SalesCard.module.css";
import { axiosAllSales } from "../../../redux/slice/saleSlice";
import moment from "moment";

const SalesCard = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sale.sales);

  useEffect(() => {
    dispatch(axiosAllSales());
  }, [dispatch]);

  const totalSales = sales.length;
  const today = moment().startOf("day");
  const todaySales = sales.filter((sale) => {
    const saleDate = moment(sale.updatedAt);
    return saleDate.isSame(today, "day");
  }).length;

  const currentMonth = moment().month() + 1;
  const currentYear = moment().year();

  const monthSales = sales.filter((sale) => {
    if (sale.updatedAt) {
      const saleDate = moment(sale.updatedAt);
      const saleMonth = saleDate.month() + 1;
      const saleYear = saleDate.year();
      return saleMonth === currentMonth && saleYear === currentYear;
    }
    return false;
  }).length;

  return (
    <div className={Styles.card}>
      <div>
        <p>Total Ventas:</p>
        <span>{totalSales}</span>
      </div>
      <div>
        <p>Ventas de hoy:</p>
        <span>{todaySales}</span>
      </div>
      <div>
        <p>Ventas del mes:</p>
        <span>{monthSales}</span>
      </div>
    </div>
  );
};

export default SalesCard;

