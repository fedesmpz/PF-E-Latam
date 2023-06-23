import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    cart:[]
}

export const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        setAddProduct: (state, action) => {
            const newProduct = action.payload;
            const existingProduct = state.cart?.find((product) => product.id === newProduct.id);
            if (!existingProduct) {
                console.log("hola mundo");
                state.cart.push(newProduct);
            }
        },
        setRemoveProduct: (state, action) => {
            const id = action.payload;
            state.cart = state.cart.filter((product) => product.id !== id);
        },
    }
})

export const { 
    setAddProduct,
    setRemoveProduct
} = cartSlice.actions;

export default cartSlice.reducer;

export const addProduct = (product) => (dispatch) => {
    dispatch(setAddProduct(product));
  };

export const removeProduct = (id) => (dispatch) => {
    dispatch(setRemoveProduct(id))
}