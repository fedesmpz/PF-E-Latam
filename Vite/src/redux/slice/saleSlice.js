import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const saleSlice = createSlice({
    name: 'sale',
    initialState: {
        sales:[],
    },

    reducers: {
        setAllSales: (state, action) => {
          state.sales = action.payload;
        },
    }
});

export const {
    setAllSales
} = saleSlice.actions

export default saleSlice.reducer;

export const axiosAllSales = () => (dispatch) => {
    axios
      .get(`https://pf-elatam.onrender.com/sales`)
      .then((response) => {
        dispatch(setAllSales(response.data));
      })
      .catch((error) => console.log(error));
  };