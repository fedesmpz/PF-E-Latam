import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const productSlice = createSlice({
    // se genera error a no colocarle nombre al slice le colocare products ya que es la funcion de este archivo traernos los productos
    name: 'products',
        initialState: {
        productByCountryCategory: []
    },
    reducers: {
        setProductByCountryCategory:(state, action) => {
            state.productByCountryCategory = action.payload;
        }
    }
})


export const { setProductByCountryCategory } = productSlice.actions;

export default productSlice.reducer;

export const axiosAllProducts = () => (dispatch) => {
    axios
        .get("http://localhost:8000/products/:countryId/:category")
        .then((response) => {
            dispatch(setProductByCountryCategory(response.data.data))
        })
        .catch((error) => console.log(error));
};