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
      loadCart: (state, action) => {
        state.products = [...action.payload];
      },
      setCurrentCartId: (state, action) => {
        state.cartId = action.payload;
      },
      setCurrency: (state, action) => {
        state.currency_id = action.payload;
      },
      setState: (state, action) => {
        state.current_state = action.payload;
      },
      setTotal: (state, action) => {
        state.total_price = action.payload;
      },
      setSuccessMessage: (state, action) => {
        state.successMessage = action.payload;
      },
      setErrorMessage: (state, action) => {
        state.errorMessage = action.payload;
      },
    },
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

export const loadProductsToCart = (productsData, cartId) => async (dispatch) => {
    try {
      const response = await axios.post(`https://pf-elatam.onrender.com/carts/${cartId}/products`, productsData);
      // const response = await axios.post(`http://localhost:8000/carts/${cartId}/products`, productsData);
      dispatch(setSuccessMessage(response.data));
    } catch (error) {
      dispatch(setErrorMessage(error.message));
    }
};

export const getProductsFromCart = (cartId) => async (dispatch) => {
    try {
      const response = await axios.get(`https://pf-elatam.onrender.com/carts/${cartId}`);
      // const response = await axios.get(`http://localhost:8000/carts/${cartId}`);
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
    // const response = await axios.delete(`http://localhost:8000/carts/${cartId}/products`);
    const response = await axios.delete(`https://pf-elatam.onrender.com/carts/${cartId}/products`);
    dispatch(setSuccessMessage(response.data));

  } catch (error) {
    dispatch(setErrorMessage(error.message));
  }
};
