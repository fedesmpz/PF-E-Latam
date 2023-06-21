import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categories: [],
    country: "ARG",
    newProductMessage: null,
    detail: {},
    allProducts: [],
    orderByName: 'asc',
    orderByPrice: 'mayormenor',
  },
  
  reducers: {
    setProductByCountryCategory: (state, action) => {
      state.categories = action.payload;
    },

    setAllProductsByCountries: (state, action) => {
      state.products = action.payload;
      state.allProducts = action.payload;
    },

    setProductsCountry: (state, action) => {
      state.country = action.payload;
    },

    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },

    setAllProductsByCountriesCategoryId: (state, action) => {
      state.detail = action.payload;
    },
    
    setSearchProduct: (state, action) => {
        state.allProducts = action.payload;
    },

    setNewProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },

    setNewProductMessage: (state, action) => {
      state.newProductMessage = action.payload;
    },

    cleanDetail:(state)=>{
      state.detail= {}
    },
    
    setOrderByName: (state, action) => {
      state.orderByName = action.payload;
      const sortedProductsByName = state.allProducts.sort((a, b) => {
        const titleA = a.title.trim();
        const titleB = b.title.trim();
        if (state.orderByName === 'asc') {
          return titleA.localeCompare(titleB);
        } else if (state.orderByName === 'des') {
          return titleB.localeCompare(titleA);
        } else if (state.orderByName === "---") {
          return state.allProducts
        }
        return 0;
      });
      state.allProducts = sortedProductsByName;
    },

    setOrderByPrice: (state, action) => {
      state.orderByPrice = action.payload;
      const sortedProducts = [...state.allProducts]; // Realizar una copia del array de productos
      sortedProducts.sort((a, b) => {
        const priceA = parseFloat(a.original_price);
        const priceB = parseFloat(b.original_price);
        if (state.orderByPrice === 'menormayor') {
          if (priceA < priceB) {
            return -1;
          }
          if (priceA > priceB) {
            return 1;
          }
          return 0;
        } else if (state.orderByPrice === 'mayormenor') {
          if (priceA > priceB) {
            return -1;
          }
          if (priceA < priceB) {
            return 1;
          }
          return 0;
        }
        if (state.orderByPrice === "---") {
          return state.allProducts
        }
        return 0;
      });
      state.allProducts = sortedProducts; // Asignar la lista ordenada al estado
    },
    
    setFilterByCategory: (state, action) => {
      const filterByCategory = state.products;
      const filteredCat = filterByCategory.filter((product) => {
        return product.categories === action.payload;
      });

      if (action.payload === 'all') {
        state.allProducts = state.products;
      } else {
        state.allProducts = filteredCat;
      }
    },
    
  },
});

export const {
  setProductByCountryCategory,
  setAllProductsByCountries,
  setProductsCountry,
  setAllProductsByCountriesCategoryId,
  setSearchProduct,
  setAllProducts,
  setNewProduct,
  setOrderByName,
  setOrderByPrice,
  setCategory,
  filterByCategory,
  cleanDetail,
  setFilterByCategory,
  setNewProductMessage,
} = productSlice.actions;

export default productSlice.reducer;

export const axiosAllProductByCountryCategory = () => (dispatch, getState) => {
  const countryId = getState().products.country;
  const category = getState().products.categories;
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



export const axiosAllProductByCountryCategoryId = (id, countryId, categories) => (dispatch) => {
    axios
        .get(`http://localhost:8000/products/${countryId}/${categories}/${id}`)
        .then((response) => {
            dispatch(setAllProductsByCountriesCategoryId(response.data))
        })
        .catch((error) => console.log(error));
};

export const axiosSearchProduct = (title, country) => (dispatch) => {
    return axios
      .get(`http://localhost:8000/products/search/?title=${title}&country=${country}`)
      .then((response) => {
        console.log(response.data);
        dispatch(setSearchProduct(response.data));
      })
      .catch((error) => {
 
        throw error;
      });
  };


export const postProduct = (payload) => (dispatch) => {
    axios
      .post("http://localhost:8000/products/new", payload)
      .then((response) => {
            dispatch(setNewProductMessage(response.data));
            dispatch(setNewProduct(response.data));
      })
      .catch((error) => {
        console.log(error.response?.data?.error)
        dispatch(setNewProductMessage(error.response?.data?.error));
      });
  };

