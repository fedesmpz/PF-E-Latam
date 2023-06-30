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
    sale: null,
    newSaleMessage: null,
  },
  
  reducers: {
    setProductByCountryCategory: (state, action) => {
      state.products = action.payload;
    },

    setAllProductsByCountries: (state, action) => {
      state.products = action.payload;
      state.allProducts = action.payload;
    },

    // getProductsByCatalogListing: (state, action) => {
    //   const filteredProducts = state.products.filter(product => product.catalog_listing === true);
    //   state.products = filteredProducts;
    // },
    getProductsByCatalogListing: (state, action) => {
      state.products = action.payload;
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
      state.editDetail= {},
      state.newSaleMessage= null
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
      state.detail= {},
      state.newSaleMessage= null 
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

    setpayProduct:(state, action) => {
      state.sale = action.payload
    },

    setNewSaleMessage:(state, action) => {
      state.newSaleMessage = action.payload
    },
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
  setpayProduct,
  setNewSaleMessage,
  getProductsByCatalogListing,
} = productSlice.actions;

export default productSlice.reducer;

export const axiosAllProductByCountryCategory = (countryId, category) => (dispatch) => {
  // const countryId = getState().products.country;
  // const category = getState().products.categories;
  axios
  .get(`https://pf-elatam.onrender.com/products/${countryId}/${category}`)
  .then((response) => {
    dispatch(setProductByCountryCategory(response.data));
  })
    .catch((error) => console.log(error));
};

export const axiosAllProductsByCountries = (countryId) => (dispatch) => {
    axios
        .get(`https://pf-elatam.onrender.com/products/${countryId}`)
        .then((response) => {
          dispatch(setProductsCountry(countryId))
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

  export const payProduct = (payload) => (dispatch) => {
    axios
      .post(`https://pf-elatam.onrender.com/checkout`, payload)
      .then((response) => {
        console.log(response.data)
        dispatch(setNewSaleMessage(response.data))
        dispatch(setpayProduct(response.data));
      })
      
      .catch((error) => dispatch(setNewSaleMessage(error.response.data.error)));

     
  };

  export const axiosProductsByCatalogListing = (id) => async (dispatch) => {
    try {
      const response = await axios.get(`https://pf-elatam.onrender.com/products/${id}`);
      const allProducts = response.data;
      const filteredProducts = allProducts?.filter((product) => product.catalog_listing === true);
      dispatch(getProductsByCatalogListing(filteredProducts));
    } catch (error) {
      console.log(error);
    }
  };
