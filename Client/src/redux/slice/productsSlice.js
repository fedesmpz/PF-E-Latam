import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const productSlice = createSlice({
        initialState: {
        productByCountryCategory: []
    },
    reducers: {
        setProductByCountryCategory:(state, action) => {
            state.productByCountryCategory = action.payload;
        }
    }
})


export const { setProductByCountryCategory} = productSlice.actions;

export default productSlice.reducer;

export const axiosAllProducts = () => (dispatch) => {
    axios
        .get("http://localhost:3001/products/:countryId/:category")
        .then((response) => {
            dispatch(setProductByCountryCategory(response.data.data))
        })
        .catch((error) => console.log(error));
};