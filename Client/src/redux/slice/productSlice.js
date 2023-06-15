import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const productSlice = createSlice({
    // se genera error a no colocarle nombre al slice le colocare products ya que es la funcion de este archivo traernos los productos
        name: 'products',
        initialState: {
            products: [],
            category: [],
            detail:[]
        
        },
    reducers: {
        setProductByCountryCategory:(state, action) => {
            state.category = action.payload;
        },

        setAllProductsByCountries:(state, action) => {
            state.products = action.payload;
        },

        setAllProductsByCountriesCategoryId:(state, action) => {
            state.detail = action.payload;
        },
        setSearchProduct:(state,action) => {
            state.products = action.payload;
        }
    }
})


export const { setProductByCountryCategory, setAllProductsByCountries,setAllProductsByCountriesCategoryId, setSearchProduct } = productSlice.actions;

export default productSlice.reducer;

export const axiosAllProductByCountryCategory = () => (dispatch) => {
    axios
        .get("http://localhost:8000/products/:countryId/:category")
        .then((response) => {
            dispatch(setProductByCountryCategory(response.data.data))
        })
        .catch((error) => console.log(error));
};

export const axiosAllProductsByCountries = () => (dispatch) => {
    axios
        .get("http://localhost:8000/products/:countryId")
        .then((response) => {
            dispatch(setAllProductsByCountries(response.data.data))
        })
        .catch((error) => console.log(error));
};

export const axiosAllProductByCountryCategoryId = (id, countryId, category) => (dispatch) => {
    axios
        .get(`http://localhost:8000/products/${countryId}/${category}/${id}`)
        .then((response) => {
            dispatch(setAllProductsByCountriesCategoryId(response.data.data))
        })
        .catch((error) => console.log(error));
};

export const axiosSearchProduct = () => (dispatch) => {
    axios
        .get("http://localhost:8000/products/search")
        .then((response) => {
            dispatch(setSearchProduct(response.data.data))
        })
        .catch((error) => console.log(error));
};

export const postProduct = (payload) => {
    axios
      .post("http://localhost:8000/products/new", payload)
      .then((response) => {
            console.log(response.data);
      })
      .catch((error) => console.log(error));
  };