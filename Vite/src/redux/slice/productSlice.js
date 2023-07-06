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
    productsSoD: [],
    filteredProducts: [],
    orderByName: 'asc',
    orderByPrice: 'mayormenor',
    hideProductMessage: null,
    deleteProductMessage: null,
    sale: null,
    newSaleMessage: null,
    category: null,
    sales: [],
    productById:[],
    updateQuantity:null,
    allReviewById:[]
  },

  reducers: {
    setProductByCountryCategory: (state, action) => {
      let { response, discount, shipping } = action.payload;

      discount = discount === "true" ? discount = true : discount === "false" ? discount = false : discount = "---"
      shipping = shipping === "true" ? shipping = true : shipping === "false" ? shipping = false : shipping = "---"
      
      let filteredProducts = response;

      if (discount !== "---" && shipping !== "---") {
        filteredProducts = filteredProducts.filter((product) => {
          return product.sale_price === discount && product.shipping === shipping;
        });
      } else if (discount !== "---") {
        filteredProducts = filteredProducts.filter((product) => {
          return product.sale_price === discount;
        });
      } else if (shipping !== "---") {
        filteredProducts = filteredProducts.filter((product) => {
          return product.shipping === shipping;
        });
      }

      state.products = filteredProducts;
      state.productsSoD = filteredProducts;
    },

    setAllProductsByCountries: (state, action) => {
      state.products = action.payload;
      state.allProducts = action.payload;
      state.productsSoD = action.payload;
    },

    filterProductsByCatalogListing: (state) => {
      state.filteredProducts = state.allProducts.filter(
        (product) => product.catalog_listing === true)
    },

    setProductsCountry: (state, action) => {
      state.country = action.payload;

    },

    setAllProducts: (state, action) => {
      state.allProducts = [...action.payload];
      state.products = [...action.payload];
    },

    setAllProductsByCountriesCategoryId: (state, action) => {
      state.detail = action.payload;
    },

    setEditDetail: (state, action) => {
      state.editDetail = action.payload
    },

    cleanEditDetail: (state) => {
      state.editDetail = {},
        state.newSaleMessage = null
    },

    setSearchProduct: (state, action) => {
      state.products = action.payload;
      state.productsSoD = action.payload;
    },

    setNewProduct: (state, action) => {
      state.products = [...state.products, action.payload];
      state.allProducts = [...state.products, action.payload];
    },

    setNewProductMessage: (state, action) => {
      state.newProductMessage = action.payload;
    },

    setEditProductMessage: (state, action) => {
      state.editProductMessage = action.payload;
    },

    cleanDetail: (state) => {
      state.detail = {},
        state.newSaleMessage = null
    },

    setOrderByName: (state, action) => {
      state.orderByName = action.payload;
      const sortedProductsByName = state.productsSoD.sort((a, b) => {
        const titleA = a.title.trim();
        const titleB = b.title.trim();
        if (state.orderByName === 'asc') {
          return titleA.localeCompare(titleB);
        } else if (state.orderByName === 'des') {
          return titleB.localeCompare(titleA);
        } else if (state.orderByName === "---") {
          return state.productsSoD
        }
        return 0;
      });
      state.productsSoD = sortedProductsByName;
    },

    setOrderByPrice: (state, action) => {
      state.orderByPrice = action.payload;
      const sortedProducts = [...state.productsSoD]; // Realizar una copia del array de productos
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
          return state.productsSoD
        }
        return 0;
      });
      state.productsSoD = sortedProducts; // Asignar la lista ordenada al estado
    },

    /* setFilterByShipping: (state, action) => {
      const products = state.products
      const { payload } = action;
      if (payload === '---') {
        state.productsSoD = products
      } else {
        state.productsSoD = products.filter((product) => {
          if (payload === 'true') {
            return product.shipping === true;
          } else {
            return product.shipping === false;
          }
        });
      }
    }, */

    /* setFilterByDiscount: (state, action) => {
      const products = state.products
      const { payload } = action;
      if (payload === '---') {
        state.productsSoD = products
      } else {
        state.productsSoD = products.filter((product) => {
          if (payload === 'true') {
            return product.sale_price === true;
          } else {
            return product.sale_price === false;
          }
        });
      }
    }, */

    setHideProduct: (state, action) => {
      state.hideProductMessage = action.payload;


    },
    setDeleteProduct: (state, action) => {
      state.deleteProductMessage = action.payload

    },

    setEditedProduct: (state, action) => {
      state.editDetail = action.payload
      state.detail = action.payload
    },

    setpayProduct: (state, action) => {
      state.sale = action.payload
    },

    setNewSaleMessage: (state, action) => {
      state.newSaleMessage = action.payload
    },
    setCategoryFN: (state, action) => {
      state.category = action.payload;
    },
    setSalesByUser: (state, action) => {
      state.sales = action.payload
    },
    setFindProduct:(state,action)=>{
      state.productById=action.payload
    },
    setUpdateQuantityProduct:(state,action)=>{
      state.updateQuantity = action.payload
    },
    setAllReviewById:(state,action)=>{
      state.allReviewById= action.payload
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
  setCategoryFN,
  filterByCategory,
  cleanDetail,
  cleanEditDetail,
  /* setFilterByShipping */
  /* setFilterByDiscount */
  setNewProductMessage,
  setEditProductMessage,
  setHideProduct,
  setDeleteProduct,
  setpayProduct,
  setNewSaleMessage,
  filterProductsByCatalogListing,
  setSalesByUser,
  setFindProduct,
  setUpdateQuantityProduct,
  setAllReviewById
} = productSlice.actions;

