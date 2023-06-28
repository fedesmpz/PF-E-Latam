import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categories: [],
    country: "ARG",
    detail: {},
    editDetail: {},
    newProductMessage: null,
    editProductMessage: null,
    allProducts: [],
    orderByName: 'asc',
    orderByPrice: 'mayormenor',
    hideProductMessage: null,
    deleteProductMessage: null,
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
      state.products =action.payload;
    },

    setAllProductsByCountriesCategoryId: (state, action) => {
      state.detail = action.payload;
    },

    setEditDetail: (state, action) => {
      state.editDetail = action.payload
    },

    cleanEditDetail:(state)=>{
      state.editDetail= {}
    },
    
    setSearchProduct: (state, action) => {
        state.products = action.payload;
    },

    setNewProduct: (state, action) => {
      state.products = [...state.products, action.payload];
      state.allProducts= [...state.products, action.payload];
    },

    setNewProductMessage: (state, action) => {
      state.newProductMessage = action.payload;
    },

    setEditProductMessage: (state, action) => {
      state.editProductMessage = action.payload;
    },

    cleanDetail:(state)=>{
      state.detail= {}
    },
    
    setOrderByName: (state, action) => {
      state.orderByName = action.payload;
      const sortedProductsByName = state.products.sort((a, b) => {
        const titleA = a.title.trim();
        const titleB = b.title.trim();
        if (state.orderByName === 'asc') {
          return titleA.localeCompare(titleB);
        } else if (state.orderByName === 'des') {
          return titleB.localeCompare(titleA);
        } else if (state.orderByName === "---") {
          return state.products
        }
        return 0;
      });
      state.products = sortedProductsByName;
    },

    setOrderByPrice: (state, action) => {
      state.orderByPrice = action.payload;
      const sortedProducts = [...state.products]; // Realizar una copia del array de productos
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
          return state.products
        }
        return 0;
      });
      state.products = sortedProducts; // Asignar la lista ordenada al estado
    },
    
    setFilterByCategory: (state, action) => {
      const filterByCategory = state.allProducts;
      const filteredCat = filterByCategory.filter((product) => {
        return product.categories === action.payload;
      });

      if (action.payload === 'all') {
        state.products = state.allProducts;
      } else {
        state.products = filteredCat;
      }
    },
    setHideProduct:(state,action)=>{
      state.hideProductMessage = action.payload;
    
   
    },
    setDeleteProduct:(state,action)=>{
      state.deleteProductMessage = action.payload
  
    },

    setEditedProduct:(state, action) => {
      state.editDetail = action.payload
      state.detail = action.payload
      
      // const index = state.products.findIndex(product => product.id === action.payload.id);
      // if (index !== -1) {
      //   state[index] = editedProduct;
      // }
    },

    getProductsByCatalogListing: (state, action) => {
      const filteredProducts = state.allProducts.filter(product => product.catalog_listing === true);
      state.products = filteredProducts;
    }
    
  },
});

export const {
  setProductByCountryCategory,
  setAllProductsByCountries,
  setProductsCountry,
  setAllProductsByCountriesCategoryId,
  setEditDetail,
  setSearchProduct,
  setAllProducts,
  setNewProduct,
  setEditedProduct,
  setOrderByName,
  setOrderByPrice,
  setCategory,
  filterByCategory,
  cleanDetail,
  cleanEditDetail,
  setFilterByCategory,
  setNewProductMessage,
  setEditProductMessage,
  setHideProduct,
  setDeleteProduct,
  getProductsByCatalogListing,
} = productSlice.actions;

export default productSlice.reducer;

export const axiosAllProductByCountryCategory = () => (dispatch, getState) => {
  const countryId = getState().products.country;
  const category = getState().products.categories;
  axios
    .get(`https://pf-elatam.onrender.com/products/${countryId}/${category}`)
    .then((response) => {
      dispatch(setProductByCountryCategory(response.data.data));
    })
    .catch((error) => console.log(error));
};

export const axiosAllProductsByCountries = (id) => (dispatch) => {
    axios
        .get(`https://pf-elatam.onrender.com/products/${id}`)
        .then((response) => {
            dispatch(setProductsCountry(id))
            dispatch(setAllProductsByCountries(response.data))
        })
        .catch((error) => console.log(error));
};



export const axiosAllProducts = () => (dispatch) => {
    const urls = [
        'https://pf-elatam.onrender.com/products/ARG',
        'https://pf-elatam.onrender.com/products/COL',
        'https://pf-elatam.onrender.com/products/MEX'
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
        .get(`https://pf-elatam.onrender.com/products/${countryId}/${categories}/${id}`)
        .then((response) => {
            dispatch(setAllProductsByCountriesCategoryId(response.data));
        })
        .catch((error) => console.log(error));
};

export const ProductByIdForEditForm = (id, countryId, categories) => (dispatch) => {
  axios
      .get(`https://pf-elatam.onrender.com/products/${countryId}/${categories}/${id}`)
      .then((response) => {
          dispatch(setEditDetail(response.data))
      })
      .catch((error) => console.log(error));
};

export const axiosSearchProduct = (title, country) => (dispatch) => {
    return axios
      .get(`https://pf-elatam.onrender.com/products/search/?title=${title}&country=${country}`)
      .then((response) => {
        dispatch(setSearchProduct(response.data));
      })
      .catch((error) => {
 
        throw error;
      });
  };


  export const postProduct = (payload) => (dispatch) => {
    axios
      .post("https://pf-elatam.onrender.com/products/new", payload)
      .then((response) => {
            dispatch(setNewProductMessage(response.data));
            dispatch(setNewProduct(response.data));
      })
      .catch((error) => {
        dispatch(setNewProductMessage(error.response?.data?.error));
      });
  };

  export const editProduct = (id, payload) => (dispatch) => {
    axios
      .put(`https://pf-elatam.onrender.com/products/edit/${id}`, payload)
      .then((response) => {
            dispatch(setEditProductMessage(response.data));
            // dispatch(setEditedProduct(payload));
      })
      .catch((error) => {
        dispatch(setEditProductMessage(error.response?.data?.error));
      });
  };

  export const hideProduct = (id) => (dispatch) => {
    axios
      .put(`https://pf-elatam.onrender.com/products/hide/${id}`)
      .then((response) => {
            dispatch(setHideProduct(response.data));
      })
      .catch((error) => console.log(error));
  };

  export const deleteProduct=(id)=>(dispatch)=>{
    axios
    .delete(`https://pf-elatam.onrender.com/products/delete/${id}`)
    .then((response)=>{
      dispatch(setDeleteProduct(response.data))
    })
    .catch((error)=>console.log(error))
  };

  export const fetchProductsByCatalogListing = () => async (dispatch) => {
    try {
      const response = await axios.get('https://pf-elatam.onrender.com/products');
      const allProducts = response.data;
      const filteredProducts = allProducts.filter(product => product.catalog_listing === true);
      dispatch(getProductsByCatalogListing(filteredProducts));
    } catch (error) {
      console.log(error);
    }
  };
