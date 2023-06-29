import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      cartId: null,
      total_price: null,
      currency_id: null,
      current_state: null,
      promotion_active: false,
      successMessage: null,
      errorMessage: null,
      products: []
    },
    reducers: {
        loadCart(state, action) {
            state.products = [...state.products, ...action.payload]
        },
        setCurrentCartId(state, action) {
          state.cartId = action.payload
        },
        setCurrency(state, action) {
          state.currency_id = action.payload 
        },
        setState(state, action) {
          state.current_state = action.payload 
        },
        setTotal(state, action) {
          state.total_price = action.payload
        },
        setSuccessMessage(state, action) {
            state.successMessage = action.payload
        },
        setErrorMessage(state, action) {
          state.errorMessage = action.payload
      }
    }
});

export const {
    loadCart,
    setCurrentCartId,
    setSuccessMessage,
    setErrorMessage,
    setCurrency,
    setState,
    setTotal
} = cartSlice.actions

export default cartSlice.reducer;

export const loadProductsToCart = (cartData, cartId) => async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:8000/carts/${cartId}/products`, cartData);
      dispatch(setSuccessMessage(response.data));
      console.log("Esta es la carga a la db", response.data)
    } catch (error) {
      dispatch(setErrorMessage(error.message));
    }
};

export const getProductsFromCart = (cartId) => async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:8000/carts/${cartId}`);
      console.log("esta es la cartData", response.data);
      dispatch(loadCart(response.data.products));
      dispatch(setCurrentCartId(response.data.id))
      dispatch(setCurrency(response.data.currency_id));
      dispatch(setState(response.data.current_state));
      dispatch(setTotal(response.data.total_price));
    } catch (error) {
      dispatch(setErrorMessage(error.message));
    }
};

export const deleteProductsFromCart = (cartId) => async (dispatch) => {
  try {
    const response = await axios.delete(`http://localhost:8000/carts/${cartId}/products`);
    console.log("esta es la respuesta de eliminar", response.data);
    dispatch(setSuccessMessage(response.data));
  } catch (error) {
    dispatch(setErrorMessage(error.message));
  }
};
