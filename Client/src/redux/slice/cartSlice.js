import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    cart:[]
}

export const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        setAddProduct:(state, action) => {
            state.cart = [...state.cart, action.payload]
        }
    }
})

export const { 
    setAddProduct 
} = cartSlice.actions;

export default cartSlice.reducer;

export const addProduct = (product) => (dispatch) => {
    console.log("slice",product);
    dispatch(setAddProduct(product));
  };