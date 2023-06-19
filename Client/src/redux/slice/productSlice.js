import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    category: [],
    country: "ARG",
    detail: {},
    allProducts: [],
    orderByName: 'asc',
    orderByPrice: 'asc',
    selectedCategory: null,
  },
  
  reducers: {
    setProductByCountryCategory: (state, action) => {
      state.category = action.payload;
    },

    setAllProductsByCountries: (state, action) => {
      state.products = action.payload;
    },

        setProductsCountry: (state, action) => {
            state.country = action.payload;
        },

        //Creacion para todos los productos

        setAllProducts:(state, action) => {
            state.allProducts = action.payload;
        },
        
        setAllProductsByCountriesCategoryId:(state, action) => {
            state.detail = action.payload;
         
        },
        setSearchProduct:(state,action) => {
            state.products = action.payload;
        },
        setNewProduct:(state, action) => {
            state.products = [...state.products, action.payload]
        }
    }
})

    filterByCategory: (state) => {
        if (state.category) {
            state.products = state.allProducts.filter(product => product.categories.includes(state.category));
        }
    },
  },
});

export const { setProductByCountryCategory, setAllProductsByCountries, setProductsCountry, setAllProductsByCountriesCategoryId, setSearchProduct, setAllProducts, setNewProduct } = productSlice.actions;

export default productSlice.reducer;

export const axiosAllProductByCountryCategory = () => (dispatch, getState) => {
  const countryId = getState().products.country;
  const category = getState().products.category;

  axios
    .get(`http://localhost:8000/products/${countryId}/${category}`)
    .then((response) => {
      dispatch(setProductByCountryCategory(response.data.data));
    })
    .catch((error) => console.log(error));
};

export const axiosAllProductsByCountries = (id) => (dispatch) => {
    axios
        .get(`http://localhost:8000/products/${id}`)
        .then((response) => {
            dispatch(setProductsCountry(id))
            dispatch(setAllProductsByCountries(response.data))
        })
        .catch((error) => console.log(error));
};



export const axiosAllProducts = () => (dispatch) => {
    const urls = [
        'http://localhost:8000/products/ARG',
        'http://localhost:8000/products/COL',
        'http://localhost:8000/products/MEX'
    ];
    const requests = urls.map(url => axios.get(url));
    Promise.all(requests)
        .then((responses) => {
            const allProducts = responses.map(response => response.data);
            dispatch(setAllProducts(allProducts));

        })
        .catch((error) => console.log(error));
};



export const axiosAllProductByCountryCategoryId = (id, countryId, category) => (dispatch) => {
    axios
        .get(`http://localhost:8000/products/${countryId}/${category}/${id}`)
        .then((response) => {
            dispatch(setAllProductsByCountriesCategoryId(response.data))
        })
        .catch((error) => console.log(error));
};

export const axiosSearchProduct = (title,country) => (dispatch) => {
    axios
        .get(`http://localhost:8000/products/search/?title=${title}&country=${country}`)
        .then((response) => {
            dispatch(setSearchProduct(response.data))
        })
        
        .catch((error) => console.log(error));
};

export const postProduct = (payload) => (dispatch) => {
    axios
      .post("http://localhost:8000/products/new", payload)
      .then((response) => {
            dispatch(setNewProduct(response.data.data));
      })
      .catch((error) => console.log(error));
  };