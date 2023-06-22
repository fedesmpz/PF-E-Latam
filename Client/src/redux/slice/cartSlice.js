import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState= {
    cart:{}
}

export const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        setAddProduct:(state, action) => {
            state.cart = action.payload;
        }
    }
})

export const { 
    setAddProduct 
} = cartSlice.actions;

export default cartSlice.reducer;

export const addProduct = (countryId, categories, id) => (dispatch) => {
    axios
        .get(`http://localhost:8000/products/${countryId}/${categories}/${id}`)
        .then((response) => {
                dispatch(setAddProduct(response.data));
        })
        .catch((error) => {
            console.log(error.response?.data?.error)
        });
};