export default productSlice.reducer;


export const axiosAllProductByCountryCategory = (countryId, category, shipping, discount) => (dispatch) => {
  // const countryId = getState().products.country;
  // const category = getState().products.categories;
  axios
    .get(`https://pf-elatam.onrender.com/products/${countryId}/${category}`)
    .then((response) => {
      dispatch(setProductByCountryCategory({response: response.data, discount: discount, shipping: shipping}));
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
      throw error
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

export const deleteProduct = (id) => (dispatch) => {
  axios
    .delete(`https://pf-elatam.onrender.com/products/delete/${id}`)
    .then((response) => {
      dispatch(setDeleteProduct(response.data))
    })
    .catch((error) => console.log(error))
};

export const payProduct = (payload) => (dispatch) => {
  axios
    .post(`https://pf-elatam.onrender.com/checkout`, payload)
    .then((response) => {

      dispatch(setNewSaleMessage(response.data))
      dispatch(setpayProduct(response.data));
    })
    .catch((error) =>
      dispatch(setNewSaleMessage(error.response.data.error)))
};

export const axiosFilterProductsByCatalogListing = () => (dispatch) => {
  const urls = [
    'https://pf-elatam.onrender.com/products/ARG',
    'https://pf-elatam.onrender.com/products/COL',
    'https://pf-elatam.onrender.com/products/MEX'
  ];
  const requests = urls.map(url => axios.get(url));
  Promise.all(requests)
    .then((responses) => {
      const allProducts = responses.map(response => response.data);

      // Filtrar productos por Catalog_Listing en true
      const filteredProducts = allProducts.map(products => products.filter(product => product.catalog_listing === true));

      dispatch(setAllProducts(filteredProducts));

    })
    .catch((error) => console.log(error));
};

export const findProduct = (productId) => (dispatch) => {
  axios
    .get(`https://pf-elatam.onrender.com/products/search/sales/${productId}`)
    .then((response) => {
      dispatch(setFindProduct(response.data))
    
    })
    .catch((error) => console.log(error))
};


export const salesByUser =  (email) => async (dispatch) => {
  await axios
    .get(`https://pf-elatam.onrender.com/sales/search/?email=${email}`)
    .then(async (response) => {
       await dispatch(setSalesByUser(response.data))

    })
    .catch((error) => console.log(error))
};

export const updateQuantityProduct=(cartData)=> (dispatch)=>{
  axios
  .put(`https://pf-elatam.onrender.com/products/update`, cartData)
  .then((response)=>{
    dispatch(setUpdateQuantityProduct(response.data))

  })
  .catch((error)=>console.log(error))
}

export const allReviewById= (id)=>(dispatch)=>{
  axios
  .get(`https://pf-elatam.onrender.com/reviews/reviewId/?id=${id}`)
  .then((response)=>{
    dispatch(setAllReviewById(response.data))
  })
  .catch((error)=>console.log(error))
}